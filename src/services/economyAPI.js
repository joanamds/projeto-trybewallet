const getCurrentCurrency = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currentCurrency = await response.json();
  return currentCurrency;
};

export default getCurrentCurrency;
