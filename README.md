## SymNote
<img src="https://i.imgur.com/EQBEvEg.png" width=200/>

### What is SymNote?

**SymNote** is an up and coming note-taking application designed specifically for students, educators, and professionals who need to incorporate complex mathematical symbols and expressions into their notes seamlessly. We put a focus on user experience and powerful functionality, SymNote aims to make mathematical writing accessible and efficient. 


### Can I see a demo?

**A video demonstration** of the app can be found here: https://youtu.be/4B_kHCOMqHY

### User Experience

**Using the app, users will be able to** effortlessly write out complex mathematical documents, type intricate equations, and export your work in multiple formats, allowing you to upload your work to other applications! In addition, SymNote provides you with a user-friendly interface, customizable to fit your needs*.

**Light and Dark Mode** We are incorporating a light and dark mode theme to enhance the user experience for the editors preference. This will help the editor website feel more modern for Users that are accustomed to a certain theming on there applications of choice. 

### Design Elements

For the Prototype we decided to build direclty using React, Next.js with the usage of Tailwind.css, editor.js, and auth0 for the logging in functionality. We wanted to keep the website simple so it is easy to navigate with a folder/file page that is similiar to the look of google drive for ease of understanding. 

The Editor is basic as of this prototype but with the use of plug-ins available to editor.js, we will be able to add in functionality without having to code each element from scratch. 

Auth0 has the functionality to be able to sign in using email, google, or github for the user's preference.  It also allows for ease of logging off from any screen within the website with minimal code. With Auth0's functionality, we will be able to combine new users directly to the Mongo backend database.



<sup>*many features still in development</sup>



---

## Project Information

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.