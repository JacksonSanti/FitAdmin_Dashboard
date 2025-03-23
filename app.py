from flask import Flask
from routes.route import link
from flask_cors import CORS


def create_app():

    app = Flask(__name__)

    CORS(app)

    app.register_blueprint(link, url_prefix='/')

    return app 