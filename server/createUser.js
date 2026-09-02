const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const createUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const name = "Admin Two";
    const email = "admin2@company.com";
    const password = "Admin2@123";
    const role = "admin";

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("User already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    console.log("User created successfully");
    console.log({
      name: user.name,
      email: user.email,
      role: user.role,
    });

    process.exit();
  } catch (error) {
    console.error("Error creating user:", error);
    process.exit(1);
  }
};

createUser();

// sales@company.com
// Sales@123