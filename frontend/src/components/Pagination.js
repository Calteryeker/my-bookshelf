import React from 'react';

const Pagination = ({ booksPerPage, totalBooks, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='flex justify-center text-white'>
      <ul className='flex flex-row '>
        {
        pageNumbers.length > 1 ? 
        <li className='mx-1'>
          <button onClick={() => paginate(1)}>Primeira</button>
        </li> 
        : null
        }
        {pageNumbers.map(number => (
          <li key={number} className='mx-1'>
            <button onClick={() => paginate(number)} className='page-link'>
              {number}
            </button>
          </li>
          
        ))}
        {
        pageNumbers.length > 1 ? 
        <li className='mx-1'>
          <button onClick={() => paginate(pageNumbers.length)}>Última</button>
        </li> 
        : null
        }
      </ul>
    </nav>
  );
};

export default Pagination;