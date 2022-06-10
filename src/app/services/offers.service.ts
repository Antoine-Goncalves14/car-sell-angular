import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
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
    private storage: AngularFireStorage,
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

  async createOffer(offer: Offer, offerPhoto?: any): Promise<Offer> {
    try {
      const photoUrl = offerPhoto ? await this.uploadPhoto(offerPhoto) : '';

      const response = this.db.list('offers').push({...offer, photo: photoUrl});
      const createdOffer = { ...offer, photo: photoUrl, id: String(response.key) };

      this.offers.push(createdOffer);
      this.dispatchOffers();

      return createdOffer;
    } catch (error) {
      throw error
    }
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

  private uploadPhoto(photo: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const upload = this.storage.upload('offers/' + Date.now() + '-' + photo.name, photo);
      upload.then((res) => {
        resolve(res.ref.getDownloadURL());
      }).catch(reject);
    });
  }
}
