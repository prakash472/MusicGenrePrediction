import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Button } from "@material-ui/core";
import React, { useState } from "react";
const Predict = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [outputData, setOutputDate] = useState([]);
  const predictURL = "http://127.0.0.1:5000/predict_cnn";
  const config = {
    headers: {
      "Content-Type":
        "multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s",
    },
  };
  const handlePredict = (e) => {
    console.log("Inside Handle Predict");
    console.log(e.target.files[0]);
    if (e.target.name === "audio") {
      console.log("Inside target");
      setAudioFile({
        audio: e.target.files,
      });
      console.log("audio");
      console.log(e.target.files);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(audioFile[0]);
    let formData = new FormData();
    formData.append("file", audioFile[0]);

    axios
      .post(predictURL, formData, config)
      .then((res) => {
        console.log("Inside post request");
        console.log(res.data);
        setOutputDate(res.data["predictions"]);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form>
        <input
          style={{ marginLeft: 300 }}
          type="file"
          name="audio"
          onChange={(e) => setAudioFile(e.target.files)}
        ></input>

        <Button
          variant="contained"
          color="primary"
          component="span"
          onClick={handleSubmit}
        >
          Predict
        </Button>
      </form>
      <DisplayChart data={outputData} />
    </div>
  );
};
const DisplayChart = (props) => {
  const { data } = props;
  console.log(data);
  return (
    <div style={{ marginTop: 20, maxWidth: 600, marginLeft: 400 }}>
      <Bar
        data={{
          labels: [
            "blues",
            "classical",
            "country",
            "disco",
            "hiphop",
            "jazz",
            "metal",
            "pop",
            "reggae",
            "rock",
          ],
          datasets: [
            {
              label: ["Percentage"],
              data: data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
            // {
            //   label: 'Quantity',
            //   data: [47, 52, 67, 58, 9, 50],
            //   backgroundColor: 'orange',
            //   borderColor: 'red',
            // },
          ],
        }}
        width={400}
        height={300}
        options={{ maintainAspectRatio: true }}
      />
    </div>
  );
};

export default Predict;
