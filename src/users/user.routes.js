import { Router } from "express";
import { check } from "express-validator";

import {
  usuariosPost,
  usuariosGet,
  usuariosPut
} from "./user.controller.js";

import {
    existUserById,
    existEmails,
    existUsernames
} from "../helpers/db-validators.js";

import { validateFields } from "../middlewares/validate-fields.js";
import { validarJWT } from "../middlewares/validate-jwt.js";
const router = Router();

router.get("/", usuariosGet);


router.post(
  "/",
  [
    check("nombre", "The name is obligatory").not().isEmpty(),
    check("password", "Password must be longer than 6 characters").isLength({
      min: 6,
    }),
    check("correo", "This is not a valid email").isEmail(),
    check("correo").custom(existEmails),
    check("username").custom(existUsernames),
    validateFields,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [ 
    validarJWT,
    check("id", "Not a valid ID").isMongoId(),
    check("id").custom(existUserById),
    validateFields,
  ],
  usuariosPut
);



    export default router;