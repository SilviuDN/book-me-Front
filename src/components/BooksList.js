import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}); 

function BooksList(props) {
  // console.log("From BooksList", typeof props.addImgUrl, )

  const classes = useStyles();

  // console.log("Din lista numar carti:",props.books.length);

  return (
    <div className="home-books">
      <h1 className="findBook">Let's Book about:</h1>

      <ul className="home-book-card">
        {props.books?.map((book, i) => {
          props.addImgUrl(book.volumeInfo.imageLinks?.smallThumbnail);
          return (
            //CONDITION FOR book.volumeInfo GOES HERE

            <li key={i}>
              <Link
                style={{
                  textDecoration: "none",
                }}
                to={`/${book.id}`}
              >
                <BookCard
                  bookInfo={book.volumeInfo}
                  addImgUrl={props.addImgUrl}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BooksList;
