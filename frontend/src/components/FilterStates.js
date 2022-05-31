import Link from 'next/link';
import React from 'react';

const FilterStates = ({status, myBooks, filterReading, filterFinished}) =>{
    return (
        <div className={ status + ` sm_c:flex flex sm_c:flex-row  md_c:flex md_c:flex-col sm_c:justify-center`}>
            <div className="flex flex-row justify-center md_c:text-brow_pod-1 md_c:mt-5">
                <img src="/images/bookshelf.png"  className='sm_c:hidden md_c:block   w-6 h-6 mt-3'/>
                <button className="sm_c:mt-3 sm_c:mx-2 sm_c:py-1 sm_c:px-2 sm_c:text-brow_pod-1 sm_c:rounded-md  sm_c:bg-romantic-1 md_c:bg-white" onClick={myBooks}>Meus Livros</button>
            </div>

            <div className="flex flex-row justify-center md_c:text-brow_pod-1 md_c:mt-5">
                <img src="/images/open_book.png" className='sm_c:hidden md_c:block  w-6 h-6 mt-3'/>
                <button className="sm_c:mt-3 sm_c:mx-2 sm_c:py-1 sm_c:px-2 sm_c:text-brow_pod-1 sm_c:rounded-md  sm_c:bg-romantic-1 md_c:bg-white" onClick={filterReading}>Em Leitura</button>
            </div>

            <div className="flex flex-row justify-center md_c:text-brow_pod-1 md_c:mt-5">
                <img src="/images/livros.png" className='sm_c:hidden md_c:block  w-6 h-6 mt-3 '/>
                <button className="sm_c:mt-3 sm_c:mx-2 sm_c:py-1 sm_c:px-2 sm_c:text-brow_pod-1 sm_c:rounded-md  sm_c:bg-romantic-1 md_c:bg-white" onClick={filterFinished}>Finalizados</button>
            </div>
        </div>
    );
};

export default FilterStates;