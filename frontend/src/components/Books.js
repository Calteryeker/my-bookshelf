import Link from 'next/link';
import React from 'react';

const Books = ({title, books, loading,css}) => {
  if (loading || !books) {
    return <h2>Carregando...</h2>;
  }

  return (
    <>
        <div className={`sm_c:mt-14 sm_c:w-[370px] sm_c:shadow-sm sm_c:shadow-brow_pod-1 sm_c:rounded-xl sm_c:px-5 sm_c:py-7 sm_c:bg-brow_pod-1 sm_c:text-romantic-1` + css}>
          <h2 className=" sm_c:text-2xl sm_c:font-luck sm_c:text-white md_c:text-lg ">{title}</h2>
          <ul className="list-group t font-lekton">
          {books.map(book => (
              <li key={book._id}>
                  <Link href={`/book/${book._id}/view`} >
                      <a className='list-group-item '>
                          {book.titulo}
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