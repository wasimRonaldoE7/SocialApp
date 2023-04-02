import express, { Express, Request, Response } from 'express';
import { config } from "dotenv";
config();
import "./database/connection";
import "./cache/connection";
import ApplicationRouter from './router/application.router';
import bodyParser from "body-parser";
import AuthRouter from './router/auth.router';
import { AuthService } from './services';
import { rateLimiter } from './middleware/rateLimiting';

const app: Express = express();
const port: number = Number(process.env.PORT) || 3000;
app.use(bodyParser.json());
app.use(rateLimiter);
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Welcome to Mini Social Media');
});
app.use('/auth', new AuthRouter().getRouter())
app.use('/api', new AuthService().verifyToken, new ApplicationRouter().getRouter());
app.listen(port, () => {
    console.log(`[Server]: I am running at https://localhost:${port}`);
});
