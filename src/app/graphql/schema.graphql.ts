import { gql } from "graphql-tag";

const typeDefs = gql`
  scalar JSON
  scalar Date

  type User {
    id: ID!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    profilePic: String
    coverPic: String
    isVerified: Boolean
    title: String
    bio: String
    birthDate: Date
    location: String
    createdAt: Date
    posts: [Post]
    blogs: [Blog]
    blogArticles: [BlogArticle]
    comments: [Comment]
    following: [User]
    followers: [User]
    followedBlogs: [Blog]
  }

  type Blog {
    id: ID!
    userId: ID!
    shortName: String!
    title: String!
    description: String
    createdAt: Date!
    coverPic: String
    blogArticles: [BlogArticle]
    tags: [Tag]
    followers: [User]
  }

  type BlogArticle {
    id: ID!
    userId: ID!
    blogId: ID!
    title: String!
    thumbnail: String
    content: JSON!
    likes: [Like!]
    comments: [Comment!]
    createdAt: Date!
    blogArticleTags: [BlogArticleTag]
  }

  type Post {
    id: ID!
    userId: ID!
    thumbnail: String
    content: JSON!
    likes: [Like!]
    comments: [Comment!]
    createdAt: Date!
    postTags: [PostTag]
  }

  type Comment {
    id: ID!
    userId: ID!
    postId: ID
    blogArticleId: ID
    content: JSON!
    likes: [Like!]
    isEdited: Boolean
    createdAt: Date!
  }

  type Tag {
    id: ID!
    name: String!
    blogTags: [BlogTag]
    postTags: [PostTag]
    blogArticleTags: [BlogArticleTag]
  }

  type BlogTag {
    blogId: ID!
    tagId: ID!
  }

  type BlogArticleTag {
    blogArticleId: ID!
    tagId: ID!
  }

  type PostTag {
    postId: ID!
    tagId: ID!
  }

  type UserFollow {
    followerId: ID!
    followedId: ID!
    createdAt: Date!
  }

  type UserFollowsBlog {
    userId: ID!
    blogId: ID!
  }

  type Like {
    id: ID!
    userId: ID!
    postId: ID
    blogArticleId: ID
    commentId: ID
    createdAt: Date!
  }

  type Query {
    # User specific queries
    getUsers: [User]
    getUser(id: ID, email: String, username: String): User

    # Blog specific queries
    getBlogs: [Blog]
    getBlog(id: ID, userId: ID, shortName: String, title: String): Blog

    # Post specific queries
    getPosts: [Post]
    getPost(id: ID!): Post

    # BlogArticle specific queries
    getBlogArticles: [BlogArticle]
    getBlogArticle(id: ID!): BlogArticle
  }

  type Mutation {
    createUser(email: String!, password: String!): User
    updateUser(
      id: ID!
      firstName: String
      lastName: String
      username: String
      email: String
      profilePic: String
      coverPic: String
      title: String
      bio: String
      birthDate: Date
      location: String
    ): User

    deleteUser(id: ID!): User

    # Verify user
    verifyUser(token: String!): Boolean

    # Blog specific mutation
    createBlog(
      userId: ID!
      shortName: String!
      title: String!
      description: String
      coverPic: String
    ): Blog
    updateBlog(
      id: ID!
      shortName: String
      title: String
      description: String
      coverPic: String
    ): Blog
    deleteBlog(id: ID!): Blog

    # Post specific mutation
    createPost(userId: ID!, thumbnail: String, content: JSON!): Post
    updatePost(id: ID!, thumbnail: String, content: JSON): Post
    deletePost(id: ID!): Post

    # BlogArticle specific mutation
    createBlogArticle(
      userId: ID!
      blogId: ID!
      title: String!
      thumbnail: String
      content: JSON!
    ): BlogArticle
    updateBlogArticle(id: ID!, thumbnail: String, content: JSON): BlogArticle
    deleteBlogArticle(id: ID!): BlogArticle

    # Like specific mutation
    toggleLike(userId: ID!, postId: ID, blogArticleId: ID, commentId: ID): Int

    # Comment specific mutation
    createComment(
      userId: ID!
      postId: ID
      blogArticleId: ID
      content: JSON!
    ): Comment
    updateComment(id: ID!, content: JSON!): Comment
    deleteComment(id: ID!): Comment

    # Tag specific mutation
    createTag(name: String!): Tag
    cleanUpUnusedTags: Boolean
    createPostTag(postId: ID!, name: String!): PostTag
    deletePostTag(postId: ID!, name: String!): PostTag
    createBlogTag(blogId: ID!, name: String!): BlogTag
    deleteBlogTag(blogId: ID!, name: String!): BlogTag
    createBlogArticleTag(blogArticleId: ID!, name: String!): BlogArticleTag
    deleteBlogArticleTag(blogArticleId: ID!, name: String!): BlogArticleTag

    # Follow specific mutation
    toggleUserFollow(followerId: ID!, followedId: ID!): UserFollow
    toggleBlogFollow(userId: ID!, blogId: ID!): UserFollowsBlog
  }
`;

export default typeDefs;
