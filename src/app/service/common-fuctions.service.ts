import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonFuctionsService {

  constructor(private http: HttpClient) { }

  // httpPostRequest(url:any,parameters:any,header?){

  // }
  httpGetRequest(url:any){
     return new Promise((resolve, reject) => {
    this.http.get<any>(url).subscribe((success)=>{
      resolve(success);
    },(error)=>{
      reject(error)
    });
    });
  }

}
