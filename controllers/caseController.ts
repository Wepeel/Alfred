import express from 'express';
import { logger } from '@global/logger';

import { doctorClient } from "@global/grpc";

/**
 * Controller for POST of a case
 * @async
 * @param req - Request for POST case
 * @param res - Response for case POST request
 */
export const casePost = async (req: express.Request, res: express.Response): Promise<void> => {
    doctorClient.FindDisease(req.params, (err, response) => {
        logger.error(err);
        logger.debug(response);
    });
    res.send("BYE");
};