import express from 'express';
import {
    patientIndexGet,
    patientInfoGet,
    patientIndexPost,
    patientIndexDelete,
    patientIndexPut
} from '@controllers_dir/patientController';

const router = express.Router();

router.get('/', patientIndexGet);

router.get('/:id', patientInfoGet);

router.post('/', patientIndexPost);

router.delete('/:id', patientIndexDelete);

router.put('/:id', patientIndexPut);

export = router;