import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css'],
})
export class CarsListComponent implements OnInit {
  cars?: Car[];
  currentCar: Car = {};
  currentIndex = -1;
  carId = 0;
  brands: string[] = [];
  selectedBrand: string = '';
  showReport = true;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.retrieveCars();
    this.getBrands();
    this.refreshList();
  }

  //refresh list of cars
  refreshList(): void {
    this.retrieveCars();
    this.currentCar = {};
    this.currentIndex = -1;
  }

  retrieveCars(): void {
    this.carService.getAll().subscribe({
      next: (data) => {
        this.cars = data;
      },
      error: (e) => console.error(e),
    });
  }

  setActiveCar(car: Car, carId: number): void {
    this.currentCar = car;
    this.carId = carId;
  }

  onBrandChange(): void {
    this.filterByBrand(this.selectedBrand);
  }

  getBrands(): void {
    this.carService.getAll().subscribe({
      next: (data) => {
        data!.forEach((car) => {
          const brand = car.producer?.brand ?? ''; // fallback to an empty string if brand is undefined
          if (!this.brands.includes(brand)) {
            this.brands.push(brand);
          }
        });
      },
      error: (e) => console.error(e),
    });
  }

  filterByBrand(brand: string): void {
    if (!brand) {
      // All brands
      this.retrieveCars();
    } else {
      this.carService.getAll().subscribe({
        next: (data) => {
          this.cars = data.filter((car) => car.producer?.brand === brand);
        },
        error: (e) => console.error(e),
      });
    }
  }

  print() {
    this.showReport = !this.showReport;
    const printPreview = document.getElementById('print-preview')!;
    if (this.showReport) {
      printPreview.style.display = 'block';
    } else {
      printPreview.style.display = 'none';
    }
  }
}
