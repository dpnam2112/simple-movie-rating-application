import mysql.connector
from flask import current_app, g, Flask

def db_get_missing_configs():
    # Check required configurations exist
    configs = ('DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_NAME')
    not_found_configs = []

    for config in configs:
        if config not in current_app.config:
            not_found_configs.append(config)

    return not_found_configs


def db_get_connection() -> mysql.connector.MySQLConnection:
    """ Get the current connection to the database or create a new connection.
        Configurations used to make a connection are defined in the configuration file.

    Returns:
        An object representing the connection in the case that the connection is
        successfully made. Otherwise, `None` is returned. 
    """
    if 'db' in g:
        return g.db

    missing_configs = db_get_missing_configs()
    
    if missing_configs:
        current_app.logger.error(f"Missing database configurations: {missing_configs}")
        return
        

    db_config = {
        'user': current_app.config['DB_USER'],
        'password': current_app.config['DB_PASSWORD'],
        'host': current_app.config['DB_HOST'],
        'database': current_app.config['DB_NAME']
    }
    
    try:
        g.db = mysql.connector.Connect(**db_config)
        return g.db
    except mysql.connector.Error as err:
        current_app.logger.error(err.msg)


def db_close(e=None):
    """ Close the connection when the response is returned. """

    conn = g.pop('db', None)
    if conn:
        current_app.logger.info(f"Closed the connection.")
        conn.close()

def db_app_register(app: Flask):
    """ Register the database-related commands and functions to
        the Flask application.

        Args:
            app (Flask): Flask application object
    """

    app.teardown_appcontext(db_close)