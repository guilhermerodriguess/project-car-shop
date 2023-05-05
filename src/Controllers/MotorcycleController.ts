import { NextFunction, Request, Response } from 'express';
import MotorcycleService from '../Services/MotorcycleService';
import IMotorcycle from '../Interfaces/IMotorcycle';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const motorcycle: IMotorcycle = this.req.body;

    try {
      const newMotorcycle = await this.service.createMotorcycle(motorcycle);
      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async getMotorcycles() {
    try {
      const motorcycles = await this.service.getMotorcycles();
      return this.res.json(motorcycles);
    } catch (error) {
      this.next(error);
    }
  }

  public async getMotorcycle() {
    try {
      const { id } = this.req.params;
      const motorcycle = await this.service.getMotorcycle(id);
      if (motorcycle) {
        return this.res.json(motorcycle);
      }
      throw new Error('Motorcycle not found');
    } catch (error) {
      this.next(error);
    }
  }

  public async putMotorcycle() {
    try {
      const { id } = this.req.params;
      const { body } = this.req;
      const updateMotorcycle = await this.service.updateMotorcycle(id, body);
      if (updateMotorcycle) {
        return this.res.json(updateMotorcycle);
      }
      throw new Error('Motorcycle not found');
    } catch (error) {
      this.next(error);
    }
  }
}