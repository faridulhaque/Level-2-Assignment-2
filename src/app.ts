import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { usersRoutes } from "./routes/users.routes";
import notFound from "./middlewares/notFound";

const app: Application = express();

app.use(express.json());

// const corsOptions = {
//   origin: "http://localhost:5173",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
//   optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions));

app.use("/api/users", usersRoutes);

app.use("*", (req: Request, res: Response) => {
  res.status(200).json({ message: "no route found" });
});



// error handle
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = 500;
  const message = err.message || "Something went wrong!";

  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
});

// not found handler
app.use(notFound);

export default app;
