import Head from "next/head";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { parseCookies } from 'nookies';



export default function Home() {
  return (
    <div className='flex flex-col overflow-auto items-stretch justify-between min-h-screen'>
      <Head>
        <title>MyBookshelf | Início</title>        
      </Head>
      <Navbar />
      <div className="min-h-screen  ">
        
      <div className="relative bg-brow_pod-1 overflow-hidden pb-10 pt-10">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8  sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-50">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline text-white font-luck tracking-wide	font-luck tracking-wide">My Bookshelf para todos</span> 
                </h1>
                <p className=" font-luck tracking-wide mt-3 text-base text-pink-200 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Seus livros em um único lugar esperando por você
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a href="/signup" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-normal rounded-md text-roange-800 bg-romantic-1 hover:bg-orange-500 md:py-4 md:text-lg md:px-10 ">
                      Vamos começar ! </a>
                  </div>
                  
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img className="h-56 w-full object-cover sm:h-72 md:h-50 w-full lg:h-full " src="/images/logo2.png" alt=""/>
        </div>
      </div>
        
      </div>
      <div className="min-h-screen flex items-center justify-around bg-white-900">
        <h2 className='text-4xl font-bold'>Quem Somos</h2>
      </div>
      <div className="min-h-screen flex items-center justify-around bg-romantic-1">
        <h2 className='text-4xl font-bold'>Leitores</h2>
      </div>
      <Footer />
    </div>
  )
}