import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) return new Motorcycle(motorcycle);
    return null;
  }

  public async createMotorcycle(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async getMotorcycles(): Promise<IMotorcycle[]> {
    const motorcycleODM = new MotorcycleODM();
    const motorcycles = await motorcycleODM.getAll();
    return motorcycles;
  }

  public async getMotorcycle(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.getById(id);
    return this.createMotorcycleDomain(motorcycle);
  }

  public async updateMotorcycle(id: string, motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    await motorcycleODM.update(id, motorcycle);
    const getMotorcycle = await motorcycleODM.getById(id);
    return this.createMotorcycleDomain(getMotorcycle);
  }
}