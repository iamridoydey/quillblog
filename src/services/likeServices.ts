/* eslint-disable @typescript-eslint/no-explicit-any */
import { prismaClient } from "@/lib/db";
import { ToggleLikePayload } from "@/app/interfaces/like";
import { cleanObject } from "@/utility/payloadHelper";

export class LikeServices {
  public static async toggleLike(payload: ToggleLikePayload) {
    const cleanObj = cleanObject(payload);

    // Check if the user exists
    const isValidUser = await prismaClient.user.findFirst({
      where: {
        id: payload.userId as string,
      },
    });

    if (!isValidUser) return 0;

    // Check if the like already exists
    const isLiked = await prismaClient.like.findFirst({
      where: {
        postId: cleanObj.postId as string,
        userId: cleanObj.userId as string,
      },
    });

    if (!isLiked) {
      // Create a new like if it doesn't exist
      await prismaClient.like.create({
        data: { ...(cleanObj as any) },
      });
      return 1;
    } else {
      // Remove the like if it already exists
      await prismaClient.like.delete({
        where: {
          id: isLiked.id,
        },
      });
      return -1;
    }
  }
}
