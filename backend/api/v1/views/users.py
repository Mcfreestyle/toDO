from flask import make_response, jsonify, abort, request
from api.v1.views import app_views
from models import User, ToDO

@app_views.route('/users', methods=['GET'])
def get_users():
  users_rows = User.query.all()

  users_info = []
  for user in users_rows:
    users_info.append(user.to_dict())
  return make_response(jsonify(users_info), 200)

@app_views.route('/users', methods=['POST'])
def create_user():
  values = request.get_json()
  if not values:
    abort(400, description="error :: please provide a JSON")

  user = User.query.filter_by(user_name=values['userName']).first()
  if user:
    return make_response("User exists", 400)

  user_data = {
    "user_name": values["userName"],
    "password": values["password"]
  }
  new_user = User(**user_data)
  ToDO(name="Default", user=new_user)
  new_user.save()
  return make_response(jsonify(new_user.id), 201)
