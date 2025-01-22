from flask import request, jsonify
from app import app, db
from models import User, Post

@app.route('/register', methods=['POST'])
def register_user():
    data = request.json
    new_user = User(username=data['username'], email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully!"}), 201

@app.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    return jsonify([{"id": post.id, "content": post.content, "user_id": post.user_id} for post in posts])

@app.route('/posts', methods=['POST'])
def create_post():
    data = request.json
    new_post = Post(user_id=data['user_id'], content=data['content'])
    db.session.add(new_post)
    db.session.commit()
    return jsonify({"message": "Post created successfully!"}), 201
