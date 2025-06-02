import pool from "./mysql-client";
import { SqlProductModel } from "./product-sql-model";

export const SqlOrderModel = {
  async create(order: { userId: number; productIds: number[] }) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      let totalAmount = 0;

      for (const productId of order.productIds) {
        const product = await SqlProductModel.getById(productId);
        if (!product) throw new Error("Product not found");
        totalAmount += product.price;
      }

      const [result]: any = await conn.query(
        "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
        [order.userId, totalAmount]
      );

      const orderId = result.insertId;

      for (const pid of order.productIds) {
        await conn.query(
          "INSERT INTO order_items (order_id, product_id) VALUES (?, ?)",
          [orderId, pid]
        );
      }

      await conn.commit();
      return {
        id: orderId,
        userId: order.userId,
        productIds: order.productIds,
      };
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  },

  async updateOrderById(
    id: number,
    order: { userId: number; productIds: number[] }
  ) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      // Recalculate total
      let totalAmount = 0;
      for (const pid of order.productIds) {
        const product = await SqlProductModel.getById(pid);
        if (!product) throw new Error("Product not found");
        totalAmount += parseFloat(product.price);
      }

      // Update orders table
      await conn.query(
        "UPDATE orders SET user_id = ?, total_amount = ? WHERE order_id = ?",
        [order.userId, totalAmount, id]
      );

      // Update order_items table
      await conn.query("DELETE FROM order_items WHERE order_id = ?", [id]);
      for (const pid of order.productIds) {
        await conn.query(
          "INSERT INTO order_items (order_id, product_id) VALUES (?, ?)",
          [id, pid]
        );
      }

      await conn.commit();
      return this.getOneOrderById(id);
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  },

  async getOneOrderById(id: number) {
    const conn = await pool.getConnection();
    try {
      const [orders]: any = await conn.query(
        "SELECT * FROM orders WHERE order_id = ?",
        [id]
      );
      if (orders.length === 0) return null;

      const order = orders[0];
      const [items]: any = await conn.query(
        "SELECT product_id FROM order_items WHERE order_id = ?",
        [id]
      );
      const productIds = items.map((item: any) => item.product_id);
      return {
        id: order.id,
        userId: order.user_id,
        totalAmount: order.total_amount,
        status: order.status,
        productIds,
      };
    } finally {
      conn.release();
    }
  },

  async deleteOrderById(id: number) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      await conn.query("DELETE FROM order_items WHERE order_id = ?", [id]);
      const [result]: any = await conn.query(
        "DELETE FROM orders WHERE order_id = ?",
        [id]
      );
      await conn.commit();
      return result.affectedRows > 0;
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  },
};
