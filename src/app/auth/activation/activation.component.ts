import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { HttpClient, HttpParams, HttpErrorResponse, HttpResponse, HttpHeaders,HttpEventType } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable} from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormsModule,FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

export interface ResponseObject {
	data: {
        	message:{};
		id:{}
		userType:{};
	};
}
export interface Arcade {
	value:string;
	viewValue:string;
}

export interface Lincenses{
	value:string;
	viewValue:string;
}

@Component({
	selector: 'app-activation',
	templateUrl: './activation.component.html',
	styleUrls: ['./activation.component.scss']
})

export class ActivationComponent implements OnInit {
	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;
	thirdFormGroup: FormGroup;
	fourthFormGroup: FormGroup;


	myControl = new FormControl();

	Liceenses: Lincenses[] = [
	{value: 'PLVR', viewValue: 'PLVR'},
	{value: 'Springboard', viewValue: 'Springboard'},
	{value: 'Ctrl V', viewValue: 'Ctrl V'},
	{value: 'Synthesis', viewValue:'Synthesis'},
	{value: 'Steam Cafe', viewValue:'Steam Cafe'},
	{value: 'Viveport', viewValue:'Viveport'},
	{value: 'Neurogaming', viewValue:'Neurogaming'},
	{value: 'MK2', viewValue:'MK2'},
	{value: 'direct deals', viewValue:'direct deals'},
	{value: 'other', viewValue:'Other'}
	];

	options: string[] = [
	'6th Dimension',
	'A/Maze',
	'Adrenaline International',
	'Aloha 9D VR',
	'Alpha VR',
	'Altered Realities VR Arcade',
	'ALTESC VR',
	'Amaze Vr',
	'Anything Virtual LLC.',
	'Arctic Sun VR',
	'Arena VR',
	'ArenaVR',
	'AVR Zone ',
	'Be Virtual',
	'BeGame',
	'Better Than Unicorns',
	'Beyond Reality',
	'Black Mission Area VR Lounge',
	'BlueWall VR',
	'Bluff City VR',
	'Breakout VR',
	'Canary Virtual Place',
	'Cape VR (COMING SOON)',
	'Castle Step Games',
	'Centre VR',
	'ChiVR',
	'Cimulated VR',
	'ColonyVR',
	'Death and Taxes',
	'Deck 1 VR',
	'DeployVR',
	'Destination VR',
	'District Beta',
	'DNA VR',
	'Dovr',
	'Draper VR',
	'Edge VR Arcade',
	'EliteVR arecade',
	'ERVR',
	'Escape Reality VR Arcade',
	'Escape Rooms Adventure',
	'eweb360VR',
	'FitCade',
	'Fliptout Gaming',
	'Free Space VR Arcade',
	'FronteraVirtual',
	'FroydTech VR',
	'Funtasia ',
	'Fusion Arena Virtual Reality Center',
	'Future Shock',
	'Futurist Games',
	'GalaxyVR ',
	'Gameday VR',
	'Gamer Planet',
	'Genesis VR',
	'Genesis VR',
	'Go VR Gaming',
	'Head Games VR',
	'Heroes Virtual Reality Adventures',
	'Holocaf√© Aachen',
	'Holotech',
	'House of VR',
	'https://vrrage.com',
	'Idaho Virtual Reality Council',
	'Immersive VR Egypt',
	'Infinite Loop VR',
	'Infusion Edutainment Virtual Reality',
	'inVRinity',
	'Irr√©el',
	'iSimu VR',
	'Konica Minolta VirtuaLink',
	'Lancaster VR Lounge',
	'Langasm',
	'Le Studio de R√©alit√© Virtuelle',
	'Legends comix and games ',
	'Level 1 VR',
	'Limitless-VR',
	'Livescope',
	'loftVR Arcade',
	'Los|Virtuality',
	'MAINVRAME',
	'Matrix Virtual Reality Gaming Arcade and Cinema',
	'MindOut',
	'MK2 VR',
	'name',
	'Nearby Planet VR',
	'Nouvelle Dimension',
	'Omniverse',
	'Omniverse VR',
	'Outer Limits Virtual Reality',
	'Outer Limits VR',
	'Outo Arcade',
	'Pandoras Box VR Arcade ',
	'Paradigm',
	'Penticton Virtual Reality Studio',
	'Planet game hub',
	'REM5 VR LAB',
	'Rocket City Arcade and Classic Consoles',
	'Rush VR',
	'Sensorama',
	'Sensorama VR Arcade',
	'SOL VR Lounge London',
	'Spaces VR',
	'Spectrum Virtual Reality Arcade',
	'Starcade VR',
	'StudioVR',
	'Survios Virtual Reality Arcade',
	'SyncroVR',
	'Tagtime Laser Tag',
	'TT Israel Rehovot',
	'The Grid VR',
	'The VR Center',
	'The VR Club',
	'The VR concept',
	'The VR Hut',
	'The VR Hut Inc.',
	'The VR Space Chelmsford',
	'TORONTO VR GAMES',
	'Toxic VR',
	'Toxic VR Virtual reality lounge',
	'UNIVRS VR Lounge',
	'Univrse',
	'Unrealvr',
	'VCVR',
	'VelocityVR Spaces',
	'Viral',
	'VIRTREAL',
	'Virtuaalimaailma Warppi',
	'Virtual Experience',
	'Virtual Game',
	'Virtual playground',
	'Virtual Reality Colombia',
	'Virtual Realms',
	'VIRTUAL STING',
	'Virtual World Arcade',
	'Virtual X',
	'Virtualities',
	'Virtuality x Tokyo Retro Gaming',
	'Vivid VR Gaming',
	'VR Arcade (Malaga)',
	'VR Arcade MOD',
	'VR Arena (Clifton Hill)',
	'VR Center (Zaragoza)',
	'VR Centre (Lawson Heights Mall)',
	'VR Champions',
	'VR Cornee',
	'VR Corner',
	'VR Evolution (Mans)',
	'VR Extreme',
	'VR Fabricators',
	'VR FUN',
	'VR Gamerz',
	'VR Gaming the Great Escape',
	'VR Go!',
	'VR Haunted House',
	'VR Heaven',
	'VR Junkies',
	'VR Junkies Colorado',
	'VR Junkies Hawaii',
	'Vr Junkies Orem',
	'VR PARK TOKYO',
	'VR Portal',
	'VR Tech Lounge',
	'VR Territory',
	'VR Vision',
	'VR-Here',
	'VR-Lounge',
	'VR1',
	'VR4play',
	'vrbar',
	'VRcadia',
	'VREX Virtual Reality Experience',
	'VRKADE',
	'VRKADE (Calgary SE)',
	'VRKADE Helios',
	'VRoom',
	'VRPlayin',
	'VRStudios.us',
	'VRuVas',
	'VRX Virtual Reality and eSports Center',
	'Vx Reality Arcade',
	'Wild dimensions ',
	'Xvrcade',
	'Zero Latency',
	'Zion VR',
	'Zone360'];

	filteredOptions: Observable<string[]>;

	constructor(private _formBuilder: FormBuilder,private httpClient: HttpClient,private _snackBar: MatSnackBar,private route: ActivatedRoute,private router: Router) { }
	public tokenCheck:string
public apiURL: string = environment.apiUrl;
	ngOnInit() {

		this.firstFormGroup = this._formBuilder.group({
			firstCtrl: ['', Validators.required]
		});
		this.secondFormGroup = this._formBuilder.group({
			secondCtrl: ['', Validators.required]
		})

		this.filteredOptions = this.myControl.valueChanges.pipe(
			startWith(''),
			map(value => this._filter(value))
			);

		this.tokenCheck = this.route.snapshot.queryParamMap.get("token")
		this.route.queryParamMap.subscribe(queryParams => {
			this.tokenCheck = queryParams.get("token")
			this.checkToken(this.tokenCheck);
			localStorage.setItem('token', this.tokenCheck);
		})
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
	}

	goPlaces(){
		setTimeout(() => {
			this.router.navigate(['logout']);
		}, 3000);
	}

	public authData:any;
	public uID:any;
	public userAuth:any;
        public message:any;
	checkToken(tokenCheck:string){
		let token = tokenCheck;
		let postData = new FormData();
		postData.append('token',token);
                const endpoint = 'authorizeToken'; 

		this.httpClient.post(this.apiURL + endpoint,postData)
		.subscribe( (res: ResponseObject) => {
			this.authData = res.data["0"];
			this.uID = res.data["0"].id;
                        localStorage.setItem('uid', this.uID);

			this.userAuth = res.data["0"].userType;
                        this.message = res.data.message;
                      console.log(this.userAuth);

		});

	}


	UpdateArcadeUser(

		phone:string,
		Address1:string,
		Address2:string,
		city:string,
		state:string,
		country:string,
		zipPost:string,
		dob:string,
		gender:string,
                headset:string,
                password:string,
		FavouriteVRTitle:string,
		team:string, 
		Arcadename:string,
		Arcadeemail:string,
		Arcadephone:string,
		hours:string,
		ArcadeAddress1:string,
		ArcadeAddress2:string,
		Arcadecity:string,
		Arcadestate:string,
		Arcadecountry:string,   
		ArcadezipPost:string,
		desc:string,
		website:string,
		l:string,
		discord:string,
		twitter:string,
		twitch:string,
		youtube:string){

        	//         	if (password != password_confirmation){
        	// 	var message = "Passwords Don't Match";
                //         return this.openSnackBar( message);
        	// }
		const endpoint = 'activation/creation/arcade'; 
                let adminUserid = localStorage.getItem('uid');
		let postData = new FormData();
		postData.append('uid',adminUserid);
		postData.append('phone',phone);
		postData.append('address1',Address1);
		postData.append('address2',Address2);
		postData.append('city',city);
		postData.append('state',state);
		postData.append('country',country);
		postData.append('zipPost',zipPost);
		postData.append('dob',dob);
		postData.append('gender',gender);
                postData.append('headset',headset);
		postData.append('favourite_VR_Title',FavouriteVRTitle);
		postData.append('home_arcade',Arcadename);
		postData.append('team',team); 
                postData.append('password',password);  
                postData.append('Arcadename',Arcadename);
		postData.append('Arcadeemail',Arcadeemail);
		postData.append('Arcadephone',Arcadephone);
		postData.append('hours',hours)
		postData.append('ArcadeAddress1',ArcadeAddress1);
		postData.append('ArcadeAddress2',ArcadeAddress2);
		postData.append('Arcadecity',Arcadecity);
		postData.append('Arcadestate',Arcadestate);
		postData.append('Arcadecountry',Arcadecountry);
		postData.append('ArcadezipPost',ArcadezipPost);
		postData.append('desc',desc);
		postData.append('website',website);
		postData.append('licensing',l);
		postData.append('discord',discord);
		postData.append('twitter',twitter);
		postData.append('twitch',twitch);
		postData.append('youtube',youtube);

		//create user
		this.ActivateUser(phone,Address1,Address2,city,state,country,zipPost,dob,gender,
                	headset,FavouriteVRTitle,Arcadename,team,password);
		//arcadeCreation
		this.httpClient.post('https://20-twenty.online/api/v2/activation/creation/arcade',postData)
		.subscribe( (res: ResponseObject) => {
			var message = 'Your Arcade is set 🎉🥳';
			this.openSnackBar( message);
			this.goPlaces();
		});
	};


	ActivateUser(phone:string,address1:string,address2:string,city:string,state:string,
        	country:string,zipPost:string,dob:string,gender:string,headset:string,FavouriteVRTitle:string,
        	homeArcade:string,team:string,password:string){

		let postData = new FormData();
                let Userid = localStorage.getItem('uid');

		postData.append('uid',Userid);
		postData.append('phone',phone);
		postData.append('address1',address1);
		postData.append('address2',address2);
		postData.append('city',city);
		postData.append('state',state);
		postData.append('country',country);
		postData.append('zipPost',zipPost);
		postData.append('dob',dob);
		postData.append('gender',gender);
                postData.append('headset',headset);
		postData.append('favourite_VR_Title',FavouriteVRTitle);
		postData.append('home_arcade',homeArcade);
		postData.append('team',team);
                postData.append('password',password);
		this.httpClient.post('https://20-twenty.online/api/v2/users/activation/creation',postData)
		.subscribe( (res: ResponseObject) => {
			var message = 'Your Account is activated 🎉🥳';
			this.openSnackBar( message);

			if (this.userAuth === "Arcade Owner"){
				return true;
			}
			else{
				this.goPlaces();
			}

		});
	}

	// response to send
	openSnackBar(message: string) {
		this._snackBar.open(message, '', {
			duration: 3000,
			panelClass: ['snackbarVAL']
		});

	}



}