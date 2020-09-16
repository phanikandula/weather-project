import axios from 'axios';
import { Request, Response } from 'express';

//The one interface we want to return irrespective of which weather service we use.
//Can be extended in future to include more information like wind direction, sun rise, sun set time etc.
interface WeatherResponse {
    current: string;
    high: string,
    low: string,
}

//The interface we want all the service implementations to conform to.
//Can be extended in future to take additional information like geolocation, city name etc.
type WeatherService = (zip: string) => Promise<WeatherResponse>;

//Stub response for cases when we want to use a stub implementation and skip external services.
const stubResponse: WeatherResponse = { current: '80.3', high: '97.0', low: '72' };
//To implement null object pattern and return same data structure in case of errors.
const nullResponse: WeatherResponse = { current: '', high: '', low: '' };

//For MVP only US zip codes are considered.
//Can be extended to include zip codes of other countries once we include those countries in our scope.
const isValidUSZip = (zip: string) => { return (/^\d{5}$/).test(zip)}

//The stub implementation - it's used when service starts up and user didn't provide API key for Open Weather service.
//This allows us to test the plumbing and have something user can use instead of having a broken system till
//API key info becomes available.
export const StubWeatherService: WeatherService = async (zip) => (stubResponse);

export const OpenWeatherService: WeatherService =  async (zip) => {
    const COUNTRY = 'us';
    const API_KEY = process.env.OPEN_WEATHER_API_KEY;
    const req = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},${COUNTRY}&appid=${API_KEY}&units=imperial`;
    //NOTE: No timeouts, retry or handling of rate limiting for MVP.
    //Using axios here instead of fetch so that we can we can add those features post MVP easily.
    const res = await axios.get(req);
    //Response from Open Weather has lot more information
    //See https://openweathermap.org/weather-data
    //For MVP we collect only current, high and low of the day.
    const answer: WeatherResponse = {current: res.data.main.temp, high: res.data.main.temp_max, low: res.data.main.temp_min}
    return answer;
};
//support only US zip codes for MVP.
export const weatherHandler = async (req: Request, res: Response) => {
    const { params } = req;
    if ((params.zip === null) ||
        !isValidUSZip(params.zip)) 
        return res.json(nullResponse);

    let response;
    if (process.env.OPEN_WEATHER_API_KEY) {
        console.log('Using Open Weather info.');
        response = await OpenWeatherService(params.zip);
    }
    else {
        console.log('Using Stub weather info.');
        response = await StubWeatherService(params.zip);
    }
    
    return res.json(response);
};
