/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlogFollowPayload, UserFollowPayload } from "@/app/interfaces/follow";
import { prismaClient } from "@/lib/db";

export class FollowServices {
  public static async toggleUserFollow(payload: UserFollowPayload) {
    try {
      const { followerId, followedId } = payload;

      // Check if the follower and followed users exist
      const followerUser = await prismaClient.user.findFirst({
        where: { id: followerId },
      });

      if (!followerUser) {
        console.log("Follower user not found.");
        return {};
      }

      const followingUser = await prismaClient.user.findFirst({
        where: { id: followedId },
      });

      if (!followingUser) {
        console.log("User to follow not found.");
        return {};
      }

      // Check if the follow relationship already exists
      const isFollowing = await prismaClient.userFollow.findFirst({
        where: {
          followerId,
          followedId,
        },
      });

      if (!isFollowing) {
        // Create a new follow relationship if it doesn't exist
        const newFollow = await prismaClient.userFollow.create({
          data: {
            followerId,
            followedId,
          },
        });
        return newFollow;
      } else {
        // Delete the follow relationship if it already exists
        const deletedFollow = await prismaClient.userFollow.delete({
          where: {
            followerId_followedId: {
              followerId,
              followedId,
            },
          },
        });
        return deletedFollow;
      }
    } catch (error: any) {
      console.log("Follow User Error:", error.message);
      return {};
    }
  }

  public static async toggleBlogFollow(payload: BlogFollowPayload) {
    try {
      const { userId, blogId } = payload;

      console.log("Blog follow payload:", payload);

      // Check if the blog to be followed exists
      const followingBlog = await prismaClient.blog.findFirst({
        where: {
          id: blogId,
        },
      });

      if (!followingBlog) {
        console.log("Blog to follow not found.");
        return {};
      }

      // Check if the follow relationship already exists
      const isFollowing = await prismaClient.userFollowsBlog.findFirst({
        where: {
          userId,
          blogId,
        },
      });

      if (!isFollowing) {
        // Create a new follow relationship if it doesn't exist
        const newFollow = await prismaClient.userFollowsBlog.create({
          data: {
            userId,
            blogId,
          },
        });
        return newFollow;
      } else {
        // Delete the follow relationship if it already exists
        const deletedFollow = await prismaClient.userFollowsBlog.delete({
          where: {
            userId_blogId: {
              userId,
              blogId,
            },
          },
        });
        return deletedFollow;
      }
    } catch (error: any) {
      console.log("Follow Blog Error:", error.message);
      return {};
    }
  }
}
