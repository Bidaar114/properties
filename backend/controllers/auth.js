import bcrypt from 'bcrypt'
import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();


export const register = async (req, res) => {


    const {username, email, password} = req.body;
    try {

    const hashedPassword = await bcrypt.hash(password, 10);

   const newUser = await prisma.user.create({
    data:{
        username,
        email,
        password: hashedPassword,
    }
   });

//    if(!newUser) return res.status(401).json({message: "Invalid User!"})

   console.log(newUser);   
   res.status(201).json({message:"User Created successfully"}) 

}catch(err){
    console.log(err);
    res.status(500).json({message: "failed to create user!"})
}
};

export const login = async (req, res) => {

  console.log(req.body);
    const { username, password } = req.body;


  
    try {
      // CHECK IF THE USER EXISTS
  
      const user = await prisma.user.findUnique({
        where: { username },
      });
  
      if (!user) return res.status(400).json({ message: "Invalid Credentials!" });
  
      // CHECK IF THE PASSWORD IS CORRECT
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid)
        return res.status(400).json({ message: "Invalid Credentials!" });
  
      // GENERATE COOKIE TOKEN AND SEND TO THE USER
  
      // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")
      const age = 1000 * 60 * 60 * 24 * 7;
  
      const token = jwt.sign(
        {
          id: user.id,
          isAdmin: true,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: age }
      );
  
      const { password: userPassword, ...userInfo } = user;
  
      res
        .cookie("token", token, {
          httpOnly: true,
          // secure:true,
          maxAge: age,
        })
        .status(200)
        .json(userInfo);


     
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to login!" });
    }
  };
  
  export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logout Successful" });
  };
  