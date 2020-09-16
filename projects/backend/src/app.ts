import express from 'express';
import { rootHandler } from './handlers/root';
import { helloHandler } from './handlers/hello';

import morgan from 'morgan';
import compression from 'compression';
import responsetime from 'response-time';

export const app = express();

app.use(morgan('combined'));
app.use(compression());
app.use(responsetime());
app.get('/', rootHandler);
app.get('/hello/:name', helloHandler);
