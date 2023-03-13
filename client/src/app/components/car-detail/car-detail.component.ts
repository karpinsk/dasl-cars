import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent {
  @Input() viewMode = false;

  @Input() currentCar: Car = {
    car_id: undefined,
    vin: '',
    reg_num: '',
    model: '',
    brand: '',
    country: '',
    year: undefined,
    color: '',
  };

  message = '';

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getCar(this.route.snapshot.params['car_id']);
    }
  }

  areRequiredFieldsFilled(): boolean {
    return (
      !!this.currentCar.vin &&
      !!this.currentCar.reg_num &&
      !!this.currentCar.model &&
      !!this.currentCar.brand &&
      !!this.currentCar.country
    );
  }

  getCar(car_id: number): void {
    this.carService.get(car_id).subscribe({
      next: (data) => {
        this.currentCar = data;
      },
      error: (e) => console.error(e),
    });
  }

  updateCar(): void {
    this.message = '';

    this.carService.update(this.currentCar.car_id, this.currentCar).subscribe({
      next: (res) => {
        this.message = res.message
          ? res.message
          : 'This car information was updated successfully!';
        this.router.navigate(['/cars']);
      },
      error: (e) => console.error(e),
    });
  }

  deleteCar(): void {
    this.carService.delete(this.currentCar.car_id).subscribe({
      next: (res) => {
        window.location.reload();
      },
      error: (e) => console.error(e),
    });
  }
}
