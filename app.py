from flask import Flask, request, jsonify, render_template
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/translate", methods=["POST"])
def translate():
    data = request.json

    response = requests.post(
        "https://libretranslate.com/translate",
        json={
            "q": data["q"],
            "source": "auto",
            "target": "en",
            "format": "text"
        }
    )

    return jsonify(response.json())

if __name__ == "__main__":
    app.run(port=5000)