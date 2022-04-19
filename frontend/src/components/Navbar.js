import Link from 'next/link'

const Navbar = () => {
    return (
        <nav>
            <div className="logo">
                <h1>Logo MyBookshelf</h1>
            </div>
            <Link href='/'><a>Início</a></Link>
            <Link href='/signup'><a>Cadastro</a></Link>
            <Link href='/login'><a>Login</a></Link>
        </nav>
    );
}

export default Navbar;