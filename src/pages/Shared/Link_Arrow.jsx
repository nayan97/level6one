import React from 'react';
import { Link } from 'react-router';

const Link_Arrow = () => {
    return (
        <>
            <div className='lg:hidden block ml-3'>
            <Link to={"/"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          
          </Link>

          </div>
        </>
    );
};

export default Link_Arrow;