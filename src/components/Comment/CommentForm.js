import { CardContent, Input, InputAdornment, OutlinedInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, {useRef, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { Button,Snackbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    comment: {
        display : "flex",
        flexWrap : "wrap",
        justifyContent : "flex-start",
        alignItems : "center",  
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(5),
    },
    link: {
        textDecoration : "none",
        boxShadow : "none",
        color : "white",
    }
}));


function CommentForm(props) {
    const {userId, userName, postId} = props;
    const classes = useStyles();
    const [text, setText] = useState("");

    const saveComment = () => {
        fetch("/comments",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                postId : postId,
                userId:userId,
                text:text,
            }),
        })
        .then((response) => response.json())
        .catch((err) => console.log("error"))
    }
   
    const handleSubmit = () => {
        saveComment();
        setText("");
    }

    const handleChange = (value) => {
        setText(value);
    }

    return (
        <CardContent className={classes.comment} >
            <OutlinedInput 
            id = "outlined-adorment-amount"
            multiline
            inputProps={{maxLength:250}}
            fullWidth
            onChange = {(i) => handleChange(i.target.value)}
            startAdornment = {
                <InputAdornment position="start">
                    <Link  className={classes.link} to={{pathname : '/users/' + userId}}>
                        <Avatar aria-label="recipe" className={classes.small}>
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </Link>
                </InputAdornment>
            }
            endAdornment = {
                <InputAdornment position="end">
                    <Button
                     variant = "contained"
                     style={{background : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                     color:'white'}}
                     onClick = {handleSubmit}
                    >Comment</Button>

                </InputAdornment>
            }
            value = {text}
            style = {{color: "black", backgroundColor: "white"}}
            ></OutlinedInput>
        </CardContent>
       
    );
}


export default CommentForm;











