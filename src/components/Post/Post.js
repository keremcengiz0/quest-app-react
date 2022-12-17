import React, {useState} from "react";
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
import { FileDownload, Margin } from "@mui/icons-material";
import { color, style } from "@mui/system";



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
    const {title, text, userId, userName} = props;
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [liked, setLiked] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded)
    };

    
   const handleLike = () => {
    setLiked(!liked);
   }
    
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
          <CardContent>

          </CardContent>
      </Collapse>
      </Card>
    );
}

export default Post;
