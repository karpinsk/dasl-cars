import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
})
export class AddCarComponent implements OnInit {
  car: Car = {
    car_id: undefined,
    vin: '',
    reg_num: '',
    model: '',
    brand: '',
    country: '',
    year: undefined,
    color: '',
  };

  submitted = false;

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit(): void {}

  async carExists(): Promise<boolean> {
    let exists = false;
    const data = await this.carService.getAll().toPromise();
    data!.forEach((car) => {
      if (car.vin === this.car.vin || car.reg_num === this.car.reg_num) {
        exists = true;
      }
    });
    return exists;
  }

  areRequiredFieldsFilled(): boolean {
    return (
      !!this.car.vin &&
      !!this.car.reg_num &&
      !!this.car.model &&
      !!this.car.brand &&
      !!this.car.country
    );
  }

  async saveCar(): Promise<void> {
    const data = {
      vin: this.car.vin,
      reg_num: this.car.reg_num,
      model: this.car.model,
      brand: this.car.brand,
      country: this.car.country,
      year: this.car.year,
      color: this.car.color,
    };

    if (await this.carExists()) {
      alert(
        'Car VIN or registration number already exist. Please consider updating these values.'
      );
      return;
    }

    this.carService.create(data).subscribe({
      next: (res) => {
        this.submitted = true;
        this.router.navigate(['/cars']);
      },
      error: (e) => console.error(e),
    });
  }
}
