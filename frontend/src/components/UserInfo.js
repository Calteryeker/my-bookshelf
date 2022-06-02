import moment from "moment";

export default function UserInfo({user}){

    return(
        <div className="mt-20">
            <div className="mt-3">
                <span className="text-brow_pod-1 justify-center sm_c:text-[20px] md_c:text-[25px] h-[50px] font-luck w-full px-1">
                    Nome:
                </span> 
                <span className=" text-brow_pod-1 justify-center sm_c:text-[20px] md_c:text-[25px] h-[50px] font-lekton w-full px-1">
                    {user.nome}
                </span>
            </div>
            <div className="mt-3">
                <span className="text-brow_pod-1 justify-center sm_c:text-[20px] md_c:text-[25px] h-[50px] font-luck w-full px-1">
                    Email: 
                </span>
                <span className=" text-brow_pod-1 justify-center sm_c:text-[20px] md_c:text-[25px] h-[50px] font-lekton w-full px-1">
                    {user.email}
                </span>
            </div>
            <div className="mt-3">
                <span className="text-brow_pod-1 justify-center sm_c:text-[20px] md_c:text-[25px] h-[50px] font-luck w-full px-1">
                    Username:
                </span>
                <span className=" text-brow_pod-1 justify-center sm_c:text-[20px] md_c:text-[25px] h-[50px] font-lekton w-full px-1">
                    {user.login}
                </span>
            </div>
            <div className="mt-3">
                <span className="text-brow_pod-1 justify-center sm_c:text-[20px] md_c:text-[25px] h-[50px] font-luck w-full px-1">
                    Data Nascimento:
                </span>
                <span className=" text-brow_pod-1 justify-center text-justify sm_c:text-[20px] md_c:text-[25px] h-[50px] font-lekton w-full px-1">
                    {moment(user.data_nascimento).format("DD/MM/YYYY")}
                </span>
            </div>
        </div>
    )
}