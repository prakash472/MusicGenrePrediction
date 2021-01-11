import requests

# server url
URL = "http://127.0.0.1:5000/predict_cnn"
TEST_AUDIO_FILE_PATH = "../Data/genres_original/country/country.00000.wav"


if __name__ == "__main__":
    audio_file = open(TEST_AUDIO_FILE_PATH, "rb")
    values = {"file": (TEST_AUDIO_FILE_PATH, audio_file, "audio/wav")}
    response = requests.post(URL, files=values)
    data = response.json()

    print(f"Predicted keyword is: {data['keyword']}")
