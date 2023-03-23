import React, { useContext, useReducer, useEffect } from 'react';
import dayjs from 'dayjs';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { MonthContext } from '../provider/MonthProvider';

const initialState = { monthIncr: 0 };

const reducer = (state, { type, payload }) => {
  switch (type) {
    case `NEXT_MONTH`:
      return { monthIncr: state.monthIncr + 1 };
    case `PREV_MONTH`:
      return { monthIncr: state.monthIncr - 1 };
    case `RETURN`:
      return { monthIncr: 0 };
    default:
      return state;
  }
};

function MonthNav({ months }) {
  const [currDate, setCurrDate] = useContext(MonthContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let getMonth = dayjs().add(state.monthIncr, 'month');
    setCurrDate(getMonth);
  }, [state, setCurrDate]);

  return (
    <div className='monthNav'>
      <GoChevronLeft
        className='monthBtn'
        onClick={() =>
          dispatch({
            type: 'PREV_MONTH',
            payload: { monthIncr: state.monthIncr - 1 },
          })
        }
      />

      <h1
        onClick={() =>
          dispatch({
            type: 'RETURN',
            payload: { monthIncr: 0 },
          })
        }
        className='returnMonth'
      >{`${months[currDate.$M]} ${currDate.$y}`}</h1>

      <div className='calendarView'>
        <GoChevronRight
          className='monthBtn'
          onClick={() =>
            dispatch({
              type: 'NEXT_MONTH',
              payload: { monthIncr: state.monthIncr + 1 },
            })
          }
        />
      </div>
    </div>
  );
}

export default MonthNav;
