import { Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';
import AbstractODM from './AbstractODM';

export default class CarODM extends AbstractODM<ICar> {
  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
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

    super(schema, 'Car');
  }
}