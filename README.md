# **Project Setup Guide**

## **Prerequisites**

Before you begin, make sure you have the following installed on your machine:

- **Node.js** (Recommended: v20)
- **pnpm** (Recommended: v8.11)
- **PostgreSQL** (via Docker or a local installation)

### **Installing Node.js & pnpm**

#### **Mac (using Homebrew)**

```sh
brew install node@20
brew install pnpm
```

#### **Windows (using Chocolatey)**

```sh
choco install nodejs-lts
npm install -g pnpm
```

Verify the installation:

```sh
node -v    # Should output v20.x.x
pnpm -v    # Should output v8.11.x
```

---

## **Database Setup**

This project requires a **PostgreSQL** database running locally. You have two options:

### **Option 1: Using Docker (Recommended)**

If you don’t have PostgreSQL installed, you can quickly spin up a database using **Docker Desktop**.

1. Install **Docker Desktop** for [Mac](https://www.docker.com/products/docker-desktop/) or [Windows](https://www.docker.com/products/docker-desktop/).
2. Run the following command to start a PostgreSQL container:
   ```sh
   pnpm run postgres
   ```
   This will:
   - Start a **PostgreSQL** server.
   - Automatically create a **user, password, and database** needed for the app.

---

### **Option 2: Using a Local PostgreSQL Installation**

If you already have **PostgreSQL** installed locally:

1. **Ensure your PostgreSQL server is running.**
2. **Take note of your PostgreSQL username and password**, as you will need them shortly.
3. **Manually create a new database** named `postgresdb`.

---

## **Environment Configuration**

Each application requires an `.env` file for configuration.

### **Setting Up Environment Variables**

1. **React Frontend**

   - Navigate to the frontend directory:
     ```sh
     cd apps/react-frontend
     ```
   - Copy the `.env.example` file and rename it to `.env`:
     ```sh
     cp .env.example .env
     ```

2. **Node Backend**
   - Navigate to the backend directory:
     ```sh
     cd apps/node-backend
     ```
   - Copy the `.env.example` file and rename it to `.env`:
     ```sh
     cp .env.example .env
     ```
   - **If you did not use the Docker setup**, update the `.env` file with your **PostgreSQL username and password**.

---

## **Running the Applications**

Once everything is set up, follow these steps to start the applications:

1. **Install dependencies**
   ```sh
   pnpm install
   ```
2. **Start the backend server**
   ```sh
   pnpm nx serve node-backend
   ```
3. **Open a new terminal and start the frontend**
   ```sh
   pnpm nx serve react-frontend
   ```

---

## **🎉 You're all set!**

Your project should now be running locally. Open the frontend in your browser and interact with the app.

```fronend ~ http://localhost:3003```
```backend ~ http://localhost:4000```

Happy coding! 🚀
