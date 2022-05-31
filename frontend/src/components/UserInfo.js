import moment from "moment";

export default function BookInfo({user}){

    return(
        <div className="mt-20">
            <div className="px-10">
                <span className="bg-brow_pod-1 text-white justify-center sm_c:text-[20px] md_c:text-[25px] h-[50px] font-luck w-full px-1">
                    Nome:
                </span> 
                <span className="bg-romantic-1 text-brow_pod-1 justify-center sm_c:text-[20px] md_c:text-[25px] h-[50px] font-inter w-full px-1">
                    {user.nome}
                </span>
            </div>
            <div className="px-10">
                <span className="bg-brow_pod-1 text-white justify-center sm_c:text-[20px] md_c:text-[25px] h-[50px] font-luck w-full px-1">
                    Email: 
                </span>
                <span className="bg-romantic-1 text-brow_pod-1 justify-center sm_c:text-[20px] md_c:text-[25px] h-[50px] font-inter w-full px-1">
                    {user.email}
                </span>
            </div>
            <div className="px-10">
                <span className="bg-brow_pod-1 text-white justify-center sm_c:text-[20px] md_c:text-[25px] h-[50px] font-luck w-full px-1">
                    Username:
                </span>
                <span className="bg-romantic-1 text-brow_pod-1 justify-center sm_c:text-[20px] md_c:text-[25px] h-[50px] font-inter w-full px-1">
                    {user.login}
                </span>
            </div>
            <div className="px-10">
                <span className="bg-brow_pod-1 text-white justify-center sm_c:text-[20px] md_c:text-[25px] h-[50px] font-luck w-full px-1">
                    Data Nascimento:
                </span>
                <span className="bg-romantic-1 text-brow_pod-1 justify-center text-justify sm_c:text-[20px] md_c:text-[25px] h-[50px] font-inter w-full px-1">
                    {moment(user.data_nascimento).format("DD/MM/YYYY")}
                </span>
            </div>
        </div>
    )
}