import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function Modal({show, textClose, onClose, textAction ,onAction, header, children}){
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() =>{
        setIsBrowser(true)
    }, [])

    const handleClose = (e) =>{
        e.preventDefault();
        onClose()
    }

    const handleAction = (e) =>{
        e.preventDefault();
        onAction();
    }

    const modalContent = show ? (
        <div className="flex items-center justify-center fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-90" >
            <div className="flex flex-col rounded-xl items-center justify-center bg-white text-center sm:p-6 sm:pb-4 md_c:items-end h-[50%]">
                <div className='header'>
                    {header}
                </div>
                <div className="">
                    {children}
                    <button className='rounded-xl bg-romantic-1 text-brow_pod-1 font-luck text-xl px-8 py-2 hover:bg-orange-500 hover:text-white duration-500' onClick={handleClose}>{textClose ? textClose : "Cancelar"}</button>
                    {onAction ? <button className='rounded-xl bg-brow_pod-1 text-white font-luck text-xl px-8 py-2 hover:bg-orange-500 hover:text-white duration-500' onClick={handleAction}>{textAction ? textAction : "Confirmar"}</button> : null}
                </div>
            </div>
        </div>
    ) : null;

    if(isBrowser){
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById('modal-root')
        )
    }
    else{
        return null;
    }

}