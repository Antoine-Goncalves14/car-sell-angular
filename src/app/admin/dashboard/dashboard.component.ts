import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Offer } from 'src/app/interfaces/offer';
import { OffersService } from 'src/app/services/offers.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  offerForm!: FormGroup;

  offers: Offer[] = [];

  subscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private offersService: OffersService,
  ) {

  }

  ngOnInit(): void {
    this.initOfferForm();
    this.subscription = this.offersService.offerSubject.subscribe({
      next: (offers: Offer[]) => {
        console.log('NEXT');

        this.offers = offers;
      },
      error: (error) => {
        console.log(error);
      }
    });
    this.offersService.getOffers();
  }

  initOfferForm(): void {
    this.offerForm = this.formBuilder.group({
      id: [null],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      description: '',
      price: [0, [Validators.required]],
    });
  }

  onSubmitOfferForm(): void {
    const offerId = this.offerForm.value.id;
    let offer = this.offerForm.value;

    if (!offerId || offerId && offerId === '') {
      // Creation
      delete offer.index;
      this.offersService.createOffer(offer).catch(console.error);
    } else {
      // Modification
      delete offer.index;
      this.offersService.editOffer(offer, offerId).catch(console.error);
    }
    this.offerForm.reset();
  }

  onEditOffer(offer: Offer): void {
    this.offerForm.setValue({
      id: offer.id ? offer.id : '',
      title: offer.title ? offer.title : '',
      brand: offer.brand ? offer.brand : '',
      model: offer.model ? offer.model : '',
      description: offer.description ? offer.description : '',
      price: offer.price ? offer.price : 0,
    });
  }

  onDeleteOffer(offerId: string | undefined): void {
    if (offerId) {
      this.offersService.deleteOffer(offerId);
    } else {
      console.error('An id must be provided to delete an offer');
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
