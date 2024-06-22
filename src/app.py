from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy.orm import sessionmaker
from database import engine, TrafficData
from model import transform_and_store

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {"message": "hellooooo"}
    return jsonify(data)

@app.route('/api/traffic_data', methods=['GET'])
def get_traffic_data():
    expressway = request.args.get('expressway')

    results = transform_and_store(expressway)
   
    traffic_data_list = []
    for entry in results:
        traffic_data_list.append({
            'camera_id': entry['camera_id'],
            'camera_description': entry['camera_description'],
            'timestamp': entry['timestamp'].isoformat(),  # Convert datetime to ISO format
            'expressway': entry['expressway'],
            'image_url': entry['image_url'],
            'annotated_image_url': entry['annotated_image_url'],
            'number_of_cars': entry['number_of_cars'],
            'description': entry['description']
        })

    return jsonify(traffic_data_list)
   
if __name__ == '__main__':
    app.run(debug=True)