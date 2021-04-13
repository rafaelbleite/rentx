import dayjs from 'dayjs';

import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { RentalsRepositoryInMemory } from '../repositories/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
    );
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '54321',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open rental to the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'user1',
        car_id: 'car1',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: 'user1',
        car_id: 'car2',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another open rental to the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'user3',
        car_id: 'car3',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: 'user4',
        car_id: 'car3',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with return date smaller than minimum rental time ', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'user4',
        car_id: 'car4',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
