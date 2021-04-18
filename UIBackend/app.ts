require('module-alias/register');

import express from 'express';

import patientsRoutes from '@routes_dir/patientsRoutes';
import hospitalRoutes from '@routes_dir/hospitalRoutes';
import { logger } from '@global/logger';
import morgan from 'morgan';
import config from "@config/config";
import mongoose from 'mongoose';
import { initializeCaches } from "@global/caches";


const app = express();

mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        initializeCaches().then(() => {
            logger.info('Listening to port 3000');
            app.listen(3000);
        });
    });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.set('view engine', 'ejs');

app.use('/patients', patientsRoutes);
app.use('/hospitals', hospitalRoutes);