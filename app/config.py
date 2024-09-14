import os

class Config:
    SECRET_KEY = os.environ.get('f0dcdccee3dd838c244145a1e11e0296485751df') or 'you-will-never-guess'
    GOOGLE_APPLICATION_CREDENTIALS = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS') or '/path/to/your-service-account-key.json'