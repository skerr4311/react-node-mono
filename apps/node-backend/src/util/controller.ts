import { RequestHandler } from 'express';

export const controller: RequestHandler<{ id: string }> = (req, res, next) => {
  const id = req.params.id;
};
