import React from 'react';
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';

const Backdrop = (props) =>  {
  return <div className={classes.backdrop} onClick={props.onClose} />
}
const ModalOverlay = (props) => {
  return <main onClick={props.onClose} className={classes.modal}>{props.children}</main>
}

const Modal = (props) => {
  return (
    <>
    {ReactDOM.createPortal(<Backdrop onClick={props.onClose}>{props.children}</Backdrop>, document.getElementById('modal'))}
    {ReactDOM.createPortal(<ModalOverlay onClick={props.onClose}>{props.children}</ModalOverlay>, document.getElementById('modal'))}
    </>
  )
}

export default Modal