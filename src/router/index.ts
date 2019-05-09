import { Request, Response, Router } from "express";
import { check, validationResult } from "express-validator/check";
import { getConversion, getCurrencies } from "../services";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Ping");
});

router.get("/currencies", async (req: Request, res: Response) => {
  try {
    const currencies = await getCurrencies();
    res.send({ data: currencies });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post(
  "/conversions",
  [
    check("quote_currency").isString(),
    check("quote_currency").isLength({ min: 3, max: 3 }),
    check("base_currency").isString(),
    check("base_currency").isLength({ min: 3, max: 3 }),
    check("value").isNumeric()
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }

    try {
      const conversion = await getConversion(
        req.body.base_currency,
        req.body.quote_currency
      );
      res.send({ data: conversion * req.body.value });
    } catch (e) {
      res.status(400).json(e);
    }
  }
);

export default router;
