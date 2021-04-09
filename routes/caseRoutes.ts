import express from 'express';
import { casePost } from "@controllers_dir/caseController";

const router = express.Router();

export = router;

router.post('/', casePost);
