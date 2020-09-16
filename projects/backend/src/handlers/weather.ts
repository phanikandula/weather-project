import axios from 'axios';
import { Request, Response } from 'express';

interface WeatherResponse {
    current: string;
    high: string,
    low: string,
}

type WeatherService = (zip: string) => Promise<WeatherResponse>;

const stubResponse: WeatherResponse = { current: '80.3', high: '97.0', low: '72' };
const nullResponse: WeatherResponse = { current: '', high: '', low: '' };

const isValidUSZip = (zip: string) => { return (/^\d{5}$/).test(zip)}

export const StubWeatherService: WeatherService = async (zip) => (stubResponse);

export const OpenWeatherService: WeatherService =  async (zip) => {
    const COUNTRY = 'us';
    const API_KEY = process.env.OPEN_WEATHER_API_KEY;
    const req = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},${COUNTRY}&appid=${API_KEY}&units=imperial`;
    const res = await axios.get(req);
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
