import React from 'react';
import cn from 'classnames';

import { Micro } from '@components/icons';
import { Button, Select, Checkbox, Chips } from '@components/ui';
import { useVoicesConfig } from '@hooks/useVoicesConfig';

import { Menu } from './menu';
import s from './Menu.module.scss';

const mainlangs = [
  { value: 'ru', label: 'Русском' },
  { value: 'de', label: 'Немецком' },
  { value: 'en', label: 'Английском' },
  { value: 'fr', label: 'Французский' },
];

const langs = [
  { value: 'ru', label: 'Русский' },
  { value: 'de', label: 'Немецкий' },
  { value: 'en', label: 'Английский' },
];

const getChips = (config) =>
  config.voices
    .map((id) => config.allVoices.find((voice) => voice?.id === id))
    .filter(Boolean);

const VoiceSettings = () => {
  const { main, learn, save: onSave, speak: onSpeak } = useVoicesConfig();

  const learnChips = getChips(learn);
  const mainChips = getChips(main);

  return (
    <section className={s.wrapper}>
      <Menu />
      <div className={s.settings}>
        <h1 className={s.title}>Языки</h1>
        <div className={s.row}>
          <span className={s.label}>Я говорю на</span>
          <Select
            options={mainlangs}
            value={main.lang}
            placeholder="Выберите язык"
            onChange={(value) => main.setLang(value)}
          />
        </div>

        <div>
          {main.allVoices.length > 0 && (
            <>
              <div className={s.row}>
                <span className={s.label}>Голос</span>
                <Chips
                  options={mainChips}
                  hasRemove={true}
                  deleteAriaLabel="Удалить голос"
                  onRemove={(id) => {
                    main.apply(false, id);
                  }}
                  onChange={(id) => {
                    const voice = mainChips.find((voice) => voice.id === id);

                    onSpeak(voice)();
                  }}
                />
              </div>

              <div className={s.row}>
                <span className={s.label}> </span>
                <ul className={s.group}>
                  {main.allVoices.map((voice) => {
                    const actived = main.voices.includes(voice.id);

                    return (
                      <li
                        key={voice.id}
                        className={cn(s.voice, {
                          [s['voice--active']]: actived,
                        })}
                      >
                        <Checkbox
                          name={voice.id}
                          checked={actived}
                          label={voice.name}
                          onChange={main.apply}
                        />
                        <Micro className={s.micro} onClick={onSpeak(voice)} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          )}
        </div>

        <div className={s.row}>
          <span className={s.label}>Изучаю язык</span>
          <Select
            options={langs}
            value={learn.lang}
            placeholder="Выберите язык"
            onChange={(value) => learn.setLang(value)}
          />
        </div>

        <div>
          {learn.allVoices.length > 0 && (
            <>
              <div className={s.row}>
                <span className={s.label}>Голос</span>
                <Chips
                  options={learnChips}
                  hasRemove={true}
                  deleteAriaLabel="Удалить голос"
                  onRemove={(id) => {
                    learn.apply(false, id);
                  }}
                  onChange={(id) => {
                    const voice = learnChips.find((voice) => voice.id === id);

                    onSpeak(voice)();
                  }}
                />
              </div>

              <div className={s.row}>
                <span className={s.label}> </span>
                <ul className={s.group}>
                  {learn.allVoices.map((voice) => {
                    const actived = learn.voices.includes(voice.id);

                    return (
                      <li
                        key={voice.id}
                        className={cn(s.voice, {
                          [s['voice--active']]: actived,
                        })}
                      >
                        <Checkbox
                          name={voice.id}
                          checked={actived}
                          label={voice.name}
                          onChange={learn.apply}
                        />
                        <Micro className={s.micro} onClick={onSpeak(voice)} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          )}
        </div>

        <footer className={s.footer}>
          <Button variant="slim" type="button">
            Сбросить
          </Button>
          <Button variant="slim" type="button" onClick={onSave as any}>
            Применить
          </Button>
        </footer>
      </div>
    </section>
  );
};

export { VoiceSettings };
