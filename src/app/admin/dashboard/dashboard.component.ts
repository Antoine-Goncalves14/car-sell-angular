import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  cars = [
    {
      id: 0,
      brand: 'Renault',
      model: 'Laguna',
      color: 'gray',
    },
    {
      id: 1,
      brand: 'Peugeot',
      model: '508',
      color: 'red',
    },
    {
      id: 2,
      brand: 'Opel',
      model: 'Corsa',
      color: 'blue',
    },
  ];

  currentCar: any;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const carId = this.activatedRoute.snapshot.paramMap.get('id');
    this.currentCar = this.cars.find(car => car.id === +String(carId));
  }

  onSubmitOfferForm(form: NgForm): void {
    console.log(form.value);

  }

}