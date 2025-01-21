import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://username:password@db:5432/oasis')
    SQLALCHEMY_TRACK_MODIFICATIONS = False