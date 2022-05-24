export default function Header({children, tittle}) {
  return (
    <div className="flex flex-col bg-brow_pod-1 text-white justify-center fixed top-0 left-0 text-[26px] sm_c:text-[30px] h-[110px] font-luck w-full">
      {children}
      <p className="mx-auto static">{tittle}</p>
    </div>
  )
}