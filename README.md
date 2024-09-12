# Curate AI

**Curate AI** is an AI-powered portfolio builder designed to help developers and designers create stunning, customizable portfolios. With a few clicks, users can generate dynamic, interactive portfolios showcasing their work, experience, and achievements—all powered by advanced AI features.

## Features

- 🖥️ **Customizable Templates**: Choose from a variety of professionally designed templates and customize them to fit your personal brand.
- 🤖 **AI-Powered Assistance**: Get suggestions for structuring your portfolio, crafting project descriptions, and more, all with the help of AI.
- 🎨 **Easy-to-Use Editor**: Edit content and design elements in a user-friendly interface.
- 🌐 **Live Portfolio**: Generate a live portfolio link you can share instantly.
- 📝 **Responsive Design**: All portfolios are mobile-friendly and optimized for viewing on any device.
- 🎉 **Confetti Animation**: Celebrate portfolio creation with an interactive confetti animation after the generation process.
- 🔗 **Social Media Links**: Easily integrate links to your social media profiles (GitHub, LinkedIn, etc.).
- 📋 **Copy Portfolio URL**: Quickly copy and share the live portfolio link with others.
- 🔒 **User Authentication**: Secure login system powered by Clerk ensures your data is safe.
- 💾 **MySQL Database**: All user portfolios and data are stored securely using MySQL.

## Getting Started

### Prerequisites

To run this project locally, you will need:

- Node.js (v14 or later)
- npm or yarn
- A Clerk account for authentication setup
- MySQL installed and running on your local machine or a cloud database

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/curate-ai.git
cd curate-ai
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
```

3. **Set up MySQL:**

Create a MySQL database for the project and note down the database credentials. You will use these in the next step.

4. **Set up environment variables:**

Create a `.env.local` file in the root directory with your MySQL credentials, Clerk API keys, and other environment-specific variables.

```bash
NEXT_PUBLIC_CLERK_FRONTEND_API=your-clerk-frontend-api
CLERK_API_KEY=your-clerk-api-key
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# MySQL database credentials
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your-password
DB_NAME=curateai_db
```

5. **Run migrations:**

Ensure that your database schema is up to date. You can create your MySQL tables for user data, portfolios, and other entities as needed.

6. **Start the development server:**

```bash
npm run dev
# or
yarn dev
```

Your app should now be running on [http://localhost:3000](http://localhost:3000).

### Folder Structure

```
.
├── components       # Reusable UI components
├── pages            # Next.js routes (e.g., portfolio generation, login)
├── public           # Static files (images, icons, etc.)
├── styles           # Global and component-level CSS files
├── utils            # Utility functions and helpers
├── lib              # Clerk and MySQL setup
└── .env.local       # Environment variables for local development
```

## Usage

### Generate Your Portfolio

1. **Sign in**: You must first log in using Clerk.
2. **Customize**: Use the portfolio editor to add your name, experience, education, and more.
3. **Generate**: Hit the "Generate" button to create your portfolio. A confetti animation will celebrate your success!
4. **Share**: Copy the live link or access it directly from the app to share with potential employers or colleagues.

### Authentication & Security

Curate AI uses **Clerk** for user authentication. The application ensures that all user data, such as portfolios, remain secure and private. Unauthorized users attempting to access protected routes will be redirected to the login page.

### MySQL Database Setup

Curate AI uses **MySQL** to store user portfolios and other information securely. Make sure you have the MySQL database running and properly configured. You will need to run migrations to create the necessary tables:

1. **Create Database:**

```sql
CREATE DATABASE curateai_db;
```

2. **Create Tables:**

Create the necessary tables for portfolios, users, etc. Example schema for portfolios:

```sql
CREATE TABLE portfolios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(255),
  title VARCHAR(255),
  jobs JSON,
  education JSON,
  projects JSON,
  achievements JSON,
  social_links JSON,
  contact_heading VARCHAR(255),
  contact_description TEXT,
  contact_link VARCHAR(255),
  font VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Deployment

To deploy Curate AI, follow these steps:

1. **Deploy to Vercel** (recommended):

   Connect your GitHub repository to Vercel, and deploy it with one click.

2. **Environment Variables**:

   Ensure that your Clerk API keys, MySQL credentials, and any other required environment variables are set correctly in your Vercel project settings.

3. **Database Hosting**:

   Make sure your MySQL database is hosted and accessible for production, whether through a cloud provider (e.g., AWS RDS, Google Cloud SQL) or a managed service (e.g., PlanetScale).

4. **Build and Deploy**:

   Vercel will handle the build and deployment process. Once completed, you will have a live version of Curate AI available on the web.

## Contributing

We welcome contributions from the community! If you would like to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch-name`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch-name`).
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Clerk](https://clerk.dev/)
- [Canvas Confetti](https://www.kirilv.com/canvas-confetti/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MySQL](https://www.mysql.com/)
- All the contributors who helped build Curate AI.

## Contact

For any questions or feedback, feel free to reach out to the Curate AI team:

- Website: [https://curateai.online](https://curateai.online)
- Support Email: hello@curateai.online

---

This README now reflects that you're using MySQL for your database.