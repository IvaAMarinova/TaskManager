from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import mysql.connector
import os

app = Flask(__name__, static_folder='../frontend/build')
CORS(app)

db_config = {
    'user': 'maxuser',
    'password': 'maxpassword',
    'host': 'localhost',
    'port': 4006,
    'database': 'tasks'
}

def get_db_connection():
    return mysql.connector.connect(**db_config)

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static_files(path):
    return send_from_directory(app.static_folder, path)

@app.route('/tasks', methods=['GET'])
def get_tasks():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM tasks')
    tasks = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(tasks), 200

@app.route('/tasks', methods=['POST'])
def add_task():
    new_task = request.json
    name = new_task['name']
    text = new_task['text']

    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute('INSERT INTO tasks (name, text) VALUES (%s, %s)', (name, text))
    connection.commit()
    cursor.close()
    connection.close()

    return jsonify({'message': 'Task added successfully!'}), 201

@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    updated_task = request.json
    name = updated_task.get('name')
    text = updated_task.get('text')

    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute('UPDATE tasks SET name = %s, text = %s WHERE id = %s', (name, text, id))
    connection.commit()
    cursor.close()
    connection.close()

    return jsonify({'message': 'Task updated successfully!'}), 200

@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute('DELETE FROM tasks WHERE id = %s', (id,))
    connection.commit()
    cursor.close()
    connection.close()

    return jsonify({'message': 'Task deleted successfully!'}), 200

if __name__ == '__main__':
    app.run(debug=True)
