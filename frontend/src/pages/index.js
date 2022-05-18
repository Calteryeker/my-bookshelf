import Head from "next/head";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Head>
        <title>MyBookshelf | Início</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Navbar bgColor={`white`} tittleColor={`brow_pod-1`} currentPage={"Home"}/>

      <div className="flex flex-col min-h-screen items-center justify-around bg-brow_pod-1 overflow-hidden md_c:flex md:flex-row">
        <div className="pb-8 pt-28 sm: md_c:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-50">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-6xl tracking-tight font-extrabold text-gray-900 sm_c:text-6xl md:text-6xl">
                <span className="block xl:inline text-white font-luck tracking-wide">My Bookshelf para todos</span>
              </h1>
              <p className=" font-luck tracking-wide mt-3  text-pink-200 sm_c:mt-5 sm_c:text-2xl sm_c:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Seus livros em um único lugar esperando por você
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a href="/signup" className="font-luck w-full flex items-center justify-center px-8 py-6 border border-transparent sm_c:text-2xl font-normal rounded-md text-orange-900 bg-romantic-1  hover:text-white hover:bg-orange-500 duration-500 md:py-4 md:text-lg md:px-10 ">
                    Vamos começar ! </a>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div className="lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img className=" h-max w-full object-cover sm:h-72 lg:h-full " src="/images/logo2.png" alt="" />
        </div>
      </div>


      <div className="min-h-screen flex flex-col items-center justify-start  bg-white-900 bg-section-logo-2 md_c:min-h-screen">
        <h2 className="font-bold items-center-top font-luck text-brow_pod-1 sm_c:mt-24 sm_c:text-center sm_c:text-7xl md_c:text-6xl md_c:mt-24">Quem Somos</h2>
        <p className="  font-lekton text-center tracking-wide text-brow_pod-1 sm_c:text-2xl sm_c:mx-16 sm_c:my-20 sm_c:leading-loose sm_c:text-justify md_c:text-4xl md_c:leading-loose md_c:mt-32 md_c:mx-44">
          UMA PLATAFORMA SUPER ORGANIZADA PARA VOCÊ DEIXAR SEUS LIVROS EM UM SÓ LUGAR, SEM PAGAR  NADA POR  ISSO E AINDA TE INDICAMOS LIVROS QUE VOCÊ GOSTA!
        </p>
      </div>

      <div className="min-h-screen flex flex-col items-center justify-start  bg-white-900 bg-romantic-1 md_c:min-h-screen">
        <h2 className="font-bold items-center-top font-luck text-brow_pod-1 sm_c:mt-24 sm_c:text-center sm_c:text-7xl md_c:text-6xl md_c:mt-24">leitores</h2>
        <div className="flex lg:flex-row">
          <div className="hidden lg:block">
            <img className="lg:mt-10 lg:w-[1300px]" src="/images/logo_section3.png" alt="" />
          </div>
          <div className="justify-center lg:mt-10">
            <img className=" sm_c:mt-9 sm_c:mx-auto" src="/images/persona.png" alt="" />
            <p className=" sm_c:mt-1 sm_c:text-2xl sm_c:font-extrabold sm_c:text-center sm_c:mx-10 sm_c:font-lekton sm_c:text-orange-900 ">Pedro Valentim</p>
            <p className=" sm_c:mt-6 sm_c:text-xl  sm_c:text-center sm_c:mx-10 sm_c:font-lekton sm_c:text-orange-900 ">
              “Muito show mesmo a plataforma para quem é amante de livros e aprecia uma boa organização,o site foi fundamental até mesmo porque, eu gosto de redação e consigo ler meus livros em um periodo organizado...”
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  )
}

