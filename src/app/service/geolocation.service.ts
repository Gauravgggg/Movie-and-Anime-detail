import { Injectable } from '@angular/core';
import { error } from 'console';
import { promises } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  getLoaction(): Promise<{latitued: number, logitude:number}>{
    return new Promise((resolve, reject)=>{
      if (!navigator.geolocation) {
        reject('geo loaction is not support in this browser.')
      }
      else{
        navigator.geolocation.getCurrentPosition((position)=>{
          resolve({
            latitued: position.coords.latitude,
            logitude: position.coords.longitude
          });
        },(error)=>{
          reject('uable to retierive your loaction:' + error.message)
        }
      )
      }
    })

  }
}
