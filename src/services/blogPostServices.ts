/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CreateBlogPostPayload,
  DeleteBlogPostPayload,
  GetBlogPostPayload,
  UpdateBlogPostPayload,
} from "@/app/interfaces/blogPost";
import { prismaClient } from "@/lib/db";
import { cleanObject } from "@/utility/payloadHelper";

export class BlogPostServices {
  // --------------------------------------
  //             Mutation
  // --------------------------------------
  public static async createBlogPost(payload: CreateBlogPostPayload) {
    try {
      const { blogId, ...data } = payload;

      const isExist = await prismaClient.blogPost.findFirst({
        where: {
          id: blogId,
        },
      });

      if (!isExist) return {};

      const cleanObj = cleanObject(data);
      cleanObj.blogId = blogId;

      return await prismaClient.blogPost.create({
        data: cleanObj as any,
      });
    } catch (error: any) {
      console.log("Create BlogPost Error: ", error.message);
      return {};
    }
  }

  public static async updateBlogPost(payload: UpdateBlogPostPayload) {
    try {
      const { id, ...data } = payload;

      const isExist = await prismaClient.blogPost.findFirst({
        where: {
          id,
        },
      });
      if (!isExist) return {};

      const cleanObj = cleanObject(data);
      console.log("Clean Obj: ", cleanObj);

      return await prismaClient.blogPost.update({
        where: {
          id,
        },
        data: cleanObj as any,
      });
    } catch (error: any) {
      console.log("Update BlogPost Error: ", error.message);
      return {};
    }
  }

  public static async deleteBlogPost(payload: DeleteBlogPostPayload) {
    try {
      const { id } = payload;
      return await prismaClient.blogPost.delete({
        where: { id },
      });
    } catch (error: any) {
      console.log("Deleting BlogPost Error: ", error.message);
      return {};
    }
  }

  // --------------------------------------
  //             Queries
  // --------------------------------------

  public static async getBlogPosts() {
    try {
      return await prismaClient.blogPost.findMany({
        include: { likes: true, comments: true },
      });
    } catch (error: any) {
      console.log("Get BlogPosts Error: ", error.message);
      return {};
    }
  }

  public static async getBlogPost(payload: GetBlogPostPayload) {
    try {
      const { id } = payload;
      return await prismaClient.blogPost.findFirst({
        where: { id },
        include: { likes: true, comments: true },
      });
    } catch (error: any) {
      console.log("Get BlogPost Error: ", error.message);
      return {};
    }
  }
}
