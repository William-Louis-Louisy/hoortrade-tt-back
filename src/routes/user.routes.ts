import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const userRouter = Router();

// CREATE USER
userRouter.post("/signup", userController.createUser);

// RETRIEVE USERS
userRouter.get("/retrieve-users-list", userController.retrieveUsers);

// UPDATE USER
userRouter.put("/update-user/:userId", userController.updateUser);

// DELETE USER
userRouter.delete("/delete-user/:userId", userController.deleteUser);

// LOGIN
userRouter.post("/login", userController.login);

// LOGOUT
userRouter.post("/logout", userController.logout);

// CHECK AUTH
userRouter.get("/check-auth", requireAuth, userController.checkAuth);

export default userRouter;
