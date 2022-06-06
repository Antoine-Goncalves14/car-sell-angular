import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  offerForm!: FormGroup;

  offers: any[] = [];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initOfferForm();
  }

  initOfferForm(): void {
    this.offerForm = this.formBuilder.group({
      title: ['', Validators.required, Validators.maxLength(100)],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      description: '',
      price: [0, Validators.required],
    });
  }

  onSubmitOfferForm(): void {
    this.offers.push(this.offerForm.value);
    this.offerForm.reset();
  }

}
