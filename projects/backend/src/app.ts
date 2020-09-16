import express from 'express';
import { rootHandler } from './handlers/root';
import { helloHandler } from './handlers/hello';
import { weatherHandler } from './handlers/weather';

import morgan from 'morgan';
import compression from 'compression';
import responsetime from 'response-time';

export const app = express();

app.use(morgan('combined'));
app.use(compression());
app.use(responsetime());
app.get('/', rootHandler);
app.get('/hello/:name', helloHandler);
app.get('/weather/:zip', weatherHandler);

//NOTE: No caching of Open Weather API responses in MVP.
//Plan is to add Redis caching post MVP.