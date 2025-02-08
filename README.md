
# Blog Management 

A full-stack blog platform built with  **Next.js (App Router), Next.js API Routes, GraphQL, TypeScript, Prisma, and PostgreSQL.** This project includes user authentication (JWT-based), CRUD operations for blog posts, and a responsive UI.


## 🚀 Live Demo

Live Link: [Deployed on Vercel](https://blog-management-lilac.vercel.app)


## 📌 Features

**1. User Authentication**
- User signup, login, and logout.
- JWT-based authentication (secure storage using HTTP-only cookies)

**2. Blog Post Management**
- Create, read, update, and delete (CRUD) blog posts.
- View all posts with pagination.
- Search posts by title or category.

**3. Additional Features**
- SEO-optimized pages using SSG/ISR/SSR where appropriate.
- Proper error handling and loading states.
- Fully responsive (mobile-first design).


## 🏗️ Tech Stack

- **Frontend:** Next.js (App Router), React, Apollo Client, TailwindCSS
- **Backend:** Next.js API Routes, Apollo Server, GraphQL, Prisma ORM

- **Database:** PostgreSQL (hosted on a Neon Serverless Postgres)

- **Authentication:** JWT (stored in HTTP-only cookies)

## 🔧 Setup Instructions

**1. Clone the Repository**

```bash
  https://github.com/MTsrf/Blog-Management.git
  cd Blog-Management
```

**2. Install Dependencies**

```bash
  yarn install
```

**3. Configure Environment Variables**

Create a ``.env.local`` file in the root directory and add the following:
```bash
DATABASE_URL=postgresql:// ***** link****
JWT_SECRET=your-secret-key
NEXT_PUBLIC_API_URL=http://localhost:8000/api/graphql
AUTH_SECRET=auth-secret-key
```

**4. Setup Prisma & Database**

```bash
npx prisma migrate dev --name init
npx prisma generate
```

**5. Start the Development Server**
```bash
yarn dev
```
Your app will be available at http://localhost:8000



## 🚀 Deployment

To deploy this project run

- Push code to GitHub.
- Set Up GitHub Actions for Vercel Deployment.
- Create a GitHub Actions Workflow File
- Add environment variables in Vercel settings.



## 🔍 GraphQL API Overview

**Queries**

```bash
//Get All Post
export const POSTS_LIST = gql`
  query getPosts($page: Int!, $limit: Int!, $search: String) {
    getPosts(page: $page, limit: $limit, search: $search) {
      posts {
        id
        title
        content
        updatedAt
        author {
          id
          name
        }
      }
      pageInfo {
        currentPage
        totalPages
        hasNextPage
        hasPreviousPage
      }
      totalPosts
    }
  }
`;

//Get Post By Id
export const GET_POST_BY_ID = gql`
  query getPostById($id: ID!) {
    getPostById(id: $id) {
      status
      message
      success
      data {
        id
        title
        content
        createdAt
        updatedAt
        author {
          id
          name
        }
      }
    }
  }
`;

```

**Mutations**
```bash

export const SIGNUP_MUTATION = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      status
      message
      success
      data {
        token
        user {
          id
          name
          email
        }
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      status
      message
      success
      data {
        token
        user {
          id
          name
          email
        }
      }
    }
  }
`;


//Create Post 
export const CREATE_POST = gql`
  mutation createPost($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      status
      message
      success
      data {
        title
        content
        createdAt
        updatedAt
      }
    }
  }
`;

//Edit Post
export const EDIT_POST = gql`
  mutation editPost($id: ID!, $input: EditPostInput!) {
    editPost(id: $id, input: $input) {
      status
      message
      success
      data {
        id
        title
        content
        updatedAt
      }
    }
  }
`;

//Delete Post
export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      status
      message
      success
    }
  }
`;

```
