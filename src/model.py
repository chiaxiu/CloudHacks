import requests
from transformers import pipeline
from PIL import Image, ImageDraw
from io import BytesIO
from database import SessionLocal, TrafficData
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor
import base64
from cameraid_to_expressway import updated_expressway_mapping

checkpoint = "google/owlv2-base-patch16-ensemble"
detector = pipeline(model=checkpoint, task="zero-shot-object-detection")

def fetch_traffic_images():
    url = "https://api.data.gov.sg/v1/transport/traffic-images"
    response = requests.get(url)
    return response.json()
    
def encode_image_base64(image):
    buffered = BytesIO()
    image.save(buffered, format="JPEG")
    return base64.b64encode(buffered.getvalue()).decode('utf-8')
    
def draw_boxes_on_image(image, predictions):
    draw = ImageDraw.Draw(image)
    for p in predictions:
        box = p['box']
        label = p['label']
        score = p['score']

        xmin, ymin, xmax, ymax = box.values()
        draw.rectangle((xmin, ymin, xmax, ymax), outline='red', width=1)
        draw.text((xmin, ymin), f'{label}: {round(score, 2)}', fill='white')

    return image

def congestion_meter(number_of_cars):
    if number_of_cars >= 80:
        return 'congested'
    if number_of_cars >= 60:
        return 'slightly congested'
    if number_of_cars >= 40:
        return 'normal'
    if number_of_cars >= 20:
        return 'better than normal'
    else:
        return 'basically no cars'

def detect_and_transform(camera):
    camera_id = camera['camera_id']
    timestamp = datetime.fromisoformat(camera['timestamp'])
    expressway, camera_description = updated_expressway_mapping.get(camera_id, ('Unknown', 'Unknown'))
    image_url = camera['image']

    response = requests.get(image_url)
    image = Image.open(BytesIO(response.content)).convert('RGB')

    predictions = detector(image=image, candidate_labels=['car'])
    annotated_image = draw_boxes_on_image(image, predictions)

    annotated_image_base64 = encode_image_base64(annotated_image)

    number_of_cars = sum(1 for item in predictions if item['label'] == 'car' and item['score'] > 0.2)
    description = congestion_meter(number_of_cars)

    return {
        "camera_id": camera_id,
        "camera_description": camera_description,
        "timestamp": timestamp,
        "expressway": expressway,
        "image_url": image_url,
        "annotated_image_url": annotated_image_base64,
        "number_of_cars": number_of_cars,
        "description": description
    }

def transform_and_store(expressway_name):
    traffic_data = fetch_traffic_images()
    cameras = traffic_data['items'][0]['cameras']

    filtered_cameras = [camera for camera in cameras if updated_expressway_mapping.get(camera['camera_id'], (None,))[0] == expressway_name]

    with ThreadPoolExecutor(max_workers=5) as executor:
        results = list(executor.map(detect_and_transform, filtered_cameras))

    db = SessionLocal()
    try:
        for row in results:
            traffic_data = TrafficData(**row)
            db.add(traffic_data)
        db.commit()
    finally:
        db.close()

    return results