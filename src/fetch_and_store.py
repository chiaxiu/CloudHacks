# import requests
# from transformers import pipeline
# from PIL import Image
# from io import BytesIO
# import pandas as pd
# from database import TrafficData, SessionLocal
# import schedule
# import time

# # Hugging Face pipeline for object detection
# checkpoint = "google/owlv2-base-patch16-ensemble"
# detector = pipeline(model=checkpoint, task="zero-shot-object-detection")

# # Function to fetch data from data.gov.sg API
# def fetch_traffic_images():
#     url = "https://api.data.gov.sg/v1/transport/traffic-images"
#     response = requests.get(url)
#     return response.json()

# # Function to detect cars in images
# def detect_cars(image_url):
#     response = requests.get(image_url)
#     image = Image.open(BytesIO(response.content)).convert('RGB')
#     results = detector(images=image, candidate_labels=['car'])
#     return len([item for item in results if item['label'] == 'car'])

# # Function to transform and store data
# def transform_and_store():
#     traffic_data = fetch_traffic_images()
#     cameras = traffic_data['items'][0]['cameras']

#     # Example mapping, should be customized based on actual mapping
#     expressway_mapping = {
#         '1001': 'PIE',
#         '1002': 'AYE',
#         '1003': 'CTE',
#         '1004': 'KJE',
#         # Add more mappings as needed
#     }

#     data_list = []
#     for camera in cameras:
#         camera_id = camera['camera_id']
#         expressway = expressway_mapping.get(camera_id, 'Unknown')
#         image_url = camera['image']
#         number_of_cars = detect_cars(image_url)
#         congested_meter = min(number_of_cars / 10.0, 1.0)  # Example calculation

#         data = {
#             'timestamp': camera['timestamp'],
#             'expressway': expressway,
#             'image_url': image_url,
#             'congested_meter': congested_meter,
#             'number_of_cars': number_of_cars
#         }
#         data_list.append(data)

#     df = pd.DataFrame(data_list)

#     # Store in the database
#     db = SessionLocal()
#     for _, row in df.iterrows():
#         traffic_record = TrafficData(
#             timestamp=row['timestamp'],
#             expressway=row['expressway'],
#             image_url=row['image_url'],
#             congested_meter=row['congested_meter'],
#             number_of_cars=row['number_of_cars']
#         )
#         db.add(traffic_record)
#     db.commit()
#     db.close()

# # Schedule the job to run every 5 minutes
# schedule.every(5).minutes.do(transform_and_store)

# while True:
#     schedule.run_pending()
#     time.sleep(1)
