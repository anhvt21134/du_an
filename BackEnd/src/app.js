import express from 'express';
import productsRouter from './router/products';
import categoryRouter from './router/category';
import authRouter from './router/auth';
import UploadRouter from './router/upload';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', productsRouter);
app.use('/api', categoryRouter);
app.use('/api', authRouter);
app.use('/api', UploadRouter);


// mongoose.connect("mongodb://localhost:27017/we17303");
mongoose.connect('mongodb://127.0.0.1:27017/Book');
export const viteNodeApp = app;
