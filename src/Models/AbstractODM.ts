import { Schema, Model, isValidObjectId, models, model } from 'mongoose';

export default abstract class AbstractODM<T> {
  private schema: Schema;
  protected model: Model<T>;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(modelName, this.schema);
  }

  public async create(vehicle: T): Promise<T> {
    return this.model.create({ ...vehicle });
  }

  public async getAll(): Promise<T[]> {
    const vehicles = await this.model.find();
    return vehicles;
  }

  public async getById(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid mongo id');
    }
    const vehicle = await this.model.findById(id);
    return vehicle;
  }

  public async update(id: string, vehicle: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid mongo id');
    }
    const updateVehicle = await this.model.findByIdAndUpdate(id, vehicle);
    return updateVehicle;
  }
}