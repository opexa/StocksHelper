export default {
  getTestData: async () => {
    const res = await fetch(`api/SampleData/WeatherForecasts?startDateIndex=${0}`);
    
    return await res.json();
  }
}