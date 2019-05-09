import * as rp from "request-promise";

import { IRates } from "./../interfaces/IExchangeRateApi";

const BASE_API_URL = "https://api.exchangeratesapi.io";

export const getCurrencies = async (): Promise<string[]> => {
  const options: rp.OptionsWithUri = {
    json: true,
    method: "GET",
    uri: `${BASE_API_URL}/latest`
  };

  const response: IRates = await rp(options);
  return [response.base].concat(Object.keys(response.rates));
};

export const getConversion = async (
  base: string,
  quote: string
): Promise<number> => {
  const options: rp.OptionsWithUri = {
    json: true,
    method: "GET",
    uri: `${BASE_API_URL}/latest?base=${base}&symbols=${quote}`
  };

  const response: IRates = await rp(options);
  return response.rates[quote];
};
