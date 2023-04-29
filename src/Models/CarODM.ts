import { Schema, models, Model, model, isValidObjectId } from 'mongoose';
import ICar from '../Interfaces/ICar';

export default class CarODM {
  private schema: Schema;
  private model: Model<ICar>;

  constructor() {
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });

    this.schema.set('toJSON', {
      virtuals: true,
      transform: (_doc, ret, _options) => {
        const transformed = { ...ret };
        delete transformed.__v;
        transformed.id = transformed._id;
        delete transformed._id;
        return transformed;
      },
    });

    this.model = models.Car || model('Car', this.schema);
  }

  public async create(car: ICar): Promise<ICar> {
    return this.model.create({ ...car });
  }

  public async getAll(): Promise<ICar[]> {
    const cars = await this.model.find();
    return cars;
  }

  public async getById(id: string): Promise<ICar | null> {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid mongo id');
    }
    const car = await this.model.findById(id);
    return car;
  }

  public async update(id: string, car: ICar): Promise<ICar | null> {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid mongo id');
    }
    const updateCar = await this.model.findByIdAndUpdate(id, car);
    return updateCar;
  }
}