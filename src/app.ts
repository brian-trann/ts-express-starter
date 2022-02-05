import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { NotFound } from 'http-errors';
import { AppError } from './types';
import { usersRouter } from './modules';

const createApp = async () => {
    const app = express();
    /**
     * Middleware
     */
    app.use(morgan('tiny'));
    app.use(express.json());

    /**
     * API Routes
     */
    app.use('/api/v1/users', usersRouter);

    /**
     * Error Handling Middleware
     */

    // 404 Handler
    app.use((req, res, next) => {
        return next(new NotFound());
    });

    // 500 - Something went wrong
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((err: AppError, req: Request, res: Response, _next: NextFunction) => {
        const status = err.status || 500;
        const message = err.message;

        return res.status(status).json({ error: { message, status } });
    });
    return app;
};

export default createApp;
