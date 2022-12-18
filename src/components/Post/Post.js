import React, {useRef, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CommentIcon from '@material-ui/icons/Comment';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {FileDownload, Margin } from "@mui/icons-material";
import { color, style } from "@mui/system";
import { Container } from "@material-ui/core";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";



const useStyles = makeStyles((theme) => ({
  root: {
    width: 800,
    textAlign : "left",
    margin : 20
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    variant : "circular"
   
  },
  link: {
      textDecoration : "none",
      boxShadow : "none",
      color : "white"
  }
}));


function Post(props) {                                                    
    const {title, text, userId, userName, postId} = props;
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [liked, setLiked] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const isInitialMount = useRef(true);




    const handleExpandClick = () => {
        setExpanded(!expanded)
        refreshComments();
        console.log(commentList);
    };

    
   const handleLike = () => {
    setLiked(!liked);
   }

   const refreshComments = () => {
    fetch("/comments?postId=" + postId)                                              
    .then(response => response.json())                           
    .then(
        (result) => {                                            
            setIsLoaded(true);                                   
            setCommentList(result);

        },
        (error) => {        
            console.log(error);                                    
            setIsLoaded(true);                                   
            setError(error);                                    

        }
    )
}

useEffect(() => {

  if(isInitialMount.current) {
    isInitialMount.current = false;
  } else {
    refreshComments();
  }
  
}, [commentList])
    
    return(
      <Card className={classes.root}>
      <CardHeader
          avatar={
          <Link  className={classes.link} to={{pathname : '/users/' + userId}}>
          <Avatar aria-label="recipe" className={classes.avatar}>
            {userName.charAt(0).toUpperCase()}
          </Avatar>
          </Link>
          }
          title={title}
      />
      <CardContent>
          <Typography variant="body2" color="textSecondary" component="p"> 
          {text}
          </Typography>
      </CardContent>
      <CardActions disableSpacing>
          <IconButton 
          onClick={handleLike}
          aria-label="add to favorites"
          >
          <FavoriteIcon style={liked? { color: "red" } : null} />
          </IconButton>
          <IconButton
          className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          >
          <CommentIcon />
          </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Container fixed className={classes.container}>
          {error? "error":
          isLoaded? commentList.map(comment => (
            <Comment userId = {1} userName = {"userName"} text = {comment.text}></Comment>
          )) : "Loading"}
          <CommentForm  userId = {1} userName = {"userName"} postId = {postId}></CommentForm>
          </Container>
      </Collapse>
      </Card>
    );
}

export default Post;
