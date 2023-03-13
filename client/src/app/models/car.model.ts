import { Producer } from './producer.model';

export class Car {
  car_id?: number;
  vin?: string;
  reg_num?: string;
  model?: string;
  brand?: string;
  producer?: Producer;
  color?: string;
  year?: number;
  country?: string;
}
