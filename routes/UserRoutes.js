import express from 'express';
import { registerUser } from "../controllers/UserController.js";

const router = express.Router();

router.post('/users/register', registerUser);

export { router as UserRoute };
