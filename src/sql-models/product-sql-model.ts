import { get } from "http";
import pool from "./mysql-client";
import { json } from "stream/consumers";
export const SqlProductModel = {
  async getAll() {
    const [rows] = await pool.query<any[]>("SELECT * FROM products");
    return rows;
  },

  async getById(id: number) {
    const [rows] = await pool.query<any[]>(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );
    if (rows.length === 0) {
      throw new Error(`Product with id ${id} not found`);
    }
    return rows[0];
  },
  async DeleteById(id: number) {
    const [rows] = await pool.query<any[]>(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );
    if (rows.length === 0) {
      throw new Error(`Product with id ${id} not found`);
    }

    await pool.query("DELETE FROM products WHERE id = ?", [id]);

    console.log(`Product with id ${id} deleted successfully`);
    return;
  },
};
