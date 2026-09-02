const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const User = require("./models/User");

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const existingAdmin = await User.findOne({
      email: "admin@company.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const admin = await User.create({
      name: "Admin",
      email: "admin@company.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully");
    console.log(admin);

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();

// Email:    admin@company.com
// Password: Admin@123
// Role:     admin

// const admin: mongoose.Document<unknown, {}, {
//  name: string;
//  email: string;
//  password: string;
//  role: "admin" | "salesperson";
// } & mongoose.DefaultTimestampProps, {
//  id: string;
// }, {
//  timestamps: true;
// }> & Omit<{
//  name: string;
//  email: string;
//  password: string;
//  role: "admin" | "salesperson";
// } & mongoose.DefaultTimestampProps & {
//  _id: mongoose.Types.ObjectId;
// } & {
//  __v: number;
// }, "id"> & mongoose.HydratedDocumentOverrides<{
//  id: string;
// }>