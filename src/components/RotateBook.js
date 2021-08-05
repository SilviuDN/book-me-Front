import shadow from './bolafinal.png'
import './RotateBook.css'
import book from './codeBook.jpg'



const SpinningBook = (props) => {

    const imageUrl = props.book ? props.book.volumeInfo?.imageLinks?.smallThumbnail : ""

    return (

        <div class={props.spinningDirection ? "content-rotate-right" : "content-rotate-left"}
            style={{ backgroundImage: `url(${imageUrl})` }}
        >
            <div class="sombra3d" style={{ backgroundImage: `url(${shadow})` }}></div>


        </div>

    )
}

export default SpinningBook
