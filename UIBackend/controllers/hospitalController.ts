import { Hospital } from '@models_dir/hospital';
import { hospitalCache } from "@global/caches";
import express from 'express';

import { logger } from "@global/logger";

/**
 * Controller for GET of hospital index
 * @async
 * @param req - Request for hospital index
 * @param res - Page of all hospitals
 */
export const hospitalIndexGet = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const result = Array.from(await hospitalCache.values());
        res.render('hospital_index', { hospitals: result, title: 'All hospitals' });
        logger.debug(result);
    }
    catch (err) {
        logger.error(err);
    }
};

/**
 * Controller for GET of hospital info
 * @async
 * @param req - Request for hospital info
 * @param res - Page of hospital info
 */
export const hospitalInfoGet = async (req: express.Request, res: express.Response): Promise<void> => {
    const id = req.params.id;

    try {
        let result;
        if (await hospitalCache.has(id)) {
            result = await hospitalCache.get(id);
        }
        else {
            result = await Hospital.findById(id);
            await hospitalCache.set(id, result);
        }
        res.render('hospital', { hospital: result, title: 'Hospital Info' });
    }
    catch (err) {
        logger.error(err);
        res.render('404', { title: "Couldn't find patient" });
    }
};