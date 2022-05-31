import Link from 'next/link';
import React from 'react';

const Books = ({title, books, loading,css_componente,css_title, css_ul}) => {
  if (loading || !books) {
    return <h2>Carregando...</h2>;
  }

  return (
    <>
        <div className={css_componente}>
          <h2 className={css_title}>{title}</h2>
          <ul className={css_ul}>
          {books.map(book => (
              <li key={book._id}>
                  <Link href={`/book/${book._id}/view`} >
                      <a className='list-group-item '>
                          {book.titulo.toUpperCase()}
                      </a>
                  </Link>
              </li>
              
          ))}
          </ul>
        </div>
    </>
    
  );
};

export default Books;