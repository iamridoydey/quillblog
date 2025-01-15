import { gql } from "graphql-tag";

const typeDefs = gql`
  scalar Json
  scalar Date

  type User {
    id: ID!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    profilePic: String
    coverPic: String
    title: String
    bio: String
    birthDate: Date
    location: String
    createdAt: Date
    posts: [Post]
    blogs: [Blog]
    blogPosts: [BlogPost]
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
    blogPosts: [BlogPost]
    tags: [Tag]
    followers: [User]
  }

  type BlogPost {
    id: ID!
    userId: ID!
    blogId: ID!
    title: String!
    thumbnail: String
    content: Json!
    likes: [Like!]
    comments: [Comment!]
    createdAt: Date!
    blogPostTags: [BlogPostTag]
  }

  type Post {
    id: ID!
    userId: ID!
    thumbnail: String
    content: Json!
    likes: [Like!]
    comments: [Comment!]
    createdAt: Date!
    postTags: [PostTag]
  }

  type Comment {
    id: ID!
    userId: ID!
    postId: ID
    blogPostId: ID
    content: Json!
    likes: [Like!]
    isEdited: Boolean
    createdAt: String!
  }

  type Tag {
    id: ID!
    name: String!
    blogTags: [BlogTag]
    postTags: [PostTag]
    blogPostTags: [BlogPostTag]
  }

  type BlogTag {
    blogId: ID!
    tagId: ID!
  }

  type BlogPostTag {
    blogPostId: ID!
    tagId: ID!
  }

  type PostTag {
    postId: ID!
    tagId: ID!
  }

  type UserFollow {
    followerId: ID!
    followedId: ID!
    createdAt: String!
  }

  type UserFollowsBlog {
    userId: ID!
    blogId: ID!
  }

  type Like {
    id: ID!
    userId: ID!
    postId: ID
    blogPostId: ID
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

    # BlogPost specific queries
    getBlogPosts: [BlogPost]
    getBlogPost(id: ID!): BlogPost
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
      coverpic: String
    ): Blog
    deleteBlog(id: ID!): Blog

    # Post specific mutation
    createPost(userId: ID!, thumbnail: String, content: Json!): Post
    updatePost(id: ID!, thumbnail: String, content: Json): Post
    deletePost(id: ID!): Post

    # BlogPost specific mutation
    createBlogPost(
      userId: ID!
      blogId: ID!
      title: String!
      thumbnail: String
      content: Json!
    ): BlogPost
    updateBlogPost(id: ID!, thumbnail: String, content: Json): BlogPost
    deleteBlogPost(id: ID!): BlogPost

    # Like specific mutation
    toggleLike(
      userId: ID!
      postId: ID
      blogPostId: ID
      commentId: ID
    ): Int

    # Comment specific mutation
    createComment(
      userId: ID!
      postId: ID
      blogPostId: ID
      content: Json!
    ): Comment
    updateComment(id: ID!, content: String!): Comment
    deleteComment(id: ID!): Comment

    # Tag specific mutation
    createTag(name: String!): Tag
    cleanUpUnusedTags: Boolean
    createPostTag(postId: ID!, name: String!): PostTag
    deletePostTag(postId: ID!, name: String!): PostTag
    createBlogTag(blogId: ID!, name: String!): BlogTag
    deleteBlogTag(blogId: ID!, name: String!): BlogTag
    createBlogPostTag(blogPostId: ID!, name: String!): BlogPostTag
    deleteBlogPostTag(blogPostId: ID!, name: String!): BlogPostTag

    #Follow specific mutation
    toggleUserFollow(followerId: ID!, followedId: ID!): UserFollow
    toggleBlogFollow(userId: ID!, blogId: ID!): UserFollowsBlog
  }
`;

export default typeDefs;
