
// import rateLimit from "express-rate-limit";
import type { NextApiRequest, NextApiResponse } from "next";
import type { RequestHandler } from "express";

// Convert Express middleware to work with Next.js
export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: RequestHandler
): Promise<void> {
  return new Promise((resolve, reject) => {
    fn(req as any, res as any, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve();
    });
  });
}
