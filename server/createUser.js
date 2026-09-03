const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const createUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const name = "Nahush";
    const email = "nahush@sales.com";
    const password = "Nahush@123";
    const role = "salesperson";

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

//sales 1
// sales@company.com
// Sales@123

//sales 2
//const email = "akash@sales.com";
//const password = "Akash@123";

//sales 3
//const email = "gowtam@sales.com";
//const password = "Gowtam@123";

//sales 4
//const email = "nahush@sales.com";
//const password = "Nahush@123";
