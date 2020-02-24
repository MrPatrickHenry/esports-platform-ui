import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { environment } from '../../environments/environment';

import { trigger, transition, animate, style } from '@angular/animations';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';
import {
  Router
} from '@angular/router';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import { NgxSpinnerService } from "ngx-spinner";


export interface ResponseObject {
  data: any;
}

export interface PeriodicElement {
  name: string;
  position: number;
  Address: string;
  LeagueCert: string;
}

declare var google;
@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {
 displayedColumns: string[] = ['arcadeName', 'phone','email', 'city','country','website'];
  dataSource:any;

  constructor(private spinner: NgxSpinnerService,private httpClient: HttpClient) { }

  ngOnInit() {
            this.spinner.show();

  	  this.initMap();
        this.getArcades();
  }
public apiURL: string = environment.apiUrl;

  public users  = []; 
  getArcades() {
    var aToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
    const endpoint = 'arcade'; 

    this.httpClient.get(this.apiURL + endpoint,{headers})
    .subscribe( (res: ResponseObject) => {
    this.dataSource = new MatTableDataSource(res.data);
    this.spinner.hide();
    });
  }



initMap() {

//move to api service
var markers = [
    {
        "arcadeName": "Virtualities",
        "lat": "40.7663176",
        "lng": "-111.9042884",
        "website": "virtualites.co"
    },
    {
        "arcadeName": "Limetless-VR",
        "lat": null,
        "lng": null,
        "website": "https://limitless-vr.com"
    },
    {
        "arcadeName": "TT Israel Rehovot ",
        "lat": null,
        "lng": null,
        "website": "https://www.tower-tag.co.il/"
    },
    {
        "arcadeName": "Lancaster VR Lounge",
        "lat": null,
        "lng": null,
        "website": "http://lancastervrlounge.com"
    },
    {
        "arcadeName": "arenavr",
        "lat": "49.89500400000001",
        "lng": "-97.05643309999999",
        "website": "https://arenavr.ca/"
    },
    {
        "arcadeName": "https://www.livescope.be",
        "lat": "50.8271016",
        "lng": "4.372799",
        "website": "www.livescope.be"
    },
    {
        "arcadeName": "vrcorner.com.au",
        "lat": "-33.8855291",
        "lng": "151.2024832",
        "website": "https://vrcorner.com.au/contact_us"
    },
    {
        "arcadeName": "freespacevr",
        "lat": "-27.4567508",
        "lng": "153.0312573",
        "website": "freespacevr.com.au"
    },
    {
        "arcadeName": "VR Territory Orlando",
        "lat": "28.4556807",
        "lng": "-81.47018369999999",
        "website": "https://orlando.vrterritory.zone/"
    },
    {
        "arcadeName": "The VR Room",
        "lat": "52.3901792",
        "lng": "4.8410022",
        "website": "www.vrlasergaming.com"
    },
    {
        "arcadeName": "Le Nautilus",
        "lat": "45.1920477",
        "lng": "5.730970699999999",
        "website": "https://lenautilusgrenoble.fr/"
    },
    {
        "arcadeName": "VRcafe",
        "lat": "52.3867467",
        "lng": "4.6383274",
        "website": "www.vrcafehaarlem.nl"
    }
];









        // Styles a map in night mode.
                var myMapCenter = {lat: 40.765943, lng: -111.904242};
        var map = new google.maps.Map(document.getElementById('map'), {
                center: myMapCenter,
                zoom: 14,
                           disableDefaultUI: false,
                                styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ],

        });

// var marker = new google.maps.Marker({
//      map: map,
//      position: myMapCenter,
//      title: 'Hello World!'
// });
   for (var i = 0; i < markers.length; i++) {
            var data = markers[i]
            var myLatlng = new google.maps.LatLng(data.lat, data.lng);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: data.arcadeName
            });
            (function (marker, data) {
                google.maps.event.addListener(marker, "click", function (e) {
                    infowindow.setContent("<div style = 'width:200px;min-height:40px'>" + data.arcadeName + "<br>" +"<a href='" + data.website + "'>"+ data.website +"</a></div>");
                    infowindow.open(map, marker);
                });
            })(marker, data);
        }

  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">+data.arcadeName</h1>'+
      '<div id="bodyContent">'+
      '</div>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

// var marker = new google.maps.Marker({
//     position: myMapCenter,
//     map: map,
//     title: 'VAL HQ'
//   });
//   marker.addListener('click', function() {

//         if (marker.getAnimation() !== null) {
//           marker.setAnimation(null);
//         } else {
//           marker.setAnimation(google.maps.Animation.BOUNCE);
//         };
//     infowindow.open(map, marker);
//   });

}// end of Map call backs


}
