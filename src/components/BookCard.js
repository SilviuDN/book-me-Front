import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { DialogTitle } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });


// export default function BookCard({title, imageLinks, description, addImageUrl}) {
    export default function BookCard(props) {

    const {title, imageLinks, description} = props.bookInfo
    const addImgUrl = props.addImgUrl

    const classes = useStyles();
    // console.log("test props", props, " and the function is ", addImgUrl)
    // console.log("test props", Object.keys(props))
    console.log(typeof addImageUrl)
    // addImageUrl(imageLinks?.thumbnail)
    

    return (
        
            !(imageLinks) 
            ?
            null
            :

            <Card id="CardHome" className={classes.root}>
                <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={imageLinks.smallThumbnail ? imageLinks.smallThumbnail : imageLinks.thumbnail}
                    title="Contemplative Reptile"
                    style={{
                    height: "30vh",
                    backgroundSize: "400px 300px",
                    objectFit: "cover",
                    }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    { title.length > 25 ? title.slice(0,27) + "..." : title}
                    </Typography>
                    <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{
                        maxLength: "100",
                    }}
                    >
                    {description ? description.slice(0, 150) + "..." : title }
                    </Typography>
                </CardContent>
                </CardActionArea>
                {/* <h5>{book.volumeInfo.title}</h5> */}
            </Card>

    )
}

