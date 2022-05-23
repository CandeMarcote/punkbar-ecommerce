import React from 'react';
import '../../styles/modal.css';
import ReactDOM from 'react-dom';

const Backdrop = (props) =>  {
  return <div className='backdrop' onClick={props.onClose} />
}
const ModalOverlay = (props) => {
  return <div className='modal'>{props.children}</div>
}

const Modal = (props) => {
  return (
    <>
    {ReactDOM.createPortal(<Backdrop onClose={props.onClose}></Backdrop>, document.getElementById('overlays'))}
    {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, document.getElementById('overlays'))}
    </>
  )
}

export default Modal