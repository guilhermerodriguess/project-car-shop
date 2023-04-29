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

  public async getCars() {
    try {
      const cars = await this.service.getCars();
      return this.res.json(cars);
    } catch (error) {
      this.next(error);
    }
  }

  public async getCar() {
    try {
      const { id } = this.req.params;
      const car = await this.service.getCar(id);
      if (car) {
        return this.res.json(car);
      }
      throw new Error('Car not found');
    } catch (error) {
      this.next(error);
    }
  }

  public async patchCar() {
    try {
      const { id } = this.req.params;
      const { body } = this.req;
      const updateCar = await this.service.updateCar(id, body);
      if (updateCar) {
        return this.res.json(updateCar);
      }
      throw new Error('Car not found');
    } catch (error) {
      this.next(error);
    }
  }
}