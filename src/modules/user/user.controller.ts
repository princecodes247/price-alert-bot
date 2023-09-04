import User from "./user.model";
import { Request, Response } from "express";
import path from "path";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import UserService from "./user.service";

class UserController {
  async getUsers(req: Request, res: Response) {
    try {
      const { page, limit, query } = req.query as {
        page?: number;
        limit?: number;
        query?: Record<string, any>;
      };

      const result = await UserService.getUsers(page, limit, query);

      return sendResponse({
        res,
        message: "Users retrieved successfully.",
        data: {
          users: result.users,
          page,
          limit,
          total: result.totalUsersCount,
          hasMore: result.users.length < result.totalUsersCount,
        },
        success: true,
      });
    } catch (error: any) {
      return sendResponse({
        res,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Failed to retrieve users.",
        error: error.message,
        success: false,
      });
    }
  }

  getUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (id) {
      try {
        const user = await UserService.getUser(id);
        if (!user) {
          return sendResponse({
            res,
            status: StatusCodes.NOT_FOUND,
            success: false,
            message: "User not found",
          });
        }
        return sendResponse({
          res,
          status: StatusCodes.OK,
          success: true,
          message: "User data found",
          data: user,
        });
      } catch (err) {
        console.log(err);
        return sendResponse({
          res,
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          success: false,
          message: "Could not find User",
        });
      }
    } else {
      return sendResponse({
        res,
        status: StatusCodes.NOT_FOUND,
        success: false,
        message: "User not found",
      });
    }
  };
}

export default new UserController();
