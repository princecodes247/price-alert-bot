import TelegramBot from "node-telegram-bot-api";
import { TELEGRAM_TOKEN } from "../config";
import PriceService from "../modules/price/price.service";

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

bot.onText(/\/usdtprice/, (msg) => {
  const chatId = msg.chat.id;
  PriceService.sendEthPrice(chatId.toString());
});

export { bot };
