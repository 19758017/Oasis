from flask import request, jsonify
from app import app, db
from app.models import Message, Author, Category, Book

@app.route('/api/messages', methods=['POST'])
def add_message():
    data = request.get_json()
    new_message = Message(name=data['name'], email=data['email'], message=data['message'])
    db.session.add(new_message)
    db.session.commit()
    return jsonify({'success': True, 'message': 'Mensagem salva com sucesso!'}), 201

@app.route('/api/messages', methods=['GET'])
def get_messages():
    messages = Message.query.all()
    return jsonify([message.to_dict() for message in messages]), 200

@app.route('/api/authors', methods=['POST'])
def add_author():
    data = request.get_json()
    new_author = Author(name=data['name'], bio=data['bio'], birth_date=data['birth_date'])
    db.session.add(new_author)
    db.session.commit()
    return jsonify({'success': True, 'author': new_author.to_dict()}), 201

@app.route('/api/authors', methods=['GET'])
def get_authors():
    authors = Author.query.all()
    return jsonify([author.to_dict() for author in authors]), 200

@app.route('/api/categories', methods=['POST'])
def add_category():
    data = request.get_json()
    new_category = Category(name=data['name'])
    db.session.add(new_category)
    db.session.commit()
    return jsonify({'success': True, 'category': new_category.to_dict()}), 201

@app.route('/api/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([category.to_dict() for category in categories]), 200

@app.route('/api/books', methods=['POST'])
def add_book():
    data = request.get_json()
    new_book = Book(title=data['title'], author_id=data['author_id'], category_id=data['category_id'], published_date=data['published_date'], summary=data['summary'])
    db.session.add(new_book)
    db.session.commit()
    return jsonify({'success': True, 'book': new_book.to_dict()}), 201

@app.route('/api/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    return jsonify([book.to_dict() for book in books]), 200