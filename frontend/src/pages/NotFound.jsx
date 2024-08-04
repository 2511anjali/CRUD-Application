import React, { memo } from 'react'

function NotFound() {
    return ( 
        <div className='container text-center my-5'>
            <h3 className='text-warning fst-italic my-2 '>Page Not Found</h3>
            <img src='./images/404.png' alt='pagenotfound' style={{height:200}}/>
            <p className='text-danger fst-italic my-2'>The page you're looking for doesn,t exist!</p>

        </div>
     );
}

export default NotFound;