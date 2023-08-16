import { Router } from "express";
import { ContactController } from "../controller/ContactController";

const router = Router()

router.post('', ContactController.saveContact)
router.get('',ContactController.hola)

export default router