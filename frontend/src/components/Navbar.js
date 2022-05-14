import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
    return (
        
        <nav className="bg-white  px-2 md:px-4 py-4 px-3 flex   w-full z-10 ">
            <div className="container flex flex-wrap justify-between items-center mx-auto ">
                <a href="/" className="flex items-center">
                    <Image src="/images/logo.png" width={80}  height={80} />  
                    <span className="self-center text-[35px] font-luck whitespace-nowrap text-red-900">My Bookshelf</span>
                </a>                        
                <div className=" w-full md:block md:w-auto " id="mobile-menu">
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                            <Link href='/'>
                                <a className="flex items-center pr-10 pl-10 justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-900 hover:bg-orange-500">
                                    Home
                                </a>
                            </Link>
                        </div>

                        <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                            <Link href='/signup'>
                                <a className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-900 hover:bg-orange-500">
                                    Cadastre-se
                                </a>
                            </Link>
                        </div>
 
                        <div id="button-login" className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto ">
                            <Link href='/login'>
                                <a className="flex items-center pr-10 pl-10 justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-orange-900 hover:text-white bg-romantic-1 hover:bg-orange-500">
                                    Login
                                </a>
                            </Link>
                        </div>
                    </ul>
                </div>            
            </div>
        </nav>
    );
}

export default Navbar;