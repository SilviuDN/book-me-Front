import shadow from './bolafinal.png'
import './RotateBook.css'
import book from './codeBook.jpg'



const SpinningBook = (props) => {
    console.log("from Spinner:", props.book)
    // console.log(props.book.items ? props.book.items[0].volumeInfo.imageLinks.smallThumbnail : null)

    const imageUrl = props.book ? props.book.volumeInfo?.imageLinks?.smallThumbnail : ""

    // const imageUrl = props.book.items ? props.book.items[0].volumeInfo.imageLinks?.smallThumbnail : ""
    console.log(props.spinningDirection)

    return (

        <div class={props.spinningDirection ? "content-rotate-right" : "content-rotate-left"}
            // style={{ backgroundImage: `url(${book})` }}
            style={{ backgroundImage: `url(${imageUrl})` }}
            // style={{ backgroundImage: `url(${imageUrl})` }}
        >
            <div class="sombra3d" style={{ backgroundImage: `url(${shadow})` }}></div>


        </div>

    )
}

export default SpinningBook

// thumbnail , small, medium, extraLarge