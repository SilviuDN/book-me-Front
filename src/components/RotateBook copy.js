import shadow from './bolafinal.png'
import './RotateBook.css'
import book from './codeBook.jpg'



const SpinningBook = (props) => {
    // console.log(props.book)
    // console.log(props.book.items ? props.book.items[0].volumeInfo.imageLinks.smallThumbnail : null)
    const imageUrl = props.book.items ? props.book.items[0].volumeInfo.imageLinks?.smallThumbnail : ""
    // console.log(imageUrl)

    return (

        <div class="content-rotate-right"
            // style={{ backgroundImage: `url(${book})` }}
            style={{ backgroundImage: `url(${imageUrl})` }}
            // style={{ backgroundImage: `url(${imageUrl})` }}
        >
            <div class="sombra3d" style={{ backgroundImage: `url(${shadow})` }}></div>


        </div>

    )
}

export default SpinningBook