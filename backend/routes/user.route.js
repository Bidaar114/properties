import express from "express";
import {
  deleteUser,
  getUsers,
  updateUser,
  savePost,
  profilePosts,
  getNotificationNumber,
  getUser
} from "../controllers/user.js";
import {verifyToken} from "../middleware/verifyToken.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/search/:id", verifyToken, getUser);
userRouter.put("/:id", verifyToken, updateUser);
userRouter.delete("/:id", verifyToken, deleteUser);
userRouter.post("/save", verifyToken, savePost);
userRouter.get("/profilePosts", verifyToken, profilePosts);
userRouter.get("/notification", verifyToken, getNotificationNumber);

export default userRouter;
