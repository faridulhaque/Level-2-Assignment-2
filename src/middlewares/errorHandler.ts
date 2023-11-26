import { Request, Response } from "express";

const errorHandler = (error: any, req: Request, res: Response) => {
    res.status(500).json({
        success: false,
        message: error?.message || "Something went wrong",
        error: {
            code: 404,
            description: error?.message || "Something went wrong"
            
        }
    })
};

export default errorHandler;
// 