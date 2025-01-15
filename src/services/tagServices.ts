/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlogPostTagPayload, BlogTagPayload, PostTagPayload, TagPayload } from "@/app/interfaces/tag";
import { prismaClient } from "@/lib/db";
import { cleanObject } from "@/utility/payloadHelper";
import { Tag } from "@prisma/client";

export class TagServices {
  // --------------------------------------
  //             Mutation
  // --------------------------------------

  public static async createTag(payload: TagPayload) {
    try {
      const cleanObj = cleanObject(payload);

      if (Object.keys(cleanObj).length < 1) return false;

      const { name } = payload;

      // Check if the tag already exists
      const prevExist = await prismaClient.tag.findFirst({
        where: {
          name,
        },
      });

      if (prevExist) return prevExist;

      const tag = await prismaClient.tag.create({
        data: { name },
      });

      return tag;
    } catch (error: any) {
      console.log("Error Creating Tag:", error.message);
      return {};
    }
  }

  public static async cleanUpUnusedTags() {
    try {
      const unusedTags = await prismaClient.tag.findMany({
        where: {
          postTags: { none: {} },
          blogTags: { none: {} },
          blogPostTags: { none: {} },
        },
      });

      const unusedTagIds = unusedTags.map((tag) => tag.id);

      await prismaClient.tag.deleteMany({
        where: {
          id: { in: unusedTagIds },
        },
      });

      return true;
    } catch (error: any) {
      console.log("Clean Up Unused Tags Error:", error.message);
      return false;
    }
  }

  public static async createPostTag(payload: PostTagPayload) {
    try {
      const cleanObj = cleanObject(payload);

      if (Object.keys(cleanObj).length < 2) return {};

      const { postId, name } = payload;
      let tag: Tag;

      // Check if the tag already exists
      const isTagExist = await prismaClient.tag.findFirst({
        where: { name },
      });

      if (!isTagExist) {
        tag = await prismaClient.tag.create({
          data: { name },
        });
      } else {
        tag = isTagExist;
      }

      // Register the tag in the postTag
      return await prismaClient.postTag.create({
        data: {
          postId,
          tagId: tag.id,
        },
      });
    } catch (error: any) {
      console.log("Create Post Tag Error:", error.message);
      return {};
    }
  }

  public static async deletePostTag(payload: PostTagPayload) {
    try {
      const cleanObj = cleanObject(payload);

      if (Object.keys(cleanObj).length < 2) return {};

      const { postId, name } = payload;

      // Check if the tag exists
      const tag = await prismaClient.tag.findFirst({
        where: { name },
      });

      if (!tag) {
        console.log("Tag not found.");
        return {};
      }

      // Delete the tag from the postTag
      const postTag = await prismaClient.postTag.delete({
        where: {
          postId_tagId: {
            postId: postId,
            tagId: tag.id,
          },
        },
      });

      console.log("Deleted post tag:", postTag);
      return postTag;
    } catch (error: any) {
      console.log("Delete Post Tag Error:", error.message);
      return {};
    }
  }

  public static async createBlogTag(payload: BlogTagPayload) {
    try {
      const cleanObj = cleanObject(payload);

      if (Object.keys(cleanObj).length < 2) return {};

      const { blogId, name } = payload;
      let tag: Tag;

      // Check if the tag already exists
      const isTagExist = await prismaClient.tag.findFirst({
        where: { name },
      });

      if (!isTagExist) {
        tag = await prismaClient.tag.create({
          data: { name },
        });
      } else {
        tag = isTagExist;
      }

      // Register the tag in the postTag
      return await prismaClient.blogTag.create({
        data: {
          blogId,
          tagId: tag.id,
        },
      });
    } catch (error: any) {
      console.log("Create Blog Tag Error:", error.message);
      return {};
    }
  }

  public static async deleteBlogTag(payload: BlogTagPayload) {
    try {
      const cleanObj = cleanObject(payload);

      if (Object.keys(cleanObj).length < 2) return {};

      const { blogId, name } = payload;

      // Check if the tag exists
      const tag = await prismaClient.tag.findFirst({
        where: { name },
      });

      if (!tag) {
        console.log("Tag not found.");
        return {};
      }

      // Delete the tag from the postTag
      const blogTag = await prismaClient.blogTag.delete({
        where: {
          blogId_tagId: {
            blogId: blogId,
            tagId: tag.id,
          },
        },
      });

      return blogTag;
    } catch (error: any) {
      console.log("Delete Blog Tag Error:", error.message);
      return {};
    }
  }

  public static async createBlogPostTag(payload: BlogPostTagPayload) {
    try {
      const cleanObj = cleanObject(payload);

      if (Object.keys(cleanObj).length < 2) return {};

      const { blogPostId, name } = payload;
      let tag: Tag;

      // Check if the tag already exists
      const isTagExist = await prismaClient.tag.findFirst({
        where: { name },
      });

      if (!isTagExist) {
        tag = await prismaClient.tag.create({
          data: { name },
        });
      } else {
        tag = isTagExist;
      }

      // Register the tag in the postTag
      return await prismaClient.blogPostTag.create({
        data: {
          blogPostId,
          tagId: tag.id,
        },
      });
    } catch (error: any) {
      console.log("Create Blog Post Tag Error:", error.message);
      return {};
    }
  }

  public static async deleteBlogPostTag(payload: BlogPostTagPayload) {
    try {
      const cleanObj = cleanObject(payload);

      if (Object.keys(cleanObj).length < 2) return {};

      const { blogPostId, name } = payload;

      // Check if the tag exists
      const tag = await prismaClient.tag.findFirst({
        where: { name },
      });

      if (!tag) {
        console.log("Tag not found.");
        return {};
      }

      // Delete the tag from the postTag
      const postTag = await prismaClient.blogPostTag.delete({
        where: {
          blogPostId_tagId: {
            blogPostId: blogPostId,
            tagId: tag.id,
          },
        },
      });

      console.log("Deleted post tag:", postTag);
      return postTag;
    } catch (error: any) {
      console.log("Delete Post Tag Error:", error.message);
      return {};
    }
  }
}
