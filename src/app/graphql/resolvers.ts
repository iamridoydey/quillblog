/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserServices } from "@/services/userServices";
import {
  DeleteUserPayload,
  GetUserPayload,
  UpdateUserPayload,
  UserPayload,
  UserVerificationPayload,
} from "../interfaces/user";
import { BlogServices } from "@/services/blogServices";
import {
  CreateBlogPayload,
  DeleteBlogPayload,
  GetBlogPayload,
  UpdateBlogPayload,
} from "../interfaces/blog";
import {
  CreatePostPayload,
  DeletePostPayload,
  GetPostPayload,
  UpdatePostPayload,
} from "../interfaces/post";
import { PostServices } from "@/services/postServices";
import {
  CreateBlogArticlePayload,
  DeleteBlogArticlePayload,
  GetBlogArticlePayload,
  UpdateBlogArticlePayload,
} from "../interfaces/blogArticle";
import {
  CreateCommentPayload,
  DeleteCommentPayload,
  UpdateCommentPayload,
} from "../interfaces/comment";
import { BlogArticleServices } from "@/services/blogArticleServices";
import { CommentServices } from "@/services/commentServices";
import { ToggleLikePayload } from "../interfaces/like";
import { LikeServices } from "@/services/likeServices";
import {
  BlogArticleTagPayload,
  BlogTagPayload,
  PostTagPayload,
  TagPayload,
} from "../interfaces/tag";
import { TagServices } from "@/services/tagServices";
import { BlogFollowPayload, UserFollowPayload } from "../interfaces/follow";
import { FollowServices } from "@/services/followServices";

const resolvers = {
  Query: {
    // User specific queries
    getUsers: async () => {
      return await UserServices.getUsers();
    },
    getUser: async (_: any, payload: GetUserPayload) => {
      return await UserServices.getUser(payload);
    },

    // Blog specific queries
    getBlogs: async () => {
      return await BlogServices.getBlogs();
    },
    getBlog: async (_: any, payload: GetBlogPayload) => {
      return await BlogServices.getBlog(payload);
    },

    // Post speicif queries
    getPosts: async () => {
      return await PostServices.getPosts();
    },
    getPost: async (_: any, payload: GetPostPayload) => {
      return await PostServices.getPost(payload);
    },

    // BlogPost speicif queries
    getBlogArticles: async () => {
      return await BlogArticleServices.getBlogArticles();
    },
    getBlogArticle: async (_: any, payload: GetBlogArticlePayload) => {
      return await BlogArticleServices.getBlogArticle(payload);
    },
  },
  Mutation: {
    // User specific mutation
    createUser: async (_: any, payload: UserPayload) => {
      return await UserServices.createUser(payload);
    },
    updateUser: async (_: any, payload: UpdateUserPayload) => {
      return await UserServices.updateUser(payload);
    },
    deleteUser: async (_: any, payload: DeleteUserPayload) => {
      return await UserServices.deleteUser(payload);
    },

    // Verify user
    verifyUser: async (_: any, payload: UserVerificationPayload) => {
      return await UserServices.verifyUser(payload);
    },

    // Blog Specific mutation
    createBlog: async (_: any, payload: CreateBlogPayload) => {
      return await BlogServices.createBlog(payload);
    },
    updateBlog: async (_: any, payload: UpdateBlogPayload) => {
      return await BlogServices.updateBlog(payload);
    },
    deleteBlog: async (_: any, payload: DeleteBlogPayload) => {
      return await BlogServices.deleteBlog(payload);
    },

    // Post Specific mutation
    createPost: async (_: any, payload: CreatePostPayload) => {
      return await PostServices.createPost(payload);
    },
    updatePost: async (_: any, payload: UpdatePostPayload) => {
      return await PostServices.updatePost(payload);
    },
    deletePost: async (_: any, payload: DeletePostPayload) => {
      return await PostServices.deletePost(payload);
    },

    // BlogPost Specific mutation
    createBlogArticle: async (_: any, payload: CreateBlogArticlePayload) => {
      return await BlogArticleServices.createBlogArticle(payload);
    },
    updateBlogArticle: async (_: any, payload: UpdateBlogArticlePayload) => {
      return await BlogArticleServices.updateBlogArticle(payload);
    },
    deleteBlogArticle: async (_: any, payload: DeleteBlogArticlePayload) => {
      return await BlogArticleServices.deleteBlogArticle(payload);
    },

    // Comment specific mutation
    createComment: async (_: any, payload: CreateCommentPayload) => {
      const result = await CommentServices.createComment(payload);
      console.log("Comment, ", result);
      return result;
    },
    updateComment: async (_: any, payload: UpdateCommentPayload) => {
      return await CommentServices.updateComment(payload);
    },
    deleteComment: async (_: any, payload: DeleteCommentPayload) => {
      return await CommentServices.deleteComment(payload);
    },

    // Like specific mutation
    toggleLike: async (_: any, payload: ToggleLikePayload) => {
      return await LikeServices.toggleLike(payload);
    },

    // Tag specific mutation
    createTag: async (_: any, payload: TagPayload) => {
      return await TagServices.createTag(payload);
    },

    cleanUpUnusedTags: async () => {
      return await TagServices.cleanUpUnusedTags();
    },
    createPostTag: async (_: any, payload: PostTagPayload) => {
      return await TagServices.createPostTag(payload);
    },
    deletePostTag: async (_: any, payload: PostTagPayload) => {
      return await TagServices.deletePostTag(payload);
    },
    createBlogTag: async (_: any, payload: BlogTagPayload) => {
      return await TagServices.createBlogTag(payload);
    },
    deleteBlogTag: async (_: any, payload: BlogTagPayload) => {
      return await TagServices.deleteBlogTag(payload);
    },
    createBlogArticleTag: async (_: any, payload: BlogArticleTagPayload) => {
      return await TagServices.createBlogArticleTag(payload);
    },
    deleteBlogArticleTag: async (_: any, payload: BlogArticleTagPayload) => {
      return await TagServices.deleteBlogArticleTag(payload);
    },

    // Following specific mutation
    toggleUserFollow: async (_: any, payload: UserFollowPayload) => {
      return await FollowServices.toggleUserFollow(payload);
    },
    toggleBlogFollow: async (_: any, payload: BlogFollowPayload) => {
      return await FollowServices.toggleBlogFollow(payload);
    },
  },
};

export default resolvers;
