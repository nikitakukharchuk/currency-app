import React, { useEffect, useState } from "react";
import { currencyApi } from "../../api/currencyApi";
import { CurrencyPairType } from "../../types/CurrencyPairType";
import { CurrencyTable } from "./CurrencyTable";



export const CurrencyTableContainer = () => {
  const [rates, setRates] = useState([]);
  const getRates = async (source: string): Promise<CurrencyPairType> => {
    const [usd, eur, rub] = await Promise.all([
      (await currencyApi.getCurrency(`${source}`)).data.rates.USD,
      (await currencyApi.getCurrency(`${source}`)).data.rates.EUR,
      (await currencyApi.getCurrency(`${source}`)).data.rates.RUB,
    ]);

    // Пример ниже как один из вариантов решения, при котором мы берем валюта/Cupcake как коэффициент для вычесления валютной пары.

    // const rubCupcake = 1 / rub;
    // const eurCupcake = 1 / eur;
    // const usdCupcake = 1 / usd;
    // const rubUsd = (usdCupcake) * rub;
    // const rubEur = (eurCupcake) * rub;
    // const eurUsd = (usdCupcake) * eur;

    const rubUsd = (1 / usd) * rub;
    const rubEur = (1 / eur) * rub;
    const eurUsd = (1 / usd) * eur;

    return {
      "RUB/CUPCAKE": rub,
      "USD/CUPCAKE": usd,
      "EUR/CUPCAKE": eur,
      "RUB/USD": rubUsd,
      "RUB/EUR": rubEur,
      "EUR/USD": eurUsd,
    };
  };

  const getRatesPoll = async (source: string): Promise<CurrencyPairType> => {
    const [usd, eur, rub] = await Promise.all([
      (await currencyApi.getCurrencyPoll(`${source}`)).data.rates.USD,
      (await currencyApi.getCurrencyPoll(`${source}`)).data.rates.EUR,
      (await currencyApi.getCurrencyPoll(`${source}`)).data.rates.RUB,
    ]);

    const rubUsd = (1 / usd) * rub;
    const rubEur = (1 / eur) * rub;
    const eurUsd = (1 / usd) * eur;

    return {
      "RUB/CUPCAKE": rub,
      "USD/CUPCAKE": usd,
      "EUR/CUPCAKE": eur,
      "RUB/USD": rubUsd,
      "RUB/EUR": rubEur,
      "EUR/USD": eurUsd,
    };
  };

  useEffect(() => {
    const pollSources = async () => {
      try {
        const sources = ["first", "second", "third"];
        const newRates = await Promise.all(
          sources.map(async (source: string) => await getRates(source))
        );
        const result = newRates.reduce((acc, curr) => {
          Object.entries(curr).forEach(([key, value]) => {
            if (key in acc) {
              acc[key].push(value);
            } else {
              acc[key] = [value];
            }
          });
          return acc;
        }, {});
  
        const finalResult = Object.entries(result).map(([key, value]) => ({
          [key]: value,
        }));
        setRates(finalResult);
      } catch (error) {
        console.error(error);
      }
    };
    pollSources();
    const poller = setInterval(pollSources, 1000);
    return () => clearInterval(poller);
  }, []);  

  useEffect(() => {
    async function fetchData() {
      try {
        const sourcesPoll = ["first", "second", "third"];
        const requests = sourcesPoll.map((source) => getRatesPoll(source));
        const responses = await Promise.all(requests);
        const newRatesPoll = await Promise.all(
          responses.map((response) => response)
        );
        console.log(newRatesPoll)
        const result = newRatesPoll.reduce((acc, curr) => {
          Object.entries(curr).forEach(([key, value]) => {
            if (key in acc) {
              acc[key].push(value);
            } else {
              acc[key] = [value];
            }
          });
          return acc;
        }, {});
  
        const finalResult = Object.entries(result).map(([key, value]) => ({
          [key]: value,
        }));
  
        setRates(finalResult);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  
  

  const getMostProfitable = () => {
    const values: number[] = [];
    rates.forEach((obj) => {
      Object.values(obj).forEach((val: number[]) => {
        val.map((item: number) => values.push(item));
      });
    });
    const min = Math.min(...values);
    return min;
  };

  return (
    <CurrencyTable rates={rates} getMostProfitable={getMostProfitable}/>
  );
};

export default CurrencyTableContainer;
