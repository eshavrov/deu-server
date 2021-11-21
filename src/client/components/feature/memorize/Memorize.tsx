import React from 'react';
import cn from 'classnames';

import s from './Memorize.module.scss';
import Carousel, { useCarousel } from '@components/ui/Carousel';
import { Button } from '@components/ui';

import useSound from '@hooks/useSound';

import SpeechRecognition, { useSpeechRecognition } from '@lib/speech';
import { useVoicesConfig } from '@hooks/useVoicesConfig';

interface DataOptions {
  /**
   * Индекс текущего слова
   */
  index: number;

  /**
   * Идентификатор timeout для принудительного отклучения прослушивания
   */
  timeout: null | NodeJS.Timeout;

  /**
   * Время начала текущего прослушивания
   */
  timestamp: null | number;

  /**
   *
   */
  isTimeStop: boolean;
}

enum Stage {
  /**
   * Начало, необходимо нажать на кнопку для старта
   * > Техническое ограничение браузера. Пользователь должен сделать действие,
   * > что бы заработал распознование и сентезирование речи
   */
  start,

  /**
   * Инициализируем запуск воспроизведения фразы (вопрос)
   */
  scoring,

  /**
   * Воспроизодится звук. Асистент произносить фразу
   */
  scoringProcess,

  /**
   *
   */
  recognition,

  /**
   *
   */
  recognitionProcess,

  /**
   *
   */
  checkup,

  /**
   *
   */
  success,

  /**
   *
   */
  error,

  /**
   *
   */
  translate,

  /**
   *
   */
  translateProcess,

  /**
   *
   */
  next,

  /**
   *
   */
  prev,

  /**
   *
   */
  nextProcess,

  /**
   *
   */
  iteration,

  /**
   *
   */
  pause,

  /**
   *
   */
  finish,
}

const TITLE = 'Необходимо произнести слова правильно';

const _list = [
  {
    article: 'der',
    value: 'der Erwachsene',
    context: ['Dieser Film ist nur für Erwachsene.'],
    translate: [`взрослый`, `взрослая`],
  },
  {
    article: 'die',
    value: 'die Blume',
    context: ['Es ist Blume!', 'Diese Blume ist rot.'],
    translate: [`цветок`],
  },
  {
    article: 'das',
    value: 'das Auto',
    context: ['Er kommt mit dem Auto.'],
    translate: ['автомобиль', 'машина', 'авто', 'автомашина'],
  },
  {
    article: 'die',
    value: 'die Abbildung',
    context: ['Auf der Abbildung sehen Sie, wie man das Gerät einschaltet.'],
    translate: ['Иллюстрация', 'Изображение', 'рисунок'],
  },
  {
    article: 'das',
    value: 'das Brot',
    context: [
      'Haben Sie auch Weißbrot?',
      'Nimm noch ein paar Brote für die Fahrt mit.',
    ],
    translate: [`хлеб`, `буханка`],
  },
  {
    article: 'der',
    value: 'der Geburtsort',
    context: ['Bitte schreiben Sie Ihren Geburtsort auf das Formular.'],
    translate: ['место рождения', 'родина'],
  },
  {
    article: 'das',
    value: 'das Getränk',
    context: ['Mein Lieblingsgetränk ist Tomatensaft.'],
    translate: [`напиток`, `питьё`],
  },
  {
    article: 'das',
    value: 'das Haus',
    context: [
      'In welchem Haus wohnst du?',
      'Ich gehe jetzt nach Hause.',
      'Paul ist nicht zu Hause.',
    ],
    translate: [`дом`, `здание`, `строение`, `хозяйство`],
  },
];

const render = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <div className={cn(s.word, s[`word--${data.article}`])}>
      {data.value} {!!data.status && '+'}
    </div>
  );
};

const stopListening = (timestamp, cb, wait = 5000) => {
  if (timestamp) {
    const diff = Date.now() - timestamp;

    if (diff > wait) {
      cb();

      return true;
    }
  }

  return false;
};

const sfx = {
  error: 'https://deutsch-six.vercel.app/static/sfx/0.mp3',
  succes: 'https://deutsch-six.vercel.app/static/sfx/success-0.mp3',
  win: 'https://mp3-ogg.ru/files/3734-pobedy-dlja-sorevnovanija.mp3',
  sound: 'https://deutsch-six.vercel.app/static/sfx/success-0.mp3',
};

const Memorize = (props) => {
  const { className, wait = 8000, language = 'ru' } = props;

  const rootClassName = cn(className, s.root);

  const [playErrorSound] = useSound(sfx.error, { volume: 0.75 });
  const [playWinSound] = useSound(sfx.win, { volume: 0.75 });
  const [playSuccessSound] = useSound(sfx.succes, {
    volume: 0.75,
  });

  const data = React.useRef<DataOptions>({
    index: 0,
    timeout: null,
    timestamp: null,
    isTimeStop: false,
  });

  const [stage, setStage] = React.useState(Stage.start);
  const [prevStage, setPrevStage] = React.useState(null);

  const [list, setList] = React.useState(_list);
  const [index, setIndex] = React.useState(0);

  const item = list?.[index];

  data.current.index = index;

  const clear = React.useCallback(() => {
    console.log('clear');
    data.current.timestamp = null;
    clearTimeout(data.current.timeout);
    data.current.timeout = null;
  }, [data]);

  const commands = React.useMemo(() => {
    if (!item) {
      return [];
    }

    const prefix = '';

    return [
      {
        command: `${prefix}Очистить`,
        callback: ({ resetTranscript }) => resetTranscript(),
      },
      {
        command: [
          `${prefix}Далее`,
          `${prefix}Дальше`,
          `${prefix}Следующее (слово)`,
        ],
        callback: () => {
          setStage(Stage.next);
        },
        matchInterim: true,
      },
      {
        command: [`${prefix}назад`, `${prefix}обратно`, `${prefix}вернуться`],
        callback: () => {
          setStage(Stage.prev);
        },
        matchInterim: true,
      },
      {
        command: [`${prefix}Не помню`, `${prefix}Забыл`, `${prefix}Напомни`],
        callback: () => {
          setStage((stage) => {
            if (stage === Stage.recognitionProcess) {
              clear();

              return Stage.translate;
            }

            return stage;
          });
        },
        matchInterim: true,
      },

      {
        command: [
          `${prefix}Стоп`,
          `${prefix}Прекратить`,
          `${prefix}Остановись`,
          `${prefix}Пауза`,
        ],
        callback: () => {
          setStage((stage) => {
            if (stage === Stage.recognitionProcess) {
              clear();

              return Stage.pause;
            }

            return stage;
          });
        },
        matchInterim: true,
      },

      {
        command: [
          `${prefix}старт`,
          `${prefix}Продолжить`,
          `${prefix}Начать`,
          `${prefix}Пуск`,
          `${prefix}Запускай`,
        ],
        callback: () => {
          setStage((stage) => {
            if (stage === Stage.pause) {
              return Stage.scoring;
            }

            return stage;
          });
        },
        matchInterim: true,
      },

      {
        command: [`${prefix}Ещё`, `${prefix}Повтори`],
        callback: () => {
          setStage((stage) => {
            if (stage === Stage.recognitionProcess) {
              clear();

              return Stage.scoring;
            }

            return stage;
          });
        },
        matchInterim: true,
      },
      {
        command: item.translate,
        callback: () => {
          // Принудительно прекращаем слушать
          clear();
          SpeechRecognition.stopListening();
          resetTranscript();

          // помечаем текущую фразу как выполнено
          setList((list) =>
            list.map((item, i) =>
              data.current.index !== i ? item : { ...item, status: true },
            ),
          );

          // Пере
          setStage(Stage.success);
        },
        matchInterim: true,
      },
    ];
  }, [item, data, setStage]);

  const carousel = useCarousel(list, index, setIndex);
  const { isListening, resetTranscript } = useSpeechRecognition({
    commands,
  });

  const { main, learn, isSpeaking } = useVoicesConfig();

  const contexts = (!carousel.isAnimated && item?.context) || [];

  data.current.isTimeStop = !!data.current.timestamp
    ? Date.now() - data.current.timestamp > wait
    : false;

  // Преключение между этапами (состояниями)
  React.useEffect(() => {
    if (prevStage === stage) return;
    setPrevStage(stage);

    switch (stage) {
      case Stage.scoring: {
        SpeechRecognition.stopListening();

        // Инизиализируем запуск воспроизведения фразы на изучаемом языке
        setStage(Stage.scoringProcess);

        // Произнести фразу
        learn.speak(item.value);

        return;
      }

      case Stage.recognition: {
        // очищаем предыдущую распознаную  озвученную фразу
        resetTranscript();

        SpeechRecognition.startListening({
          language,
          // слушаем непрерывно
          continuous: true,

          // Начали слушать
          onStart() {
            if (data.current.timeout) {
              // Удаляем отложенный вызов
              clear();
            }

            // Фиксируем время начала прослушивания
            data.current.timestamp = Date.now();

            // Прекратить слушать через `wait` мс
            data.current.timeout = setTimeout(() => {
              stopListening(
                data.current.timestamp,
                () => {
                  clear();

                  // Состояние Проверка
                  setStage(Stage.error);
                },
                wait,
              );
            }, wait);

            // Устанавливаем этап прослушивание
            setStage(Stage.recognitionProcess);
          },
        });

        return;
      }

      case Stage.checkup: {
        setStage(Stage.translate);

        return;
      }

      case Stage.error: {
        playErrorSound();

        setTimeout(() => setStage(Stage.translate), 1000);

        return;
      }

      case Stage.success: {
        playSuccessSound();

        setTimeout(() => setStage(Stage.next), 1000);

        return;
      }

      case Stage.translate: {
        SpeechRecognition.stopListening();

        // Инизиализируем запуск воспроизведения фразы на изучаемом языке
        setStage(Stage.translateProcess);

        // Произнести фразу
        main.speak(item.translate.join(', '));

        return;
      }

      case Stage.prev: {
        if (index > 0) {
          clear();

          SpeechRecognition.stopListening();
          resetTranscript();

          // если не последние слово то переходим к следующему
          carousel.prev();
          setStage(Stage.nextProcess);
        }

        return;
      }

      case Stage.next: {
        clear();

        SpeechRecognition.stopListening();
        resetTranscript();

        if (index < list.length - 1) {
          // если не последние слово то переходим к следующему
          carousel.next();
          setStage(Stage.nextProcess);
        } else {
          // Если слово крайне, то
          setIndex(0);

          setList((list) => {
            const newList = list.filter((item) => !(item as any).status);

            if (newList.length > 0) {
              setStage(Stage.scoring);
            } else {
              setStage(Stage.finish);
            }

            if (true) {
              newList.sort(() => 0.5 - Math.random());
            }

            return newList;
          });
        }

        return;
      }

      case Stage.finish: {
        playWinSound();
        return;
      }

      default: {
        // console.log('---', Stage[stage]);
      }
    }
  }, [
    stage,
    prevStage,
    learn,
    item,
    list,
    index,
    resetTranscript,
    carousel,
    isListening,
    wait,
    data.current,
    playErrorSound,
    playSuccessSound,
    playWinSound,
    setList,
    clear,
  ]);

  // Нажатие на кнопку старта
  const onStart = React.useCallback(() => {
    setStage(Stage.scoring);
  }, []);

  // Когда закончится воспроизведение фразы на изучаемом языке, переходим на этап прослушивания слова
  React.useEffect(() => {
    if (stage === Stage.scoringProcess && !isSpeaking) {
      setStage(Stage.recognition);
    }

    if (stage === Stage.translateProcess && !isSpeaking) {
      setStage(Stage.next);
    }
  }, [stage, isSpeaking]);

  // Произнести следующее слово, сразу после анимации карусели
  React.useEffect(() => {
    if (stage === Stage.nextProcess && !carousel.isAnimated) {
      setStage(Stage.scoring);
    }
  }, [stage, index, carousel.isAnimated]);

  // Если слова закончились показываем состояние ура!
  if (stage === Stage.finish) {
    return 'CLEAR!';
  }

  return (
    <div className={rootClassName}>
      <h3 className={s.title}>{TITLE}</h3>
      {/* <h1 className={s.title}>{message}</h1> */}
      <div className={s.content}>
        <Carousel
          items={list}
          index={index}
          {...carousel.props}
          render={render}
        />
        <div>
          {contexts.map((context) => (
            <p key={context} className={s.context}>
              {context}
            </p>
          ))}
        </div>
      </div>

      <div className={s.buttons}>
        {stage === Stage.start && (
          <Button onClick={onStart} disabled={false}>
            Начнём!
          </Button>
        )}
      </div>

      <div className={s.buttons}>
        <p>Microphone:{isListening ? 'on' : 'off'}</p>
      </div>
      {/* <p>{transcript}</p> */}

      <div className={s.buttons}></div>
      {/* <p>{stage}</p> */}
    </div>
  );
};

export default Memorize;
