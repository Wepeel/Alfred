import express from "express"
import {
    add_controller
} from "../controllers/doctor_controller"

const router: express.Router = express.Router();

router.get("/add", add_controller);

export = router;