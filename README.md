# AI Engineer Portfolio

A modern, responsive portfolio website for AI engineers, featuring sections for projects, skills, research, publications, and a contact form.

## Features

- **Interactive UI**: Modern, responsive design with animations and transitions
- **Project Showcase**: Display AI and hardware projects with filtering options
- **Skills Section**: Highlight technical skills and competencies 
- **Experience Timeline**: Showcase research and professional experience
- **Awards & Publications**: Display academic achievements and research contributions
- **Contact Form**: Functional contact form powered by EmailJS

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```

## Contact Form Setup

The contact form is powered by EmailJS. To set it up:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Set up your email service and template
3. Copy `.env.local.example` to `.env.local`
4. Add your EmailJS credentials to `.env.local`:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```
5. For more detailed setup instructions, see the file at `src/app/setup-emailjs.md`

## Deployment

This is a Next.js project, which can be easily deployed to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the environment variables in the Vercel dashboard
4. Deploy

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- EmailJS

## License

[MIT](LICENSE)

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
