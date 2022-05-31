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
import NavbarDash from "../../components/NavbarDash";
import FilterStates from "../../components/FilterStates";

export default function Index() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [currentLocalPage, setCurrentLocalPage] = useState(1);
  const [booksPerPage] = useState(20);

  const [title, setTitle] = useState("Meus Livros:");

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filtering, setFiltering] = useState(false)

  useEffect(() => {
    const fetchBooks = async (currentPage) => {
      setLoading(true);
      const { ['mybookshelf-token']: token } = parseCookies();

      const res = await Axios.get(`http://localhost:3030/b?page=${currentPage}`, {
        headers: {
          'Authorizathion': `Bearer ${token}`,
        }
      });

      if (res.status == 200) {
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

  var lastBooksAdded
  if (books.length > 5) {
    lastBooksAdded = books.slice(books.length - 5)
  }
  else {
    lastBooksAdded = books
  }

  //Livros filtrados
  const currentFilteredBooks = filteredBooks.slice(indexFirstBook, indexLastBook)

  const paginate = pageNumber => setCurrentLocalPage(pageNumber)

  const myBooks = () => {
    if (filtering) {

    }
    else {

    }

    setTitle("Meus Livros:")
  }

  const filterReading = () => {
    if (filtering) {

    }
    else {

    }

    setTitle("Em Leitura:")
  }

  const filterFinished = () => {
    if (filtering) {

    }
    else {

    }

    setTitle("Finalizados:")
  }

  function searchWithFilter(filterType, text) {

  }

  return (
    <>
      <Head>
        <title>MyBookshelf | Home</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <NavbarDash bgColor={`brow_pod-1`} tittleColor={`white`} image={"logonova2.png"} user={user} />

      <div className=" sm_c:pt-0 flex sm_c:flex-col sm_c:min-h-screen sm_c:items-center sm_c:justify-around sm_c:bg-romantic-1 overflow-hidden sm_c:mt-20 md_c:items-start md_c:flex-row md_c:justify-start md_c:bg-white">
        <div className="bg-romantic-1 md_c:flex md_c:flex-col md_c:align-top md_c:bg-white md_c:pt-20 md_c:w-56">
          <div className="flex flex-row justify-center md_c:text-brow_pod-1 ">
            <img src="/images/plus.png" className='sm_c:hidden md_c:block  w-7 h-7 mt-3' />
            <Link href="book/create"><button className="sm_c:hidden md_c:block md_c:mx-2 md_c:font-luck">Novo Livro</button></Link>
          </div>
          <FilterStates status={"sm_c:hidden md_c:block md_c:font-luck"} myBooks={myBooks} filterReading={filterReading} filterFinished={filterFinished} />
          <Books title={"Últimos Livros Cadastrados"} books={lastBooksAdded}  />
        </div>

        <div className="w-full md_c:pt-16 flex flex-col bg-section-logo-2 bg-romantic-1">
          <p className="sm_c:hidden md_c:block flex flex-col mx-auto font-luck text-4xl text-brow_pod-1">Dashboard</p>
          <div className=" sm_c:font-luck sm_c:mx-auto sm_c:flex sm_c:flex-row sm_c:my-10  ">
            <div className="sm_c:shadow-lg sm_c:shadow-brow_pod-1 sm_c:mx-1 sm_c:px-1 sm_c:py-10 sm_c:bg-cyan-300 sm_c:flex sm_c:flex-col sm_c:text-brow_pod-1 sm_c:rounded-md md_c:px-12 md_c:mx-5">
              <h3 className="sm_c:text-lg">Cadastrados</h3>
              <div className="sm_c:flex sm_c:flex-row ">
                <img src="/images/bookshelf.png" width={50} height={20} className="md_c:w-16"/>
                <p className="sm_c:text-5xl sm_c:mt-1 sm_c:ml-2 ">27</p>
              </div>
            </div>
            <div className="sm_c:shadow-lg sm_c:shadow-brow_pod-1 sm_c:mx-1 sm_c:px-1 sm_c:py-10 sm_c:bg-white sm_c:flex sm_c:flex-col sm_c:text-brow_pod-1 sm_c:rounded-md md_c:px-12 md_c:mx-5">
              <h3 className="sm_c:text-lg">Em leitura</h3>
              <div className="sm_c:flex sm_c:flex-row ">
                <img src="/images/open_book.png" width={50} height={20} className="md_c:w-16"/>
                <p className="sm_c:text-5xl sm_c:mt-1 sm_c:ml-2 ">27</p>
              </div>
            </div>
            <div className="sm_c:shadow-lg sm_c:shadow-brow_pod-1 sm_c:mx-1 sm_c:px-1 sm_c:py-10 sm_c:bg-yellow-200 sm_c:flex sm_c:flex-col sm_c:text-brow_pod-1 sm_c:rounded-md md_c:px-12 md_c:mx-5">
              <h3 className="sm_c:text-lg">Finalizados</h3>
              <div className="sm_c:flex sm_c:flex-row ">
                <img src="/images/livros.png" width={50} height={20} className="md_c:w-16"/>
                <p className="sm_c:text-5xl sm_c:mt-1 sm_c:ml-2 ">27</p>
              </div>
            </div>
            
          </div>

          <div className="sm_c:mx-auto sm_c:w-[370px] sm_c:mb-10 sm_c:py-4 sm_c:bg-brow_pod-1 sm_c:rounded-md sm_c:px-1 md_c:py-14 md_c:flex md_c:flex-col md_c:w-[750px] md_c:ml-auto md_c:rounded-2xl">
            <h1 className="font-luck text-white sm_c:flex sm_c:justify-center md_c:justify-start md_c:hidden">Filtros</h1>
            <div className="sm_c:px-2 sm_c:py-5 sm_c:bg-romantic-1 sm_c:rounded-md md_c:rounded-3xl md_c:align-top md_c:flex md_c:justify-center md_c:text-2xl md_c:mx-6 md_c:my-6 ">
              <Formik initialValues={{ picked: -1 }} >
                {({ values }) => (
                  <Form >

                    <div className="sm_c:flex sm_c:flex-row sm_c:justify-start" role="group" aria-labelledby="my-radio-group" onChange={() => setFiltering(true)}>

                      <div className=" sm_c:mr-3 ">
                        <img src="/images/lupa.png" width={30} height={20} className="md_c:w-10" />
                      </div>

                      <label className="sm_c:mr-2 font-luck ">
                        <Field className="sm_c:mr-0 md_c:mr-2" type="radio" name="picked" value="Gênero" />
                        Gênero
                      </label>
                      <label className="sm_c:mr-2 font-luck">
                        <Field className="sm_c:mr-0 md_c:mr-2" type="radio" name="picked" value="Autor" />
                        Autor
                      </label>
                      <label className="sm_c:mr-2 font-luck">
                        <Field className="sm_c:mr-0 md_c:mr-2" type="radio" name="picked" value="Ano" />
                        Ano
                      </label>
                      {
                        filtering ?
                          <label className="sm_c:text-sm sm_c:ml-1 ">
                            <button className="sm_c:py-1 sm_c:px-1 sm_c:text-white sm_c:rounded-md sm_c:border-brow_pod-1 sm_c:border-2 sm_c:bg-brow_pod-1 md_c:justify-end md_c:ml-auto" type="button" onClick={() => { values.picked = -1; setFiltering(false) }}>Limpar Filtros</button>
                          </label> : null
                      }
                    </div>
                    {
                      filtering ? <input className=" sm_c:mt-5 sm_c:px-2 sm_c:w-full sm_c:rounded-2xl sm_c:py-2 sm_c:border-brow_pod-1 sm_c:border-2 sm_c:font-inter md_c:mx-1 " id="textFilter" placeholder={`Digite o ${values.picked}`} onChange={() => searchWithFilter(values.picked, document.getElementById('textFilter').value)} /> : null
                    }
                  </Form>
                )}
              </Formik>
            </div>
            <FilterStates status={"md_c:hidden"} myBooks={myBooks} filterReading={filterReading} filterFinished={filterFinished} />
            <Books title={title} books={filteredBooks.length > 0 ? currentfilteredBooks : currentBooks} loading={loading} />
            <Pagination booksPerPage={booksPerPage} totalBooks={filteredBooks.length > 0 ? filteredBooks.length : books.length} paginate={paginate} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const { ['mybookshelf-token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}