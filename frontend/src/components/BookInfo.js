export default function BookInfo({book}){
    
    const generos = (lista_generos) => {
        return (
            lista_generos.map(genero => (
                <li key={genero} className="bg-romantic-1 text-brow_pod-1 justify-center  m-1 sm_c:text-[15px] md_c:text-[20px] h-[30px] w-[13em] font-inter list-disc">
                    {genero}
                </li>
            ))
        )
    }

    return book ? (
        <div className="mt-20">
            <div className="px-3">
                <span className="bg-brow_pod-1 text-white justify-center sm_c:text-[20px] md_c:text-[25px] h-[50px] font-luck w-full px-1">
                    Título:
                </span> 
                <span className="bg-romantic-1 text-brow_pod-1 justify-center sm_c:text-[20px] md_c:text-[25px] h-[50px] font-inter w-full px-1">
                    {book.titulo}
                </span>
            </div>
            <div className="px-3">
                <span className="bg-brow_pod-1 text-white justify-center sm_c:text-[20px] md_c:text-[25px] h-[50px] font-luck w-full px-1">
                    Autor: 
                </span>
                <span className="bg-romantic-1 text-brow_pod-1 justify-center sm_c:text-[20px] md_c:text-[25px] h-[50px] font-inter w-full px-1">
                    {book.autor}
                </span>
            </div>
            <div className="px-3">
                <span className="tracking-[7px] bg-brow_pod-1 text-white justify-center sm_c:text-[20px] md_c:text-[25px] h-[50px] font-luck w-full pl-2">
                    Ano:
                </span>
                <span className="bg-romantic-1 text-brow_pod-1 justify-center sm_c:text-[20px] md_c:text-[25px] h-[50px] font-inter w-full px-1">
                    {book.ano_publicacao}
                </span>
            </div>
            <div className="px-3">
                <span className="bg-brow_pod-1 text-white justify-center sm_c:text-[20px] md_c:text-[25px] h-[50px] font-luck w-full px-1">
                    Descrição:
                </span>
                <span className="bg-romantic-1 text-brow_pod-1 justify-center text-justify  sm_c:text-[20px] md_c:text-[25px] h-[50px] font-inter w-full px-1">
                    {book.descricao}
                </span>
            </div>
            <div className="px-3">
                <span className="bg-brow_pod-1 text-white justify-center sm_c:text-[20px] md_c:text-[25px] h-[50px] font-luck w-full px-1">
                    Gêneros:
                </span>
                <span className="justify-center">
                    <ul className="flex flex-col px-20 ">{generos(book.lista_generos)}</ul>
                </span>
            </div>
            <div className="px-3">
                <span className="bg-brow_pod-1 text-white justify-center sm_c:text-[20px] md_c:text-[25px] h-[50px] font-luck w-full px-1">
                    Avaliação:
                </span>
                <span className="bg-romantic-1 text-brow_pod-1 justify-center sm_c:text-[20px] md_c:text-[25px] h-[50px] font-inter w-full px-1">
                    {book.avaliacao}
                </span>
            </div>
        </div>
    ) : null
}