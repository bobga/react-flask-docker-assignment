from flask import jsonify, request
from flask_restful import Resource, Api, reqparse
from sqlalchemy import desc

from .models import Project as ProjectModel, to_dict
from .models import User as UserModel
from .models import File as FileModel
from datetime import datetime
import json

api = Api()

class Project(Resource):
    def get(self):
        page = int(request.args.get('page'))
        sizePerPage = int(request.args.get('sizePerPage'))
        sortField = request.args.get('sortField')
        sortOrder = request.args.get('sortOrder')
        filters = json.loads(request.args.get('filters'))
        query = ProjectModel.query
        for attr, value in filters.items():
            query = query.filter(getattr(ProjectModel,attr).contains(value))
        return jsonify(
            projects=[to_dict(project) for project in query.order_by(desc(sortField) if sortOrder != 'desc' else sortField).limit(sizePerPage).offset((page - 1) * sizePerPage).all()],
            totalCount=query.count(),
        )

api.add_resource(Project, '/projects')

class User(Resource):
    def get(self):
        page = int(request.args.get('page'))
        sizePerPage = int(request.args.get('sizePerPage'))
        sortField = request.args.get('sortField')
        sortOrder = request.args.get('sortOrder')
        project_id = request.args.get('project_id')
        filters = json.loads(request.args.get('filters'))
        query = ProjectModel.query.get(project_id).users
        for attr, value in filters.items():
            query = query.filter(getattr(UserModel,attr).contains(value))
        return jsonify(
            users=[to_dict(user) for user in query.order_by(desc(sortField) if sortOrder != 'desc' else sortField).limit(sizePerPage).offset((page - 1) * sizePerPage).all()],
            totalCount=query.count()
        )

api.add_resource(User, '/users')


class File(Resource):
    def get(self):
        page = int(request.args.get('page'))
        sizePerPage = int(request.args.get('sizePerPage'))
        sortField = request.args.get('sortField')
        sortOrder = request.args.get('sortOrder')
        project_id = request.args.get('project_id')
        filters = json.loads(request.args.get('filters'))
        query = FileModel.query.filter(FileModel.project_id == project_id)
        for attr, value in filters.items():
            query = query.filter(getattr(FileModel,attr).contains(value))
        return jsonify(
            files=[to_dict(file) for file in query.order_by(desc(sortField) if sortOrder != 'desc' else sortField).limit(sizePerPage).offset((page - 1) * sizePerPage).all()],
            totalCount=query.count(),
        )

api.add_resource(File, '/files')
