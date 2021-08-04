import React from "react"

class BookSearch extends React.Component {
   constructor(props) {
        super(props)
        this.state = {
            data: this.props.books,
            list: [],
            book:{
              author:"",
              title:"",
              country:"",
              language:"",
              year:""
            }
        }
   }
  
    handleInputChange = e => {
      
        const { name, value } = e.target
        
        this.setState({ book: { ...this.state.book, [name]: value } })
      
   
    }
  
   searchData(searchTerm) {

       const filteredBooks = searchTerm 
        ? 
              this.state.data.filter(book => {
            return  book.title.toLowerCase().match(searchTerm.title.toLowerCase().trim())
                &&
 book.author.toLowerCase().match(searchTerm.author.toLowerCase().trim())
                &&              book.country.toLowerCase().match(searchTerm.country.toLowerCase().trim())
                &&
 book.language.toLowerCase().match(searchTerm.language.toLowerCase().trim())
                &&
 book.year.toString().match(searchTerm.year.trim())
        }) 
        : []
        

        this.setState({ list: filteredBooks })
    }
 
  componentDidUpdate(prevProps, prevState) {
        if (this.state.book.title !== prevState.book.title) {
           return  this.searchData(this.state.book)
        }
    if (this.state.book.author !== prevState.book.author) {
           return  this.searchData(this.state.book)
        }
    if (this.state.book.language !== prevState.book.language) {
           return  this.searchData(this.state.book)
        }
    if (this.state.book.country !== prevState.book.country) {
           return  this.searchData(this.state.book)
        }
    if (this.state.book.year !== prevState.book.year) {
           return  this.searchData(this.state.book)
        }

    }
  
  componentDidMount(){
     this.state.list.length < 1 ? this.setState({list: this.state.data}) : undefined
  }
  render() {
   
    
    return (
      <>
        <div className="form-div">
        <form className="form">
          <label>Author: </label>
            <input type="text" className="author" name="author" onChange={this.handleInputChange} /><br/>
              <label>Title: </label>
            <input type="text" className="title" name="title" onChange={this.handleInputChange} /><br/>  
          <label>Country: </label>
            <input type="text" className="country" name="country" onChange={this.handleInputChange} />  <br/>
          <label>Language: </label>
            <input type="text" className="language" name="language" onChange={this.handleInputChange} /> <br/> 
            <label>Year: </label>
            <input type="text" className="year" name="year" onChange={this.handleInputChange} /><br/>
        </form>
        </div>
        <hr/>
       {
          
        this.state.list.map(elm => 
                            <div className="book">
                  <h5>{elm.title}</h5>
                  <p><strong>Country:</strong> {elm.country}</p>
                  <p><strong>Language:</strong> {elm.language}</p>
                  <p><strong>Pages:</strong> {elm.pages}</p>
                  <p><strong>Author:</strong> {elm.author}</p>
                  <p><strong>Year:</strong> {elm.year}</p>
                              <hr/>
                              </div>)}
       
      </>

    )
  }
}

export default BookSearch