import pool from "./mysql-client";

export const SqlUserModel = {
  async getAll() {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  },

  async getById(id: number) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return Array.isArray(rows) && rows.length ? rows[0] : undefined;
  },

  async update(
    id: number,
    p0: {
      username?: string;
      name?: string;
      address?: string;
      email?: string;
      phone?: string;
      password?: string;
    }
  ) {
    const fields = [];
    const values = [];
    if (p0.username !== undefined) {
      fields.push("username = ?");
      values.push(p0.username);
    }
    if (p0.name !== undefined) {
      fields.push("name = ?");
      values.push(p0.name);
    }
    if (p0.address !== undefined) {
      fields.push("address = ?");
      values.push(p0.address);
    }
    if (p0.email !== undefined) {
      fields.push("email = ?");
      values.push(p0.email);
    }
    if (p0.phone !== undefined) {
      fields.push("phone = ?");
      values.push(p0.phone);
    }
    if (p0.password !== undefined) {
      fields.push("password = ?");
      values.push(p0.password);
    }
    if (!fields.length) return undefined;
    await pool.query(`UPDATE users SET ${fields.join(", ")} WHERE id = ?`, [
      ...values,
      id,
    ]);
    return this.getById(id);
  },

  async deleteById(id: number) {
    const [rows] = await pool.query<any[]>("SELECT * FROM users WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0) {
      throw new Error(`User with id ${id} not found`);
    }
    await pool.query("DELETE FROM users WHERE id = ?", [id]);
    console.log(`User with id ${id} deleted successfully`);
    return;
  },

  async createUserDetails(p0: {
    username: string;
    name: string;
    address: string;
    email: string;
    phone: string;
    password: string;
  }) {
    const { username, name, address, email, phone, password } = p0;
    const [result]: any = await pool.query(
      "INSERT INTO users (username, name, address, email, phone, password) VALUES (?, ?, ?, ?, ?, ?)",
      [username, name, address, email, phone, password]
    );
    const newUserId = result.insertId;
    const [newUser] = await pool.query<any[]>(
      "SELECT * FROM users WHERE id = ?",
      [newUserId]
    );
    return newUser[0];
  },
};
