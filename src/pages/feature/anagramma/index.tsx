import React from 'react';

import Letter from '@components/ui/Letter';
import { Button } from '@components/ui';

import s from './Anagramma.module.scss';

//Функция для растановки элементов массива в хаотичном порядке
function shuffleArray(str) {
  const arr = str.split('');
  const newArr = [];

  while (arr.length > 0) {
    const random = Math.floor(Math.random() * arr.length);
    const elem = arr.splice(random, 1);
    newArr.push(elem);
  }

  return newArr;
}

//Функция для проверки слова на правильность
function checkWord(chars, word) {
  const result = chars.map((item) => {
    return item.value;
  });

  if (result.join('') === word) {
    alert('True');
  } else {
    alert('False');
  }
}

//Разбил слово из data в массив из объектов и диспатчу их в currentCard
function passWord(currentState) {
  const currentWord = currentState;

  //Разбил строку в массив случайных элементов
  const arr = shuffleArray(currentWord);

  //Просто массив чисел для получения случайных букв из массива
  const randomArr = arr.map((item, index) => index);

  //Преобразование каждого элемента массива в объект
  const obj = arr.map((item, index) => {
    return { id: index, order: randomArr.pop(), value: item };
  });

  return obj;
}

export default function Anagramma() {
  const [data, setData] = React.useState([
    { id: 0, word: 'black' },
    { id: 1, word: 'blue' },
    { id: 2, word: 'red' },
    { id: 3, word: 'green' },
  ]);

  //State для хранения текущего слова на экране
  const [currentCard, setCurrentCard] = React.useState([]);

  //State для изменения слова на экране
  const [item, setItem] = React.useState(0);

  //Вывод слова на экран
  React.useEffect(() => {
    setCurrentCard(passWord(data[item].word));
  }, [item]);

  //Запомнить взятую  букву
  const [takenSymbol, setTakenSymbol] = React.useState(null);

  //Диспатчу букву в newCard
  function onDragStart(event, elem) {
    setTakenSymbol(elem);
  }

  function onDragOver(event) {
    event.preventDefault();
  }

  //Функция для перестановки букв
  function onDrop(event, elem) {
    event.preventDefault();

    setCurrentCard(
      currentCard.map((item) => {
        if (item.id === elem.id) {
          return { ...item, order: takenSymbol.order };
        }
        if (item.id === takenSymbol.id) {
          return { ...item, order: elem.order };
        }
        return item;
      }),
    );
  }

  //Функция для размещения элементов по порядку
  const sortCards = (a, b) => {
    return a.order - b.order;
  };

  return (
    <div className={s.word}>
      <p className={s.title}>
        Перемешаны буквы слова, необходимо поставить на нужное место
      </p>
      <hr className={s.line}/>
      <div className={s.letters}>
        {currentCard.sort(sortCards).map((elem) => {
          return (
            <div
              key={elem.id}
              className={s.card}
              onDragStart={(event) => onDragStart(event, elem)}
              onDragOver={(event) => onDragOver(event)}
              onDrop={(event) => onDrop(event, elem)}
              draggable
            >
              <Letter char={elem.value}/>
            </div>
          );
        })}
      </div>
      <div className={s.button__row}>
        <Button onClick={() => setItem(item + 1)}>Пропустить</Button>
        <Button onClick={() => checkWord(currentCard, data[item].word)}>
          Проверить
        </Button>
      </div>
    </div>
  );
}
