class Forecast {
  constructor() {
    this.key = "OvtviQl38aGyYztfLG0p7oXGUvYFQSg8";
    this.weatherURI = `http://dataservice.accuweather.com/currentconditions/v1/`;
    this.cityURI = `http://dataservice.accuweather.com/locations/v1/cities/search`;
  }

  async getWeather(cityKey) {
    const query = `${cityKey}?apikey=${this.key}`;
    const response = await fetch(this.weatherURI + query);
    const data = await response.json();
    return data[0];
  }

  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.cityURI + query);
    const data = await response.json();
    return data[0];
  }

  async updateCity(city) {
    const cityDets = await this.getCity(city);
    const weather = await this.getWeather(cityDets.Key);
    return { cityDets, weather };
  }
}
