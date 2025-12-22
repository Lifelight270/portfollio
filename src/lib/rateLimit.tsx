import type { NextApiRequest, NextApiResponse } from "next";
import type { RequestHandler, Request, Response } from "express";

// Convert Express middleware to work with Next.js
export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: RequestHandler
): Promise<void> {
  return new Promise((resolve, reject) => {
    fn(req as unknown as Request, res as unknown as Response, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve();
    });
  });
}
