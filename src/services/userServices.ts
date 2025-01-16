/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  DeleteUserPayload,
  GetUserPayload,
  UpdateUserPayload,
  UserPayload,
  UserVerificationPayload,
} from "@/app/interfaces/user";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prismaClient } from "@/lib/db";
import { cleanObject } from "@/utility/payloadHelper";

export class UserServices {
  // --------------------------------------
  //             Mutation
  // --------------------------------------

  public static async createUser(payload: UserPayload) {
    const { email, password } = payload;
    const name = email.split("@")[0];

    const user = await prismaClient.user.create({
      data: {
        firstName: name,
        username: name,
        email,
        password,
      },
    });

    return user;
  }

  public static async updateUser(payload: UpdateUserPayload) {
    const { id, ...data } = payload;
    const cleanedData = cleanObject(data);
    try {
      return await prismaClient.user.update({
        where: { id },
        data: cleanedData,
      });
    } catch (error) {
      console.log("Error updating user:", error);
      return {};
    }
  }

  public static async deleteUser(payload: DeleteUserPayload) {
    if (!payload || !payload.id) return {};

    try {
      return await prismaClient.user.delete({
        where: {
          id: payload.id,
        },
      });
    } catch (error: any) {
      console.log("Error ", error.message);
      return {};
    }
  }

  public static async verifyUser(payload: UserVerificationPayload) {
    try {
      const { token } = payload;
      const SECRET_KEY = "pritedeyquillblog";

      const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

      if (!decoded || typeof decoded === "string") {
        console.log("Not a valid token!");
        return false;
      }
      // Check whether the user exists
      const user = await prismaClient.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        console.log("User not found!");
        return false;
      }
      // Update the user's verification status
      await prismaClient.user.update({
        where: { id: decoded.userId },
        data: { isVerified: true },
      });

      console.log("User verified successfully!");
      return true;
    } catch (error: any) {
      console.log("User Verification Error: ", error.message);
      return false;
    }
  }

  // --------------------------------------
  //             Queries
  // --------------------------------------

  public static async getUsers() {
    const users = prismaClient.user.findMany({});
    return users;
  }

  public static async getUser(payload: GetUserPayload) {
    const where = cleanObject(payload);
    try {
      return await prismaClient.user.findFirst({
        where: where as any,
      });
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
    }
  }
}
