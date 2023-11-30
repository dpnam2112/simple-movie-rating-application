import flask
import os
from . import db
import json
import logging

CONFIG_FILE_PATH = "app_config.json"

def create_app(test_config=None):
    """ React application factory function. """

    app = flask.Flask(__name__, instance_relative_config=True)

    logger = logging.Logger("Flask App initialization")

    if test_config is None:
        logger.info(f"No test configuration. Load configuration from json file: {os.path.abspath(CONFIG_FILE_PATH)}")
        app.config.from_file(CONFIG_FILE_PATH, load=json.load)
    else:
        logger.info(f"Load test configuration")
        app.config.from_mapping(test_config)

    # Create instance folder if it doesn't exist
    try:
        logger.info(f"Create instance path: {app.instance_path}")
        os.makedirs(app.instance_path)
    except OSError as err:
        logger.error(err)

    db.db_app_register(app)

    # Registering blueprints
    from . import auth, film
    app.register_blueprint(auth.auth_bp)
    app.register_blueprint(film.film_bp)

    return app