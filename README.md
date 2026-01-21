Rick & Morty Explorer
This project is an interactive Rick & Morty multiverse explorer built with React and Vite. It allows users to browse characters, filter by seasons, and access streaming content optimized for the Latam/Colombia region.

Prerequisites
Before you begin, ensure you have the following installed:

Node.js (Version 18 or higher)

Git

Local Installation Guide
Follow these steps in your terminal to launch the interdimensional portal:

1. Clone the repository
First, download the code to your local machine:

Bash
git clone https://github.com/reynal240212/RickyAndMorthy_Explorer.git
cd RickyAndMorthy_Explorer
2. Install dependencies
We use npm to manage the required libraries (such as React Router and Tailwind CSS):

Bash
npm install
Note: This process will create the node_modules folder locally.

3. Start the development server
Run the following command to open the app in your browser:

Bash
npm run dev
The application will be available at http://localhost:5173.

Deployment
This application is configured for automatic deployment on Vercel.

Routing: Includes a vercel.json file to prevent 404 errors when refreshing single-page application (SPA) routes like /characters or /episodes.

SEO: Metadata in index.html is optimized for social media sharing and high-quality link previews.

Tech Stack
React 18 (Vite)

Tailwind CSS (Responsive and futuristic UI/UX)

Rick & Morty API (Data fetching via REST/GraphQL)

Vercel (Hosting and CI/CD)

Author
Reynaldo - Frontend Developer