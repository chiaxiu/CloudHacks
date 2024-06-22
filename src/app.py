from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy.orm import sessionmaker
from database import engine, TrafficData

app = Flask(__name__)
CORS(app)
SessionLocal = sessionmaker(bind=engine)

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {"message": "hellooooo"}
    return jsonify(data)

@app.route('/api/traffic_data', methods=['GET'])
def get_traffic_data():
    expressway = request.args.get('expressway')
    db = SessionLocal()
    data = db.query(TrafficData).filter(TrafficData.expressway == expressway).order_by(TrafficData.timestamp.desc()).all()
    db.close()
    if data:
        traffic_data_list = []
        for entry in data:
            traffic_data_list.append({
                'camera_id': entry.camera_id,
                'timestamp': entry.timestamp,
                'expressway': entry.expressway,
                'image_url': entry.image_url,
                'number_of_cars': entry.number_of_cars,
                'description': entry.description
            })
        return jsonify(traffic_data_list)
    else:
        return jsonify({'error': 'No data found'}), 404

if __name__ == '__main__':
    app.run(debug=True)