from flask import make_response, jsonify, abort, request, json
from api.v1.views import app_views
from models import User, ToDO, Task
from datetime import datetime

date_format = '%Y-%m-%dT%H:%M:%S.%fZ' # 2022-09-27T11:05:45.234Z

@app_views.route('/users/<int:user_id>/tasks', methods=['GET'])
def get_all_tasks(user_id):
  user = User.query.get(user_id)
  if not user:
    abort(404)

  tasks = []
  user_tasks = Task.query.join(ToDO).join(User).filter(
    User.id == user.id
  ).order_by(Task.due_date)

  for task in user_tasks:
    tasks.append(task.to_dict())

  status_param = request.args.get('status')
  if status_param:
    tasks = [task for task in tasks if task['status'] == json.loads(status_param)]
  
  return make_response(jsonify(tasks), 200)

@app_views.route('/lists/<int:list_id>/tasks', methods=['GET'])
def get_list_tasks(list_id):
  todo_list = ToDO.query.get(list_id)
  if not todo_list:
    abort(404)

  tasks_from_list = []
  list_tasks = Task.query.join(ToDO).filter(
    ToDO.id == todo_list.id
  ).order_by(Task.due_date)

  for task in list_tasks:
    tasks_from_list.append(task.to_dict())
  
  status_param = request.args.get('status')
  if status_param:
    tasks_from_list = [task for task in tasks_from_list if task['status'] == json.loads(status_param)]

  return make_response(jsonify(tasks_from_list), 200)

@app_views.route('/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
  task = Task.query.get(task_id)
  if not task:
    abort(404)

  return make_response(jsonify(task.to_dict()), 200)

@app_views.route('/lists/<int:list_id>/tasks', methods=['POST'])
def create_task(list_id):
  todo_list = ToDO.query.get(list_id)
  if not todo_list:
    abort(404)

  values = request.get_json()
  if not values:
    abort(400, description="error :: please provide a JSON")

  values['todo_list_id'] = todo_list.id
  values['due_date'] = datetime.strptime(values['due_date'], date_format)

  task = Task(**values)
  task.save()
  return make_response(jsonify(task.id), 201)

@app_views.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
  task = Task.query.get(task_id)
  if not task:
    abort(404)

  values = request.get_json()
  if not values:
    abort(400, description="error :: please provide a JSON")
  
  # values has to have 'todo_list_id' field if this is updated
  values['due_date'] = datetime.strptime(values['due_date'], date_format)
  values['status'] = json.loads(values['status'])
  values['updated_at'] = datetime.now()

  for key, name in values.items():
    setattr(task, key, name)
  task.update()
  return make_response(jsonify(task.id), 200)

@app_views.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
  task = Task.query.get(task_id)
  if not task:
    abort(404)

  task.delete()
  return make_response("Deleted task", 200)
