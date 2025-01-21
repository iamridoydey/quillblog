/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CreateBlogArticlePayload,
  UpdateBlogArticlePayload,
  DeleteBlogArticlePayload,
  GetBlogArticlePayload,
} from "../app/interfaces/blogArticle";
import { prismaClient } from "@/lib/db";
import { cleanObject } from "@/utility/payloadHelper";

export class BlogArticleServices {
  // --------------------------------------
  //             Mutation
  // --------------------------------------
  public static async createBlogArticle(payload: CreateBlogArticlePayload) {
    try {
      const { blogId, ...data } = payload;

      console.log("Blog Article data: ", JSON.stringify(payload))

      const isExist = await prismaClient.blog.findFirst({
        where: {
          id: blogId,
        },
      });

      console.log("Is exist: ", isExist)
      if (!isExist) return {};

      const cleanObj = cleanObject(data);
      cleanObj.blogId = blogId;

      return await prismaClient.blogArticle.create({
        data: cleanObj as any,
      });
    } catch (error: any) {
      console.log("Create BlogArticle Error: ", error.message);
      return {};
    }
  }

  public static async updateBlogArticle(payload: UpdateBlogArticlePayload) {
    try {
      const { id, ...data } = payload;

      const isExist = await prismaClient.blogArticle.findFirst({
        where: {
          id,
        },
      });
      if (!isExist) return {};

      const cleanObj = cleanObject(data);
      console.log("Clean Obj: ", cleanObj);

      return await prismaClient.blogArticle.update({
        where: {
          id,
        },
        data: cleanObj as any,
      });
    } catch (error: any) {
      console.log("Update BlogArticle Error: ", error.message);
      return {};
    }
  }

  public static async deleteBlogArticle(payload: DeleteBlogArticlePayload) {
    try {
      const { id } = payload;
      return await prismaClient.blogArticle.delete({
        where: { id },
      });
    } catch (error: any) {
      console.log("Deleting BlogArticle Error: ", error.message);
      return {};
    }
  }

  // --------------------------------------
  //             Queries
  // --------------------------------------

  public static async getBlogArticles() {
    try {
      return await prismaClient.blogArticle.findMany({
        include: { likes: true, comments: true },
      });
    } catch (error: any) {
      console.log("Get BlogArticles Error: ", error.message);
      return {};
    }
  }

  public static async getBlogArticle(payload: GetBlogArticlePayload) {
    try {
      const { id } = payload;
      return await prismaClient.blogArticle.findFirst({
        where: { id },
        include: { likes: true, comments: true },
      });
    } catch (error: any) {
      console.log("Get BlogArticle Error: ", error.message);
      return {};
    }
  }
}
