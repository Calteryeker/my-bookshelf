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
  const [booksPerPage] = useState(1);

  const [title, setTitle] = useState("Meus Livros:");
  const [books, setBooks] = useState([]);

  const [filteredBooks, setFilteredBooks] = useState(undefined);
  const [filtering, setFiltering] = useState(false)
  const [filter, setFilter] = useState("0");

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
  
  //Controle da páginação
  const indexLastBook = currentLocalPage * booksPerPage;
  const indexFirstBook = indexLastBook - booksPerPage;

  //Livros não filtrados
  const currentBooks = books.slice(indexFirstBook, indexLastBook);
  
  var lastBooksAdded
  if(books.length > 5){
    lastBooksAdded = books.slice(books.length-5)
  }
  else{
    lastBooksAdded = books
  }

  //Livros filtrados
  const currentFilteredBooks = filteredBooks ? filteredBooks.slice(indexFirstBook, indexLastBook) : undefined

  const paginate = pageNumber => setCurrentLocalPage(pageNumber)

  const handleLogout = () => {
    destroyCookie(undefined, 'mybookshelf-token');
    Router.replace('/')
  }

  function chargeLastBooks(lastBooks){
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

    if (filtering){
      searchWithFilter(document.getElementById("textFilter").value)
    }
    else{
      setFilteredBooks(undefined)
      console.log("meus livros")
    }
  }

  const filterReading = () => {
    setTitle("Em Leitura:")
    if (filtering){
      searchWithFilter(document.getElementById("textFilter").value)
      setFilteredBooks(filteredBooks => filteredBooks.filter(book => book.estado === 1))
    }
    else{
      setFilteredBooks(books.filter(book => book.estado === 1))
    }
  }

  const filterFinished = () => {
    setTitle("Finalizados:")
    if (filtering){
      searchWithFilter(document.getElementById("textFilter").value)
      setFilteredBooks(filteredBooks => filteredBooks.filter(book => book.estado === 2))
    }
    else{
      setFilteredBooks(books.filter(book => book.estado === 2))
      
    } 
  }

  function searchWithFilter(text){
    setCurrentLocalPage(1);
    const regex = new RegExp(text.toLowerCase())
    
    if(filter === "Gênero"){
      setFilteredBooks(books.filter(book => book.lista_generos.filter(genero => regex.test(genero.toLowerCase())).length > 0))
    }
    else if(filter === "Autor"){
      setFilteredBooks(books.filter(book => regex.test(book.autor.toLowerCase())))
    }
    else if(filter === "Ano"){
      if(text == ''){
        setFilteredBooks(books)
        return
      }
      setFilteredBooks(books.filter(book => book.ano_publicacao == text))
    }
  }

  function callFilter(){
    const regex = new RegExp(title.toLowerCase())
    if(regex.test("meus livros:")){
      myBooks()
    }
    else if(regex.test("em leitura:")){
      filterReading()
    }
    else if(regex.test("finalizados:")){
      filterFinished()
    }
  }

  function showFilterBar(){
    setFiltering(true); 
    callFilter()
  }

  function clearSearch(){
    document.getElementById("textFilter").value = '';
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
        <button onClick={myBooks}>Meus Livros</button>
        <button onClick={filterReading}>Em Leitura</button>
        <button onClick={filterFinished}>Finalizados</button>
        {lastBooksAdded ? <><h3>Últimos Livros Adicionados:</h3><ol>{chargeLastBooks(lastBooksAdded)}</ol></> : <p>Carregando ...</p>}
      </div>
      <div>
        <Formik initialValues={{picked: "0"}}>
            {({values}) => (
            <Form>
                <div>Filtros</div>
                <div role="group" aria-labelledby="my-radio-group" onClick={showFilterBar}>
                    <label onClick={() => {setFilter(values.picked)}}>
                        <Field type="radio" name="picked" value="Gênero"/>
                        Gênero
                    </label>
                    <label onClick={setFilter(values.picked)}>
                        <Field type="radio" name="picked" value="Autor"/>
                        Autor
                    </label>
                    <label onClick={setFilter(values.picked)}>
                        <Field type="radio" name="picked" value="Ano"/>
                        Ano
                    </label>
                </div>

                {
                  filtering ? 
                    <label>
                      <input id="textFilter" placeholder={`Digite o ${values.picked}`} autoComplete="off" onChange={() => callFilter()}/>
                      <button type="button" onClick={() => {values.picked = "0"; setFiltering(false); clearSearch(); callFilter()}}>Limpar Filtros</button>
                    </label> : null
                }
            </Form>
            )}      
        </Formik>
      </div>
      <Books title={title} books={filteredBooks ? currentFilteredBooks : currentBooks} loading={loading}/>
      <Pagination booksPerPage={booksPerPage} totalBooks = {filteredBooks ? filteredBooks.length : books.length} paginate ={paginate} />
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