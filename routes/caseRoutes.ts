import express from 'express';
import {casePost} from '../controllers/caseController';

const router = express.Router();

export = router;

router.post('/', casePost);
