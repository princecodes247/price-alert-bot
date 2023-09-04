import admin from "firebase-admin";
import {
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_PROJECT_ID,
} from "../config";
import moment from "moment";

const firebaseConfig = {
    credential: admin.credential.cert({
      projectId: FIREBASE_PROJECT_ID,
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      clientEmail: FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  }



// Initialize Firebase Admin SDK
admin.initializeApp(firebaseConfig);

class FCM {
  static sendPushNotificationToGeneral(
    title: string,
    message: string,
    resource_link?: string
  ) {
    let messageData = {
      notification: {
        title,
        body: message ?? "",
      },

      data: {
        message,
        resource_link: resource_link ?? "",
        type: "general",
        created_at: moment().format(),
        click_action: "FLUTTER_NOTIFICATION_CLICK",
      },

      android: {
        notification: {
          sound: "default",
          click_action: "FLUTTER_NOTIFICATION_CLICK",
        },
      },

      topic: "general",
    };

    // console.log("::::::::::::::::::::::", message)

    admin
      .messaging()
      .send(messageData)
      .then((response) => {
        console.log("Notifications response:+++====>>> ", response);
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  }
  static sendPushNotificationToUser(
    deviceTokens: string[],
    title: string,
    body: string,
    imageUrl?: string,
    resource_link?: string
  ) {
    const androidNotification: any = {
      sound: "default",
      click_action: "FLUTTER_NOTIFICATION_CLICK",
    };

    if (imageUrl) androidNotification.imageUrl = imageUrl;

    let messageData = {
      notification: {
        title,
        body,
      },

      data: {
        body,
        resource_link: resource_link ?? "",
        type: "individual",
        created_at: moment().format(),
        click_action: "FLUTTER_NOTIFICATION_CLICK",
      },

      android: {
        notification: androidNotification,
      },

      token: deviceTokens[0],
    };

    admin
      .messaging()
      .send(messageData)
      .then((response) => {
        console.log("Successfully sent push notification:", response);
      })
      .catch((error) => {
        console.error("Error sending push notification:", error);
      });
  }
}

export default FCM;
