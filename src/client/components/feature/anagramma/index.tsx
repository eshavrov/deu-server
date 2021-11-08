import React from 'react';
import cn from 'classnames';

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
function checkWord(symbols, word) {
  const result = symbols.map((item) => {
    return item.value;
  });

  if (result.join('') === word) {
    alert('True');
  } else {
    alert('False');
  }
}

//Разбил строку в массив из объектов
function passWord(currentWord) {
  //Разбил строку в массив случайных элементов
  const arr = shuffleArray(currentWord);

  //Просто массив чисел для получения случайных букв из массива
  const arrayNum = arr.map((item, index) => index);

  //Преобразование каждого элемента массива в объект
  const obj = arr.map((item, index) => {
    return { id: index, order: arrayNum.pop(), value: item };
  });

  return obj;
}

//Функция для размещения элементов по порядку
const compare = (a, b) => {
  return a.order - b.order;
};

export default function Anagramma (props) {
  const { value, className } = props;

  //State для хранения текущего слова на экране
  const [currentArr, setCurrentCard] = React.useState([]);

  //State для изменения слова на экране
  const [item, setItem] = React.useState(0);

  //Вывод слова на экран
  React.useEffect(() => {
    setCurrentCard(passWord(value));
  }, [value, setCurrentCard]);

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
      currentArr.map((item) => {
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

  const items = currentArr.sort(compare);

  const rootClassName = cn(className, s.word);

  return (
    <div className={rootClassName}>
      <p className={s.title}>
        Перемешаны буквы слова, необходимо поставить на нужное место
      </p>
      <hr className={s.line} />
      <div className={s.letters}>
        {items.map((elem) => {
          return (
            <div
              key={elem.id}
              className={s.card}
              onDragStart={(event) => onDragStart(event, elem)}
              onDragOver={(event) => onDragOver(event)}
              onDrop={(event) => onDrop(event, elem)}
              draggable
            >
              <Letter char={elem.value} />
            </div>
          );
        })}
      </div>
      <div className={s.button__row}>
        <Button onClick={() => setItem(item + 1)}>Пропустить</Button>
        <Button onClick={() => checkWord(currentArr, value)}>
          Проверить
        </Button>
      </div>
    </div>
  );
}
