from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///traffic_data.db"

Base = declarative_base()

class TrafficData(Base):
    __tablename__ = 'traffic_data'
    id = Column(Integer, primary_key=True, index=True)
    camera_id = Column(String)
    camera_description = Column(String)
    timestamp = Column(DateTime)
    expressway = Column(String, index=True)
    image_url = Column(String)
    annotated_image_url = Column(String)
    number_of_cars = Column(Integer)
    description = Column(String)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
