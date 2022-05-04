import Head from "next/head";
import Link from "next/link";
import { parseCookies, destroyCookie } from "nookies";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Footer from "../../components/Footer";
import Books from "../../components/Books";
import Pagination from "../../components/Pagination";
import Axios from "axios";
import Router from "next/router";


export default function Index() {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentLocalPage, setCurrentLocalPage] = useState(1);
  const [booksPerPage] = useState(20);

  useEffect(() => {
    const fetchBooks = async (currentPage) => {
      setLoading(true);
      const { ['mybookshelf-token']: token} = parseCookies();

      const res = await Axios.get(`http://localhost:3030/b?page=${currentPage}`, {
        headers :{
          'Authorizathion': `Bearer ${token}`,
        }
      });

      if(res.status == 200){
        setBooks(res.data.books); 
      }

      setLoading(false);
    }

    fetchBooks(currentLocalPage)
  }, [])
  
  const indexLastBook = currentLocalPage * booksPerPage;
  const indexFirstBook = indexLastBook - booksPerPage;
  const currentBooks = books.slice(indexFirstBook, indexLastBook);

  const paginate = pageNumber => setCurrentLocalPage(pageNumber)

  const handleLogout = () => {
    destroyCookie(undefined, 'mybookshelf-token');
    Router.push('/')
  }

  return (
    <>
      <Head>
        <title>MyBookshelf | Home</title>
      </Head>
      <h1>Welcome {user ? user.nome : ''}</h1>
      <nav>
        <Link href='/profile/view'><a>Meu Perfil</a></Link>
        <Link href='/rankings'><a>Rankings</a></Link>
        <Link href='/recommend'><a>Recomende-me um Livro</a></Link>
        <Link href='/suport'><a>Suporte</a></Link>
        <button className="button" onClick={handleLogout}>Logout</button>
        
      </nav>
      <Link href="book/create"><button>Adicionar Livro</button></Link>
      <Books books={currentBooks} loading={loading}/>
      <Pagination booksPerPage={booksPerPage} totalBooks = {books.length} paginate ={paginate} />
      <Footer/>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const { ['mybookshelf-token']: token} = parseCookies(ctx);
   
  if(!token){
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return {
    props : {}
  }
}