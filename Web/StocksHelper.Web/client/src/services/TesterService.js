import httpClient from '../infrastructure/httpClient';

export default {
  getTestData: async () => {
    return await httpClient.get(`api/SampleData/WeatherForecasts?startDateIndex=${0}`, false);
  }
}