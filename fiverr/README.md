<<<<<<< HEAD
# SkillBridge

A full-stack web application inspired by Fiverr where users can create gigs, browse services, and hire freelancers. The platform allows freelancers to showcase their skills while clients can find and purchase services easily.

## Features

* User Authentication (Login / Register)
* Create, edit and delete gigs
* Browse gigs by category
* Order services from freelancers
* Secure backend API
* Responsive UI
* Database integration for storing users and gigs

## Tech Stack

**Frontend**

* React.js
* Tailwind CSS
* Axios

**Backend**

* Node.js
* Express.js

**Database**

* PostgreSQL
* Prisma ORM

 Project Structure

```
Fiver-Clone
│
├── client
│   ├── src
│   ├── components
│   └── pages
│
├── server
│   ├── controllers
│   ├── routes
│   └── middleware
│
├── prisma
│   └── schema.prisma
│
├── package.json
└── README.md
```

##  Installation

### 1. Clone the repository

```
git clone https://github.com/akshitasyal/Fiver-Clone.git
```

### 2. Navigate to the project folder

```
cd Fiver-Clone
```

### 3. Install dependencies

```
npm install
```

### 4. Setup environment variables

Create a `.env` file in the root directory and add:

```
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_secret_key
```

### 5. Run the development server

```
npm run dev
```

The application should now be running locally.

##  Screenshots

![Home Page](homepage.png)

Example:

* Home Page
* Gig Listing Page
* Gig Details Page
* User Dashboard

##  Future Improvements

* Payment integration
* Real-time messaging
* Review and rating system
* Advanced search filters
* Deployment with CI/CD

##  Author

Akshita Syal

GitHub: https://github.com/akshitasyal

---

⭐ If you like this project, feel free to star the repository.
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> 67921ba (Initial commit from Create Next App)
