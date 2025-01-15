/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CreateBlogPayload,
  GetBlogPayload,
  DeleteBlogPayload,
  UpdateBlogPayload,
} from "@/app/interfaces/blog";
import { prismaClient } from "@/lib/db";
import { cleanObject } from "@/utility/payloadHelper";

export class BlogServices {
  // --------------------------------------
  //             Mutation
  // --------------------------------------

  // Create a blog
  public static async createBlog(payload: CreateBlogPayload) {
    // Should have at least three entities
    const cleanObj = cleanObject(payload);

    if (Object.keys(cleanObj).length < 3) return {};

    const isExist = await prismaClient.blog.findFirst({
      where: {
        shortName: cleanObj.shortName as string,
      },
    });

    if (isExist) return {};
    return await prismaClient.blog.create({
      data: cleanObj as any,
    });
  }

  // Update a blog
  public static async updateBlog(payload: UpdateBlogPayload) {
    const { id, ...data } = payload;
    const cleanObj = cleanObject(data);

    const isExist = await prismaClient.blog.findFirst({
      where: {
        id: cleanObj.id as string,
      },
    });

    if (!isExist) return {};

    try {
      return await prismaClient.blog.update({
        where: { id },
        data: cleanObj,
      });
    } catch (error: any) {
      console.log("Updating Blog Error ", error.message);
      return {};
    }
  }

  // Delete a blog
  public static async deleteBlog(payload: DeleteBlogPayload) {
    if (!payload || !payload.id) return {};

    try {
      return await prismaClient.blog.delete({
        where: {
          id: payload.id,
        },
      });
    } catch (error: any) {
      console.log("Error deleting blog:", error.message);
      return {};
    }
  }

  // --------------------------------------
  //             Queries
  // --------------------------------------

  // Get all the blogs
  public static async getBlogs() {
    return await prismaClient.blog.findMany({});
  }

  // Get a single blog
  public static async getBlog(payload: GetBlogPayload) {
    // Key should contain only one key {id, userId, shortName, title}
    const key = cleanObject(payload);

    try {
      return await prismaClient.blog.findFirst({
        where: {
          ...key,
        },
      });
    } catch (error: any) {
      console.log("Get Blog Error:", error.message);
      return {};
    }
  }
}
