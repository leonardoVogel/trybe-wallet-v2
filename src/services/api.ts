export const getExchangeRates = async () => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const requestJson = await request.json();
  delete requestJson.USDT;
  return requestJson;
};

export const getCurrencies = async () => {
  const request = await getExchangeRates();
  return Object.keys(request);
};
