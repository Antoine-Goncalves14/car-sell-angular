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

  currentOfferPhotoFile!: any;
  currentOfferPhotoUrl!: string;

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
      photo: [],
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      description: '',
      price: [0, [Validators.required]],
    });
  }

  onSubmitOfferForm(): void {
    const offerId = this.offerForm.value.id;
    let offer = this.offerForm.value;

    const offerPhotoUrl = this.offers.find(el => el.id === offerId)?.photo;
    offer = { ...offer, photo: offerPhotoUrl };

    if (!offerId || offerId && offerId === '') {
      // Creation
      delete offer.id;
      this.offersService.createOffer(offer, this.currentOfferPhotoFile).catch(console.error);
    } else {
      // Modification
      delete offer.id;
      this.offersService.editOffer(offer, offerId, this.currentOfferPhotoFile).catch(console.error);
    }
    this.offerForm.reset();
    this.currentOfferPhotoFile = null;
    this.currentOfferPhotoUrl = '';
  }

  onChangeOfferPhoto($event: any): void {
    this.currentOfferPhotoFile = $event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.currentOfferPhotoFile);
    fileReader.onloadend = (e) => {
      this.currentOfferPhotoUrl = String(e.target?.result);
    }
  }

  onEditOffer(offer: Offer): void {
    this.currentOfferPhotoUrl = offer.photo ? offer.photo : '';
    this.offerForm.setValue({
      id: offer.id ? offer.id : '',
      title: offer.title ? offer.title : '',
      photo: '',
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
