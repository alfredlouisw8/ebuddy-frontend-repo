# Frontend Repository

This repository contains the frontend code for the project, using Next.js and React MUI.

## Setup

1. **Clone the repository**

   ```bash
   git clone git@github.com:alfredlouisw8/ebuddy-frontend-repo.git
   cd ebuddy-frontend-repo
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Copy and configure environment variables**

   ```bash
   cp .env.local.example .env.local
   ```

   Fill in the `.env.local` file with the necessary environment variables from your Firebase project.

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

4. **Run the backend server**

   Follow the instructions in the backend repository to run the backend server. After running `npm run serve` in the backend repository, copy the function URL and set it in the `.env.local` file:

   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5001/your-project-id/us-central1/your-function-name
   ```

5. **Run the frontend server**

   ```bash
   npm run dev
   ```

## Project Structure

- `apis/`: Contains API abstraction logic.
- `components/`: Contains React components.
- `store/`: Contains Redux store and slices.
- `theme/`: Contains theme configuration for MUI.
- `app/`: Contains Next.js pages and routing.

## License

This project is licensed under the MIT License.
