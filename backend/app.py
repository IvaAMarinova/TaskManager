import logging
from flask import Flask, request, jsonify, g
from flask_cors import CORS
import mysql.connector
from keycloak import KeycloakOpenID
from keycloak.exceptions import KeycloakAuthenticationError, KeycloakError
from functools import wraps

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "supports_credentials": True, "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"], "allow_headers": ["Content-Type", "Authorization"]}})

keycloak_server_url = "http://localhost:8080"
keycloak_realm = "TaskManager"
keycloak_client_id = "task-client"

keycloak_openid = KeycloakOpenID(server_url=keycloak_server_url,
                                 client_id=keycloak_client_id,
                                 realm_name=keycloak_realm)

db_config = {
    'user': 'maxuser',
    'password': 'maxpassword',
    'host': 'localhost',
    'port': 4006,
    'database': 'tasks'
}

def get_db_connection():
    return mysql.connector.connect(**db_config)

class ListHandler(logging.Handler):
    def __init__(self):
        super().__init__()
        self.log_list = []

    def emit(self, record):
        log_entry = self.format(record)
        self.log_list.append(log_entry)

log_handler = ListHandler()
log_handler.setLevel(logging.DEBUG)
log_formatter = logging.Formatter('%(levelname)s:%(message)s')
log_handler.setFormatter(log_formatter)
app.logger.addHandler(log_handler)
app.logger.setLevel(logging.DEBUG)

def keycloak_token_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        token = request.headers.get('Authorization', None)
        if token:
            token = token.split(' ')[1]
            try:
                userinfo = keycloak_openid.userinfo(token)
                g.user = userinfo
            except KeycloakError as e:
                return jsonify({'message': 'Unauthorized'}), 401
        else:
            return jsonify({'message': 'Token is missing'}), 401
        return f(*args, **kwargs)
    return wrap

@app.route('/login', methods=['POST'])
def login():
    credentials = request.json
    username = credentials.get('username')
    password = credentials.get('password')

    try:
        token = keycloak_openid.token(username, password)
        return jsonify({
            'access_token': token['access_token'],
            'refresh_token': token['refresh_token'],
            'expires_in': token['expires_in'],
            'refresh_expires_in': token['refresh_expires_in']
        }), 200
    except KeycloakAuthenticationError:
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/tasks', methods=['GET'])
@keycloak_token_required
def get_tasks():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM tasks')
    tasks = cursor.fetchall()
    cursor.close()
    connection.close()
    print(tasks)
    return jsonify(tasks), 200

@app.route('/tasks', methods=['POST'])
@keycloak_token_required
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

    return {'message': 'Task added successfully!'}, 201

@app.route('/tasks/<int:id>', methods=['PUT'])
@keycloak_token_required
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
@keycloak_token_required
def delete_task(id):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute('DELETE FROM tasks WHERE id = %s', (id,))
    connection.commit()
    cursor.close()
    connection.close()

    return jsonify({'message': 'Task deleted successfully!'}), 200

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
