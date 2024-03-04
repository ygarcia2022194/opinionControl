import { Router } from "express";
import { check } from "express-validator";

import {
    commentPost,
    getComments,
    commentPut,
    commentDelete
} from "./comments.controller.js";

import { validateFields } from "../middlewares/validate-fields.js"

const router = Router();

router.post(
    "/add",
    [
        check("contenido", "The content is obligatory").not().isEmpty(), // Ajusta los mensajes de error según sea necesario
        check("idPublicacion", "The publication ID is obligatory").not().isEmpty(),
        validateFields,
    ],
    commentPost
);

router.get("/", getComments);

router.put(
    "/:id",
    [
        check("contenido", "The content is obligatory").not().isEmpty(),
        validateFields
    ],
    commentPut
);

router.delete(
    "/:id",
    commentDelete
);

export default router;