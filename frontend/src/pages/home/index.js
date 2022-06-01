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
  const [booksPerPage, setBooksPerPage] = useState(5);

  const [title, setTitle] = useState("Meus Livros:");
  const [books, setBooks] = useState([]);

  const [filteredBooks, setFilteredBooks] = useState(undefined);
  const [filtering, setFiltering] = useState(false)
  const [filter, setFilter] = useState("0");

  useEffect(() => {
    const fetchBooks = async (currentPage) => {
      setLoading(true);
      const { ['mybookshelf-token']: token } = parseCookies();

      const res = await Axios.get(`http://localhost:3030/b?page=1`, {
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

  //Controle da páginação
  const indexLastBook = currentLocalPage * booksPerPage;
  const indexFirstBook = indexLastBook - booksPerPage;

  //Livros não filtrados
  const currentBooks = books.slice(indexFirstBook, indexLastBook);

  var lastBooksAdded
  if (books.length > 5) {
    lastBooksAdded = books.slice(books.length - 5)
  }
  else {
    lastBooksAdded = books
  }

  //Livros filtrados
  const currentFilteredBooks = filteredBooks ? filteredBooks.slice(indexFirstBook, indexLastBook) : undefined

  const paginate = pageNumber => setCurrentLocalPage(pageNumber)

  const handleLogout = () => {
    destroyCookie(undefined, 'mybookshelf-token');
    Router.replace('/')
  }

  function chargeLastBooks(lastBooks) {
    return (
      lastBooks.map(book => (
        <li key={book._id}>
          <Link href={`/book/${book._id}/view`} >
            <a className='list-group-item'>
              {book.titulo}
            </a>
          </Link>
        </li>
      ))
    )
  }


  const myBooks = () => {
    setTitle("Meus Livros:")

    if (filtering) {
      searchWithFilter(document.getElementById("textFilter").value)
    }
    else {
      setFilteredBooks(undefined)
    }
  }

  const filterReading = () => {
    setTitle("Em Leitura:")
    if (filtering) {
      searchWithFilter(document.getElementById("textFilter").value)
      setFilteredBooks(filteredBooks => filteredBooks.filter(book => book.estado === 1))
    }
    else {
      setFilteredBooks(books.filter(book => book.estado === 1))
    }
  }

  const filterFinished = () => {
    setTitle("Finalizados:")
    if (filtering) {
      searchWithFilter(document.getElementById("textFilter").value)
      setFilteredBooks(filteredBooks => filteredBooks.filter(book => book.estado === 2))
    }
    else {
      setFilteredBooks(books.filter(book => book.estado === 2))

    }
  }

  function searchWithFilter(text) {
    setCurrentLocalPage(1);
    const regex = new RegExp(text.toLowerCase())

    if(filter === "Título"){
      setFilteredBooks(books.filter(book => regex.test(book.titulo.toLowerCase())))
    }
    else if (filter === "Gênero") {
      setFilteredBooks(books.filter(book => book.lista_generos.filter(genero => regex.test(genero.toLowerCase())).length > 0))
    }
    else if (filter === "Autor") {
      setFilteredBooks(books.filter(book => regex.test(book.autor.toLowerCase())))
    }
    else if (filter === "Ano") {
      if (text == '') {
        setFilteredBooks(books)
        return
      }
      setFilteredBooks(books.filter(book => book.ano_publicacao == text))
    }
  }

  function callFilter() {
    const regex = new RegExp(title.toLowerCase())
    if (regex.test("meus livros:")) {
      myBooks()
    }
    else if (regex.test("em leitura:")) {
      filterReading()
    }
    else if (regex.test("finalizados:")) {
      filterFinished()
    }
  }

  function showFilterBar() {
    document.getElementById("textFilter").classList.remove('hidden');
    document.getElementById("clearFilter").classList.remove('hidden');
    callFilter()
    setFiltering(true)
  }

  function clearSearch() {
    const textField = document.getElementById("textFilter")
    textField.value = '';

    textField.classList.add('hidden')
    document.getElementById("clearFilter").classList.add('hidden')

    setFiltering(false)
  }

  return (
    <>
      
      <Head>
        <title>MyBookshelf | Home</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <NavbarDash bgColor={`brow_pod-1`} tittleColor={`white`} image={"logonova2.png"} user={user} />

      <div className=" sm_c:pt-0 flex sm_c:flex-col sm_c:min-h-screen sm_c:items-center sm_c:justify-around sm_c:bg-romantic-1 overflow-hidden sm_c:mt-20 md_c:items-start md_c:flex-row md_c:justify-start md_c:bg-white" >
        <div className=" bg-romantic-1 md_c:flex md_c:flex-col md_c:align-top md_c:bg-white md_c:pt-20 md_c:w-[20%] md_c:min-h-screen ">
          <div className="flex flex-row justify-start text-brow_pod-1 border border-orange-800 mx-9 rounded-lg py-3 ml-7 px-5 bg-romantic-1 text-[0.8em] hover:bg-green-700 hover:text-white cursor-pointer" onClick={() => Router.push('book/create')}>
            <img src="/images/plus.png" className='sm_c:hidden md_c:block  w-7 h-7' />
            <Link href="book/create"><button className="sm_c:hidden md_c:block md_c:mx-1 md_c:font-luck ">Novo Livro</button></Link>
          </div>
          <FilterStates status={"sm_c:hidden md_c:block md_c:font-luck"} myBooks={myBooks} filterReading={filterReading} filterFinished={filterFinished} />
          <Books title={"Últimos Livros Cadastrados"} books={lastBooksAdded} css_componente={"sm_c:mt-14 sm_c:w-[350px] sm_c:shadow-sm sm_c:shadow-brow_pod-1 sm_c:rounded-xl sm_c:px-5 sm_c:py-6 sm_c:bg-brow_pod-1 md_c:shadow-lg md_c:shadow-brow_pod-1 md_c:bg-white md_c:w-[90%] md_c:mx-2 "} css_title={"sm_c:mb-2 sm_c:text-2xl sm_c:font-luck sm_c:text-white md_c:text-xl md_c:text-brow_pod-1 md_c:mx-5"} css_ul={"sm_c:text-romantic-1 sm_c:font-inter md_c:text-sm md_c:font-bold md_c:text-brow_pod-1 md_c:leading-loose"} css_li={'hover:underline'}/>
        </div>
        
        <div className=" md_c:min-h-screen  md_c:w-full md_c:pt-16 flex flex-col bg-section-logo-2 bg-romantic-1">
          <p className="sm_c:hidden md_c:block flex flex-col mx-auto font-luck text-4xl text-brow_pod-1">Dashboard</p>
          <div className=" sm_c:font-luck sm_c:mx-auto sm_c:flex sm_c:flex-row sm_c:my-10  ">
            <div className="sm_c:shadow-lg sm_c:shadow-brow_pod-1 sm_c:mx-1 sm_c:px-1 sm_c:py-10 sm_c:bg-cyan-300 sm_c:hover:bg-sky-500  sm_c:flex sm_c:flex-col sm_c:text-brow_pod-1 sm_c:rounded-md md_c:px-6 md_c:mx-2 ">
              <h3 className="sm_c:text-lg md_c:text-3xl">Cadastrados</h3>
              <div className="sm_c:flex sm_c:flex-row ">
                <img src="/images/bookshelf.png" width={50} height={20} className="md_c:w-16" />
                <p className="sm_c:text-5xl sm_c:mt-1 sm_c:ml-2 md_c:text-7xl">{books.length >= 10 ? books.length : `0` + books.length}</p>
              </div>
            </div>
            <div className="sm_c:shadow-lg sm_c:shadow-brow_pod-1 sm_c:mx-1 sm_c:px-1 sm_c:py-10 sm_c:bg-white sm_c:hover:bg-green-500 sm_c:flex sm_c:flex-col sm_c:text-brow_pod-1 sm_c:rounded-md md_c:px-10 md_c:mx-2">
              <h3 className="sm_c:text-lg md_c:text-3xl">Em leitura</h3>
              <div className="sm_c:flex sm_c:flex-row ">
                <img src="/images/open_book.png" width={50} height={20} className="md_c:w-16" />
                <p className="sm_c:text-5xl sm_c:mt-1 sm_c:ml-2 md_c:text-7xl">{books.filter(book => book.estado === 1).length >= 10 ? books.filter(book => book.estado === 1).length : `0` + books.filter(book => book.estado === 1).length }</p>
              </div>
            </div>
            <div className="sm_c:shadow-lg sm_c:shadow-brow_pod-1 sm_c:mx-1 sm_c:px-1 sm_c:py-10 sm_c:bg-yellow-200 sm_c:hover:bg-yellow-400 sm_c:flex sm_c:flex-col sm_c:text-brow_pod-1 sm_c:rounded-md md_c:px-6 md_c:mx-1">
              <h3 className="sm_c:text-lg md_c:text-3xl">Finalizados</h3>
              <div className="sm_c:flex sm_c:flex-row ">
                <img src="/images/livros.png" width={50} height={20} className="md_c:w-16" />
                <p className="sm_c:text-5xl sm_c:mt-1 sm_c:ml-2 md_c:text-7xl">{books.filter(book => book.estado === 2).length >= 10 ? books.filter(book => book.estado === 2).length : `0` + books.filter(book => book.estado === 2).length }</p>
              </div>
            </div>

          </div>

          <div className="sm_c:mx-auto sm_c:w-[370px] sm_c:mb-10 sm_c:py-4 sm_c:bg-brow_pod-1 sm_c:rounded-md sm_c:px-1 md_c:py-14 md_c:flex md_c:flex-col md_c:w-[750px] md_c:ml-auto md_c:rounded-2xl">
            <h3 className="font-luck text-white sm_c:flex sm_c:justify-center md_c:justify-start md_c:hidden">Filtros</h3>
            <div className="sm_c:px-2 sm_c:py-5 sm_c:bg-romantic-1 sm_c:rounded-md md_c:rounded-3xl md_c:align-top md_c:flex md_c:justify-center md_c:text-2xl md_c:mx-6 md_c:my-6 ">
              <Formik initialValues={{ picked: "0" }} >
                {({ values }) => (
                  <Form >

                    <div className="sm_c:flex sm_c:flex-wrap sm_c:justify-center" role="group" aria-labelledby="my-radio-group">

                      <div className=" sm_c:mr-3 ">
                        <img src="/images/lupa.png" width={30} height={20} className="md_c:w-10" />
                      </div>

                      <div onClick={() => showFilterBar()}>
                        <label className="sm_c:mr-2 font-luck" onClick={setFilter(values.picked)}>
                          <Field className="sm_c:mr-0 md_c:mr-2" type="radio" name="picked" value="Título" />
                          Título
                        </label>
                        <label className="sm_c:mr-2 font-luck" onClick={setFilter(values.picked)}>
                          <Field className="sm_c:mr-0 md_c:mr-2" type="radio" name="picked" value="Gênero" />
                          Gênero
                        </label>
                        <label className="sm_c:mr-2 font-luck" onClick={setFilter(values.picked)}>
                          <Field className="sm_c:mr-0 md_c:mr-2" type="radio" name="picked" value="Autor" />
                          Autor
                        </label>
                        <label className="sm_c:mr-2 font-luck" onClick={setFilter(values.picked)}>
                          <Field className="sm_c:mr-0 md_c:mr-2" type="radio" name="picked" value="Ano" />
                          Ano
                        </label>
                      </div>

                      <label className="sm_c:text-sm sm_c:ml-1 sm_c:align-end">
                        <button className="hidden sm_c:py-1 sm_c:px-1 sm_c:text-white sm_c:rounded-md sm_c:border-brow_pod-1 sm_c:border-2 sm_c:bg-brow_pod-1 sm_c:mt-5 md_c:justify-end md_c:ml-auto md_c:mt-0" id='clearFilter' type="button" onClick={() => { values.picked = "0"; clearSearch(); callFilter() }}>Limpar Filtros</button>
                      </label> 
                    </div>
                    
                    <input className="hidden sm_c:mt-5 sm_c:px-2 sm_c:w-full sm_c:rounded-2xl sm_c:py-2 sm_c:border-brow_pod-1 sm_c:border-2 sm_c:font-inter md_c:mx-1" id="textFilter" placeholder={`Digite o ${values.picked}`} autoComplete="off" onChange={() => callFilter()} />
                    
                  </Form>
                )}
              </Formik>
              
            </div>
            <FilterStates status={"md_c:hidden"} myBooks={myBooks} filterReading={filterReading} filterFinished={filterFinished} />
            <Books title={title} books={filteredBooks ? currentFilteredBooks : currentBooks} loading={loading} css_componente={"sm_c:mt-8 sm_c:w-[350px] sm_c:shadow-sm sm_c:shadow-brow_pod-1 sm_c:rounded-xl sm_c:px-5 sm_c:py-7 sm_c:bg-brow_pod-1 sm_c:text-romantic-1"} css_title={"sm_c:text-2xl sm_c:font-luck sm_c:text-white md_c:text-[2em]"} css_ul={'flex flex-row mt-5 mx-3 font-luck sm_c:overflow-x-auto md_c:w-[42em]'} css_li={"hover:underline hover:decoration-red-700 hover:bg-romantic-1 hover:border-red-700 hover:text-brow_pod-1 border border-[3px] border-romantic-1 p-[1rem] text-white text-center items-center place-content-center h-[11em] w-[7.9em] sm_c:text-[1rem] sm_c:mx-1 "}/>
            <Pagination currentPage={currentLocalPage} booksPerPage={booksPerPage} totalBooks={filteredBooks ? filteredBooks.length : books.length} paginate={paginate} />
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