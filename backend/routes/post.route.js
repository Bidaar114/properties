import express from "express";
import { addPost, deletePost, getPost, getPosts, updatePost, getSavedPost } from "../controllers/post.js";
import { verifyToken } from "../middleware/verifyToken.js";

const postRouter = express.Router();

postRouter.get("/", getPosts);
postRouter.get("/", verifyToken, getSavedPost);
postRouter.get("/:id", getPost);
postRouter.post("/", verifyToken, addPost);
postRouter.put("/:id", verifyToken, updatePost);
postRouter.delete("/:id", verifyToken, deletePost);

export default postRouter;

