import express from 'express';
import { logger } from '@global/logger';


export const casePost = (req: express.Request, res: express.Response) => {
    logger.info("HI");
};