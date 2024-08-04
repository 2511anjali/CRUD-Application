import React from 'react'
import { useEffect,useState} from 'react';
import api from "../api";
import Book from '../components/Book';


function Home() {
     const [books,setBooks]=useState([]);
     const [title,setTitle]=useState("");
     const [about,setAbout]=useState("");
     const [price,setPrice]=useState();
     

     useEffect(() =>{
         getBooks();
     }, [])



     const getBooks = () =>{
          api
             .get("/api/books/")
             .then((res) => res.data)
             .then((data) => setBooks(data) )
             .catch((err) => alert(err));
     };
     
     const createBook = (e) =>{
      e.preventDefault()
      api
        .post("/api/books/", {about,title,price})
        .then((res)=> {
           if(res.status === 201) alert("Book Inserted!");
           else alert("Failed to add Book.");
           getBooks();
        })
        .catch((err)=>alert(err));
      
   }; 
     
    

     const deleteBook =(id) =>{
          api
            .delete(`/api/books/delete/${id}/`)
            .then((res)=>{
                if (res.status === 204) {
                  alert("Book deleted!");
                  console.log(res);
                }
                else alert("Failed to delete book.");
                getBooks();
              })
             .catch((error) => alert(error));
          
     };

     

    return ( 
        <div className='container'>
             <div className=' container position-fixed border-bottom border-secondary top-0 bg-white mb-5 d-flex justify-content-between ' >
               <p className='text-info fs-4 '><img src='images/book-logo.jpg' style={{height:60,}}/>BookYourBook </p>
               <a href='#' className='pt-3'><img src='images/three-dots-vertical.svg'/></a>
             </div>
             <div className='container mt-5'>
               <br/>
             <h1 className='fst-italic mt-5 text-center text-secondary'>Books</h1>
             <div className='conatiner d-flex flex-wrap '>
               {books.map((book) => (<Book book ={book} onDelete={deleteBook}  key={book.id}/>))}
             </div>
             <div className='row bg-secondary-subtle border border-secondary mb-5'>
               <h2 className='text-secondary my-3 text-center fst-italic'>Add a new book</h2>
               <form onSubmit={createBook}>
                    <label htmlFor='title' className='fw-semibold'>Title</label>
                    <input className='form-control' name ='title' type='text' id='title'value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <br/>
                    <label htmlFor='about' className='fw-semibold'>About</label>
                    <input className='form-control' name ='about' type='text' id='about' value={about} onChange={(e) => setAbout(e.target.value)}/>
                    <br/>
                    <label htmlFor='price' className='fw-semibold'>Price</label>
                    <input className='form-control' name ='price' type='text' id='price'value={price} onChange={(e) => setPrice(e.target.value)}/>
                    <br/>
                    <input type='submit'className='btn btn-success mb-2' id='button'value="submit"/>
               </form>
             </div>
             </div>
             <div className='bg-info-subtle my-5'>
            <hr/>
            <div className='container'>
            <div className='row '>
                <div className='col-4'>
                    <h5>Contact us</h5>
                    <p>Toll free - 1800 234 5678</p>
                    <h6>Email-feedback@trading.site</h6>
                    <h5>Connect with us</h5>
                    <a className='mx-2' href='www.facebook.com'><img src='images/facebook.svg' alt='facebook'/></a>
                    <a className='mx-2' href='#'><img src='images/instagram.svg' alt='instagram'/></a>
                    <a className='mx-2' href='#'><img src='images/twitter.svg' alt='twitter'/></a>
                    <a className='mx-2' href='#'><img src='images/youtube.svg' alt='youtube'/></a> 
                    
                </div>
                <div className='col-4'>
                    <h5>Company</h5>
                    <a className='text-dark text-decoration-none fw-medium' href='#'>About us</a><br/>
                    <a className='text-dark text-decoration-none fw-medium' href='#'>Careers</a><br/>
                    <a className='text-dark text-decoration-none fw-medium' href='#'>Policy</a><br/>
                    <a className='text-dark text-decoration-none fw-medium' href='#'>Terms & Conditions</a><br/>
                    
                </div>
                <div className='col-4'>
                    <h5>Links</h5>
                    <a className='text-dark text-decoration-none fw-medium' href='#'>Go to home</a><br/>
                    <a className='text-dark text-decoration-none fw-medium' href='#'>Add your Item</a><br/>
                    <a className='text-dark text-decoration-none fw-medium' href='#'>Edit your Item</a><br/>
                    <a className='text-dark text-decoration-none fw-medium' href='#'>Delete your Item</a>
                </div>
                
            </div>
        </div>
        </div>
            
        </div>
     );
}

export default Home;