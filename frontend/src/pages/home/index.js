import Head from "next/head";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Footer from "../../components/Footer";
import Books from "../../components/Books";
import Pagination from "../../components/Pagination";
import Axios from "axios";


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

      setBooks(res.data.books);
      setLoading(false);

    }

    fetchBooks(currentLocalPage)
  }, [])

  const indexLastBook = currentLocalPage * booksPerPage;
  const indexFirstBook = indexLastBook - booksPerPage;
  const currentBooks = books.slice(indexFirstBook, indexLastBook);

  const paginate = pageNumber => setCurrentLocalPage(pageNumber)

  return (
    <>
      <Head>
        <title>MyBookshelf | Home</title>
      </Head>
      <h1>Welcome {user ? user.nome : ''}</h1>
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