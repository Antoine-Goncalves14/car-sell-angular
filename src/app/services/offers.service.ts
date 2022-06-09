import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Subject } from 'rxjs';
import { Offer } from '../interfaces/offer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  private offers: Offer[] = [];

  offerSubject: Subject<Offer[]> = new Subject();

  constructor(
    private db: AngularFireDatabase,
  ) {}

  getOffers(): void {
    this.db.list('offers').query.limitToLast(10).once('value', snapshot => {
      const offersSnapshotValue = snapshot.val();
      if (offersSnapshotValue) {
        const offers = Object.keys(offersSnapshotValue).map(id => ({
          id,
          ...offersSnapshotValue[id]
        }));
        this.offers = offers;
        this.dispatchOffers();
      }
    });
  }

  // Modification en temps réel
  /*getOffersOn(): void {
    this.db.list('offers').query.limitToLast(10).on('value', (snapshot) => {
      const offersSnapshotValue = snapshot.val();
      const offers = Object.keys(offersSnapshotValue).map(id => ({
        id,
        ...offersSnapshotValue[id]
      }));
    });
  }*/

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

  editOffer(offer: Offer, offerId: string): Promise<Offer> {
    return new Promise((resolve, reject) => {
      this.db.list('offers').update(offerId, offer)
        .then(() => {
          const updatedOffer = { ...offer, id: offerId };
          const offerToUpdateIndex = this.offers.findIndex(el => el.id === offerId);
          this.offers[offerToUpdateIndex] = updatedOffer;

          this.dispatchOffers();

          resolve({ ...offer, id: offerId});
        }).catch(reject);
    });
  }

  deleteOffer(offerId: string): Promise<Offer[]> {
    return new Promise((resolve, reject) => {
      this.db.list('offers').remove(offerId)
        .then(() => {
          const offerToDeleteIndex = this.offers.findIndex(el => el.id === offerId);
          this.offers.splice(offerToDeleteIndex, 1);

          this.dispatchOffers();
        }).catch(console.error);
    });
  }
}
