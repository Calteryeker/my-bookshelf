import Link from 'next/link';
import Router from 'next/router';
import React from 'react';

const Books = ({title, books, loading,css_componente,css_title, css_ul, css_li}) => {
  if (loading || !books) {
    return <h2>Carregando...</h2>;
  }

  return (
    <>
        <div className={css_componente}>
          <h3 className={css_title}>{title}</h3>
          <ul className={css_ul}>
          {books.map(book => (
              <Link key={book._id} href={`/book/${book._id}/view`}>
                <a key={book._id}>
                  <li key={book._id} className={css_li}> 
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