import express, { Application, Request, Response } from "express";
import cors from "cors";
import { usersRoutes } from "./routes/users.routes";
import errorHandler from "./middlewares/errorHandler";
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

app.use("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running!",
  });
});

// error handle
app.use(errorHandler);

// not found handler
app.use(notFound);

export default app;
