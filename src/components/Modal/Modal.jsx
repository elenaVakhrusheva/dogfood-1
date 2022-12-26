import React, { useState, useEffect } from "react";
import cn from 'classnames'; 
import { useNavigate } from 'react-router-dom';
import './style.css';

function Modal({children}) {
  const [active, setActive] = useState(false);
  const navigate = useNavigate()
  useEffect(()=> {
    setActive(true);
  },[])

  function onClose() {
    setActive(false);
    navigate(-1)
  }

  return (
    <div className={cn('modal', {['active']: active})} onClick={onClose}>
      
      <div className={cn('modal_content', {['active']: active})} onClick={e => e.stopPropagation()}>{children}</div>
      
    </div>
    );
  };
  
  export default Modal;