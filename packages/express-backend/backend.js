// backend.js
import express from "express";
import cors from "cors";
import userService from "./services/user-service.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];

  userService
    .removeUser(id)
    .then((deletedUser) => {
      if (deletedUser) {
        res.sendStatus(204);
      } else {
        res.status(404).send("Resource not found.");
      }
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
      res.status(500).send("Internal server error.");
    });
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userService
    .getUsers(name, job)
    .then((users) => {
      res.send({ users_list: users });
    })
    .catch((error) => {
      console.error("Error getting users:", error);
      res.status(500).send("Internal server error.");
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];

  userService
    .findUserById(id)
    .then((user) => {
      if (user == undefined) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      console.error("Error getting user:", error);
      res.status(500).send("Internal server error.");
    });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;

  userService
    .addUser(userToAdd)
    .then((newUser) => {
      res.status(201).send(newUser);
    })
    .catch((error) => {
      console.error("Error adding user:", error);
      res.status(500).send("Internal server error.");
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
