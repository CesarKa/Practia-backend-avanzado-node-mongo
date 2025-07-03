import jwt from "jsonwebtoken";
import User from "../..//models/User.js";
import createHttpError from "http-errors";
import bcrypt from 'bcrypt';

export async function loginJWT(req, res, next) {
  try {
    const { email, password } = req.body;
    console.log(email, password)
    
    const user = await User.findOne({ email })
    if (!user) {
      next(createHttpError(401, "Invalid credentials"));
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      next(createHttpError(401, "Invalid credentials"));
      return;
    }

    jwt.sign(
      { user_id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
      (err, tokenJWT) => {
        if (err) {
          return next(err);
        }
        res.json({ tokenJWT });
      }
    );
  } catch (err) {
    next(err);
  }
}