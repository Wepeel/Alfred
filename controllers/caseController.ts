import express from 'express';
import { logger } from '@global/logger';

import { doctorClient } from "@global/grpc";


export const casePost = (req: express.Request, res: express.Response) => {
    doctorClient.FindDisease(req.params, (err, response) => {
        logger.debug(response);
    });
};