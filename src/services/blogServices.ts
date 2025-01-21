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
    // Check whether the user exist or not
    const isUserExist = await prismaClient.user.findFirst({
      where: {
        id: cleanObj.userId as string,
      },
    });

    if (!isUserExist) return {};

    // Check whether the user has any prior blog or not
    const hasPriorBlog = await prismaClient.blog.findFirst({
      where: {
        userId: cleanObj.userId as string,
      },
    });

    if (hasPriorBlog) return {};

    // Check whethere there is any blog exist in this short name
    const isBlogExist = await prismaClient.blog.findFirst({
      where: {
        shortName: cleanObj.shortName as string,
      },
    });

    if (isBlogExist) return {};
    return await prismaClient.blog.create({
      data: cleanObj as any,
    });
  }

  // Update a blog
  public static async updateBlog(payload: UpdateBlogPayload) {
    const { id, ...data } = payload;
    const cleanObj = cleanObject(data);

    const isExist = await prismaClient.blog.findUnique({
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
      // Fetch blog by userId since it's unique
      if (key.userId) {
        return await prismaClient.blog.findUnique({
          where: {
            userId: key.userId as string,
          },
        });
      }
      // Fallback to other filters (id, shortName, etc.)
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
