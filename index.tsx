import React from 'react';
import ReactDOM from 'react-dom';
import CurrencyTableContainer from './src/pages/currency-table/CurrencyTableContainer';

const App = () => {
  return <CurrencyTableContainer/>;
};

ReactDOM.render(<App />, document.getElementById('root'));
