import React from "react";
import Card from "../Card/index.jsx"
import "./style.css";


const CardList = () => {
  const {cards} = useContext(CardContext);
  return (
    <div className="cards">
      {cards.map((item, index) => (
        <Card key={item._id} {...item} />
      ))}
    </div>
  );
};

export default CardList;