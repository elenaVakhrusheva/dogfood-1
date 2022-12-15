import React, {useState, useRef }  from 'react';
import "./style.css";
import {ReactComponent as SearchIcon} from './ic-search.svg';
import {ReactComponent as CloseIcon} from './ic-close-input.svg'; 



function Search({onSubmit: propsOnSubmit, onInput}) {
  const [InputText, setInputText] = useState(' ')
  const inputRef = useRef(null);

  const handleInput = () => {
    setInputText(inputRef.current.value)
    onInput && onInput(inputRef.current.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    propsOnSubmit(InputText)
    /* setInputText("") */
  }

const handleClearInput = (e) => {
  e.stopPropagation()
  setInputText("");
  onInput && onInput("")
}

  return (
   <form className="search" onSubmit={handleFormSubmit}>
        
        <input type="text"  value= {InputText}
        ref={inputRef} className='search__input' placeholder='Поиск' onInput={handleInput}/>
        
        <button type="button" className='search__btn'>
          {InputText && <CloseIcon onClick={handleClearInput} className="search__icon-clear"/> }
          
          {InputText && <SearchIcon onClick={handleFormSubmit} className="search__icon"/>}
            
        </button>
   </form>
  )
}

export default Search;