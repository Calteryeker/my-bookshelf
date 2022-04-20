import Link from 'next/link';
import React from 'react';

const Books = ({ books, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
        <h2>Seus Livros:</h2>
        <ul className='list-group'>
        {books.map(book => (
            <Link href={`/book/${book._id}/view`} >
                <li key={book._id} className='list-group-item'>
                    {book.titulo}
                </li>
            </Link>
        ))}
        </ul>
    </>
    
  );
};

export default Books;