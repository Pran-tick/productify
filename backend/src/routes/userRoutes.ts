import { Router } from "express";
import { syncUser } from "../controllers/userController";
import { requireAuth } from "@clerk/express";

const router = Router();

//api/users/sync - post => sync the clerk user to our db (Protected Route)
router.post('/sync', requireAuth() ,syncUser)

export default router;