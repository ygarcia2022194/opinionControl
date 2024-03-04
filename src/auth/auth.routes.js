import { Router } from "express";
import {check} from "express-validator";

import { validateFields } from "../middlewares/validate-fields.js";
import { login } from "./auth.controller.js";

const router = Router();

router.post(
    '/login',
    [
        check('usuario', 'The email or username is obligatory').not().isEmpty(),
        check('password', 'The password is obligatory').not().isEmpty(),
        validateFields
    ],login);

export default router;