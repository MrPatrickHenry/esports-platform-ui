import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,
        HttpParams,
        HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "https://20-twenty.online/api/v2/health_check";

  constructor(private httpClient: HttpClient) { }
// simple get request for health check
    public sendGetRequest(){
    return this.httpClient.get(this.REST_API_SERVER);
}

// Love this 
  public getNotifications(uid){
	var aToken = localStorage.getItem('token');
	const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
  	  let postData = new FormData();
    postData.append('id', uid);
  	return this.httpClient.post('http://127.0.0.1:8000/api/v2/user/notifications',postData,{headers});
  }
}
