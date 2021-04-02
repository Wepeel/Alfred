// tslint:disable-next-line:no-var-requires
require('module-alias/register');

import express from 'express';

import patientsRoutes from '@routes_dir/patientsRoutes';
import hospitalRoutes from '@routes_dir/hospitalRoutes';
import caseRoutes from '@routes_dir/caseRoutes';
import logger from '@common/logger';
import config from "@config/config";
import mongoose from 'mongoose';

const app = express();

mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(3000);
        logger.info('Listening to port 3000')
    });


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');

app.use('/case', caseRoutes);
app.use('/patients', patientsRoutes);
app.use('/', hospitalRoutes);