from flask import Blueprint, render_template, request
from .db import db_get_connection

auth_bp = Blueprint('auth/', __name__, url_prefix='/auth')

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template("auth/registration.html")

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    return "Login"

