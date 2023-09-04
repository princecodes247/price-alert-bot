import { NotificationService } from "../modules/notification";
import { UserService } from "../modules/user";
import eventEmitter from "./base";
import { EventEmitterEvents } from "./events.interface";

eventEmitter.on(EventEmitterEvents.ItemClaimed, async (eventData) => {
  const { userId } = eventData;
  const userDeviceToken = await UserService.getUserDeviceTokens(userId);
  const title = "Item Claimed";
  const body = "Your item has been claimed!";
  NotificationService.sendPushNotification(title, body, [userDeviceToken]);
});
