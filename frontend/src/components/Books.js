import Link from 'next/link';
import Router from 'next/router';
import React from 'react';

const Books = ({title, books, loading,css_componente,css_title, css_ul, css_li, sort_bg}) => {
  if (loading || !books) {
    return <h2>Carregando...</h2>;
  }

  function sortBackground(){
    var value = (Math.floor(Math.random() * (6 - 0)));
    return value;
  }

  var numberp = 0;

  return (
    <>
        <div className={css_componente}>
          <div className='bg-0 bg-1 bg-2 bg-3 bg-4 bg-5'></div>
          <h3 className={css_title}>{title}</h3>
          <ul className={css_ul}>
          {books.map(book => (
              <Link key={book._id} href={`/book/${book._id}/view`}>
                <a key={book._id}>
                  <li key={book._id} className={ sort_bg ? css_li + " bg-" + (Math.floor(Math.random() * (6 - 0))).toString()  : css_li} > 
                    {book.titulo.toUpperCase()}   
                  </li>
                </a>
                
              </Link>
          ))}
          </ul>
        </div>
    </>
    
  );
};

export default Books;