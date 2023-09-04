import { UserModel } from ".";
import User from "./user.model";

class UserService {
  findUserByEmailOrPhone = async ({
    email,
    phone,
  }: {
    email: string;
    phone: string;
  }) => {
    try {
      const user = await User.findOne({
        $or: [{ email }, { phone }],
      });
      return user;
    } catch (error) {
      throw error;
    }
  };

  async getUsers(page = 1, pageSize = 10, query = {}) {
    try {
      const skip = (page - 1) * pageSize;
      const [users, totalUsersCount] = await Promise.all([
        UserModel.find(query)
          .sort({ createdAt: -1 })
          .select("-password") // Exclude the password field
          .skip(skip)
          .limit(pageSize)
          .exec(),
        UserModel.countDocuments(query),
      ]);

      return {
        users,
        totalUsersCount,
      };
    } catch (error) {
      throw new Error("Failed to retrieve users.");
    }
  }

  async getUser(userId: string) {
    try {
      const user = await User.findById(userId).select("-password").exec();
      return user;
    } catch (error) {
      throw new Error("Failed to retrieve user.");
    }
  }

  async updateOnlineStatus(userId: string, isOnline: boolean) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found.");
      }
      if (user.isOnline === isOnline) {
        return;
      }

      if (!isOnline) {
        user.lastSeen = new Date();
        user.isOnline = false;
      } else {
        user.isOnline = true;
      }
      await user.save();
    } catch (error) {
      throw new Error("Failed to update online status.");
    }
  }

  async getUserDeviceTokens(userId: string): Promise<string> {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found.");
      }

      return user?.deviceToken ?? "";
    } catch (error) {
      throw new Error("Failed to update online status.");
    }
  }
}

export default new UserService();
