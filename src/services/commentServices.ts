/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CreateCommentPayload,
  DeleteCommentPayload,
  UpdateCommentPayload,
} from "@/app/interfaces/comment";
import { prismaClient } from "@/lib/db";
import { cleanObject } from "@/utility/payloadHelper";

export class CommentServices {
  // --------------------------------------
  //             Mutation
  // --------------------------------------
  public static async createComment(payload: CreateCommentPayload) {
    try {
      const { userId, ...data } = payload;

      // Check whether the user exist or not
      const isExist = await prismaClient.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (!isExist) return {};
      const cleanObj = cleanObject(data);
      // Object should contain content, (blogPostId | postId)
      if (Object.keys(cleanObj).length < 2) return {};

      // Check whether the blogPost or post exist or not
      if (cleanObj.postId) {
        const post = await prismaClient.post.findFirst({
          where: {
            id: cleanObj.postId,
          },
        });

        if (!post) return {};
      }

      if (cleanObj.blogPostId) {
        const blogPost = await prismaClient.blogPost.findFirst({
          where: {
            id: cleanObj.blogPostId,
          },
        });

        if (!blogPost) return {};
      }

      cleanObj.userId = userId;
      return await prismaClient.comment.create({
        data: cleanObj as any,
      });
    } catch (error: any) {
      console.log("Create Comment Error: ", error.message);
      return {};
    }
  }

  public static async updateComment(payload: UpdateCommentPayload) {
    try {
      const { id, ...data } = payload;

      const isExist = await prismaClient.comment.findFirst({
        where: {
          id: id,
        },
      });

      if (!isExist) return {};

      const cleanObj = cleanObject(data);

      return await prismaClient.comment.update({
        where: {
          id,
        },
        data: cleanObj as any,
      });
    } catch (error: any) {
      console.log("Update Comment Error: ", error.message);
      return {};
    }
  }

  public static async deleteComment(payload: DeleteCommentPayload) {
    try {
      const { id } = payload;
      return await prismaClient.comment.delete({
        where: { id },
      });
    } catch (error: any) {
      console.log("Delete Comment Error: ", error.message);
      return {};
    }
  }
}
