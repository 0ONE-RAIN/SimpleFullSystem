import { Request, Response, NextFunction } from "express";
import { CreateUserDTO } from "../../../application/dtos/createUserDTO.js";
import { UpdateUserDTO } from "../../../application/dtos/updateUserDTO.js";
import { UserService } from "../../../application/services/user.services.js";
import { UserMapper } from "../../../application/mappers/user.mapper.js";
import { PaginationResponse } from "../../../application/shared/paginationResponse.js";
import { SearchAddressQueryDTO } from "../schemas/searchAddressQuery.schema.js";
import { PaginationDTO } from "../schemas/paginationQuery.schema.js";

export class UserController {
  constructor(private readonly userService: UserService) {}

  private buildPagination<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
  ): PaginationResponse<T> {
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    };
  }

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateUserDTO;
      const user = await this.userService.createUser(dto);
      res.status(201).json({
        success: true,
        data: UserMapper.toResponse(user),
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id as string;
      const user = await this.userService.getUserById(id);
      res.status(200).json({
        success: true,
        data: UserMapper.toResponse(user),
      });
    } catch (error) {
      next(error);
    }
  };

  deleteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id as string;
      await this.userService.deleteById(id);
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page, limit } = res.locals.query as PaginationDTO;
      const result = await this.userService.getAllUser(page, limit);
      const response = this.buildPagination(
        result.users.map(UserMapper.toResponse),
        result.total,
        page,
        limit,
      );
      res.status(200).json({
        success: true,
        ...response,
      });
    } catch (error) {
      next(error);
    }
  };

  updateById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id as string;
      const dto = req.body as UpdateUserDTO;
      const updatedUser = await this.userService.updateUser(id, dto);
      res.status(200).json({
        success: true,
        data: UserMapper.toResponse(updatedUser),
      });
    } catch (error) {
      next(error);
    }
  };

  searchByAddress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { street, city, country, zipCode, page, limit } =
        res.locals.query as SearchAddressQueryDTO;
      const result = await this.userService.getUsersByQueryAddress(
        { street, city, country, zipCode },
        page,
        limit,
      );
      const response = this.buildPagination(
        result.users.map(UserMapper.toResponse),
        result.total,
        page,
        limit,
      );
      res.status(200).json({
        success: true,
        ...response,
      });
    } catch (error) {
      next(error);
    }
  };
}
