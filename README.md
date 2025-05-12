This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Demo Video
 [Watch demo here](https://www.dropbox.com/scl/fi/5wk0xgsbsaesij83x41sk/12.05.2025_17.25.00_REC.mp4?rlkey=he21namaw6re3sz987iw1d5b3&st=5oagbwo8&dl=0)

## Getting Started

First, create a `.env.local` file in the root of your project with the following entries:

```plaintext
NEXT_PUBLIC_NODE_ENV=development
BASE_URL=http://localhost:5281
NEXT_PUBLIC_BASE_URL=http://localhost:5281
```

Ensure that you have the backend service running and integrated at `http://localhost:5281`. The backend repository can be found at [shipment_track_be](https://github.com/your-backend-repo-link).

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
## About the Project

This project is a shipment tracking application that allows users to manage shipments efficiently. Users can create new shipments by providing details such as destination, origin, estimated time of arrival (ETA), shipment date, product, and carrier. The application also provides a list of shipments for easy tracking.

## Project Structure

The following is the structure of the immediate folders in this project:

```
pages/
├── api/         # API routes
├── index.js     # Main entry point for the application
```

## Technologies Used

- **React** and **Next.js**: For building the user interface and server-side rendering.
- **Material-UI**: For styling and creating a responsive design.

## Custom Table Component

The table component used to list shipments is custom-built. This decision was made due to compatibility issues with Material-UI's DataGrid tables in Next.js. Specifically, the DataGrid package references global styles, which causes errors in the Next.js environment.

## Features

- Create new shipments with detailed input fields.
- View a list of shipments in a custom table.
- Track shipment details such as ETA, origin, and destination.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
