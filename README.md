# Ben's Deep Research Prompts

A modern web application for generating professional research prompts with a clean, Notion-like interface.

## Features

- Clean, modern UI with Notion-like styling
- Dark mode support
- Credit Rating prompt generator with clipboard functionality
- Easy deployment to Vercel

## Getting Started

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd deep-research-prompts
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Vercel

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push
   ```

2. Go to [Vercel](https://vercel.com) and sign in with your GitHub account

3. Click "Add New Project"

4. Import your GitHub repository

5. Configure your project:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `next build`
   - Output Directory: `.next`

6. Click "Deploy"

Your app will be deployed to a URL like `https://your-project-name.vercel.app`

## Technologies Used

- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- React for UI components

## Development

The project structure follows Next.js 14 conventions:

- `src/app/page.tsx` - Home page with menu
- `src/app/credit-rating/page.tsx` - Credit rating prompt generator
- `src/app/layout.tsx` - Root layout with Notion-like styling

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request
