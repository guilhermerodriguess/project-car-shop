import { Schema } from 'mongoose';
import AbstractODM from './AbstractODM';
import IMotorcycle from '../Interfaces/IMotorcycle';

export default class MotorcycleODM extends AbstractODM<IMotorcycle> {
  constructor() {
    const schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });

    schema.set('toJSON', {
      virtuals: true,
      transform: (_doc, ret, _options) => {
        const transformed = { ...ret };
        delete transformed.__v;
        transformed.id = transformed._id;
        delete transformed._id;
        return transformed;
      },
    });

    super(schema, 'Motorcycle');
  }
}