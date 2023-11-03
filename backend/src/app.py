from flask import Flask, request, jsonify
from flask_pymongo import PyMongo,ObjectId
from flask_cors import CORS
from urllib.parse import quote_plus  # Import the quote_plus function

app = Flask(__name__)
CORS(app)

# Encode the username and password using quote_plus
username = "pitigalakrp"
password = "123@123@123"  # Replace with your actual MongoDB password
encoded_username = quote_plus(username)
encoded_password = quote_plus(password)

# Construct the MongoDB URI
mongo_uri = f"mongodb://localhost:27017/UserManagementSystem"
app.config['MONGO_URI'] = mongo_uri

mongo = PyMongo(app)
collection = mongo.db.users

@app.route('/users', methods=['POST'])
def create_user():
    user_data = {
        'name': request.json.get('name'),
        'email': request.json.get('email'),
        'contact': request.json.get('contact'),
        'address': request.json.get('address')
    }
    result = collection.insert_one(user_data)
    return jsonify({'id': str(result.inserted_id), 'msg': 'User added successfully'})

@app.route('/users',methods=['GET'])
def getUsers():
    users = []
    for doc in collection.find():
        users.append({
            '_id': str(doc['_id']),
            'name': doc['name'],
            'email': doc['email'],
            'contact': doc['contact'],
            'address': doc['address']
        })
    return jsonify(users)
    
@app.route('/user/<id>',methods=['GET'])
def getUser(id):
    user = collection.find_one({'_id': ObjectId(id)})
    return jsonify({
        'id' : id,
        'name': user['name'],
        'email': user['email'],
        'contact': user['contact'],
        'address': user['address']
    })

@app.route('/user/<id>',methods=['DELETE'])
def deleteUser(id):
    collection.delete_one({'_id':ObjectId(id)})
    return jsonify({'msg' : 'User Deleted Successfully'})

@app.route('/user/<id>',methods=['PUT'])
def updateUser(id):
    collection.update_one({'_id':ObjectId(id)},{'$set':{
        'name': request.json.get('name'),
        'email': request.json.get('email'),
        'contact': request.json.get('contact'),
        'address': request.json.get('address')
    }})
    return jsonify({'msg': 'User Updated Seccessfully'})

if __name__ == '__main__':
    app.run(debug=True)
