import express from "express"
import postRouter from "./routes/post.route.js";
import authRouter from "./routes/auth.route.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import testRouter from "./routes/test.route.js";
import userRouter from "./routes/user.route.js";
import chatRouter from "./routes/chat.route.js";
import messageRouter from "./routes/message.route.js";

const app = express();
app.use(express.json())
app.use(cookieParser());


app.use(cors({ 
    origin:'http://localhost:5173',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    }));
 


app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter)
app.use("/api/test",testRouter);
app.use("/api/users",userRouter)
app.use("/api/chats",chatRouter);
app.use("/api/chats",chatRouter)
app.use("/api/messages",messageRouter)


app.listen (8000, () => {
    console.log ("Server is runing!")
});