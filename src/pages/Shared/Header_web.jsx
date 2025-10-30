import React from 'react';
import Header from './Header';
import { Link } from 'react-router';

const Header_web = () => {
    return (
        <>
        <div className='w-full top-0 sticky z-10 bg-[#ff9100] hidden lg:block text-black'>
            <div className='flex '>
                <Link to="/">
          <img  className="hidden lg:block w-16" src="/logo.png" alt="" />
          </Link>
          <Header></Header>

            </div>
          
        </div>
        </>
    );
};

export default Header_web;