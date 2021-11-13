import React from 'react';
import cn from 'classnames';

import Letter from '@components/ui/Letter';
import { Button } from '@components/ui';

import s from './Anagramma.module.scss';
import Timer from '@components/ui/Timer';

// Преобразует строку в массив случайных элементов
function shuffleArray(str) {
  const arr = str.split('');
  const result = [];

  while (arr.length > 0) {
    const random = Math.floor(Math.random() * arr.length);
    const elem = arr.splice(random, 1);
    result.push(elem);
  }

  return result;
}

// Функция для проверки слова на правильность
function checkWord(symbols, word) {
  const result = symbols.reduce((acc, item) => acc + item.value, []);

  return result === word ? alert('true') : alert('false');
}

// Преобразует строку в массив из объектов
function transformValue(currentWord) {
  //Разбил строку в массив случайных элементов
  const arr = shuffleArray(currentWord);

  //Разбил каждый элемент массива в объект
  return arr.map((item, index) => ({ id: index, order: index, value: item }));
}

// Размещения элементов по порядку
const compare = (a, b) => a.order - b.order;

const Anagramma = (props) => {
  const { value, className } = props;

  // State для хранения текущего слова на экране
  const [charList, setCharList] = React.useState([]);

  // Вывод слова на экран
  React.useEffect(() => {
    setCharList(transformValue(value));
  }, [value, setCharList]);

  // Запомнить взятую  букву
  const [takenSymbol, setTakenSymbol] = React.useState(null);

  function onDragStart(event, elem) {
    setTakenSymbol(elem);
  }

  function onDragOver(event) {
    event.preventDefault();
  }

  // Функция для перестановки букв
  function onDrop(event, elem) {
    event.preventDefault();

    setCharList(
      charList.map((item) => {
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

  const items = charList.sort(compare);

  const rootClassName = cn(className, s.word);

  return (
    <div className={rootClassName}>
      <div className={s.timer}>
        <Timer milliseconds={90000} />
      </div>
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
              onDragOver={onDragOver}
              onDrop={(event) => onDrop(event, elem)}
              draggable
            >
              <Letter char={elem.value} />
            </div>
          );
        })}
      </div>
      <div className={s.button__row}>
        <Button>Пропустить</Button>
        <Button onClick={() => checkWord(charList, value)}>Проверить</Button>
      </div>
    </div>
  );
};

export default Anagramma;
