const getCurrentCurrency = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currentCurrency = await response.json();
  const arrayCurrency = Object.keys(currentCurrency);
  const currencies = arrayCurrency.filter((currency) => currency !== 'USDT');
  return currencies;
};

export default getCurrentCurrency;
