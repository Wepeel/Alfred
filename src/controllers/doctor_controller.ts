import express from "express"

export function add_controller(req: express.Request, res: express.Response)
{
    res.send("ADD");
}