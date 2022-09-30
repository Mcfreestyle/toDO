from flask import Flask, make_response, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import db, User, ToDO, Task
from api.v1.views import app_views

def create_app():
    # Flask
    app = Flask(__name__)
    app.config['SECRET_KEY'] = '\x14B~^\x07\xe1\x197\xda\x18\xa6[[\x05\x03QVg\xce%\xb2<\x80\xa4\x00'
    app.config['DEBUG'] = True

    # Database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../../database/book.sqlite3'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    with app.app_context():
        db.create_all()
        

    app.url_map.strict_slashes = False
    app.register_blueprint(app_views)
    cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})

    @app.errorhandler(404)
    def not_found(error):
        return make_response(jsonify({'error': "Not found"}), 404)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(port=5000)
