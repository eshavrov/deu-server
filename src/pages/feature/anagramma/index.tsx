import s from './Anagramma.module.scss';
import { useEffect, useState } from 'react';
import { Button } from '@components/ui';
import Letter from '@components/ui/Letter';

export default function Anagramma() {
  const [data, setData] = useState([
    { id: 0, word: 'black' },
    { id: 1, word: 'blue' },
    { id: 2, word: 'red' },
    { id: 3, word: 'green' },
  ]);

  //State для хранения текущего слова на экране
  const [currentCard, setCurrentCard] = useState([]);

  //State для изменения слова на экране
  const [item, setItem] = useState(0);

  //Разбил слово из data в массив из объектов и диспатчу их в currentCard
  function passWord() {
    const currentWord = data[item].word;

    //Разбил строку в массив случайных элементов
    const arr = shuffleArray(currentWord);

    //Просто массив чисел для получения случайных букв из массива
    const randomArr = [];
    for (let i = 0; i < arr.length; i++) {
      randomArr.push(i);
    }

    //Преобразование каждого элемента массива в объект
    const obj = arr.reduce(function(sum, elem, index, array) {
      return (
        (sum[index] = { id: index, order: randomArr.pop(), value: elem }), sum
      );
    }, []);
    setCurrentCard(obj);
  }

  //Вывод слова на экран
  useEffect(() => {
    passWord();
  }, [item]);

  //Функция для изменения текущего слова на экране
  function nextWord() {
    setItem(item + 1);
  }

  //Функция для растановки элементов массива в хаотичном порядке
  function shuffleArray(str) {
    const result = str.split('');
    const newArr = [];

    while (result.length > 0) {
      const random = Math.floor(
        Math.random() * (result.length - 1 - 0 + 1) + 0,
      );
      const elem = result.splice(random, 1)[0];
      newArr.push(elem);
    }

    return newArr;
  }

  //Функция для проверки слова на правильность
  function checkWord() {
    const word = currentCard.map((elem) => {
      return elem.value;
    });

    if (word.join('') === data[item].word) {
      alert('True');
    } else {
      alert('False');
    }
  }

  //Запомнить взятую  букву
  const [newCard, setNewCard] = useState(null);

  //Диспатчу букву в newCard
  function dragStartHandler(e, elem) {
    setNewCard(elem);
  }

  function dragLeaveHandler(e) {
  }

  function dragEndHandler(e) {
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

  //Функция для размещения элементов по порядку
  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
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
              onDragStart={(e) => dragStartHandler(e, elem)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropHandler(e, elem)}
              draggable={true}
              className={s.card}
            >
              <Letter char={elem.value}/>
            </div>
          );
        })}
      </div>
      <div className={s.button__row}>
        <Button onClick={() => nextWord()}>Пропустить</Button>
        <Button onClick={() => checkWord()}>Проверить</Button>
      </div>
    </div>
  );
}
