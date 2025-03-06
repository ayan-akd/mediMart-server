# MediMart💊 Server

A backend server built using **Node.js**, **Express**, and **MongoDB** for a medicine e-commerce platform. This API handles medicine inventory, user authentication, order management, and secure prescription-based purchases. It supports CRUD operations for medicines, manages orders with automatic stock updates, and integrates secure payment processing via ShurjoPay. The application features role-based access control (RBAC) for different user permissions and provides robust error handling to ensure stability and security.

## 📋 Features

- **User Authentication & Management**: Secure user authentication with JWT-based authorization and role-based access control (Admin vs. Customer).
- **Medicine Management**: Store and manage medicine details in the database, including prescription requirements.
- **Create, Read, Update, and Delete Medicine Details**: Fully manage medicine records via API endpoints.
- **Order Processing**: Create orders and automatically update stock quantities.
- **Prescription Verification**: Upload and verify prescriptions for restricted medicines.
- **Process Payments**: Integrate ShurjoPay payment gateway to handle transactions securely.
- **Order Tracking**: Track orders with status updates (Pending, Paid, Processing, Shipped, Delivered, Cancelled, Failed).
- **Search & Filter Medicines**: Retrieve medicines based on name, category, or symptoms.
- **Email Notifications**: Send order confirmations and status updates via Nodemailer.
- **Validate User Inputs**: Ensure data integrity using **Zod** for input validation.
- **Error Handling**: Provide meaningful error messages for a better user experience.
- **TypeScript Integration**: Type annotations for reliability and maintainability.
- **MongoDB Integration**: Use **Mongoose** to interact with MongoDB for efficient data handling and validation.
- **Code Linting & Formatting**: Enforce code quality with **ESLint** and **Prettier** for consistent code style.

## 🚀 Getting Started

Follow these steps to set up the project locally:

### Prerequisites

Ensure you have the following installed:

- **Node.js** (>=14.x.x)
- **MongoDB** (local or hosted, e.g., MongoDB Atlas)
- **Git**
- **TypeScript** (Optional: If you prefer to install globally)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ayan-akd/mediMart-server.git
   ```

2. Install dependencies:
   ```bash
   cd mediMart-server
   npm install
   ```

3. Create a .env file in the root directory. Update the necessary values according to your environment:
   ```bash
   MONGODB_URI=your_mongodb_connection_string
   etc.......
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The server will run at http://localhost:5000 (or another port if you configure it differently).

## 🛠️ Scripts

The project includes several npm scripts for development and production:

- `npm run start`: Starts the application in production mode.
- `npm run start:dev`: Starts the application in development mode with live reloading using `ts-node-dev`.
- `npm run build`: Builds the production application.
- `npm run dev`: Watches for changes and compiles TypeScript files automatically using tsx.
- `npm run lint`: Lints the codebase using **ESLint**.
- `npm run lint:fix`: Automatically fixes linting errors.
- `npm run format`: Formats the codebase using **Prettier**.
- `npm run format:fix`: Automatically fixes formatting issues with **Prettier**.
- `npm run create:module`: Creates new module templates using custom script.

## API Endpoints

### Authentication

- **POST /api/auth/login**: Authenticate a user and return an access token.
- **POST /api/auth/change-password**: Allow an authenticated user to change their password.
- **POST /api/auth/refresh-token**: Generate a new access token using a refresh token.

### User Management

- **GET /api/users**: Retrieve a list of all registered users (Admin access required).
- **GET /api/users/me**: Retrieve the authenticated user's profile information.
- **POST /api/users/create-user**: Create a new user account with username, email, and password.
- **PATCH /api/users/update-user/:id**: Update user profile information.
- **PATCH /api/users/change-status/:id**: Update the status (active/blocked) of a user (Admin access required).

### Medicines

- **GET /api/medicine**: Retrieve a list of all medicines in the inventory.
- **GET /api/medicine/:id**: Retrieve detailed information for a specific medicine by its ID.
- **POST /api/medicine**: Add a new medicine to the inventory (Admin access required).
- **PATCH /api/medicine/:id**: Update the details of a specific medicine (Admin access required).
- **DELETE /api/medicine/:id**: Delete a specific medicine from the inventory (Admin access required)..


### Orders

- **GET /api/orders**: Retrieve a list of all orders (Admin access required).
- **GET /api/orders/my-orders/:id**: Retrieve a list of orders made by the authenticated user.
- **GET /api/orders/verify/:paymentId**: Verify the payment status for a given payment ID.
- **POST /api/orders**: Create a new order, automatically updating stock quantities.
- **PATCH /api/orders/change-status/:id**: Update the status of a specific order (Admin access required).


## Technologies Used

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for Node.js for building the API.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM for MongoDB to facilitate data handling and validation.
- **TypeScript**: Type-safe JavaScript for a more reliable and maintainable codebase.
- **ShurjoPay**: Payment gateway integration for processing transactions.
- **JWT (JSON Web Token)**: For user authentication and secure token handling.
- **Bcrypt**: For hashing passwords and ensuring security.
- **Nodemailer**: For sending email notifications to users.
- **Zod**: Schema validation library to ensure input data integrity.
- **ESLint**: Linting tool to enforce consistent coding styles.
- **Prettier**: Code formatter to maintain consistent formatting across the codebase.

## Project Structure

```
src/
├── app/
│   ├── modules/
│   │   ├── auth/
│   │   ├── medicines/
│   │   ├── orders/
│   │   ├── users/
│   │   └── ...
│   ├── middlewares/
│   └── utils/
├── config/
├── constants/
├── errors/
├── interfaces/
├── scripts/
├── app.ts
└── server.ts
```

## Server Live Link

[Live API](https://medi-mart-akd-server.vercel.app/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the **MongoDB** team for providing a reliable database solution.
- Thanks to **ShurjoPay** for providing a seamless payment gateway solution.
- Special thanks to **Zod**, **Prettier**, and **ESLint** for enhancing code quality and maintainability.

Feel free to clone and contribute to this project. If you find any bugs or have suggestions for improvements, feel free to open an issue or pull request!

Happy coding! 💊🚀
