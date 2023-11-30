from flask import Blueprint, render_template, request
from .db import db_get_connection
from mysql.connector import MySQLConnection

film_bp = Blueprint('film/', __name__, url_prefix='/film')

@film_bp.route('/movie/<id>', methods=['GET', 'POST'])
def movie(id):
    if request.method == 'GET':
        conn: MySQLConnection = db_get_connection()

        cursor = conn.cursor()
        cursor.callproc("movie_info", args=[0])
        x = 0
        for result in cursor.stored_results():
            x += 1
        
        return f"{x}"

@film_bp.route('/tv-series/<id>', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template("film/tv-series.html")