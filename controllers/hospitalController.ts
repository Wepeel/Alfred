import { Hospital } from '@models_dir/hospital';
import express from 'express'

import logger from "@common/logger"

export const hospitalIndexGet = async (req: express.Request, res: express.Response) => {
    try {
        const result = await Hospital.find().sort({ createdAt: -1 })
        res.render('hospital_index', { hospitals: result, title: 'All hospitals' });
        logger.debug(result);
    }
    catch (err) {
        logger.error(err);
    };
};

export const hospitalInfoGet = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    try {
        const result = await Hospital.findById(id);
        res.render('hospital', { hospital: result, title: 'Hospital Info' });
    }
    catch (err) {
        logger.error(err);
        res.render('404', { title: "Couldn't find patient" });
    };
};