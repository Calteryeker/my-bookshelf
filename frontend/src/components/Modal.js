import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function Modal({show, onClose, onAction, children}){
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
        <div className='overlay'>
            <div className='modal'>
                <div className='header'>
                    <h2>Confirme a Operação</h2>
                </div>
                <div>
                    {children}
                    <a href='#' onClick={handleClose}><button >Cancelar</button></a>
                    {onAction ? <a href='#' onClick={handleAction}><button >Confirmar</button></a> : null}
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