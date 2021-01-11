import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 300,
  },

  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(14),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const MusicPlayer = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div
      style={{
        maxWidth: 700,
      }}
    >
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Now Playing"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              In the End
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Linkin Park
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <div className={classes.controls}>
            <IconButton aria-label="previous">
              {theme.direction === "rtl" ? (
                <SkipNextIcon />
              ) : (
                <SkipPreviousIcon />
              )}
            </IconButton>
            <IconButton aria-label="play/pause">
              <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
            <IconButton aria-label="next">
              {theme.direction === "rtl" ? (
                <SkipPreviousIcon />
              ) : (
                <SkipNextIcon />
              )}
            </IconButton>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default MusicPlayer;
