import pool from "./mysql-client"; // make sure your mysql-client is configured properly

export const sqlCategoryModel = {
  // Get all categories
  async getAllCategories() {
    const [rows] = await pool.query("SELECT * FROM categories");
    return rows;
  },

  // Get single category by ID
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

  // Get all products for a specific category ID
  async getProductsByCategoryId(categoryId: number) {
    const [rows] = await pool.query<any[]>(
      `
      SELECT 
        p.*, 
        c.id AS category_id,
        c.name AS category_name
      FROM 
        products p
      JOIN 
        product_categories pc ON p.id = pc.product_id
      JOIN 
        categories c ON c.id = pc.category_id
      WHERE 
        c.id = ?
      `,
      [categoryId]
    );

    return rows;
  },
  async UpdateCategory(id: number, name: string) {
    const [rows] = await pool.query<any[]>(
      "SELECT * FROM categories WHERE id = ?",
      [id]
    );
    if (rows.length === 0) {
      throw new Error(`Category with id ${id} not found`);
    }
    await pool.query("UPDATE categories SET name = ? WHERE id = ?", [name, id]);
    return {
      ...rows[0],
      name: name,
    };
  },
  async DeleteCategory(id: number) {
    const [rows] = await pool.query<any[]>(
      "SELECT * FROM categories WHERE id = ?",
      [id]
    );
    if (rows.length === 0) {
      throw new Error(`Category with id ${id} not found`);
    }
    await pool.query("DELETE FROM categories WHERE id = ?", [id]);
    return { message: `Category with id ${id} deleted successfully` };
  },

  async CreateCategory(name: string) {
    const [result]: any = await pool.query(
      "INSERT INTO categories (name) VALUES (?)",
      [name]
    );
    return {
      id: result.insertId,
      name: name,
    };
  },
};
