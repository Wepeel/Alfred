import { Hospital } from '@models_dir/hospital';
import Doctor from "@models_dir/doctor";
import express from 'express';
import { logger } from '@common/logger'

export const casePost = (req: express.Request, res: express.Response) => {
    logger.info("HI");
}