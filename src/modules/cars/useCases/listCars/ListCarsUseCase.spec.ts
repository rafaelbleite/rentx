import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListCarsUseCase } from './ListCarsUseCase';

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Description',
      daily_rate: 100.0,
      license_plate: 'FFF-9999',
      fine_amount: 10.0,
      brand: 'Brand',
      category_id: 'category_id',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car2',
      description: 'Description',
      daily_rate: 100.0,
      license_plate: 'AAA-0000',
      fine_amount: 10.0,
      brand: 'Brand',
      category_id: 'category_id',
    });

    const cars = await listCarsUseCase.execute({ name: 'Car2' });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car3',
      description: 'Description',
      daily_rate: 100.0,
      license_plate: 'BBB-1111',
      fine_amount: 10.0,
      brand: 'Brand3',
      category_id: 'category_id',
    });

    const cars = await listCarsUseCase.execute({ brand: 'Brand3' });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car4',
      description: 'Description',
      daily_rate: 100.0,
      license_plate: 'CCC-2222',
      fine_amount: 10.0,
      brand: 'Brand',
      category_id: 'category4',
    });

    const cars = await listCarsUseCase.execute({ category_id: 'category4' });

    expect(cars).toEqual([car]);
  });
});
