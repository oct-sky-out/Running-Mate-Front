import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../modules/index';
import { counterActions } from '../modules/counter';

const Counter = () => {
  const dispatch = useDispatch();
  const { number } = useSelector((selector) => selector.counter);

  return (
    <>
      <div>number : {number}</div>
      <button
        type="button"
        onClick={() => dispatch(counterActions.increment({ number }))}
      >
        증가
      </button>
      <button
        type="button"
        onClick={() => dispatch(counterActions.decrement({ number }))}
      >
        감소
      </button>
    </>
  );
};

export default Counter;
