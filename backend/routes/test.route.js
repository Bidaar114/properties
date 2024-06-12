import express from "express"
import { shouldBeAdmin, shouldBeLoggedIn } from "../controllers/test.js";
import { verifyToken } from "../middleware/verifyToken.js";

const testRouter = express.Router();

testRouter.get("/should-be-loged-in", verifyToken, shouldBeLoggedIn)

testRouter.get("/should-be-admin", shouldBeAdmin)


export default testRouter;