import Head from "next/head";
import Link from "next/link";
import { parseCookies, destroyCookie } from "nookies";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Formik, Form, Field } from "formik";
import Footer from "../../components/Footer";
import Books from "../../components/Books";
import Pagination from "../../components/Pagination";
import Axios from "axios";
import Router from "next/router";


export default function Index() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [currentLocalPage, setCurrentLocalPage] = useState(1);
  const [booksPerPage] = useState(20);

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filtering, setFiltering] = useState(false)

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
  
  //Livros não filtrados
  const indexLastBook = currentLocalPage * booksPerPage;
  const indexFirstBook = indexLastBook - booksPerPage;
  const currentBooks = books.slice(indexFirstBook, indexLastBook);

  //Livros filtrados
  const currentFilteredBooks = filteredBooks.slice(indexFirstBook, indexLastBook)

  const paginate = pageNumber => setCurrentLocalPage(pageNumber)

  const handleLogout = () => {
    destroyCookie(undefined, 'mybookshelf-token');
    Router.replace('/')
  }

  const filterReading = () => {

  }

  const filterFinished = () => {

  }

  function searchWithFilter(filterType, text){

  }

  return (
    <>
      <Head>
        <title>MyBookshelf | Home</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <h1>Welcome {user ? user.nome : ''}</h1>
      <nav>
        <Link href='/profile/view'><a>Meu Perfil</a></Link>
        <Link href='/suport'><a>Suporte</a></Link>
        <button className="button" onClick={handleLogout}>Logout</button>
      </nav>
      <div>
        <Link href="book/create"><button>Adicionar Livro</button></Link>
        <a onClick={filterReading}>Em Leitura</a>
        <a onClick={filterFinished}>Finalizados</a>
      </div>
      <div>
        <Formik initialValues={{picked: -1}}>
            {({values}) => (
            <Form>
                <div>Filtros</div>
                <div role="group" aria-labelledby="my-radio-group" onChange={() => setFiltering(true)}>
                    <label>
                        <Field type="radio" name="picked" value="Gênero"/>
                        Gênero
                    </label>
                    <label>
                        <Field type="radio" name="picked" value="Autor"/>
                        Autor
                    </label>
                    <label>
                        <Field type="radio" name="picked" value="Ano"/>
                        Ano
                    </label>
                </div>

                {
                  filtering ? 
                    <label>
                      <input id="textFilter" placeholder={`Digite o ${values.picked}`}  onChange={() => searchWithFilter(values.picked, document.getElementById('textFilter').value)}/>
                      <button type="button" onClick={() => {values.picked = -1; setFiltering(false)}}>Limpar Filtros</button>
                    </label> : null
                }
            </Form>
            )}      
        </Formik>
      </div>
      <Books books={filteredBooks.length > 0 ? currentfilteredBooks : currentBooks} loading={loading}/>
      <Pagination booksPerPage={booksPerPage} totalBooks = {filteredBooks.length > 0? filteredBooks.length : books.length} paginate ={paginate} />
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