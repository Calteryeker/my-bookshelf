import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className="flex items-center justify-around bg-white h-20 border-2">
            <div>
            <Link href='/'><a>Logo MyBookshelf</a></Link>
                
            </div>
            <Link href='/'><a className="h-5 underline">Início</a></Link>
            <Link href='/signup'><a className="h-5 underline">Cadastro</a></Link>
            <Link href='/login'><a className="h-5 underline">Login</a></Link>
        </nav>
    );
}

export default Navbar;