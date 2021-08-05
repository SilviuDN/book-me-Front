import React, { useState, useEffect } from "react";
// import Card from "@material-ui/core/Card";
import SimpleTabs from "./SimpleTabs";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
// import { Link } from "react-router-dom";
import "../App.css";
import BooksList from "./BooksList";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function Home() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState({ name: "" });
  const [imgUrl, setImgUrl] = useState("");
  const classes = useStyles();

  const addImgUrl = (img) => {
    setImgUrl(img);
  };

  useEffect(() => {
    (async function Request() {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=java&maxResults=40`
      );
      setBooks(res.data.items);
    })();
  }, []);

  function handleChange(event) {
    setSearch({
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  useEffect(() => {
    (async function Request() {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${search.name}`+`&maxResults=40`
      );

      if (res.data.items === undefined) {
        return null;
      }
      setBooks(res.data.items);
    })();
  }, [search.name]);


  return (
    <div className="home-books">
      <SimpleTabs
        onChange={handleChange}
        type="text"
        name="name"
      />

      {/*<form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" onChange={ handleChange } label="Search" variant="outlined" />
  </form>*/}

      <ul className="home-book-card">
        {books.length === 0 ||
        books.length === undefined ||
        books.length === null ||
        books.length === "" ? (
          <i className="loading fas fa-spinner fa-spin"></i>
        ) : (
          <BooksList books={books} addImgUrl={addImgUrl} />
        )}
      </ul>
    </div>
  );
}

export default Home;
