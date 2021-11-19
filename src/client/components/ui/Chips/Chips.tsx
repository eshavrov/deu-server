import React from 'react';

import { Cross } from '@components/icons';

import s from './Chips.module.scss';

/**
 * Chip - это компактный компонент, который представляет дискретную информацию.
 */
export const Chip = (props) => {
  const {
    id,
    name,
    deleteAriaLabel,
    hasRemove = true,
    onChange,
    onRemove,
  } = props;

  const _onChange = React.useCallback(() => {
    if (!onChange) {
      return;
    }

    onChange(id ?? name, name);
  }, [onChange]);

  const _onChangeRemove = React.useCallback(() => {
    if (!onRemove || !hasRemove) {
      return;
    }

    onRemove(id ?? name, name);
  }, [onRemove]);

  return (
    <li title={name} className={s.badge}>
      <span className={s.content} onClick={_onChange}>
        {name}
      </span>
      {hasRemove && (
        <button
          type="button"
          className={s.close}
          aria-keyshortcuts="Delete"
          aria-label={deleteAriaLabel}
          onClick={_onChangeRemove}
        >
          <Cross />
        </button>
      )}
    </li>
  );
};

/**
 * Компонент Chips - группа компактных компонент, которые представляют какую-то дискретную информацию.
 */
const Chips = (props) => {
  const {
    options = [],
    onRemove,
    onChange,
    hasRemove = false,
    deleteAriaLabel = 'Удалить голос',
  } = props;

  const _onChange = React.useCallback(
    (id, name) => {
      if (!onChange) {
        return;
      }

      onChange(
        id ?? name,
        options.find((item) => item.id === id || item.id === name),
      );
    },
    [onChange],
  );

  const _onChangeRemove = React.useCallback(
    (id, name) => {
      if (!onRemove) {
        return;
      }

      onRemove(
        id ?? name,
        options.find((item) => item.id === id || item.id === name),
      );
    },
    [onRemove],
  );

  return (
    <div role="group" className={s.root}>
      <ul className={s.list}>
        {options.map((item) => {
          const id = item.id ?? item.name;

          return (
            <Chip
              key={id}
              name={item.name}
              deleteAriaLabel={deleteAriaLabel}
              hasRemove={hasRemove}
              onChange={_onChange}
              onRemove={_onChangeRemove}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Chips;
