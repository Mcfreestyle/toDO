from flask import make_response, jsonify, abort, request
from api.v1.views import app_views
from models import User, ToDO

@app_views.route('/users/<int:user_id>/lists', methods=['GET'])
def get_todo_lists(user_id):
  user = User.query.get(user_id)
  if not user:
    abort(404)

  todo_lists = []
  for todo_list in user.todo_lists:
    todo_lists.append(todo_list.to_dict())
  return make_response(jsonify(todo_lists), 200)

@app_views.route('/lists/<int:list_id>', methods=['GET'])
def get_list(list_id):
  todo_list = ToDO.query.get(list_id)
  if not todo_list:
    abort(404)
  
  return make_response(jsonify(todo_list.to_dict()), 200)

@app_views.route('/users/<int:user_id>/lists', methods=['POST'])
def create_list(user_id):
  user = User.query.get(user_id)
  if not user:
    abort(404)
  
  values = request.get_json()
  if not values:
    abort(400, description="error :: please provide a JSON")
  
  values['user_id'] = user.id
  todo_list = ToDO(**values)
  todo_list.save()
  return make_response(jsonify(todo_list.id), 201)
