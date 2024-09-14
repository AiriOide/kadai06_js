from flask import Flask
from app.config import Config
from app.api.routes import api_bp

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # APIルートの登録
    app.register_blueprint(api_bp)

    return app