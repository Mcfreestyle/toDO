from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()
date_format = "%a, %b %d, %Y, %I:%M %p" # Mon, Sep 23, 2022, 04:11 P.M

class BaseModel():
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_dict(self):
        dictio = self.__dict__
        del dictio["_sa_instance_state"]
        dictio["created_at"] = dictio["created_at"].strftime(date_format)
        dictio["updated_at"] = dictio["updated_at"].strftime(date_format)
        if "due_date" in dictio:
            dictio["due_date"] = dictio["due_date"].strftime(date_format)

        return dictio

    def new(self):
        db.session.add(self)

    def update(self):
        db.session.commit()

    def save(self):
        self.new()
        self.update()

    def delete(self):
        db.session.delete(self)
        self.update()

class User(BaseModel, db.Model):
    __tablename__ = "users"
    user_name = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    todo_lists = db.relationship('ToDO', backref='user', lazy=True)


class ToDO(BaseModel, db.Model):
    __tablename__ = "todo_lists"
    name = db.Column(db.String(80), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    tasks = db.relationship('Task', backref='todo_list', lazy=True)

class Task(BaseModel, db.Model):
    __tablename__ = "tasks"
    name = db.Column(db.String(80), nullable=False)
    due_date = db.Column(db.DateTime, nullable=False)
    todo_list_id = db.Column(db.Integer, db.ForeignKey('todo_lists.id'), nullable=False)
    status = db.Column(db.Boolean, nullable=False, default=False)
