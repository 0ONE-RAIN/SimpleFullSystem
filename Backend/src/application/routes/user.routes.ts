import { Router } from "express";
import { UserRepository } from "../../infrastructure/repositories/user.repository.js";
import { UserController } from "../../infrastructure/http/controllers/user.controller.js";
import { UserService } from "../services/user.services.js";
import { validateRequest } from "../../infrastructure/http/middleware/validRequest.middleware.js";
import { createUserSchema } from "../../infrastructure/http/schemas/createUser.schema.js";
import { validateParams } from "../../infrastructure/http/middleware/validParams.middleware.js";
import { getUserByIdSchema } from "../../infrastructure/http/schemas/getUserById.schema.js";
import { updateUserSchema } from "../../infrastructure/http/schemas/updateUser.schema.js";
import { validateQuery } from "../../infrastructure/http/middleware/validQuery.middleware.js";
import { searchQueryAddressQuerySchema } from "../../infrastructure/http/schemas/searchAddressQuery.schema.js";
import { paginationQuerySchema } from "../../infrastructure/http/schemas/paginationQuery.schema.js";

const userRouter = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.post("/", validateRequest(createUserSchema), userController.create);

userRouter.get("/", validateQuery(paginationQuerySchema), userController.getAll);

userRouter.get(
  "/buscar",
  validateQuery(searchQueryAddressQuerySchema),
  userController.searchByAddress,
);

userRouter.get("/:id", validateParams(getUserByIdSchema), userController.getById);

userRouter.delete("/:id", validateParams(getUserByIdSchema), userController.deleteById);

userRouter.put(
  "/:id",
  validateParams(getUserByIdSchema),
  validateRequest(updateUserSchema),
  userController.updateById,
);

export default userRouter;
