import { ChainId, Token, Fetcher, WETH, Route } from "@uniswap/sdk";
import { toChecksumAddress } from "ethereum-checksum-address";
import axios from "axios";
import { bot } from "../../commands";

// Uniswap API URL for Ethereum price
const uniswapAPIURL =
  "https://api.1inch.exchange/v3.0/1/quote?fromTokenAddress=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&toTokenAddress=0x2170ed0880ac9a755fd29b2688956bd959f933f8&amount=1";

class PriceService {
  fetchETHPrice = async () => {
    try {
      const chainId = ChainId.MAINNET;
      const tokenAddress = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52"; // must be checksummed
      const checksum = toChecksumAddress(tokenAddress);

      console.log({ checksum });
      // const DAI: Token = await Fetcher.fetchTokenData(chainId, checksum);
      const USDT: Token = new Token(
        ChainId.MAINNET,
        "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        6
      );

      console.log({ USDT });
      const pair = await Fetcher.fetchPairData(USDT, WETH[USDT.chainId]);

      const route = new Route([pair], WETH[USDT.chainId]);
      const amount = route.midPrice.toSignificant(6);
      const ethAmount = route.midPrice.invert().toSignificant(6);
      console.log(amount);
      console.log(ethAmount);

      return ethAmount + " ETH";
    } catch (error: any) {
      console.log({ error });
    }
  };
  // Function to fetch Ethereum price from Uniswap
  getEthPriceFromUniswap = async () => {
    try {
      const response = await axios.get(uniswapAPIURL);
      const data = response.data;
      const ethPrice = data.toTokenAmount / data.fromTokenAmount;
      return ethPrice.toFixed(2); // Format to 2 decimal places
    } catch (error) {
      console.error("Error fetching Ethereum price from Uniswap:", error);
      return null;
    }
  };

  // Function to send Ethereum price to a Telegram chat
  async sendEthPrice(chatId: string) {
    const price = await this.fetchETHPrice();
    if (price !== null) {
      bot.sendMessage(chatId, `Current Ethereum price: $${price}`);
    } else {
      bot.sendMessage(
        chatId,
        "Unable to fetch Ethereum price at the moment. Please try again later."
      );
    }
  }
}

export default new PriceService();
