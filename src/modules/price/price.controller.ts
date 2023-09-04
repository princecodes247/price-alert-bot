import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import PriceService from "./price.service";

class PriceController {
  async getEthPrice(req: Request, res: Response) {
    try {
      const currentPrice = await PriceService.fetchETHPrice();

      return sendResponse({
        res,
        message: "Price fetched.",
        data: currentPrice,
        success: true,
      });
    } catch (error: any) {
      return sendResponse({
        res,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Failed to fetch price.",
        error: error.message,
        success: false,
      });
    }
  }
}

export default new PriceController();
