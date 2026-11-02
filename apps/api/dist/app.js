// src/app.ts
import express from "express";

// src/modules/auth/routes/auth-routes.ts
import { Router } from "express";

// src/modules/auth/services/auth-service.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// src/shared/config/database.ts
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
var databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not defined");
}
var sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  logging: false
});
var database_default = sequelize;

// src/shared/database/models/user.ts
import { DataTypes, Model } from "sequelize";
var User = class extends Model {
  id;
  name;
  email;
  password;
  createdAt;
  updatedAt;
};
User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: database_default,
    modelName: "User",
    tableName: "users",
    timestamps: true
  }
);
var user_default = User;

// src/modules/auth/repository/auth-repository.ts
var AuthRepository = class {
  async findUserByEmail(email) {
    return user_default.findOne({ where: { email } });
  }
  async createUser(userData) {
    return user_default.create(userData);
  }
};
var auth_repository_default = AuthRepository;

// src/modules/auth/services/auth-service.ts
var authService = class {
  authRepository;
  constructor() {
    this.authRepository = new auth_repository_default();
  }
  async login(email, password) {
    const user = await this.authRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT secret is not defined");
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      secret || "default_secret",
      { expiresIn: "1h" }
    );
    return { user: { id: user.id, email: user.email }, token };
  }
  async register(name, email, password) {
    const existingUser = await this.authRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.authRepository.createUser({
      name,
      email,
      password: hashedPassword
    });
    {
      return { id: newUser.id, name: newUser.name, email: newUser.email };
    }
  }
};
var auth_service_default = new authService();

// src/modules/auth/controllers/auth-controller.ts
var authController = class {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await auth_service_default.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ message: "Invalid credentials" });
    }
  }
  async register(req, res) {
    try {
      const { email, password } = req.body;
      await auth_service_default.register(email, password);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(400).json({ message: "Registration failed" });
    }
  }
};
var auth_controller_default = authController;

// src/modules/auth/routes/auth-routes.ts
var router = Router();
router.post("/login", auth_controller_default.login);
router.post("/register", auth_controller_default.register);
var auth_routes_default = router;

// src/app.ts
var app = express();
app.use(auth_routes_default);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.listen(3e3, () => {
  console.log("Server is running on port 3000");
});
