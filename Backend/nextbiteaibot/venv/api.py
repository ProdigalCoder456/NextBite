from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows cross-origin requests from JS

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json["message"]
    response = f"nextbite_notebook.py {user_input}"
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)
