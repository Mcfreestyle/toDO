from flask import make_response, jsonify, abort, request
from api.v1.views import app_views
from models import User

@app_views.route('/login', methods=['POST'])
def login():
  values = request.get_json()
  if not values:
    abort(400, description="error :: please provide a JSON")

  users_rows = User.query.all()

  for user in users_rows:
    if user.user_name == values["userName"] and user.password == values["password"]:
      return make_response(jsonify(user.to_dict()), 200)
  return make_response("User or password is wrong", 403)
