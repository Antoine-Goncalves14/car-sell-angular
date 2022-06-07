import { Injectable } from '@angular/core';
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

  getOffers(): Promise<Offer[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.offers.length === 0) {
          reject(new Error('No offer registered'));
        }
        resolve(this.offers);
      }, 3000);
    });
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
