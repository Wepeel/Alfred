import { Hospital } from '@models_dir/hospital';
import { hospitalCache } from "@global/caches"
import express from 'express'

import logger from "@common/logger"

export const hospitalIndexGet = async (req: express.Request, res: express.Response) => {
    try {
        const result = Array.from(await hospitalCache.values());
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
        const result = await hospitalCache.get(id);
        res.render('hospital', { hospital: result, title: 'Hospital Info' });
    }
    catch (err) {
        logger.error(err);
        res.render('404', { title: "Couldn't find patient" });
    };
};