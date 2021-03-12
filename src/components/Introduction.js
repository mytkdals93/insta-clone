import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
      width:`100%`,
      maxWidth:500,
  },
  media: {
      height:200,
      objectFit:`cover`,
  },
});
export const Introduction = () => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
        
          <CardMedia
            className={classes.media}
            image="https://avatars.githubusercontent.com/u/24566249?s=460&u=cf5631ab23cb96926624d3afee768fd4bb694eb8&v=4"
            title="이상민"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                INSTAGRAM-CLONE
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              리액트 클론 미니 프로젝트:<br/>
              기능: Authentication, add post, add comment <br/>
              React + Material Ui + Firebase<br/>
              찾아주셔서 감사합니다. 
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                <a href="https://github.com/mytkdals93/instagram-clone" target="_brank" >Git Repogitory</a>
                <br/>
                Email: sangmin4208@gmail.com
            </Typography>
          </CardContent>
      </Card>
    )
}
