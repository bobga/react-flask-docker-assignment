import json

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import DeclarativeMeta

db = SQLAlchemy()

users_projects = db.Table('users_projects',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('project_id', db.Integer, db.ForeignKey('projects.id'), primary_key=True)
)

class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    startdate = db.Column(db.String(20), nullable=False)
    files = db.relationship('File', backref='files')
    users = db.relationship('User', secondary=users_projects, backref='users', lazy='dynamic')

    def __repr__(self):
        return '<Project %r>' % self.name

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return '<Project %r>' % self.name

class File(db.Model):
    __tablename__ = 'files'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(100), nullable=False)    
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'),
        nullable=False)

    def __repr__(self):
        return '<Project %r>' % self.name

def to_dict(obj):
    if isinstance(obj.__class__, DeclarativeMeta):
        # an SQLAlchemy class
        fields = {}
        for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
            data = obj.__getattribute__(field)
            try:
                json.dumps(data)  # this will fail on non-encodable values, like other classes
                if data is not None:
                    fields[field] = data
            except TypeError:
                pass
        # a json-encodable dict
        return fields