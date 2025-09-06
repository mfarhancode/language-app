from flask import Flask, request, jsonify
from flask_cors import CORS
import json, os

app = Flask(__name__)
CORS(app)  # Allow all origins

import os
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'data')


@app.route('/save', methods=['POST'])
def save():
    data = request.json
    filename = data.get('file')
    content = data.get('content')
    
    if not filename or content is None:
        return jsonify({"status": "error", "message": "Missing data"}), 400

    path = os.path.join(DATA_DIR, filename)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(content, f, indent=2, ensure_ascii=False)
    
    return jsonify({"status": "success", "file": filename})

if __name__ == '__main__':
    app.run(debug=True)
