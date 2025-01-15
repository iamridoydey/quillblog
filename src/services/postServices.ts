/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CreatePostPayload,
  DeletePostPayload,
  GetPostPayload,
  UpdatePostPayload,
} from "@/app/interfaces/post";
import { prismaClient } from "@/lib/db";
import { cleanObject } from "@/utility/payloadHelper";

export class PostServices {
  // --------------------------------------
  //             Mutation
  // --------------------------------------
  public static async createPost(payload: CreatePostPayload) {
    try {
      const { userId, ...data } = payload;

      const isExist = await prismaClient.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (!isExist) return {};

      const cleanObj = cleanObject(data);
      cleanObj.userId = userId;

      return await prismaClient.post.create({
        data: cleanObj as any,
      });
    } catch (error: any) {
      console.log("Create Post Error: ", error.message);
      return {};
    }
  }

  public static async updatePost(payload: UpdatePostPayload) {
    try {
      const { id, ...data } = payload;

      const isExist = await prismaClient.post.findFirst({
        where: {
          id: id,
        },
      });

      if (!isExist) return {};

      const cleanObj = cleanObject(data);

      return await prismaClient.post.update({
        where: {
          id,
        },
        data: cleanObj as any,
      });
    } catch (error: any) {
      console.log("Update Post Error: ", error.message);
      return {};
    }
  }

  public static async deletePost(payload: DeletePostPayload) {
    try {
      const { id } = payload;
      return await prismaClient.post.delete({
        where: { id },
      });
    } catch (error: any) {
      console.log("Deleting Post Error: ", error.message);
      return {};
    }
  }

  // --------------------------------------
  //             Queries
  // --------------------------------------

  public static async getPosts() {
    try {
      return await prismaClient.post.findMany({
        include: { likes: true, comments: true },
      });
    } catch (error: any) {
      console.log("Get Posts Error: ", error.message);
      return {};
    }
  }

  public static async getPost(payload: GetPostPayload) {
    try {
      const { id } = payload;
      return await prismaClient.post.findFirst({
        where: { id },
        include: { likes: true, comments: true },
      });
    } catch (error: any) {
      console.log("Get Post Error: ", error.message);
      return {};
    }
  }
}
