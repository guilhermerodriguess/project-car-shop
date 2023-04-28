import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) return new Car(car);
    return null;
  }

  public async createCar(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async getCars() {
    const carODM = new CarODM();
    const cars = await carODM.getAll();
    return cars;
  }

  public async getCar(id: string) {
    const carODM = new CarODM();
    const car = await carODM.getById(id);
    return this.createCarDomain(car);
  }
}