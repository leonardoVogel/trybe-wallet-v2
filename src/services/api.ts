export const getExchangeRates = async () => {
  try {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const requestStatus = request.status;

    if (requestStatus === 200) {
      const data = await request.json();
      delete data.USDT;
      return data;
    };

    if (requestStatus > 400 && requestStatus <= 500) {
      return new Error('Request error')
    };
  } catch (error) {
    return error
  }
};

export const getCurrencies = async () => {
  const request = await getExchangeRates();
  return Object.keys(request);
};
