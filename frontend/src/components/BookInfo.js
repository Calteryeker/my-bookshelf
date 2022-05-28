export default function BookInfo({book}){
    
    const generos = (lista_generos) => {
        return (
            lista_generos.map(genero => (
                <li key={genero} className="bg-romantic-1 text-brow_pod-1 justify-center text-[14px] m-1 sm_c:text-[20px] h-[30px] font-inter list-disc">
                    {genero}
                </li>
            ))
        )
    }

    return book ? (
        <div className="mt-20">
            <div className="px-10">
                <span className="bg-brow_pod-1 text-white justify-center text-[14px] sm_c:text-[25px] h-[50px] font-luck w-full">
                    Título:
                </span> 
                <span className="bg-romantic-1 text-brow_pod-1 justify-center text-[14px] sm_c:text-[25px] h-[50px] font-inter w-full">
                    {book.titulo}
                </span>
            </div>
            <div className="px-10">
                <span className="bg-brow_pod-1 text-white justify-center text-[14px] sm_c:text-[25px] h-[50px] font-luck w-full">
                    Autor: 
                </span>
                <span className="bg-romantic-1 text-brow_pod-1 justify-center text-[14px] sm_c:text-[25px] h-[50px] font-inter w-full">
                    {book.autor}
                </span>
            </div>
            <div className="px-10">
                <span className="bg-brow_pod-1 text-white justify-center text-[14px] sm_c:text-[25px] h-[50px] font-luck w-full">
                    Ano de Publicação:
                </span>
                <span className="bg-romantic-1 text-brow_pod-1 justify-center text-[14px] sm_c:text-[25px] h-[50px] font-inter w-full">
                    {book.ano_publicacao}
                </span>
            </div>
            <div className="px-10">
                <span className="bg-brow_pod-1 text-white justify-center text-[14px] sm_c:text-[25px] h-[50px] font-luck w-full">
                    Descrição:
                </span>
                <span className="bg-romantic-1 text-brow_pod-1 justify-center text-justify text-[14px] sm_c:text-[25px] h-[50px] font-inter w-full">
                    {book.descricao}
                </span>
            </div>
            <div className="px-10">
                <span className="bg-brow_pod-1 text-white justify-center text-[14px] sm_c:text-[25px] h-[50px] font-luck w-full">
                    Gêneros:
                </span>
                <span className="justify-center">
                    <ul className="flex flex-col px-20 ">{generos(book.lista_generos)}</ul>
                </span>
            </div>
            <div className="px-10">
                <span className="bg-brow_pod-1 text-white justify-center text-[14px] sm_c:text-[25px] h-[50px] font-luck w-full">
                    Avaliação:
                </span>
                <span className="bg-romantic-1 text-brow_pod-1 justify-center text-[14px] sm_c:text-[25px] h-[50px] font-inter w-full">
                    {book.avaliacao}
                </span>
            </div>
        </div>
    ) : null
}