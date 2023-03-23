import dayjs from 'dayjs';
import React, { createContext, useState } from 'react';

const MonthContext = createContext();

function MonthProvider(props) {
  const [currDate, setCurrDate] = useState(dayjs());

  return (
    <MonthContext.Provider value={[currDate, setCurrDate]}>
      {props.children}
    </MonthContext.Provider>
  );
}

export { MonthContext, MonthProvider };
