import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from '../interfaces/offer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  private offers: Offer[] = [
    {
      title: 'Nouvelle Annonce',
      brand: 'Renault',
      model: 'Kangoo',
      description: 'Hello World!',
      price: 1500
    },
  ];

  constructor() { }

  getOffers(): Observable<Offer[]> {
    return new Observable(observer => {
      if (this.offers.length === 0) {
        observer.error(new Error('No offer registered'));
      }
      setTimeout(() => {
        observer.next(this.offers);
        //observer.complete();
      }, 2000);
    })
  }

  createOffer(offer: Offer): Offer[] {
    this.offers.push(offer);
    return this.offers;
  }

  editOffer(offer: Offer, index: number): Offer[] {
    this.offers[index] = offer;
    return this.offers;
  }

  deleteOffer(offerIndex: number): Offer[] {
    this.offers.splice(offerIndex, 1);
    return this.offers;
  }
}
