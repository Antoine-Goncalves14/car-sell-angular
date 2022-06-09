import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, Subject } from 'rxjs';
import { Offer } from '../interfaces/offer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  private offers: Offer[] = [];

  offerSubject: Subject<Offer[]> = new Subject();

  constructor(
    private db: AngularFireDatabase,
  ) { }

  getOffers() {

  }

  dispatchOffers() {
    this.offerSubject.next(this.offers);
  }

  createOffer(offer: Offer): Promise<Offer> {
    return new Promise((resolve, reject) => {
      this.db.list('offers').push(offer).then(res => {
        const createdOffer = { ...offer, id: String(res.key) };
        this.offers.push(createdOffer);
        this.dispatchOffers();

        resolve(createdOffer);
      }).catch(reject);
    })
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
