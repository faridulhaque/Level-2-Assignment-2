import { Request, Response } from "express";

const notFound = (req: Request, res: Response) => {
    res.status(500).json({

        success: false,
        message: "No route found",
        error: {
            code: 404,
            description: "No route found"
            
        }
    })
};

export default notFound;