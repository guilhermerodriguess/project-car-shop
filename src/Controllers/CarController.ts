import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/CarService';
import ICar from '../Interfaces/ICar';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = {
      buyValue: this.req.body.buyValue,
      color: this.req.body.color,
      doorsQty: this.req.body.doorsQty,
      id: this.req.body.id,
      model: this.req.body.model,
      seatsQty: this.req.body.seatsQty,
      year: this.req.body.year,
      status: this.req.body.status,
    };

    try {
      const newCar = await this.service.createCar(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }
}