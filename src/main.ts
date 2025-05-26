import express, { Request, Response, NextFunction } from "express";
import productsroutes from "./routes/productsroutes";

const app = express();

app.use(express.json());

app.use("/products", productsroutes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log("Error Received", error);
  if ([400, 403, 404].includes(error.status)) {
    res.status(error.status).json({ error: error.message || error });
    return;
  }
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
