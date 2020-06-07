import { Request, Response } from "express";
import { QueryResult } from "pg";
import { pool } from "../models";

export const blockuser = async (targetuser: string, res: Response) => {
  const response: QueryResult = await pool.query(
    "UPDATE users SET blocked = true WHERE name = $1",
    [targetuser]
  );
  if (response.rowCount === 0) {
    return null;
  }
  return response;
};

export const likeduser = async (targetuser: string) => {
  const response: QueryResult = await pool.query(
    "UPDATE users SET liked = true WHERE name = $1",
    [targetuser]
  );
  if (response.rowCount === 0) {
    return null;
  }
  return response;
};

export const viewuser = async (targetuser: any, res: Response) => {
  const response: QueryResult = await pool.query(
    "SELECT * FROM users WHERE name = $1",
    [targetuser]
  );
  if (!response.rows[0]) {
    return null;
  }
  return response;
};

export const createUser = async (req: Request) => {
  const { id, name, email, password, image } = req.body;

  const response: QueryResult = await pool.query(
    "INSERT INTO users (id, name, email, password, image) VALUES ($1, $2, $3, $4, $5)",
    [id, name, email, password, image]
  );

  return response;
};

export const verfiyUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const response: QueryResult = await pool.query(
    "SELECT * FROM users WHERE name = $1 AND email = $2 AND password = $3 ",
    [name, email, password]
  );

  if (!response.rows[0]) {
    return null;
  }
  return response;
};

