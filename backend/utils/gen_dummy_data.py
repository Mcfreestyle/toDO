"""
  GENERATES DUMMY DATA
"""

import random
import datetime
import lorem
from faker import Faker
from create_sql_script import create_SQL_script


def random_date(start_date='-10d', end_date='+1M'):
  fake = Faker()
  return fake.date_time_between(start_date=start_date, end_date=end_date)

users = [
  'Michael',
  'Destino',
  'Mcfree'
]

nUsers = len(users)
nTodoLists = 10
nTasks = 50

"""
  generate data for SQLite3
"""

"""
==============
users
==============
"""
users_list = []
for i in range(nUsers):
  user_id = i + 1
  user_name = users[i]
  password = 'pwd{}'.format(i + 1)
  created_at = random_date()
  updated_at = random_date(created_at)

  users_list.append("""('{}', '{}', '{}', '{}', '{}')""".format(
    user_id, created_at, updated_at, user_name, password
  ))

"""
==============
todo_lists
==============
"""
todo_lists = []
# Create a default list for each user
for i in range(nUsers):
  todo_list_id = i + 1
  name = 'Default'
  user_id = i + 1
  created_at = random_date()
  updated_at = random_date(created_at)

  todo_lists.append("""('{}', '{}', '{}', '{}', '{}')""".format(
    todo_list_id, created_at, updated_at, name, user_id
  ))
for i in range(nUsers, nTodoLists):
  todo_list_id = i + 1
  name = 'lista{}'.format(i + 1)
  user_id = random.randrange(nUsers) + 1
  created_at = random_date()
  updated_at = random_date(created_at)

  todo_lists.append("""('{}', '{}', '{}', '{}', '{}')""".format(
    todo_list_id, created_at, updated_at, name, user_id
  ))

"""
==============
tasks
==============
"""
tasks_list = []
for i in range(nTasks):
  task_id = i + 1
  name = str(lorem.sentence())
  created_at = random_date()
  updated_at = random_date(created_at)
  due_date = updated_at
  todo_list_id = random.randrange(nTodoLists) + 1
  status = random.randrange(2)

  tasks_list.append("""('{}', '{}', '{}', '{}', '{}', '{}', '{}')""".format(
    task_id, created_at, updated_at, name, due_date, todo_list_id, status
  ))

"""
=======================================
FILL DICT AND WRITE TO FILE
"""
data_dict = {}

data_dict['users'] = users_list
data_dict['todo_lists'] = todo_lists
data_dict['tasks'] = tasks_list

create_SQL_script(data_dict)
