import express from "express";

export async function loginUser(req: express.Request, res: express.Response) {
  try {
    // const incomingUser = req.body;
    //checking if exists
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.name);
      console.log(error.message);
    }
    res.status(500).json({ ok: false, message: "Server Error" });
  }
}
