import React from 'react';

const Pagination = ({ currentPage, booksPerPage, totalBooks, paginate }) => {
  const interval = 4
  const pageNumbersBefore = [];
  const pageNumbersAfter = [];

  for (let i = interval; i > 0; i--) {
    currentPage-i > 0 ? pageNumbersBefore.push(currentPage-i) : undefined
  }

  for (let i = 1; i <= interval; i++) {
    currentPage+i <= Math.ceil(totalBooks/booksPerPage) ? pageNumbersAfter.push(currentPage+i) : undefined
  }

  return (
    <nav className='flex justify-center text-white font-lekton text-[1.1em] md_c:text-[1.2em]'>
      <ul className='flex flex-row '>
        {
          pageNumbersBefore.length > 1 ? 
          <li className='mx-1 hover:underline'>
            <button onClick={() => paginate(1)}>Primeira</button>
          </li>
          : null
        }
        {currentPage-interval > 1 ? <p>...</p> : null}
        {pageNumbersBefore.map(number => ( 
          <li key={number} className={`mx-1 hover:underline`}>
            <button onClick={() => paginate(number)} >
              {number}
            </button>
          </li>
        ))}
        <li key={currentPage} className={'mx-1 border border-brow_pod-1 bg-romantic-1 px-2 text-brow_pod-1'}>
          {currentPage}
        </li>
        {pageNumbersAfter.map(number => ( 
          <li key={number} className={`mx-1 hover:underline`}>
            <button onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
        ))}
        {currentPage+interval < Math.ceil(totalBooks/booksPerPage) ? <p>...</p> : null}
        {
          pageNumbersAfter.length > 1 ? 
          <li className='mx-1 hover:underline'>
            <button onClick={() => paginate(Math.ceil(totalBooks/booksPerPage))}>Última</button>
          </li> 
          : null
        }
      </ul>
    </nav>
  );
};

export default Pagination;