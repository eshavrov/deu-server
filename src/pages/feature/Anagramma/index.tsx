import Letter from '@components/ui/Letter/index';
import s from './Anagramma.module.scss';

export default function Anagramma() {

  return (
      <div className={s.word}>
        <Letter width='50px' height='50px' background='#000'>
          h
        </Letter>
        <Letter width='50px' height='50px' background='#000'>
          e
        </Letter>
        <Letter width='50px' height='50px' background='#000'>
          l
        </Letter>
        <Letter width='50px' height='50px' background='#000'>
          l
        </Letter>
        <Letter width='50px' height='50px' background='#000'>
          o
        </Letter>
      </div>
  )
}
