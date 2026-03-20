import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import errorHandler from './middlewares/errorHandler';
import logger from './middlewares/logger';
import notFound from './middlewares/notFound';
import tasksRouter from './routes/tasks';
import authRouter from './routes/auth';

const app = express();

app.use(express.json());
app.use(logger);

app.use('/tasks', tasksRouter);
app.use('/auth', authRouter);

app.use(notFound);
app.use(errorHandler)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;