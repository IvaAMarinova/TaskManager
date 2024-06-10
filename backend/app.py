from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='../frontend/build')
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://maxuser:maxpassword@localhost:4006/tasks'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    text = db.Column(db.Text, nullable=False)

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static_files(path):
    return send_from_directory(app.static_folder, path)

@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    tasks_list = [{'id': task.id, 'name': task.name, 'text': task.text} for task in tasks]
    return jsonify(tasks_list), 200

@app.route('/tasks', methods=['POST'])
def add_task():
    new_task = request.json
    name = new_task['name']
    text = new_task['text']

    task = Task(name=name, text=text)
    db.session.add(task)
    db.session.commit()

    return jsonify({'message': 'Task added successfully!'}), 201

@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    task = Task.query.get(id)
    if not task:
        return jsonify({'message': 'Task not found'}), 404

    updated_task = request.json
    task.name = updated_task.get('name', task.name)
    task.text = updated_task.get('text', task.text)

    db.session.commit()

    return jsonify({'message': 'Task updated successfully!'}), 200

@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get(id)
    if not task:
        return jsonify({'message': 'Task not found'}), 404

    db.session.delete(task)
    db.session.commit()

    return jsonify({'message': 'Task deleted successfully!'}), 200

if __name__ == '__main__':
    app.run(debug=True)
