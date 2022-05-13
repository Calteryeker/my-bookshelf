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
      <div className="min-h-screen flex items-center bg-brow_pod-1 text-white text-center justify-center">
        <h1 className='text-4xl font-bold'>Welcome to MyBookshelf</h1>
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