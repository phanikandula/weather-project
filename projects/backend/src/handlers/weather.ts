import { Request, Response } from 'express';

interface WeatherResponse {
    current: string;
    high: string,
    low: string,
}

type WeatherService = (zip: string) => WeatherResponse;

const stubResponse: WeatherResponse = { current: '80.3', high: '97.0', low: '72' };
const nullResponse: WeatherResponse = { current: '', high: '', low: '' };

const isValidUSZip = (zip: string) => { return (/^\d{5}$/).test(zip)}

export const StubWeatherService: WeatherService = zip => (stubResponse);

//support only US zip codes for MVP.
export const weatherHandler = (req: Request, res: Response) => {
    const { params } = req;
    if ((params.zip === null) ||
        !isValidUSZip(params.zip)) 
        return res.json(nullResponse);


    const response = StubWeatherService(params.zip);

    return res.json(response);
};
