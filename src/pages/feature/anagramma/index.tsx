import React from 'react';
import Letter from '@components/ui/Letter';
import { Button } from '@components/ui';
import s from './Anagramma.module.scss';

//Функция для растановки элементов массива в хаотичном порядке
function shuffleArray(str) {
  const result = str.split('');
  const newArr = [];

  while (result.length > 0) {
    const random = Math.floor(Math.random() * (result.length - 1 - 0 + 1) + 0);
    const elem = result.splice(random, 1)[0];
    newArr.push(elem);
  }

  return newArr;
}

//Функция для проверки слова на правильность
function checkWord(word, checkList) {
  const result = word.map((item) => {
    return item.value;
  });

  if (result.join('') === checkList) {
    alert('True');
  } else {
    alert('False');
  }
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

  //Разбил слово из data в массив из объектов и диспатчу их в currentCard
  function passWord() {
    const currentWord = data[item].word;

    //Разбил строку в массив случайных элементов
    const arr = shuffleArray(currentWord);

    //Просто массив чисел для получения случайных букв из массива
    const randomArr = arr.map((item, index) => index);

    //Преобразование каждого элемента массива в объект
    const obj = arr.map((item, index, arr) => {
      return { id: index, order: randomArr.pop(), value: item };
    });
    setCurrentCard(obj);
  }

  //Вывод слова на экран
  React.useEffect(() => {
    passWord();
  }, [item]);

  //Запомнить взятую  букву
  const [newCard, setNewCard] = React.useState(null);

  //Диспатчу букву в newCard
  function dragStartHandler(e, elem) {
    setNewCard(elem);
  }

  function dragOverHandler(e) {
    e.preventDefault();
  }

  //Функция для перестановки букв
  function dropHandler(e, elem) {
    e.preventDefault();

    setCurrentCard(
      currentCard.map((item) => {
        if (item.id === elem.id) {
          return { ...item, order: newCard.order };
        }
        if (item.id === newCard.id) {
          return { ...item, order: elem.order };
        }
        return item;
      }),
    );
  }

  //Функция для изменения текущего слова на экране
  function nextWord() {
    setItem(item + 1);
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
      <hr className={s.line} />
      <div className={s.letters}>
        {currentCard.sort(sortCards).map((elem) => {
          return (
            <div
              key={elem.id}
              className={s.card}
              onDragStart={(e) => dragStartHandler(e, elem)}
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropHandler(e, elem)}
              draggable
            >
              <Letter char={elem.value}/>
            </div>
          );
        })}
      </div>
      <div className={s.button__row}>
        <Button onClick={nextWord}>Пропустить</Button>
        <Button onClick={() => checkWord(currentCard, data[item].word)}>Проверить</Button>
      </div>
    </div>
  );
}
