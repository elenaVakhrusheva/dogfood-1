import React, {useState }  from 'react';
import "./style.css";
import {ReactComponent as SearchIcon} from './ic-search.svg';
import {ReactComponent as CloseIcon} from './ic-close-input.svg'; 



function Search({onSubmit: propsOnSubmit, onInput}) {
  const [InputText, setInputText] = useState(' ')

  const handleInput = (e) => {
    setInputText(e.target.value)
    onInput && onInput(e.target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    propsOnSubmit(InputText)
    setInputText("")
  }

const handleClearInput = () => {
  setInputText("");
}

  return (
   <form className="search" onSubmit={handleFormSubmit}>
        <input type="text"  value= {InputText} className='search__input' placeholder='Поиск' onInput={handleInput}/>
        <button type="button" className='search__btn'>
          {InputText && <CloseIcon onClick={handleClearInput} className="search__icon-clear"/> }
          {!InputText && <SearchIcon onClick={handleFormSubmit} className="search__icon"/>}
            
        </button>
   </form>
  )
  }

export default Search;