import React from 'react';
import './Facts.css';

import Fact1 from './image-1.png';
import Fact2 from './image-2.jpeg';
import Fact3 from './image-3.png';
import Fact4 from './image-4.jpeg';
import Fact5 from './image-5.png';

const facts = [
  {
    text: "What do Virat Kohli, Maria Sharapova, Justin Bieber, Serena Williams and Michael Phelps have in common? All successful Global celebrities suffered mental disorders and successfully overcame with timely intervention!"
    ,
    image: Fact1
  },
  {
    text: 'That prolonged anxiety, mood swings, tension can be signs of underlying depression and/or general anxiety !!',
    image: Fact2
  },
  {
    text: 'That every 4th person in the world suffers from one or the other form of a mental illness and globally $1trillion is lost in productivity every year due to these disorders !!',
    image: Fact3
  },
  {
    text: 'While triggers can be different, depression is largely due to chemical imbalances and flawed thought process !',
    image: Fact4
  },
  {
    text: 'That General anxiety, Depression and Alcohol abuse account for 80% of the mental disorders AND that they can be cured 100% with Therapeutic and Medical intervention !',
    image: Fact5
  }
];

const Facts = () => {
  return (
    <div className="facts-container">
      <h2 className="facts-title">Do You Know?</h2>
      <div className="facts-grid">
        {facts.map((fact, index) => (
          <div className="fact-card" key={index}>
            <img src={fact.image} alt={`fact-${index}`} className="fact-image" />
            <p className="fact-text">{fact.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facts;