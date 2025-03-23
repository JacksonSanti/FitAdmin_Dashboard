from flask import Blueprint,render_template
from flask import request
from flask import Response


link = Blueprint('routes', __name__)

@link.route('/')
def login():

    return render_template("login.html") 

@link.route('/panel')
def panel():

    return render_template("index.html")

    

