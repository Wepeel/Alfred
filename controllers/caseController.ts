import express from 'express';
import { logger } from '@global/logger';

import { doctorClient } from "@global/grpc";


export const casePost = async (req: express.Request, res: express.Response) => {
    doctorClient.FindDisease(req.params, (err, response) => {
        logger.error(err);
        logger.debug(response);
    });
    res.send("BYE");
};