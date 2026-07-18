from flask import Flask, request, jsonify
from flask_cors import CORS
import pyttsx3
import threading

app = Flask(__name__)

CORS(app)

lock = threading.Lock()


def speak_text(text):
    with lock:
        engine = pyttsx3.init()
        engine.say(text)
        engine.runAndWait()
        engine.stop()


@app.route("/speak", methods=["POST"])
def speak():

    print("POST received")

    data = request.json
    print(data)

    msg = data["message"]

    if msg == "sardine":
        print("Speaking sardine")

        speak_text("This is Sardine. The main nutrient is Protein and Vitmins, those are Vitamin B 12, which improves your brain health, red blood cell, and gives energy, and Omega 3, which gives you healthy heart and reduce inflammation.")

        print("Finished")

        return jsonify({
            "status":"finished"
        })

    return jsonify({
        "status":"unknown"
    })


if __name__ == "__main__":
    app.run(debug=False)