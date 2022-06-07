import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Offer } from 'src/app/interfaces/offer';
import { OffersService } from 'src/app/services/offers.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  offerForm!: FormGroup;

  offers: Offer[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private offersService: OffersService,
  ) {

  }

  ngOnInit(): void {
    this.initOfferForm();
    this.offersService.getOffers().subscribe({
      next: (offers: Offer[]) => {
        this.offers = offers;
      },
      complete: () => {
        console.log('Obersable complete');
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  initOfferForm(): void {
    this.offerForm = this.formBuilder.group({
      index: [0],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      description: '',
      price: [0, [Validators.required]],
    });
  }

  onSubmitOfferForm(): void {
    const offerIndex = this.offerForm.value.index;
    let offer = this.offerForm.value;

    if (offerIndex === null || offerIndex === undefined) {
      delete offer.index;
      this.offers = this.offersService.createOffer(offer);
    } else {
      delete offer.index;
      this.offers = this.offersService.editOffer(offer, offerIndex);
    }

    this.offerForm.reset();
  }

  onEditOffer(offer: Offer, index: number): void {
    this.offerForm.setValue({...offer, index});
  }

  onDeleteOffer(index: number): void {
    this.offers = this.offersService.deleteOffer(index);
  }

}
