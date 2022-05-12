import React from 'react';
import './Modal.css';
import ReactDOM from 'react-dom';

const Backdrop = (props) =>  {
  return <div className='backdrop' onClick={props.onClose} />
}
const ModalOverlay = (props) => {
  return <div onClick={props.onClose} className='modal'>{props.children}</div>
}

const Modal = (props) => {
  return (
    <>
    {ReactDOM.createPortal(<Backdrop onClose={props.onClose}></Backdrop>, document.getElementById('overlays'))}
    {ReactDOM.createPortal(<ModalOverlay /* onClose={props.onClose} */>{props.children}</ModalOverlay>, document.getElementById('overlays'))}
    </>
  )
}

export default Modal