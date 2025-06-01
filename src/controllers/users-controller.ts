import { Request, Response } from "express";
import { SqlUserModel } from "../sql-models/users-sql-models";

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await SqlUserModel.getAll();
    console.log("Users", users);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const user = await SqlUserModel.getById(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by id:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const updatedUser = await SqlUserModel.update(id, { name, email });
    if (!updatedUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};
export const deleteUserController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await SqlUserModel.deleteById(id);
    res
      .status(200)
      .json({ message: `User with id ${id} deleted successfully` });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(404).json({ error: `User with id ${id} not found` });
  }
};
export const createUserController = (req: Request, res: Response) => {
  const { name, email, username, password, phone, address } = req.body;
  SqlUserModel.createUserDetails({
    name,
    email,
    username,
    password,
    phone,
    address,
  })
    .then((newuser: any) => {
      res.status(201).json(newuser);
    })
    .catch((error: any) => {
      console.error("Create error:", error.message || error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    });
};
