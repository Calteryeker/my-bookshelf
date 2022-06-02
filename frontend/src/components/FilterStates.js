import Link from 'next/link';
import React from 'react';

const FilterStates = ({status, myBooks, filterReading, filterFinished}) =>{
    return (
        <div className={ status + ` sm_c:flex flex sm_c:flex-row  sm_c:justify-center md_c:flex md_c:flex-col md_c:items-start md_c:ml-10 md_c:text-[0.8em]`} >
            <div className="flex flex-row justify-center  md_c:text-brow_pod-1 md_c:mt-5 cursor-pointer md_c:hover:-translate-y-1 md_c:hover:scale-110  md_c:duration-300" onClick={myBooks}>
                <img src="/images/bookshelf.png"  className='sm_c:hidden md_c:block   w-6 h-6 mt-3'/>
                <button className=" sm_c:mt-3 sm_c:mx-2 sm_c:py-1 sm_c:px-2 sm_c:text-brow_pod-1 sm_c:rounded-md  sm_c:bg-romantic-1 md_c:bg-white " >Meus Livros</button>
            </div>

            <div className="flex flex-row justify-center md_c:text-brow_pod-1 md_c:mt-5 cursor-pointer md_c:hover:-translate-y-1 md_c:hover:scale-110  md_c:duration-300" onClick={filterReading}>
                <img src="/images/open_book.png" className='sm_c:hidden md_c:block  w-6 h-6 mt-3'/>
                <button className="sm_c:mt-3 sm_c:mx-2 sm_c:py-1 sm_c:px-2 sm_c:text-brow_pod-1 sm_c:rounded-md  sm_c:bg-romantic-1 md_c:bg-white" >Em Leitura</button>
            </div>

            <div className="flex flex-row justify-center md_c:text-brow_pod-1 md_c:mt-5 cursor-pointer md_c:hover:-translate-y-1 md_c:hover:scale-110  md_c:duration-300" onClick={filterFinished}>
                <img src="/images/livros.png" className='sm_c:hidden md_c:block  w-6 h-6 mt-3 '/>
                <button className="sm_c:mt-3 sm_c:mx-2 sm_c:py-1 sm_c:px-2 sm_c:text-brow_pod-1 sm_c:rounded-md  sm_c:bg-romantic-1 md_c:bg-white" >Finalizados</button>
            </div>
        </div>
    );
};

export default FilterStates;