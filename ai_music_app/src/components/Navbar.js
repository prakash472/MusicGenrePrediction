import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const drawerWidth = 240;
const demoData = [{ prediction: 1.12 }, { prediction: 1.31 }];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Navbar = () => {
  const classes = useStyles();
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
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Menu
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {["Predict", "PlayMusic"].map((text, index) => (
              <ListItem
                button
                key={text}
                component={Link}
                to={text === "Predict" ? "/predict" : "/music"}
              >
                {/*   <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
      </main>
      {/* <DisplayChart data={outputData} /> */}
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

export default Navbar;
