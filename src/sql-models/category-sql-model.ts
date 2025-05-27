import { get } from "http";
import pool from "./mysql-client";
import { json } from "stream/consumers";

export const sqlCategoryModel = {
  async getAllCategorys() {
    const [rows] = await pool.query("SELECT * FROM categories");
    return rows;
  },
  //Category by ID
  async getCategoryById(id: number) {
    const [rows] = await pool.query<any[]>(
      "SELECT * FROM categories WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      throw new Error(`Category with id ${id} not found`);
    }
    return rows[0];
  },
};
