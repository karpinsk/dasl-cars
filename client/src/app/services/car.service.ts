import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';

const baseUrl = 'http://localhost:8080/api/cars';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Car[]> {
    return this.http.get<Car[]>(baseUrl);
  }

  get(car_id: any): Observable<Car> {
    return this.http.get(`${baseUrl}/${car_id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(car_id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${car_id}`, data);
  }

  delete(car_id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${car_id}`);
  }
}
