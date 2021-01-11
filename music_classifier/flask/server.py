from flask import Flask, request, jsonify
import random
from music_classifier_service import Music_Classifier_Service
import os
import numpy as np
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
cprs=CORS(app,resources={r"/*":{"origins":"http://localhost:3000"}})



@app.route("/predict_cnn", methods=["POST"])
def predict_cnn():

    # get audio-file and save
   
    audio_file=request.files["file"]
    file_name = str(random.randint(0, 10000))
    audio_file.save(file_name)

    # invoke Music classfier service
    mcs = Music_Classifier_Service()

    # make_prediction
    prediction = mcs.predict(file_name)
    prediction = prediction.tolist()
    print("Prediction is from server", prediction)

    # remove audio-file after predicting
    os.remove(file_name)

    # send back the predicted keyword in json format
    data = {"predictions": prediction}

    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
