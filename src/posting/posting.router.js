import { Router } from "express";
import { check } from "express-validator";


import {
publicationsPost,
publicationsGet,
publicationsPut,
publicationsDelete
} from "./posting.controller.js";

import { existPostById } from "../helpers/db-validators.js"

import { validateFields } from "../middlewares/validate-fields.js"
import { validarJWT } from "../middlewares/validate-jwt.js";


const router = Router();

router.post(
    "/add",
    [
        validarJWT,
        check("titulo", "The title is obligatory").not().isEmpty(),
        check("categoria", "The category is obligatory").not().isEmpty(),
        check("texto", "The principal text is obligatory").not().isEmpty(),
        validateFields,
    ], publicationsPost);

router.get("/", publicationsGet);

router.put(
    "/:id",
    [
        validarJWT,
        check("titulo", "The title is obligatory").not().isEmpty(),
        check("categoria", "The category is obligatory").not().isEmpty(),
        check("texto", "The principal text is obligatory").not().isEmpty(),
        validateFields
    ],
    publicationsPut
);

router.delete(
    "/:id",
    validarJWT,
    publicationsDelete
);

export default router;