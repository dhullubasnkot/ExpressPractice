import { get } from "http";
import pool from "./mysql-client";
import { json } from "stream/consumers";

export const sqlCategoryModel = {
  async getAllCategorys() {
    const [rows] = await pool.query("SELECT * FROM categories");
    return rows;
  },
};
