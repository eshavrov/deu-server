import s from './Anagramma.module.scss';
import { useState } from 'react';
import { Button } from '@components/ui';
import Letter from '@components/ui/Letter';

export default function Anagramma() {
  let [cardsList, setCardList] = useState([
    { id: 0, order: 1, letter: 'a', rightOrder: 3 },
    { id: 1, order: 2, letter: 'b', rightOrder: 1 },
    { id: 2, order: 3, letter: 'c', rightOrder: 4 },
    { id: 3, order: 4, letter: 'k', rightOrder: 5 },
    { id: 4, order: 5, letter: 'l', rightOrder: 2 },
  ]);

  let [currentCard, setCurrentCard] = useState(null);

  function checkWord() {
    let flag = true;
    cardsList.map(elem => {
      if(elem.order !== elem.rightOrder) {
        flag = false;
      }
    });

    if(flag) {
      alert('True');
    } else {
      alert('False');
    }
  }



  function dragStartHandler(e, elem) {
    console.log('Взяли букву', elem);
    setCurrentCard(elem);
  }

  function dragLeaveHandler(e) {
  }

  function dragEndHandler(e) {
  }

  function dragOverHandler(e) {
    e.preventDefault();
  }

  function dropHandler(e, elem) {
    e.preventDefault();
    console.log('drag', elem);
    setCardList(cardsList.map(e => {
      if (e.id === elem.id) {
        return { ...e, order: currentCard.order };
      }
      if (e.id === currentCard.id) {
        return { ...e, order: elem.order };
      }
      return e;
    }));
  }

  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };




  return (
    <div className={s.word}>
      <p className={s.title}>Перемешаны буквы слова, необходимо поставить на нужное место</p>
      <hr className={s.line}/>
      <div className={s.letters}>
        {cardsList.sort(sortCards).map(elem => {
          return (
            <div onDragStart={(e) => dragStartHandler(e, elem)}
                 onDragLeave={(e) => dragLeaveHandler(e)}
                 onDragEnd={(e) => dragEndHandler(e)}
                 onDragOver={(e) => dragOverHandler(e)}
                 onDrop={(e) => dropHandler(e, elem)}
                 draggable={true}
                 className={s.card}
            >
              <Letter
                width="50px"
                height="50px">
                {elem.letter}
              </Letter>
            </div>
          );
        })}

      </div>
      <Button onClick={() => checkWord()}>
        Проверить
      </Button>
    </div>
  );
}
