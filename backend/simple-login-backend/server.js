// Load environment variables from .env only in development
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  
  // Dependencies
  const express = require("express");
  const cors = require("cors");
  const session = require("express-session");
  const crypto = require('crypto');
  const dbConnect = require("./config/dbConfig");
  const authRoutes = require("./routes/authroutes/authRoutes");
const userRoutes = require("./routes/userRoutes/userRoutes");
  
  // Database connection
  dbConnect();
  
  // Express App
  const app = express();
  const port = process.env.PORT || 5000;
  
  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // CORS configuration
  const allowedOrigins = ["http://localhost:3000","https://driving-test-seven.vercel.app"];
  app.use(cors({ origin: allowedOrigins }));
  
  // Session setup
  const secretKey = crypto.randomBytes(32).toString('hex');
  app.use(
    session({
      secret: secretKey,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      },
    })
  );
  
  // Routes
  app.use(authRoutes);
  app.use(userRoutes);
  
  // Default route
  app.get("/", (req, res) => {
    res.send("Server is running smoothly");
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
  