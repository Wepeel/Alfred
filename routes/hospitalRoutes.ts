import express from 'express';
import {
    hospitalIndexGet,
    hospitalInfoGet
} from '@controllers_dir/hospitalController'

const router = express.Router();

router.get('/', hospitalIndexGet);

router.get('/:id', hospitalInfoGet);

export = router;