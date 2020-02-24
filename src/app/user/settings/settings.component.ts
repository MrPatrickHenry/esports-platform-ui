import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaders,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";
import { FormControl,ReactiveFormsModule  } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Title } from '@angular/platform-browser';
// import { Observable, Subject, asapScheduler, pipe, of, from,
  //   interval, merge, fromEvent } from 'rxjs';
  import { filter, scan } from 'rxjs/operators';
  import { Router,ActivatedRoute } from '@angular/router';
  import { environment } from '../../../environments/environment';


  export interface ResponseObject {
    data: {
      arcade:{};
      result: {
        userType: {};
      };

    }
  }

  export interface settingsResponseObject{
    data:{
      share3rdParties:any;
      Parties:any;
    }
  }

  export interface arcadeResponseObject {
    data: {
      result: {};
      media:{};
      team:{};
      arcade:{};
    }


  }
  export interface teamResponseObject {
    data: {
      results: {}
    }
  }
  export interface Types {
    value: string;
    viewValue: string;
  }

  export interface Lincenses {
    value: string;
    viewValue: string;
  }

  export interface TimeZone {
    value: string;
    viewValue: string;
  }

  export interface Arcade {
    value: string;
    viewValue: string;
  }

  export interface User {
    name: string;
  }


  declare var AuthUser: any;

  @Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
  })

  export class SettingsComponent implements OnInit {
    public user: string;
    public selectedFile: File;
    public selectedImageUrl: string;
    public isMobile: boolean;
    public AuthUser: string;
    public arcade: any;
    public users: any;
    public media: any;
    public arcadeData: any;
    public userAuth: string;
    public statepublic: any;
    public settings: any;
    public team: any;
    public teamData: any;
    public apiURL: string = environment.apiUrl;

    constructor(public dialog: MatDialog, private spinner: NgxSpinnerService, private titleService: Title, private _snackBar: MatSnackBar, private httpClient: HttpClient,
      private router: Router, private _bottomSheet: MatBottomSheet) { }

    ngOnInit() {
      this.setTitle();
      this.userDetails();
      // this.userArcade();
      this.mobileCheck();
      this.userSettings();
    }

    public setTitle() {
      this.titleService.setTitle('Profile Page');
    }

    // All Models

    editUser(): void {
      // pid = uid;
      const dialogRef = this.dialog.open(dialogEditUser, {
        height: '100vh',
        panelClass: 'custom-modalbox',
        data: { id: this.users.id }

      });
    }

    editSocialInfo(): void {
      const dialogRef = this.dialog.open(dialogSocialSettings, {
        height: '100vh',
        panelClass: 'custom-modalbox',
        data: { tid: this.users.id }
      });
    }


editArcadeInfo(){
      const dialogRef = this.dialog.open(dialogArcadeInfo, {
        height: '100vh',
        panelClass: 'custom-modalbox',
        data: { tid: this.users.id }
      });
    }

    teamEdit(){
      const dialogRef = this.dialog.open(dialogTeamSettings, {
        height: '100vh',
        panelClass: 'custom-modalbox',
        data: { tid: this.users.id }
      });
    }

    teamCreate() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.height = '100vh';
      dialogConfig.panelClass = 'custom-modalbox';
      this.dialog.open(dialogTeamCreate, dialogConfig);
    }

    addMedia(): void {
      // pid = uid;
      const dialogRef = this.dialog.open(dialogAddMedia, {
        height: '100vh',
        panelClass: 'custom-modalbox',
        data: { id: this.users.id }

      });
    }

    preflight() {
      let auth = localStorage.getItem('auth');

      if (auth != 'true') {
        this.router.navigate(['/signin']);
      }

    }

    picture(fid: string) {
      const dialogConfig = new MatDialogConfig();
      let mid = fid;
      dialogConfig.autoFocus = true;
      dialogConfig.height = '100vh';
      dialogConfig.panelClass = 'custom-modalbox';
      dialogConfig.data = {
        MID: mid
      };
      this.dialog.open(dialogMediaSettings, dialogConfig);
    }


    mobileCheck() {
      if (window.innerWidth < 768) {
        this.isMobile = true;
      }
      else {
        this.isMobile = false;
      }
    }

    public onChangeFileInput(event): void {
      const file = event.target.files[0];
      if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
        return;
      }
      this.selectedFile = file;
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.selectedImageUrl = reader.result as string;
      };
    }

    public cancel(): void {
      this.selectedFile = null;
      this.selectedImageUrl = null;
    }

    userDetails() {
      var AuthUser = localStorage.getItem('user');
      var uid = localStorage.getItem('uid');
      let postData = new FormData();
      postData.append('id', uid);
      // to do User Angular Service
      var aToken = localStorage.getItem('token');
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      const endpoint = 'user/profile'; 

      //this should be
      this.httpClient.post(this.apiURL + endpoint, postData, { headers })
      .subscribe((res: arcadeResponseObject) => {
        this.users = res.data.result["0"];
        this.userAuth = res.data.result["0"].userType;
        this.media = res.data.media;
        this.teamData = res.data.team["0"];
        this.arcadeData = res.data.arcade["0"];

      });

    }


    userSettings() {
      var uid = localStorage.getItem('uid');
      let postData = new FormData();
      postData.append('id',uid);
      var aToken = localStorage.getItem('token');
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      const endpoint = 'user/settings'; 

      //this should be 
      this.httpClient.post(this.apiURL + endpoint, postData, { headers })
      .subscribe((res: settingsResponseObject) => {
        this.settings = res.data["0"].result["0"]; 

      });

    }

    searchable(e) {
      var state = 0
      if (e.checked != true) {
        state = 0;
      }
      else {
        state = 1;
      }
      let AuthUser = localStorage.getItem('user');
      let statepublic = state.toString();
      let postData = new FormData();
      postData.append('id', this.users.id);
      postData.append('public', statepublic);
      // to do User Angular Service
      var aToken = localStorage.getItem('token');
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      const endpoint = 'user/update'; 

      this.httpClient.post(this.apiURL + endpoint, postData, { headers })
      .subscribe((res: ResponseObject) => {
        let message = 'Preferance has been updated'
        this.openSnackBar(message);
        this.timer();
      });
    }



    passwordChange(pass1:string,pass2:string){

      let postData = new FormData();
      postData.append('email', this.users.email);
      let pword = pass1;
      let pconfirmation = pass2;
      postData.append('password',pword);
      postData.append('password_confirmation',pconfirmation);
      var aToken = localStorage.getItem('token');
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);

      this.httpClient.post('https://20-twenty.online/api/auth/password', postData, { headers })
      .subscribe((res: ResponseObject) => {
        let message = 'Password has been changed: 👮‍♂️ logging out for security'
        this.openSnackBar(message);
        this.router.navigate(['/logout']);


      });    
    }




    teamRecruiting(e) {
      var state = 0
      if (e.checked != true) {
        state = 0;
      }
      else {
        state = 1;
      }
      let AuthUser = localStorage.getItem('user');
      let teamDataID = this.teamData.id;
      let statepublic = state.toString();
      let postData = new FormData();
      postData.append('id', teamDataID);
      postData.append('recruting', statepublic);
      // to do User Angular Service
      var aToken = localStorage.getItem('token');
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      const endpoint = 'teams/update'; 

      this.httpClient.post(this.apiURL + endpoint, postData, { headers })
      .subscribe((res: ResponseObject) => {
        let message = 'Recruitment is now open for your team'
        this.openSnackBar(message);
        this.timer();
      });
    }

    //bring in arcade to main view
    userArcade() {
      var uid = localStorage.getItem('uid');
      let postData = new FormData();
      postData.append('uid', uid);
      // to do User Angular Service
      var aToken = localStorage.getItem('token');
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      const endpoint = 'user/arcades'; 

      //this should be
      this.httpClient.post(this.apiURL + endpoint, postData, { headers })
      .subscribe((res: ResponseObject) => {
        this.arcade = res.data["0"].result["0"];
      });
    }


    // response to send
    openSnackBar(message: string) {
      this._snackBar.open(message, '', {
        duration: 3000
      });
    }



    timer() {
      setTimeout(function() { location.reload(); }, 3000);
    }

    reloadui() {
      //putting this here to find better way to reload without doing pusher

    }


  }
  //to do should be their own components to make this file smaller and easier to work with
  //to do clean up
  // Edit user Model
  @Component({
    selector: '',
    templateUrl: 'editProfile.html',
    styleUrls: ['./settings.component.scss']
  })
  export class dialogEditUser implements OnInit {

    myControl = new FormControl();
    myControlGames = new FormControl();
    // to do pull from service
    options: string[] = ['6th Dimension', 'A/Maze', 'Adrenaline International', 'Aloha 9D VR', 'Alpha VR', 'Altered Realities VR Arcade', 'ALTESC VR', 'Amaze Vr', 'Anything Virtual LLC.', 'Arctic Sun VR', 'Arena VR', 'ArenaVR', 'AVR Zone ', 'Be Virtual', 'BeGame', 'Better Than Unicorns', 'Beyond Reality', 'Black Mission Area VR Lounge', 'BlueWall VR', 'Bluff City VR', 'Breakout VR', 'Canary Virtual Place', 'Cape VR (COMING SOON)', 'Castle Step Games', 'Centre VR', 'ChiVR', 'Cimulated VR', 'ColonyVR', 'Death and Taxes', 'Deck 1 VR', 'DeployVR', 'Destination VR', 'District Beta', 'DNA VR', 'Dovr', 'Draper VR', 'Edge VR Arcade', 'EliteVR arecade', 'ERVR', 'Escape Reality VR Arcade', 'Escape Rooms Adventure', 'eweb360VR', 'FitCade', 'Fliptout Gaming', 'Free Space VR Arcade', 'FronteraVirtual', 'FroydTech VR', 'Funtasia ', 'Fusion Arena Virtual Reality Center', 'Future Shock', 'Futurist Games', 'GalaxyVR ', 'Gameday VR', 'Gamer Planet', 'Genesis VR', 'Genesis VR', 'Go VR Gaming', 'Head Games VR', 'Heroes Virtual Reality Adventures', 'Holocaf√© Aachen', 'Holotech', 'House of VR', 'https://vrrage.com', 'Idaho Virtual Reality Council', 'Immersive VR Egypt', 'Infinite Loop VR', 'Infusion Edutainment Virtual Reality', 'inVRinity', 'Irr√©el', 'iSimu VR', 'Konica Minolta VirtuaLink', 'Lancaster VR Lounge', 'Langasm', 'Le Studio de R√©alit√© Virtuelle', 'Legends comix and games ', 'Level 1 VR', 'Limitless-VR', 'Livescope', 'loftVR Arcade', 'Los|Virtuality', 'MAINVRAME', 'Matrix Virtual Reality Gaming Arcade and Cinema', 'MindOut', 'MK2 VR', 'name', 'Nearby Planet VR', 'Nouvelle Dimension', 'Omniverse', 'Omniverse VR', 'Outer Limits Virtual Reality', 'Outer Limits VR', 'Outo Arcade', 'Pandoras Box VR Arcade ', 'Paradigm', 'Penticton Virtual Reality Studio', 'Planet game hub', 'REM5 VR LAB', 'Rocket City Arcade and Classic Consoles', 'Rush VR', 'Sensorama', 'Sensorama VR Arcade', 'SOL VR Lounge London', 'Spaces VR', 'Spectrum Virtual Reality Arcade', 'Starcade VR', 'StudioVR', 'Survios Virtual Reality Arcade', 'SyncroVR', 'Tagtime Laser Tag', 'TT Israel Rehovot', 'The Grid VR', 'The VR Center', 'The VR Club', 'The VR concept', 'The VR Hut', 'The VR Hut Inc.', 'The VR Space Chelmsford', 'TORONTO VR GAMES', 'Toxic VR', 'Toxic VR Virtual reality lounge', 'UNIVRS VR Lounge', 'Univrse', 'Unrealvr', 'VCVR', 'VelocityVR Spaces', 'Viral', 'VIRTREAL', 'Virtuaalimaailma Warppi', 'Virtual Experience', 'Virtual Game', 'Virtual playground', 'Virtual Reality Colombia', 'Virtual Realms', 'VIRTUAL STING', 'Virtual World Arcade', 'Virtual X', 'Virtualities', 'Virtuality x Tokyo Retro Gaming', 'Vivid VR Gaming', 'VR Arcade (Malaga)', 'VR Arcade MOD', 'VR Arena (Clifton Hill)', 'VR Center (Zaragoza)', 'VR Centre (Lawson Heights Mall)', 'VR Champions', 'VR Cornee', 'VR Corner', 'VR Evolution (Mans)', 'VR Extreme', 'VR Fabricators', 'VR FUN', 'VR Gamerz', 'VR Gaming the Great Escape', 'VR Go!', 'VR Haunted House', 'VR Heaven', 'VR Junkies', 'VR Junkies Colorado', 'VR Junkies Hawaii', 'Vr Junkies Orem', 'VR PARK TOKYO', 'VR Portal', 'VR Tech Lounge', 'VR Territory', 'VR Vision', 'VR-Here', 'VR-Lounge', 'VR1', 'VR4play', 'vrbar', 'VRcadia', 'VREX Virtual Reality Experience', 'VRKADE', 'VRKADE (Calgary SE)', 'VRKADE Helios', 'VRoom', 'VRPlayin', 'VRStudios.us', 'VRuVas', 'VRX Virtual Reality and eSports Center', 'Vx Reality Arcade', 'Wild dimensions ', 'Xvrcade', 'Zero Latency', 'Zion VR', 'Zone360'];

    filteredOptions: Observable<string[]>;

    // to do pull from service
    // games: string[] = [ ''];to do
    games: string[] = ['Beat Saber', 'Pavlov VR', 'Blade and Sorcery', 'Rec Room', 'Arizona Sunshine', 'Hot Dogs, Horseshoes & Hand Grenades', 'Elven Assassin', 'The Elder Scrolls V: Skyrim VR', 'Job Simulator', 'Onward', 'Pistol Whip', 'SUPERHOT VR', 'The Lab', 'Virtual Desktop', 'Fallout 4 VR', 'GORN', 'Pluto', 'OVR Toolkit', 'fpsVR', 'Serious Sam VR: The Last Hope', 'Zero Caliber VR', 'Google Earth VR', 'Bigscreen Beta', 'Space Pirate Trainer', 'Richies Plank Experience', 'Tilt Brush', 'TurnSignal', 'FIVE NIGHTS AT FREDDYS VR: HELP WANTED', 'Vacation Simulator', 'PokerStars VR', 'OVRdrop', 'Smashbox Arena', 'Spider-Man: Far From Home Virtual Reality', 'DeoVR Video Player', 'Raw Data', 'VirtualCast', 'Borderlands 2 VR', 'SKYBOX VR Video Player', 'Budget Cuts', 'theBlu', 'VTOL VR', 'Epic Roller Coasters', 'Fruit Ninja VR', 'Simple VR Video Player', 'Star Trek™: Bridge Crew', 'Creed: Rise to Glory™', 'Drunkn Bar Fight', 'Batman™: Arkham VR', 'In Death', 'GizmoVR Video Player', 'LIV Client', 'Contractors', 'Hellsplit: Arena', 'STAND OUT : VR BATTLE ROYALE', 'Kart Racing Pro', 'The Thrill of the Fight - VR Boxing', 'Whirligig VR Media Player', 'YouTube VR', 'Sansar', 'I Expect You To Die', 'BOXVR', 'NVIDIA® VR Funhouse', 'Audica', 'Loco Dojo', 'Waltz of the Wizard', 'Climbey', 'Eleven: Table Tennis VR', 'Skyfront VR', 'Spider-Man: Homecoming - Virtual Reality Experience', 'Eternity Warriors™ VR', 'The Brookhaven Experiment', 'QuiVr', 'Tiny Town VR', 'VR Kanojo / VRカノジョ', 'NeosVR', 'Rick and Morty: Virtual Rick-ality', 'WAR DUST | 32 vs 32 Battles', 'The Talos Principle VR', 'Summer Funland', 'Furious Seas', 'Into the Radius VR', 'Ultimate Fishing Simulator VR', 'Daily VR', 'Sairento VR', 'Audioshield', 'OrbusVR: Reborn', 'Final Assault', 'Steam 360 Video Player', 'Moss', 'GunsnStories: Preface VR', 'Until You Fall', 'Gravity Sketch', 'Ultimate Booster Experience', 'Cave Digger', 'Lightblade VR', 'Cowbots and Aliens', 'Serious Sam 3 VR: BFE', 'John Wick Chronicles', 'Kingspray Graffiti VR', 'Chess Ultra', 'Jet Island', 'Ultimate Coaster X', 'SURV1V3', 'ZomDay', 'AFTER-H', 'GNOG', 'Vox Machinae', 'Virtual Desktop Dashboard', 'Fancy Skiing VR', 'Serious Sam VR: The First Encounter', 'Karnage Chronicles', 'Island 359™', 'TheWaveVR Beta', 'AltspaceVR—The Social VR App', 'The Invisible Hours', 'Zombie Training Simulator', 'Angry Birds VR: Isle of Pigs', 'Do or Die', 'MasterpieceVR', 'IronWolf VR', 'Hellblade: Senuas Sacrifice VR Edition', 'Waltz of the Wizard: Extended Edition', 'Synth Riders', 'Sam & Dan: Floaty Flatmates', 'Undead Development', 'VR Dungeon Knight', 'Wrench', 'Bullet Sorrow VR', 'Cosmic Sugar VR', 'Escape First', 'Aperture Hand Lab', 'Archangel™: Hellfire - Enlist FREE', 'Avem33', 'Blocks by Google', 'Seeking Dawn', 'Epic Fun', 'The Red Stare', 'Racket: Nx', 'Surgeon Simulator: Experience Reality', 'Gun Club VR', 'Racket Fury: Table Tennis VR', 'Home - A VR Spacewalk', 'Love Vibe: Aria', 'YOU by Sharecare', 'Vanishing Realms™', 'Cosmic Trip', 'Abode 2', 'GunsnStories: Bulletproof VR', 'Adventure Climb VR', 'First Person Tennis - The Real Tennis Simulator', 'VR The Diner Duo', 'COMPOUND', 'Star Shelter', 'Duck Season', 'Holopoint', 'Dream Coaster VR', 'Killing Floor: Incursion', 'ARK Park', 'Overkill VR: Action Shooter FPS', 'A Story of Distress', 'Ultrawings', 'Surgeon Simulator VR: Meet The Medic', 'Mindshow', 'AFFECTED: The Manor', 'Natural Locomotion', 'Kittend', 'Beast Pets', 'The Golf Club VR', 'Battlewake', 'Loco Parentis (ex Adoption)', 'Supermedium', 'Skyworld', 'Accounting (Legacy)', 'Deserving Life', 'Throw Anything', 'Westard', 'Windlands 2', 'Thrills & Chills - Roller Coasters', 'Microsoft Maquette', 'Trickster VR: Co-op Dungeon Crawler', 'Aircar', 'Belko VR: An Escape Room Experiment', 'VR Toolbox: 360 Desktop', 'War Robots VR: The Skirmish', 'Electronauts', 'Hoops VR', 'DOOM VFR', 'A-Tech Cybernetic VR', 'THE LAST SURVIVOR', 'The Ranger: Lost Tribe', 'Funny Archery', 'Hotel RnR', 'The Turdler', 'Toy Gun Office Simulator', 'Star Wars: Droid Repair Bay', 'RAYGUN COMMANDO VR', 'VR Regatta - The Sailing Game', 'MermaidVR Video Player', 'Dead Effect 2 VR', 'Fantasynth: Chez Nous', 'Zombie Riot', 'Dungeon Escape VR', 'Front Defense', 'Premium Bowling', 'Accounting+', 'Acron: Attack of the Squirrels!', 'Operation Warcade VR', 'Apex Construct', 'Audio Trip', 'THE LAST PLAYER:VR Battle Royale', 'VRCapture', 'The Gallery - Episode 2: Heart of the Emberstone', 'The Wizards - Enhanced Edition', 'Ninja Legends', 'In Your Face TD', 'Ping Pong League', 'Blood Trail', 'Paradiddle', 'Shattered Lights', 'Space Ops VR', 'Vivez Versailles', 'Russian VR Coasters', 'Tin Hearts', 'Fancy Skiing 2: Online', 'Ocean Rift', 'Out of Ammo', 'Eagle Flight', 'The Mages Tale', 'L.A. Noire: The VR Case Files', 'Headmaster', 'VR SUPER SPORTS', 'Short Circuit VR', 'Vive Video', 'Dream Golf VR', 'Carly and the Reaperman - Escape from the Underworld', 'Koliseum Soccer VR Demo', 'Front Defense: Heroes', 'imos VR LOFT', 'The Bellows', 'Pierhead Arcade', 'Lazerbait', 'rumii', 'Vreal', 'Krieg', 'Björk Vulnicura Virtual Reality Album', 'Egg Time', 'FlickSync - Mad Hatter VR', 'Starfighter Arduxim Demo', 'Saloon VR', 'Far Beyond: A space odyssey Demo', 'VersaillesVR | the Palace is yours', 'vSpatial', 'XING: The Land Beyond', 'Idol Quest VR', 'Hailstorm Demo', 'cyubeVR', 'Ready Player One: OASIS beta', 'Chambered', 'VR: Vacate the Room (Virtual Reality Escape)', 'Knockout League - Arcade VR Boxing', 'Mona Lisa: Beyond The Glass', 'AnimVR', 'Boofles Home', 'Prison Boss VR', 'Galactic Gallery', 'Battle Summoners VR Basic', 'Ghost Town Mine Ride & Shootin Gallery', 'Titanic VR', '3D Organon VR Anatomy', 'Bullet Roulette VR', 'Paranormal Activity: The Lost Soul', 'President Erect VR', 'Panoptic', 'Taphouse VR', 'Caliban Below', 'Protocol', 'Destinations', 'Amaze VR - 3D interactives', 'RUSH', 'Playthings: VR Music Vacation', 'Awaken', 'Snow Fortress', 'IKEA VR Pancake Kitchen', '2MD VR Football', 'End Space', 'Acro FS', 'Desert Bus VR', 'Catan VR', 'NightKnight', 'Covert Syndrome', '1943 Berlin Blitz', 'Gal*Gun VR', 'Trials on Tatooine', 'Dimension Hunter Demo', 'Red Matter', 'Power Link VR', 'Dance Collider', 'Nature Treks VR', 'BowMage Demo', 'Evasion', 'Pinball FX2 VR', 'Contagion VR: Outbreak', 'VR Coaster Extreme', 'Wrath of Loki VR Adventure', 'Just In Time Incorporated', 'Kokoda VR', 'TOKYO CHRONOS', 'GrowRilla', 'SiegeVR Demo', 'High Noon VR', 'Racket Fury: Table Tennis VR Demo', 'LooWarVR', 'Cmoar VR Cinema', 'Dont Mess Up Demo', 'BeanVR—The Social VR APP', 'Drop', 'Air Raid Over Britain', 'VRobot Demo', 'Purgation', 'Postity', 'VR Anatomy', 'Artstage Demo', 'Transpose', 'Santas Visit', 'DailyVR Demo', 'Beat Blaster', 'The Broken Seal', 'Transference™', 'Irrational Exuberance: Prologue', 'Garden of the Sea', 'Apollo 11 VR HD', 'The Last Sniper VR Demo', 'DEFCON VR', 'Containment Initiative', 'Holodance', 'Deadly Hunter VR', '狼と香辛料VR/Spice&WolfVR', 'EscapeVR: Trapped Above the Clouds', 'Dinosaur Safari VR', 'BAAM SQUAD', 'Treasure At The Top', 'Serious Sam VR: The Second Encounter', 'There is a Thief in my House', 'Tainted Fate', 'HALP!', 'Number Hunt Demo', 'V-Aria', 'Ancient Amuletor VR', 'Dream Pet VR', 'Rexodus: A VR Story Experience', 'Alice Mystery Garden', 'Paper Dolls', 'Rise of Insanity', 'Premium Bowling Demo', 'NeverBound', 'Perfect', 'The Secret of Puffin Cove Demo', 'Alcatraz: VR Escape Room', 'Mouse Playhouse', 'Hyper Bowling VR', 'Hide & Spook: The Haunted Alchemist', 'Spacescape', 'HORIZON VANGUARD Demo', 'Plank not included', 'Vrideo', 'In League Demo', 'Star Shelter Demo', 'Fruit for the Village Demo', 'Moon VR Video Player', 'Q.U.I.R.K.™', 'Vertigo', 'Beats Fever', 'Pixvana SPIN Play', 'Project LUX', 'Big Hit VR Baseball', 'International Space Station Tour VR', 'Allumette', 'Travel VR', 'X Rebirth VR Edition', 'Galaxity', 'Jeeboman Demo', 'The Last Sniper VR', 'POCKET CAR : VRGROUND', 'Goalie Challenge VR', 'Edmersiv', 'Hub Culture VR', 'OVERVIEW', 'Pixvana SPIN Technology Preview', 'Battlezone Gold Edition', 'Virtually Live presents Formula E Season Two Highlights', 'Teleporter', 'TO THE TOP', 'Forklift Simulator 2019', 'Phantasma VR', 'FOCUS on YOU', 'Endless Night - Alpha', 'Spacetours VR - Ep1 The Solar System', 'Westworld Awakening', 'Thrill Rollercoasters', 'Punch Bomb Demo', 'Wacky Wings Demo', 'World of Virtual Reality VR Demo', 'Order Up VR', 'Behind You Demo', 'VR Jogger', 'Fields of Battle', 'Tales Of Glory Demo', 'Battle Dome', 'Dreams of Dali', 'APEX Tournament Demo', 'Tee Time Golf', 'Hoverboards VR', 'Hex Defense - VR Demo', 'Piñata', 'Go Guess', 'DrumBeats VR', 'Perspectives: Paradise', 'Volcano Eruption', 'Water Bears VR', 'Wanted Killer VR', 'NEUTRANS', 'Song Beater: Quite My Tempo!', 'The Devils Duel Demo', 'Dragon Skies VR Demo', 'Witching Tower VR', 'Tornuffalo', 'Harvest Simulator VR Demo', 'Somnium Space', 'VeeR VR:VR Video and Movie Platform', 'Time Transit VR', 'Rapid Fire', 'My Way VR', 'Everyday Golf VR', 'MarineVerse Cup', 'Abbots Book Demo', 'VR Model Viewer Demo', 'Wrecked: Get Your Ship Together', 'BUTTS: The VR Experience', 'Show It 2 Me', 'BreathePeace World', 'Tails Demo', 'Mervils: A VR Adventure', 'Primordian', 'Flying Aces - Navy Pilot Simulator', 'Mega Overload VR', 'Museum of Symmetry', 'Fade Out', 'Formula E powered by Virtually Live', 'One Dark Night', 'The Last Operator Demo', 'Destination: Pluto The VR Experience', 'PAGAN PEAK VR', 'ToledoVR Demo', 'GoalkeepVr', 'VR Monster Awakens', 'Tabletop Gods', 'Thirst VR', 'Lunapark VR', 'Castle Must Be Mine', 'Lethal VR', 'Beat the Blitz', 'Hunger', 'RideOp - VR Thrill Ride Experience', 'VRZ: Torment', 'Anyland', 'SpaceSys Demo', 'Far Beyond: A space odyssey VR', 'Clash of Chefs VR', 'RETNE', 'Torn', 'ObserVR Beta', 'Skeet: VR Target Shooting', 'Jaunt VR - Experience Cinematic Virtual Reality', 'Guardian of Immortal Mountain(仙山守卫者)', 'Trains VR', 'Prison Boss VR Demo', 'BladeShield', 'Trickster VR: Horde Attack!', 'The Art Theft by Jay Doherty', 'Nothin But Net Demo', 'Bring to Light', 'Octopus Bar', 'Trash Time', 'RollerCoaster Legends', 'WITHIN', 'Robinson: The Journey', 'Progeny VR', 'Soundboxing', 'Drunk or Dead', 'VRMultigames', 'Cloudlands : VR Minigolf', 'LIV: VIVR', 'Sprint Vector', 'Baby Hands', 'Rift Coaster HD Remastered VR', 'Lifeliqe VR Museum', 'MixCast', 'Airranger Trial Version', 'GUNNVR Demo', 'Immersion Chess', 'CRAPPY ZOMBIE GAME', 'Soundscape VR', 'Nevrosa: Prelude', 'Surge', 'Speed and Scream', 'SUPERHYPERCUBE', '鉄道運転士VR Demo', 'Slightly Heroes', 'Bartender VR Simulator', 'Goaltender VR', 'The Journey Home', 'Shooty Fruity', 'Contagion VR: Outbreak Demo', 'Sketchfab VR', 'A Chair in a Room : Greenwater', 'War Online: Pacific', 'vRhythm Demo', 'Let Hawaii Happen VR', 'Cockroach VR', 'Space Junkies™ - OPEN BETA', 'Paperville Panic! Demo', 'Deisim', 'The Midnight Sanctuary Demo', 'Shadows of the Cloud Demo', 'Warhammer: Vermintide VR - Hero Trials', 'Along Together', 'Final Soccer VR', 'Dont Let Go!', 'VR Interior Designer Pro', 'Kiya', 'HandPass VR Demo', 'Bullets And More VR - BAM VR', 'VR Racket Ball Demo', '神遊敦煌-莫高窟第61窟', 'Gonio VR', 'Bowslinger', 'Dimensional Rift', 'Lost in Spice', 'VR Photo Viewer', 'Santa Simulator', 'Dino Tour VR', 'Crawling Of The Dead', 'connect - Virtual Home (3D or VR)', 'Sopwith VR', 'MSI Electric City', 'Smithsonian American Art Museum', 'Time Machine VR', 'Blautopf VR - Geheimnis der Lau', 'ROGAN: The Thief in the Castle', 'RollerCoaster Legends II: Thors Hammer', 'Dead Ground:Arena Demo', 'Spell Fighter VR', 'Blackbox', 'Filthy, Stinking, Orcs! Demo', 'Discovr™ Egypt: King Tuts Tomb', 'AccuRC 2 Demo', 'Crazy Fishing', 'Macunx VR', 'Sacred Siren', 'SteamDolls Demo', 'Top Floor', 'Infinite Mini Golf', 'Amigo Fishing', 'Dimensional Intersection', 'Sniper Rust VR Demo', 'Super Ninja Hero VR', 'Nemesis Perspective', 'Bleeding Edge VR Chap.1', 'Tractorball Demo', 'PaintLab', 'Puppy Chef Academy Demo', 'Dement', 'Vengeful Rites Demo', 'Virtual Home Theater', 'Dry Erase: Infinite VR Whiteboard', 'VR-X Player Steam Edition', 'The Scream', 'DatavizVR Demo', 'The Cooking Game VR', 'Hover Junkers', 'Counter Fight: Samurai Edition', 'Unseen Diplomacy', 'Reikos Fragments', 'Sparc', 'Vee Rethak - Deep Under The Mountain Demo', 'Sorcerers of Kinetics (VR) Demo', 'ViveSpray 2', '尸狱末日 Dead Prison', 'Primal Reign', 'A Stickman Reality', 'FORM', 'Vintage VR', 'Conscious Existence - A Journey Within', 'Coaster', 'Airtone', 'R42', 'Guided Meditation VR', 'Shadow Legend VR', 'Meet the Miner - WDR VR Bergwerk', 'Dungeon Brewmaster', 'Carnival Games® VR', 'DreamLand', 'Gunheart', 'Speech Trainer', 'Guns n Stories: Bulletproof VR Demo', 'BRITANNIA VR: OUT OF YOUR MIND', 'Swords of Gargantua', 'Moonatees', 'Colosse', 'Qantas VR', 'Budget Cuts Demo', 'Angelus Brand VR Experience', 'A Fishermans Tale', 'Psychonauts in the Rhombus of Ruin', 'Weaponry Dealer VR', 'Pumpkin SculptrVR', 'Hand to Hand Combat', 'Google Spotlight Stories: Piggy', 'Battle Test: A Nissan Rogue 360° VR Experience', 'Modbox', 'Lander 8009 VR', 'VRobot: VR Giant Robot Destruction Simulator', 'Arcade Artist', 'Journey: Benjamins Adventures', 'Wevr Transport™', 'CloudBound', 'Kitty Hawk', 'SShield Reborn', 'Zombie Hobby VR', 'Roller Coaster Apocalypse VR', 'TRANCE VR', 'Time Travelling Navy Seal Ninja Warrior', 'Super Darts VR', 'DwarVRs', 'Ruckus Ridge VR Party', 'Airranger', 'Diorama Worlds Demo', 'MLB Home Run Derby VR', 'PROZE Episode I: Enlightenment', 'Save the Biros VR', 'Xion', 'Internal Light VR', 'VINDICTA', 'Rhythm Nights', 'Live2D VR Girls', 'Dissection Simulator: Frog Edition', 'Disco Time 80s VR Demo', 'Uplands Motel: VR Thriller', 'Omega Agent', 'Pipejob Demo', 'Mad Farm Demo', '7D Game （VR for VIVE）', 'HeadON!', 'BadRobots VR', 'The Scent of Summer', 'Kamile - Episode 1', 'Gary the Gull', 'The Dream Collector', 'Amazing Thailand VR Experience', 'Anti Gravity Warriors VR', 'Perspectives: Aleppo-Helsinki', 'Meteor Crush VR', 'Smashbox Arena Demo', 'Shoot Mania VR: Fun Zombies', 'Percussive VR', 'Train Runner VR', 'Afterlife', 'Willowisp VR Demo', 'Vision Origin', 'Infinity Assassin (VR)', 'Suspended Workshops Demo', 'Galaxy Ball Defender', 'Sick Coaster', 'Journey VR', 'Dead Days', 'PLANNES', 'Alone In The Forest VR', '第502統合戦闘航空団 ブレイブウィッチーズ VR-Operation Baba_yaga-雪中迎撃戦', 'Vinyl Reality', '10 seconds', 'SpaceSys', 'Audio Drive Neon', 'Inception VR', 'Card Throw VR', 'Unsacrifice Demo', 'Arachnophobia', 'Fun VR Farm', 'Jam Studio VR EHC - Disney Phineas and Ferb Bundle', 'SkydiVeR', 'MARS VR(全球使命VR)', 'The Crystal Nebula', 'War of Castle VR', 'Snowmania', 'GameDevVR', 'Extreme Skiing VR', 'Bullet Harmony', 'Puzzle Out VR', 'Cold Cuts', 'Jam Studio VR EHC - Groove on This - Euge Groove', 'Settlement Zero', 'Andromedum', 'Diorama Worlds', 'Strange and weird museum', 'The Tower: Last Stand', 'Puzzle Island VR', 'Zether', 'Log Challenge', 'Grid Clash VR', 'Dungeon Rush', 'Barrels Up', 'Qian-Shan Village / 殭屍山莊', 'SteamHammerVR Demo', 'VR Invaders', 'CyberLink PowerDVD 18 Ultra', 'Eclipse --- Defending the motherland Demo', 'RoboHeist VR', 'Fastigium', 'Boise Historic Natatorium', '挙式VR 伊達政宗 編 Wedding VR : Masamune', 'Eclipse --- Defending the motherland', 'Hatsune Miku VR / 初音ミク VR', 'The Western Hunter', 'Fat Foods', 'City VR', '機甲格鬥2 : 團隊榮耀（Armor Arena 2 : Team Honor）Demo Demo', 'VRSnake', 'Tales Of Glory', 'Dark Legion VR', 'Escape Black Orion VR', '(VR)西汉帝陵 The Han Dynasty Imperial Mausoleums', 'PoupeIIe Of ChimneyTown VR ～into the world～', 'Adventure Golf VR', 'Starway Fleet', 'Candy Kingdom VR', 'Starblazer Demo', '4D Toys', 'PIRATADO 1', 'Korean Scary Folk Tales VR : The Forbidden Book', 'Car Car Crash Hands On Edition', 'Senza Peso', 'Virtual Skydiving', 'TribeXR DJ School', 'The Music Room', 'Yozakura Wizard VR', 'StarPlayerVR', 'One Giant Leap', 'Moto VR', 'Relativity Demo', 'Cliffstone Manor', 'Squash Kings VR', 'VR Photo Viewer Demo', 'Evil Fire Demo', 'Mister Mart', 'Firebird - La Peri', 'Space Travelling within the Earth-Moon System', 'VR Benchmark Kanojo', 'Impromptu Vector Field Painter', 'Cursed Isles', 'MuX', 'Afloat', 'Im Hungry', 'Endless Labyrinth', 'LOVE Obsession', 'Slider Quest', 'Devil and the Fairy', 'Great Mountain Experience', 'Knife Club', 'Ghost Train VR', 'Chiaro and the Elixir of Life', 'Woeful Woebots', 'OSCKit', 'Heavy Impact', 'ROMBIE', 'Lucky Skiing', 'VIARKANOID', 'polyfuru feat. ASANO RURI / ポリフる feat. 朝ノ瑠璃', 'Warz: Horde', 'Key Of Impasse', 'Crazy Max VR', 'Star Rangers VR - Free Demo', 'Envoy of Nezphere', 'Fadeholm', 'Last Hope Z - VR', 'Relaxing VR Games: Mahjong', 'The Pull (VR)', 'Hover Bots VR', 'Bottle Flip Challenge VR', 'Spacecats with Lasers VR', 'ZombVR', 'Archery Kings VR', 'Volleyball Fever', 'The Breach: A VR Escape Game', 'Hypatia', 'Astral Domine Demo', 'Fireworks Desert Blast', 'ZDF History 360° – Tempelhof', 'Danger Room', 'TimeLock VR', 'Duckpocalypse', 'Verto Studio VR Demo', 'Mortal Blitz', 'Grove - VR Browsing Experience', 'Solaright', 'Symphonics: Make Music in VR', '瞳：祈愿 VR / Pupil: Wandering VR', 'Tails', 'Mech Ace Combat Trainer Demo', 'Prismatic (VR)', 'Power Fist VR', 'Contraverse', 'Tiny Wheels', 'A Tale of Pirates: a Dummy Mutiny', 'Light and Dance VR - Music, Action, Relaxation', 'Lost Route', 'Super VR Trainer Demo', 'Four Kings One War', 'Launch Squad Demo', 'PAYDAY 2: VR', 'Child of the Wind', 'Gates Of Nowhere', 'Dead Shot Heroes Demo', 'Screen VR', 'VR瓦割り / VR roof tile', 'VR Ping Pong Paradise', 'FINAL ARCHER VR', 'RUN', 'Pop Pop Boom Boom VR', 'Chicken Chase', 'Mekside VR', 'Skyworld Demo', 'Oniris Basket VR', 'MarksmanVR', 'Aliens In The Yard', 'ZomB', 'Temple of the Apsara', 'Killing Zombies with Friends VR', 'Mixed Estate', 'MonteCube Dodge', 'Detached', 'Dead Hungry Demo', 'Unearthed Inc: The Lost Temple', 'CREEP RIDES', 'Lines', 'DINO VR', 'Fisher Fans VR', 'Coastiality', 'Sword and Shield Demo', 'Mint Muse Sound Flare', 'La Camila: A VR Story', 'Bocce VR', 'Space Junkies™', 'Buried Alive VR', 'EXA: The Infinite Instrument', 'Cricket Club', 'Bit Storm VR: First Loop', 'Audio Infection', 'Major League Gladiators', 'Brain-training Game – Cerevrum', 'Carlos III y la difusión de la antigüedad', 'GarbageClassification', 'Jam Studio VR EHC - Beamz Original HipHop/Rnb/Reggae Bundle', 'Starfighter Arduxim', 'Out of Ammo: Death Drive', 'VR Escape the space station', 'TITAN SLAYER', 'Exoplanet', 'Reaching for Petals: VR Edition', 'Domain Defense VR', 'Medical Virtual Reality | Medical VR | DICOM Viewer | Human Body VR | Human Anatomy | Virtual Surgery | Virtual Radiology | MEDICALHOLODECK PRO', 'The Kremer Collection VR Museum', 'Attracting Abundance | VR Motivation Sphaere | 360° Video | 6K/2D', 'TimeTravelers', 'Fort Awesome', 'Discovering Space 2', 'Rota Craze', 'No Clue VR', 'Thunderbird: The Legend Begins', 'Holodaze', 'Conveyor VR', 'High Noom VR', 'Mocove Arts VR', 'CrisisActionVR', 'HomestarVR', 'London Museum Of Water & Steam', 'Blitz Freak', 'Cirque du Soleil', 'Flappy Flappy VR', 'God Hand', 'MINE!', 'KOBOLD: Chapter I', 'Beach Cry of VR', 'SCP: Blackout Demo', 'Aeon', 'Space Fist', 'Caketomino', 'Beyond Power VR', 'Interworlds Demo', 'Trigger Finger', 'Code51:Mecha Arena', 'Crossing Man', 'Gus Track Adventures VR', 'The Broken Seal: Arena', 'Bladeline VR', 'Defense Contract', 'DeathTolls Experience', 'Epic Fun - Samurai Coaster', 'Warbot', 'Pumpkin Smasher VR', 'TennisVR', 'Toran', 'Envelop for Windows (Public Beta)', 'Yoga Lesson VR', 'Vector Velocity', 'Fantastic Beasts and Where to Find Them VR Experience', 'VR Home', 'DemonicGuestVR', 'The Morrigan', 'Wonfourn', 'vRhythm', 'Sukas Escape', 'Aurora', 'Dick Wilde', 'VR INTERACTIVE TRAILER: Runes', 'Escape Bloody Mary', 'Portal Stories: VR', 'SwingStar VR Demo', 'Medusas Labyrinth VR', 'GrapplingHook', 'The Day They Landed', 'Dance Studio VR', 'Ski Sport: Jumping VR', 'Tuition', 'Deadly Hunter VR Demo', 'Horizon Beyond', 'SHEEP SLING', 'HOT GIRLS VR', 'SYREN', 'VR2: Vacate 2 Rooms (Virtual Reality Escape)', 'Planet Defender', 'Ape Hit', 'The Ancient Remains', 'Beach Bowling Dream VR', 'Darknet', 'Strata Spaces VR', 'Sleeping Dawn VR', 'NEKROTRONIC VR', 'Lost Legends: The Pharaohs Tomb', 'CyberThreat', 'Knights of the Drowned Table', 'V ARRR', 'Mythlink Demo', 'Mage VR -Mini Version-', 'Board Games VR', 'VRemedies - CT Procedure Experience', 'FUTURE GPX CYBER FORMULA SIN VIER', 'Orcz Evolve VR', 'POLYBIUS', 'Drone Fighters Demo', 'Rome Reborn: Flight over Ancient Rome', 'American VR Coasters', 'RoadkillerZ', 'Hindenburg VR', 'SHOW MUST GO ON Demo', 'The Bavarian Alps | VR Relaxation Sphaere | 360° Video | 6K/2D', 'Lems Demo', 'Scanner Sombre Demo', 'Fairly Certain Doom', 'Blackjack Bailey VR', 'Jupiteration', 'Nick', 'Hotel Transylvania Popstic', 'VROOM: Aerie', 'Under the Canopy', 'Giant Celebration', 'Battlemage VR', 'Athenian Acropolis', 'The Melody of Dust', 'PlanetFate', 'Survived', 'Skytropolis', 'Saga of the Void: Admirals', 'Magic Gun', 'Tahko Alpine Ski', 'VRRCC', 'Zombie Grenades Practice', 'Lucid Trips', 'Virtual Army: Revolution Demo', 'Smash Party VR', 'Tibetan Singing Bowls | VR Relaxation Sphaere | 360° Video | 6K/2D', 'Synth Ninja', 'Galactic Core: The Lost Fleet (VR)', 'Konrad the Kitten', 'Giant Life', 'DoubleTap', 'Entropic Shop VR', 'Fine China', 'Scutter', 'Life of Lon: Chapter 1', 'NBA 2KVR Experience', 'Conjurors Eye', 'Magic Blast VR', '眼睛（眼球）结构研究', 'SAVANNA SHOT VR', 'Across Flash', 'Magic Realm: Online', 'Emmerholt: Prologue', 'Fair Islands VR', 'Quantum Legend - vr show', 'Mysterium VR Demo', 'The Rabbit Hole Remastered', 'Broomball VR', 'VR Fractals', 'Shennong: Taste of Illusion', 'HelixVision', 'Skills Hockey VR', 'Ripple Effect', 'Music Inside: A VR Rhythm Game', 'Contact : Last Defence', 'Larkin building by Frank Lloyd Wright', 'Fractasia', 'VRAdventure', 'Wild Downtown', 'Purgatory Fell', 'Flinch', 'Alpha Locus VR', 'Dash Dash Run!', 'RuneTech', 'theViewer', 'Géants disparus VR', 'Super Ultra Monster Smash!', 'HELI', 'Tengutana', 'Zombie Nightmare', 'ZombieFight VR Demo', 'Welcome Home, Love', 'Cosmic Awakening VR', 'Tornuffalo - Full-Body Action with Vive Trackers', 'The First Class VR', 'Sky Sanctuary', 'The Door of Ice 冰封之门', 'VR health care (head and neck exercise): Snake Fighting', 'The Exorcist: Legion VR - Chapter 1: First Rites', 'VRRV', 'VR Flight Simulator New York - Cessna', 'Magic Tavern', 'The Trace', '麻将VR', 'The Rose and I', 'Oodlescape - The Apocalypse', 'Wands', 'PolyCube', 'Little Awesome Dudes', 'Hailstorm VR', 'VR Scape', 'Brutal Warrior', 'Quick Draw', 'The Incredible VR Game Show', 'Mallorca | VR Relaxation Sphaere | 360° Video | 6K/2D', 'Moonshot Galaxy™', 'Block Smashers VR', 'ZombieFight VR', 'VR2Space', 'Abode', 'Visionarium', 'Stifled - Echolocation Horror Mystery', 'Nightcrawler VR Bowling', 'Muv-Luv VR', 'VR Battleship YAMATO Demo', 'Bowling at the Lake', 'Elevator... to the Moon!', '画境(Picturesque) VR', 'Seance: The Unquiet (Demo 2)', 'Blockhood VR', 'Run Dorothy Run', 'Space Turret Gunner Demo', 'FAUCET VR', 'Profundum', 'House Dating VR: Cute Korean Girl, Sehyun', 'Podium Bash', 'Amaze VR - Thriller Pack 1', 'Panoptic Demo', 'Derail Valley Demo', 'CrossSide: The Prison', 'Kira', 'CubeWorks', 'Call of the Ocean', 'Raptor Valley', 'VR the Anime Girls Method / 全豚に告ぐ！これで痩せなきゃお前は終わりだ！', 'TangramsVR', 'ShadowCore VR', 'Human Sacrifice', 'Unruly Ghouls', 'VR Triber Demo', 'Space Panic Arena', 'Tvori', 'Beat Miner', 'Fly to KUMA MAKER', 'Wildlife VR', 'Adventures in the Light & Dark', 'Paws n Claws Demo', 'Maxi Pool Masters VR', 'Bandit Point', 'Acute Art VR Museum', 'Bloodstream', 'Breakroom', 'BasementVR', 'Jumanji: The VR Adventure', 'Wrath Of The Fire God', 'Guiding Hand VR', 'VRemin (Virtual Reality Theremin)', 'Candy Smash VR', 'Moatboat', 'Darwins bots: Episode 1', 'Inescapable VR: Underground', 'Sellsword VR', 'Circuit Slinger', 'El Ministerio del Tiempo VR: El tiempo en tus manos', 'Historium VR - Relive the history of Bruges', 'VR Mini Bowling', 'Amazon Odyssey', 'PAPERVILLE PANIC VR', 'Basketball Babe', 'Sky Brawl', 'Spirit Realm', 'Inside The Park VR', 'K.O.M.A', 'Funball Games VR', 'Deathlike: Awakening', '4th of July VR', 'RIFF VR for Arcades', 'The Isle of the Dead', 'Siege And Destroy', 'Volotic', 'Critical Gravity', 'Penn & Teller VR: Frankly Unfair, Unkind, Unnecessary, & Underhanded', 'inVokeR', 'Silent space VR', 'SwingStar VR', 'RoboHeist VR Demo', 'VR Party Club', 'NetStars - VR Goalie Trainer', 'Disassembled', 'Unknightly', 'VRemedies - MRI Procedure Experience', 'Beer Pong VR', 'The Cable Center - Virtual Archive', 'Instacalm VR', 'Boost', 'Monster Maze VR', 'God Of Arrows VR', 'Shoot-No-Shoot', 'VeeR Pong', 'Mech League Boxing', 'VR Hockey League', 'TimeCluster', 'The Woods: VR Escape the Room', 'Cyber Arena', 'VR Flush', 'The Perfect Sniper', 'These Lands', 'Perplexigon', 'Infinity Fall', 'VirtuGO', 'DinoFense', 'Absolute VR Experiences', 'Armor Clash II - VR', 'Inferno: Deathfield', 'Stage 3: Azaria', 'A Lullaby of Colors VR', 'Hell Dimension VR', 'Cyber Surf', 'Summer times Afternoon', 'Letzte Worte VR Demo', 'Drums of War', 'Earthquake Simulator VR', 'VRtender', 'Dronihilation VR', 'VR Nostalgia 5', 'ArmZ', 'Dreadhalls', 'VRog Demo', 'Emoto', 'Fury Fighter VR', 'Journey For Elysium', 'Smackitball', 'Nefertari: Journey to Eternity', '鉄道運転士VR', 'IgKnight Golf Defender', 'Jungle Dino VR', 'The Curious Study of Dr. Blackwood: A VR Tech Demo', 'Water Planet', 'Magicians Gambit', 'VR TOON Help Me (살려주세요)', 'Temple of Aluxes', 'Downward Spiral: Horus Station', 'Neverout', 'The Marvellous Machine', 'PROZE: Prologue', 'Digital Domain’s Monkey King™', 'sCATter', 'Lop Nor Zombie VR (HTC Vive)', 'VR_PlayRoom : Episode Beginning (Escape Room - Horror)', 'Sword Defense', 'The Tower', 'M.A.D. Cliff - All Quiet On The Bridge', 'NO ONE', 'Super VR Trainer', 'VR health care (aerobic exercise): VR sport and cycling in Maya gardens', 'Tevris', 'Sky Jac Demo', 'Spellcastia', '创世-修真录', 'VESTIGE', 'Puzzling Rooms VR', 'Three Kingdoms VR - Jade Knight (光之三國VR - 青龍騎)', 'Root Beer On Tap', 'Merper VR', 'Hop Step Sing! kiss×kiss×kiss (HQ Edition)', 'JetX', 'Archer Guardian VR : The Chapter Zero', 'Dungeons &amp; Treasure VR Demo', 'Escape Room', 'Cogs and Cowboys', 'Drunk or Dead Demo', 'Project Rampage VR', 'FlappyU VR', 'UNCORPOREAL Alcatraz Island Lofts', 'Crystal Vibes feat. Ott.', 'OnsenVR', 'Apex', 'Laser Puzzle in VR', 'Maski VR', 'MetalArms', 'ZeGame', 'Havoc in heaven', 'Just VR Slingshot Target Practice', 'BattleSky VR', 'Self-knowledge VR', 'DreadEye VR', 'Kittypocalypse', 'VR360Viewer', 'Sort Em', 'Data Thief', 'King of Spin VR', 'Battle of Red Cliffs VR', 'Belle II in Virtual Reality', 'Counter Fight', 'Throne of the Dead', 'ESPER', 'Puppet Fever', 'Deep End', 'Bygone Worlds: Jerusalem', 'Nighttime Terror VR: Dessert Defender', 'Rayball', 'Legendary Hunter VR Demo', 'Ashi Wash', 'A-Escape VR', 'Arena Master', 'Kinese', 'House of Alice', 'Hyperide VR', 'Virtual Space', 'GGANG!', 'Bobbi_Cities', 'Wrath of the Samurai', 'HYKEE - Episode 1: Underwater', 'VR DREAM MATCH BASEBALL', 'Steampuff: Phinnegans Factory', 'The Survival Test VR: Defend To Death', 'Tactera', 'Flairtender Demo', 'Sports Bar VR', 'Turbo Soccer VR', 'The Homestead', 'Dolphin Defense', 'Lathe Safety Simulator', 'DrumMasterVR', 'Dark Mechanism - Virtual reality', 'Fight Sparring VR', 'BAD BILLY 2D VR', 'TapSonic World Champion VR', 'Trickshot', 'A God-Like Backhand!', 'VR Aquarium -雅-', 'Amigo VR', 'Night Drive VR', 'Wand Wars VR', 'Cubism Demo', 'Tesseract VR', 'SurReal Subway', 'Virtual Boxing League', 'Mortars VR', 'RCRacer VR', 'VR Fitness', 'World of Guns: VR', 'Jam Studio VR EHC - Gigglebellies Song Bundle', 'Cyberpong VR Demo', 'BE THE HERO Demo', 'English Teaching Assistant VR', 'Battle Ion', 'Crooked Waters', 'Tale of the Fragmented Star: Single Fragment Version / 星の欠片の物語、ひとかけら版', 'Comets Wake', 'Kartofank VR', 'Holopoint: Chronicle', 'Violets Dream VR', 'Munch Demo', '3D Mahjong worlds', 'Morgan lives in a Rocket House in VR', 'Headshot VR', 'Feed A Titanosaur', 'Casinopia: The Blackjack', 'Led It Rain VR', 'Attack of the Bugs', 'Locomancer', 'Epic Fun - Saloon Dart', 'Camp Grizzly', 'PolyDome', 'Diorama No.1 : Blocked In', 'Proton Pulse', 'Deadeye Dungeon', 'The Existence Abstract', 'Amaze VR - Rom Com Pack 2', 'Coral Compass: Fighting Climate Change in Palau', 'Ocean Wonder VR', 'Master Shot VR', 'Kubz VR', 'Insanity VR: Last Score', 'Struggle For Survival VR', 'Lucky Night: Poker Games', 'Way of the Orb', 'Archipelago: Navigable VR Comic', 'Matter of the Dreams', 'Batter Up! VR', 'Jigsaw 360', 'Trump Simulator VR', 'Galactic Rangers VR', 'Domino Craft VR', '3DNesVR Demo', 'The Grand Museum VR', 'Duck Force Demo', 'Zombie in my city', 'COG (Center Of Gravity)', 'Hop Step Sing! Nozokanaide Naked Heart (HQ Edition)', 'Kolb Antarctica Experience', 'TheWalkerKiller VR', 'Shwedagon Pagoda 360 (Burma)', 'VR Theme Park Rides', 'Final Fleet', 'varBlocks', 'VR Golf Online', 'MIMIC Demo', 'The Last Sorcerer', 'RevelationTrestan-尸忆岛', 'FreeFall 4K (VR)', 'All-Star Fielding Challenge VR', 'Temple Raid VR', 'Darken VR', 'On Target VR Darts', 'Trapped With the Dolls VR', 'Naughty Or Nice', 'Heavenly Duels', 'Mighty Monster Mayhem', 'TOKYO CHRONOS Demo', 'DMD Mars Mission', 'Pixel bomb! bomb!!', 'Cold Iron - Quick Draw Western Duels', 'AMON', 'The Crystal Reef', 'Spells n Stuff', 'PingPong Kings VR', '18 Floors', 'Elven Love', 'Tsukai Furushita Kotoba Ya Uta Wo MV', 'ECHOES OF WAR: The Last Heartbeat', 'Necro Mutex', 'Virtual Islands', 'Welcome to Paradise', 'Grannys Grantastic Granventure', 'Aleph Null', 'EF EVE™ - Volumetric Video Platform (VR & Desktop)', 'DreadEye VR Demo', '#SelfieTennis', 'VR Batting', 'Echo Grotto', 'Guard of Wonderland VR', 'INVASION!', 'SteamHammerVR - The Rogue Apprentice', 'Orc Hunter VR Demo', 'The Divergent Series: Allegiant VR', 'Where Thoughts Go: Resolutions', 'ASTRONEST VR', 'Coffee Trainer VR', 'Magic Lantern', 'Bloody Zombies', 'Metal Suit Warrior VR', 'Asteroids VR', 'Think Space', 'RIFF VR', 'Dwingle : B.O.T', 'Altar Show', 'Invaders!', 'Flat Worlds', 'VR Model Viewer', 'Battle for the last chicken', 'Galaxy Race', 'Unknown Fate', 'Eat this!', 'Demon Blade VR', 'Asteroid Blaster VR', 'Vinnies Diary', 'Girl Mod | GIRLS VR (create + pose in VR)', 'Super Puzzle Galaxy - Boost Ball DLC Pack', 'Becoming Homeless: A Human Experience', 'After Life VR', 'Face Your Demons', 'CollabHub', 'Hurl VR', 'Family Park', '8-Bit Arena VR', 'ShapeLab', '沙漠飞车 Desert Racer', 'Space Badminton VR', 'The Slingshot VR', 'Tales of Glacier (VR)', 'ZED', 'Santa Sling', 'The Cubicle.', 'Luna', 'The Tower 2', 'Drunkn Bar Fight on Halloween', 'Acrophobia', 'SCP-087 VR Survivor', 'Zero-G VR', 'Aozora Under Girls - Karsome Irony', 'Dont Look Back - VR', 'Draoi', 'Astronomy VR', 'Ceggtcher VR', 'OVERTURN', 'Defuser VR', 'Trial of the Gods', 'Merry Snowballs', 'Annie Amber', 'Gunship Battle2 VR: Steam Edition', 'Killer Klownz', 'Harvest Simulator VR', 'The Crane Trials: Red Edition', 'Derora', 'Deadly Burrito', 'Argos', 'The Sniper VR', 'Wardens of the Amber Cage', 'Explosion Magic Firebolt VR', 'Jida Chronicle Chaos frontier VR', 'Jam Studio VR EHC - David Ellefson Metal Factory', 'John Lazarus - Episode 1: Dead Mans Origin', 'CyberRunner', 'Imaginator', 'Microcosm', 'Thrushbriar Hall', 'Warzone VR', 'Survive Zombies', 'VR Formula', 'Everything Must Fall', 'SUM', 'Newtons House of Forces', 'SACRALITH : The Archer`s Tale', 'City Rush', 'Funny Wings VR', 'VR Furballs - Demolition Demo', 'KameaVR', 'VR RHYTHM ACTION SEIYA', 'La Introducción', 'Mayas Virtual Brush', 'SummonerVR (alpha)', 'I Hate Santa', 'Flotilla 2', 'Art Plunge', 'TRESPASS - Episode 1', 'MineSweeper VR', 'VR Fun World', 'Conquer', 'The IOTA Project', 'Light Tracer (VR & NON-VR)', 'Marlene Betwixt', 'VR Smash Park', 'Super Heroes: Men in VR beta', 'Ebullition LBVR', 'IndustrialVR - Hoover Dam', 'GUNGRAVE VR U.N', 'everybodys sad', 'Reficul VR', 'Armed Against the Undead', 'Protagon VR', 'One Of The Last', 'The Rise of Captain Longbeard', 'RetroFighter VR', 'Kakwitene VR', 'Run Of Mydan', 'Rome Reborn: The Colosseum District', 'VR Karts SteamVR', 'Beyond the Horizon', 'The Polynesian Cultural Center VR Experience', 'Throw The Ball In the Hole', 'Stay Silent', 'Sniper Rust VR', 'Head It!: VR Soccer Heading Game', 'Zero Gravity Pool Demo', 'Edge Guardian', 'Clean VR', 'Phantom Astronaut Lucid VR', 'Egg Teacher VR', 'Plevr', 'Seduction 誘惑', 'Google Spotlight Stories: Age of Sail', 'Jam Session VR', 'BARBAR BAR', 'Gem Hunter', 'Homeward Duck', 'Virtual Idea Area', 'Starship Disco', 'Angry Ball VR', '安全教育', 'Virtual Reality Girls 2', 'Vroom Kaboom', 'Whale Island', 'The Night The Carsons Disappeared', 'FlyCatcher', 'The Uncertain: VR Experience', 'VR Slots', 'Toy Goblins', 'LookVR', 'Hit The Hive', 'Symphony of the Machine', 'Golf Pro VR', 'Slasher VR', 'VR SHOOT AROUND - Realistic basketball simulator -', 'Last Stand', 'Waddle Home', 'Gallery in a Box', 'QuiVr Vanguard', 'Fake World VR', '海底寻宝', 'KART CHASER : THE BOOST VR', 'B. Braun Future Operating Room', 'HeapVR', 'RoadRunner VR', 'Aztec Tower', 'Orbital Strike: Arena', 'Epic Roller Coasters — Neon Rider', 'VR SUSHI BAR', 'Chocolat Rush', 'Drone Striker', 'Virtual Reality Neuron Tracer', 'Rogue Fighter', 'Fly Destroyer', 'Frontline Heroes VR', 'The Wake Demo', 'TOYTANK', 'SlipDrive', 'Dwarven Defender', 'VR Paper Star', 'DOJAGI: The Korean Pottery', '挑战立方VR(Challenge Cube VR)', 'Koliseum Soccer VR', 'The Enlightened League of Bone Builders and the Osseous Enigma', 'The Path of Greatest Resistance Demo', 'Coaster of Carnage VR', 'Tesla VR', 'Turn Me On', 'VR Hero Sentry', 'Mission B', 'Strata Spaces VR Demo', 'ThunderGod', 'Kitten Cannon', 'Tilted Mind', 'Disc Golf VR', 'Tombo Breaker VR', 'Machine Crisis (陨星危机)', 'vBuilder', 'The Ruins: VR Escape the Room', 'Trigger Happy Shooting', 'Naturallandscape - Grand Canyon (自然景观系列-美国大峡谷)', 'Orc Towers VR', 'BATTLE X Arcade', 'Technolust', 'Syndrome VR', 'Leadwerks Game Launcher', 'OniBushi VR', 'VRNinja', 'Seishin - Virtual Rhythm', 'PANTY SLIDE VR', 'The Mechanical Room VR', 'Haunting Hour', 'DVR Player Demo', 'Expedia Cenote VR', 'The Seven Stages', 'Bubble Labs VR', 'Totally Realistic Sledding VR', 'Mio Garden', 'In Orbit', 'SpaceSys - Voyager Environment', 'GIRLS VR', 'Melody', 'Sweaty Palms Demo', 'Dick Wilde 2', 'VR STOCK CAR RACERS', 'Paddle Up', 'Moonbuggy', 'Chaos Edge', 'Nano Shift', 'VRporize - VR FPS', 'The Deserts Rose', 'Symphony of Stars', '3dSenVR', 'Virtual Reality Experiment Framework', 'Alien Covenant In Utero', 'Willowisp VR', 'Treehouse Basketball', 'Floor Plan: Hands-On Edition', 'Astraeus', 'Math Classroom Challenge', 'Cargo Breach', 'LightVR Demo', 'Be A Lord', 'Space Maze', 'MoonStrike', 'Alchemist Defender VR', 'Orb Labs, Inc.', 'Dimension Hunter VR', 'Battlemage Training', 'Cat Sorter VR', 'Escape Architect VR', 'GlaiveZ', 'Experience: Colorblindness', 'Lonelyland VR', 'HUNTING SIMULATOR VR', 'Disc League', 'Geo-Fall', 'RuneSage', 'Neon Exile', 'Tooth and Claw', 'Jam Studio VR - The Learning Station Math & Alphabet Basics', 'Zero Killed', 'IronPower', 'Child Of Ault Demo', 'Wasps!', 'Luzia', 'GravPool', 'B. Braun Aesculap Spine VR', 'High Noon', 'Kinese - Tip Jar', 'AppGameKit VR', 'Test Subject 901', 'ExStatic (VR)', 'Red vs Blue 360', 'Chamber 19', 'Siege - Battle of Ashington', 'Bullets And More VR - BAM VR Demo', 'Rocket Armor', 'The Energy Lab', 'Always Higher', 'The Blue Zula VR Concert Series', 'Disney Movies VR', 'Tennis. Amazing tournament', 'VR Curling', 'Slingshot Cowboy VR', 'Supa Kila Monsta Hunta', 'Snakes on an Extradimensional Plane', 'VRCAT', 'Dodge the Wall!', 'SVRVIVE: The Deus Helix', 'Elemental Combat', 'Light of Mine', 'TrueScale', 'Aquila Bird Flight Simulator', 'HATCHICK', 'Balloon Chair Death Match', '30th Century Post Office', '恐龙大冒险', 'Alice In VR', 'Ballanced', 'Gotham Gangsta | FPS vs VIVE | Local Multi-Player Bank Robbery', 'Gunball', 'STUMPER', 'Room Designer VR', 'HordeZ', 'Atlantic Edge', 'Wraith', 'The Purge Man', 'SLIVER.tv', 'MovingPictures: VR Video and Image Viewer', 'IKAROS', 'Fantasy Little Jobs', 'Tet VR', 'FlyInside Flight Simulator', 'Bullet Sorrow Demo', 'Toon Ocean VR', 'SincereMen', 'War on Drugs VR', 'Seek & Destroy - Steampunk Arcade', 'Potioneer: The VR Gardening Simulator', 'BoidWatch', 'The Hunted', 'Climbey Demo', 'HEXION', 'xDrive VR', 'Thalu: Dreamtime is Now', 'Epic Fun - Western Coaster', 'Daylights End VR Edition', 'VTB Basketball League VR', 'HandPass VR', 'VR SUPER SPORTS - 10 Edition', 'Dragon Guide', 'EnterVR', 'MarksmanVR Demo', 'OFFICE ESCAPE', 'Starblazer', 'Audio Forager', 'SurviVR - Castle Defender', 'Machine Learning: Episode I', 'Keep Balance VR', 'Mystery Stone from Heaven', 'TankVR', 'Chocolate', 'Jinxed', 'Divided: Soul Theft', 'Unearthing Mars VR', 'Hex Defense - VR', 'Battle Summoners VR', 'UNTITLED Demo', 'With Loneliness', 'VRLab Academy Anatomy VR', 'Oscar Mike VR', 'FlyingMetalSuit', 'Buzz Aldrin: Cycling Pathways to Mars', 'Little Einar', 'Assassination ClassroomVR Balloon Challenge Time/暗殺教室VR バルーンチャレンジの時間', 'VireFit', 'Hat Trick Header Demo', 'Isle in the Sky', 'Rhythm Mage VR', 'Ancient VR coaster', 'Three life', 'Google Spotlight Stories: Son of Jaguar', 'Metal Assault', 'Clash of Vessels VR', 'Basketball Court VR Demo', 'Crazy Machines VR', 'Modbox Demo', 'UMA-War VR', 'Perch', 'Gritty Bit VR', 'Hoop Shot VR', 'The Virtual Reality Museum of Immersive Experiences', 'VR Shooter Guns', 'REGENESIS Arcade DELUXE', 'Asteroid Blaster VR Demo', 'LA Deadzone', 'Tribocalypse VR', 'Space Pirates and Zombies 2 Demo', 'Evenness Sensory Space', 'Home Plate Baseball', 'Ball Out', 'Amigdala', 'Atoms', 'Hold the door!', 'Neon Seoul: Outrun', 'Lost On The Island', 'Blobby Tennis', 'sphereFACE', 'Human, we have a problem', 'Lost in the Ocean VR', 'VAD - Virtually Assured Destruction', 'Neon8', 'Audiate', 'I Hate Heroes: Rocket Man', 'Virtual Ninja VR', '方块传说', 'People Cu3ed Demo', 'Wheelie King VR', 'Ding Dong VR', 'Virtual Sports', 'Killing Zombies', 'Speedball Arena', 'VR Laser Harp', 'Escape the Grid VR', 'The Museum of ThroughView', 'Kingdom Watcher', 'Rangi', 'The Slopes', 'Space Panic: Room Escape (VR)', 'Sketchbox', 'Blast the Past', 'Arcane', 'MIMIC', 'Flairtender', 'Namaste Virtual Yoga Retreat', 'Nevrosa: Escape', 'CrapsVR', 'Ultimate Shotgun Championship', 'Range Day VR', 'Evrisia Art', 'We Are Showtime!', 'Aussie Sports VR 2016', 'Dont Knock Twice Demo', 'Dough', 'Eye of Odin', 'Clash of Magic VR', 'Music Escape (Alpha Edition)', 'DragonBlast VR', 'Last Mage Standing', 'Grave: VR Prologue', 'Happy Drummer VR', 'Redshift VR', 'Desert Battle', 'DREAM GIRLS VR', 'VRTGO', 'Shoot Loop VR', 'Dawn City', 'Zombie Camp', 'MeiMeiDance', 'When Wardens Fall', 'Fancy Fishing VR', 'Violent killer VR', 'Shatter EVERYTHING (VR)', 'Cubians : Rescue Princess', 'Quar: Battle for Gate 18', 'PaulPaul - Act 1', 'Face au train', 'ToledoVR', 'Dancing Queen', 'Pitchfork Demo', 'Saloon Showdown VR', 'CYCOM: Cybernet Combat', 'Play with Balloon', 'ROM: Extraction', 'VR health care (shoulder joint exercise): Apple Grove Picking Games', 'Project VR Wild Hunt', 'UNTITLED', 'Cappasity VR Store Demo', 'The Purge Day', 'The Last Letter', 'Wake Up', 'Vektron Revenge', 'Romans From Mars 360', 'Sea of memories', 'Deplau', 'Double Shot', 'Brush Up VR', 'Police Enforcement VR : 1-King-27', 'Evolution VR', 'RED CUBE VR', 'Mad Gun Range VR Simulator', 'Gull Kebap VR', 'Awake: Episode One', 'Hunt For Gods', 'Perfect Life VR', 'Warka Flarka Flim Flam', 'Viral EX', 'Rascals', 'Lighting End VR Demo', 'Inside The Cubes', 'Seeking Evil: The Wendigo', 'Ancient Journey VR', 'Planet Guardian VR', 'Directionless', 'vrAMP', 'Data Thief Demo', 'Ultimate Fishing Simulator - VR DLC', 'Welcome to Light Fields', 'Softspace', 'The Bellows', 'Wave Magic VR', 'Thug Life', 'WORLDS AT WAR', 'Sophies Guardian', 'Arbiter', 'Delilas Gift', 'Pyro VR', 'Banshee Force', 'Outpost L5', 'Towards a perilous journey', 'VR Retreat Demo', 'Arizona Sunshine - Dead Man DLC', 'CoLab', 'Constricted VR', 'MocuMocuVRM', 'Future City Coaster', 'Edge of Atlantis Demo', 'Defeat the Beat', 'Valkyrie Blade VR', 'StratoBash', 'airRevo VR', 'Shopkeeper Simulator VR', 'A Lost Room', 'Nock: Hidden Arrow', 'ZomDay Demo', 'Super Pixel Smash', 'DoodleVR Demo', '101010', 'School Fab Lab VR', 'Counter Fight 3', 'VR Cricket', 'ThrounnelVR', 'HOST', 'BREACH IT', 'Future Futures - Command Z', 'SE VR World Demo', 'Hello inc VR', 'Toy Plane Heroes', 'Sword and Shield: Arena VR', 'Zombie Trigger', 'Marius', 'NatureFly', 'VectorWave', 'Phantasma Demo', 'PITCH-HIT: BASEBALL', 'TOGETHER VR', 'The Frontier Outskirts VR', 'Trainscape', 'SPACE DVRTS', 'The Blood Eclipse', 'Child Of Ault', 'Beat Ninja', 'Bug Invaders', 'Renters Revenge', 'Whack-a-Vote: Hammering the Polls', 'Feed Eve', 'Telefrag VR', 'The Visitor', 'Spuds Unearthed', 'Trash Rage', 'RAYGUN COMMANDO VR Demo', 'Gladius | Gladiator VR Sword fighting', 'Shepard Fairey VR - DAMAGED', 'SPECIAL FORCE VR', 'IKEA VR Experience', 'The table at war VR', 'Viking Rage', 'SZEN', 'VReakout', 'LIZ: Before the Plague', 'Unearthing Mars 2: The Ancient War', 'CAPCOM GO! Apollo VR Planetarium', 'OneManVurgeR', 'Doctor Kvoraks Obliteration Game', 'Chernobyl VR Project', 'Pyramid VR', 'Double Play: 2-Player VR Baseball', 'Flavortown:VR', 'Mall Town', 'KryptCrawler', 'The VU', 'Vehicle VR', 'Tennis Kings VR', 'Outbreak in Space VR', 'RunVR', 'Jam Studio VR - Music Appreciation Series', '三国虎将传VR2-Sanguo Warriors VR2', 'CubeBall VR', 'The FOO Show featuring Will Smith', 'Elite Encounter', 'Hot Squat', 'ZOLO - Zombies Only Live Once', 'Stratoscape', 'Dog In A Box', 'Winter Fury: The Longest Road', 'Qbike: Cyberpunk Motorcycles', '#SkiJump', 'Yanone: Letter Splatter', '7VR Wonders', 'Relativity', 'Bowl VR', 'Cubes', 'Screensavers VR', 'The Last Day Defense', 'HOLOGRA', 'Sonic Hunter VR', 'Pixel Gear', 'In League', 'TowerHex', 'FriendShip', 'Way Out', 'Audio Factory', 'Diorama No.3 : The Marchland', 'Domino VR', 'Zombie school-丧尸学院', 'The Wire', 'n-body VR', 'AI Rebellion VR', 'From The Earth (프롬 더 어스)', 'COMET STRIKE', 'MSI Electric City: Core Assault', 'Munch VR', 'Entropic Shop VR Demo', 'Number Hunt', 'Last Chance VR', 'Ghost Ship', 'Iron Defense Demo', 'CRANGA!: Harbor Frenzy', 'Duel VR', 'Money Bath VR / 札束風呂VR', 'Fragments', 'Church Art Of Sweden', 'Traffic Cop', 'VR Sand', 'VRemedies - Radiotherapy Procedure Experience', 'Breadwinner VR', 'Zombie Kill', 'Raptor: Cretaceous Island', 'Exterminate the world - 灭世VR', 'Nanome', 'BoostBots VR', 'SpellShokked!', 'Gadgeteer Demo', 'DEUS VULT | Online VR sword fighting', 'Relax Walk VR', 'Rabbit Valley Legend (兔子山谷传说)', 'Lets Go! Skiing VR', 'Indoor Rock Climbing VR', 'Zombie World', 'Mervils: A VR Adventure Demo', 'A CHALLENGE', 'DEUS EX MACHINA', 'MMD Girls VR', 'Kaisuo', 'LIBERTY VR', '994 W 24th', 'Fatal Gem VR(The First Match-3 VR Game)', 'Roach Killer', 'Drone Fighters', 'AM Model Viewer', 'RoboSports VR', 'GridVR', 'Light Strike Array', 'Wings of Peace VR: DayBreak', 'The Lost And Forgotten: Part 1', 'The Art of Fight Demo', 'TITAN SLAYER Ⅱ', 'RibbonChase', 'Sharknado VR: Eye of the Storm', 'Blortasia', 'VIP Shuttle', 'Daydream Blue', 'Island Time VR', 'CapitalShip:VR Demo', 'Ghostbusters VR: Showdown', 'Smashing The Battle VR', 'Rome Reborn: The Basilica of Maxentius', '3Gun Nation VR', 'Wisentree Spirit', 'Top Secret', 'Turing Tumble VR', 'Prey: Typhon Hunter', 'Dead Shot Heroes', 'VRGROUND : Crazy Farm', 'Project Centauri', 'Fist of Physics', 'Aquila Bird Flight Simulator Demo', 'Viking Escape', 'Virtual Escape: The Play Room', 'The Body VR: Journey Inside a Cell', 'HordeZ Demo', 'gRally', 'A Writer And His Daughter', 'RadianVR', 'VeeR Pong Demo', 'Linea VR', 'Scraper: First Strike', 'Lolly Pang VR', 'Frol Blok', 'Under Water : Abyss Survival VR', 'Basketball Court VR', 'MultiVR.se', 'LightStrike', 'Weird creatures', 'Smoots Tennis Survival Zombie', 'Crystal War', 'Dive with Sylvia VR', 'Final Rest', 'Escape Station', 'Flipside Studio', 'We Are Stars', 'Yore VR', 'Fancy Slingshot VR', 'FIRMA', 'Mass Exodus', 'Neurowake', 'Time Warrior Z VR', 'Exterminator: Escape!', 'MakeVR Pro', 'EscapeVR: The Basement', 'TimeToDie', 'Wave Circles', 'Holo Impact : Prologue', 'Seabed Prelude', '69 Ways to Kill a Zombie', 'IgKnight Food Fight', 'DynamixVR - D.R.I.L.L.', 'Babel: Tower to the Gods', 'Sankhara', 'ICED VR', 'SYMMETRY alpha', 'AVOlight.Space (Multiple Video Players)', 'The Martian VR Experience', 'Greedy Crush', 'Starship Survivor', 'The Vanishing of Ethan Carter VR', 'Rockland VR', 'Cappasity Demo', 'Ghostbusters VR: Now Hiring', 'Rosebakers Icy Treats - The VR Iceman Sim', 'VR Roller Coaster - Cave Depths', 'Arcade LA Deadzone', 'Hit&Run VR baseball', '斗地主VR', 'FERIT Simulator', 'VR Racing', 'Mini Hockey VR', 'Infinite Vector', 'Malazard: The Master of Magic', 'Neotrie VR', 'VRWiz', 'VoxVR Viewer', 'COMPOUND Demo', 'Uphill Skiing', 'The Unwelcomed Demo', 'Arrowborn', 'Christmas Massacre VR', 'Beer Pong League', 'VINDICTA Arcade', 'Pinheads Bowling VR', 'Balls! Virtual Reality Cricket', 'HVR Demo', 'Edmonton Trolley Car', 'Princess Kidnapper VR', 'Mondly: Learn Languages in VR', 'Through The Dark: Prologue', 'Space Rift Demo', 'Limelight VR', 'Lume - Alpha Release', 'MIRAGE', 'Operation: Polarity Hook Demo', 'TacoFace', 'Bubble Blast Rescue VR', '0°N 0°W VR', 'Horizon Of History', 'Real Fishing VR', 'Subject 264', 'The Finnish Virtual Art Gallery', 'Virus', 'Dali 17 - VR Museum Tours', 'Patternis', 'Virtual Arctic Expedition', 'Happy Penguin VR', 'polyfuru feat. MIYA KIMINO / ポリフる feat. キミノミヤ', 'Break Time!', 'Z`code (VR for HTC Vive)', 'Gunslinger Trainer', 'Spark of Light', 'The Raiders', 'UNCORPOREAL - Fluffy!', 'EmbodyMe Beta', 'Blasters of the Universe', 'Snowglobe', 'Hat Trick Header', 'VR Baseball', 'TAG WAR', 'TEOT - The End OF Tomorrow', 'Hoop Route', 'Survival Simulator VR', 'Gun Beat', 'RetroGunX VR', 'Funfair', 'Mystery Lands', 'Big Blue - Memory', 'VR Dunhuang', 'Justice League VR: The Complete Experience', 'Virtual Reality Girls', 'Vengeful Rites', 'Flying Turkey', 'VRemedies - Theatre Procedure Experience', 'N.a.N Industry VR', 'BATTLE X', 'Taking Valhalla VR', 'Lunar Stone - Origin of Blood', 'Fat City', 'Alpha Mike Foxtrot VR - AMF VR', 'Moonstone Crossroads', 'Tonetaker VR', 'Tech Support 2077', 'GonzoVR', 'Real Als Humanity Academy', 'Emberdoom VR', 'Mech League Hunting', 'Palace of the Azure Dragon', 'Henry The Hamster Handler VR', 'The Horus Heresy: Betrayal at Calth', 'Mystery House -fivestones-', 'Teratini VR Demo', 'HoloLAB Champions', 'The Great C', 'Mace and Grace', 'Sneaky Bears', 'TheScreamer VR', 'Orbital Injection', 'DEXED', 'Gobligeddon', 'BeefeaterXO', 'Dissection Simulator: Pig Edition', 'Sleigh Runner', 'Tippy Tree', 'Dark Nebula VR', 'Jam Studio VR - The Learning Station Fun Bundle', '0 Day', 'DinoTrek', 'Wetpants', 'Lemuria: Lost in Space - VR Edition Demo', 'Leave The Nest', 'Salary Man Escape', 'PingBall VR', 'Lockdown: Stand Alone', 'Fancy Skiing: Speed', 'The Stone', 'Pipejob', 'MicroSpy', 'Void Rangers', 'Anima', 'Combat Tested', 'Project Syria', 'Battle of Kings VR', 'Jack Spriggan', 'Puzzle of Santa Girl VR', 'Minotaurs Maze', 'Cross Country Skiing VR', 'Tactical AR', 'Wanderer: The Rebirth', 'DeadLand VR', 'Reboant - Endless Dawn', 'TetrotronVR', 'SteamVR', 'Pong Champion VR', 'Super Kaiju', 'Audio Arena', 'Stars', 'Redswood VR', 'Rebound VR', 'STARWAY VR', 'STAR SAGA ONE - RISE OF THE DOMINATORS', 'Great Pyramid VR', 'The VR Museum of Fine Art', 'Reality Blender - Image FX', 'Dream Beach 2 - VR Relaxation', 'Double Bubble Blaster Madness VR', 'Bottle_Shooter', 'Kung Fu Ping Pong', 'Soldiers Of Freedom', 'MinigolfPark VR', 'Nemesis', 'Stolen Steel VR', 'Xenomorph', 'WorkinVR', 'MineSweepVR', 'Sinister Halloween Demo', 'the Tavern of Magic', 'Hero of Light VR: Episode 1', 'Sun & Clouds Timelapse | VR Travel Sphaere | 360° Video | 6K/2D', 'THE TEAR', 'The Bond', 'Float Gallery', 'VRでレムと異世界生活-膝枕&添寝編', 'Power Solitaire VR', 'Magic Hour', 'Wild Game Hunter VR', 'Epic Fun - R0b0t Coaster', 'Ground Runner: Trials', 'Pegasus Door', 'SoundLites', 'And Youre There, Too', 'Odyssey VR - The Deep Space Expedition', 'Enigma Sphere :Enhanced Edition', 'Apocalypse Rider', 'Mesh Maker VR', 'Wall Walker', 'Nemesis Realms', 'DWVR', 'The Cave VR', 'Pane In The Glass', 'Pixvana 360 Production Series', 'Alveari', 'Hit The Hive Demo', 'Oceans Treasures', 'CDF Starfighter VR', 'VR-CPR Personal Edition', 'MYSTIC VR', 'Uizuno Blade VR', 'One Man Army VR', 'Wacktory', 'Space Needle VR', 'Drummer Talent VR', 'Crosser', 'Brix VR', 'Alien Shooter in Space Cradle - Virtual Reality', 'Brain Voyagers : Ricochet', 'WebbVR: The James Webb Space Telescope Virtual Experience', 'Mosh Pit Simulator', 'Cogito', 'It Could Have Been Me', 'A Mars Adventure: Redturtle', 'VR Slugger: The Toy Baseball Field', 'Tabletop Basketball VR', 'Big Bang Billiards', 'Glaive', 'The Professor Presents: #GotHandles', 'Nothin But Net', 'The Steadfast VR Challenge', 'VRMakingSense', 'Fall Fear Fly Redemption', 'El Ministerio del Tiempo VR: Salva el tiempo', 'Rento Fortune VR', 'RailRoadVR', 'Destroyer', 'Intel 5G VR Experience', 'A Show of Kindness', 'UNCORPOREAL - Holographic Photography Demo', 'UNHALLOWED: THE CABIN', 'Rome Reborn: The Pantheon', 'Simmetri', 'Nano Nebula', 'NIGHTSTAR Demo', 'Dreams of 0', 'Unbound', 'The war god : The artifact', 'Doll City : Prologue', 'Pirate Defense', 'Kingdom of Blades', 'The Nest', 'ChainMan', 'Hold My Beer', 'SoundStage', 'Fast Action Hero', 'Crypt Hunter', 'Space, VR! Demo', 'Solar System Journey VR', 'BOW MAN', 'つんつんVR / TSUN-TSUN VR', 'MageWorks', 'Virtual Reality Emergency Response Sim', 'Twisted Arrow', 'VR Fractals Demo', 'Neon Pong', 'Samurai Sword VR', 'SUBURI', 'Star Dust: The Book of Earth (VR)', 'Runes: The Forgotten Path', 'Fine China Demo', 'VRFC Virtual Reality Football Club', 'The Secret of Puffin Cove', 'Mad Farm VR', 'Innocent Forest 2: The Bed in the Sky', 'Last Byte Standing', '#Archery', 'Dream', 'Amaze Bowl', 'Another Bad Day in the Future', 'Shadow Circuit', 'Train Harder', '10k', 'Goalkeeper VR Challenge', 'QuiVr Demo', 'Gappos Legacy VR', 'Binary Trigger', 'PITCH-HIT : DEMO', 'BrickWorks 360', 'VR Hybrid War 2117', 'Draconic Order VR', 'Panzer Panic VR', 'Shadow Blood VR', 'Battle for Mountain Throne', 'Deep Diving VR', 'Wingless', 'Natures Wrath VR', 'Zero Gravity Pool', 'Escape the Bunker', 'Fractal Gallery VR', 'Plenty: Skyhearth', 'Final Approach', 'Dead Hungry', 'Mars Odyssey', 'Hunt the Thailand Hidden', 'The Stray Cat', 'Octoshield VR', 'VRobot', 'Western Bank VR', 'Alien Food Frenzy', 'Atlantis VR', '9Grids VR', 'Time Carnage VR', 'Vroom Kaboom Premium', 'OldMaidGirl', 'RelayCars', 'CINEVR - Social Movie Theater', 'Colourise', 'Jam Studio VR EHC - Beamz Original EDM-DJ-Dance Bundle', 'Escape Legacy VR', 'Gnomelings: Migration', 'Into the Rhythm VR', 'Dont Look Down', 'Deadly Cryptids', 'Pong It! VR', 'Umpire Simulator', 'Fit It', 'ShotForge', 'OutOfColors', 'Locked Room Murder Demo', 'Battle Dome Demo', 'CanBoom VR', 'Hyperball', 'Crowe: The Drowned Armory', 'Robot City Stadium', 'SereNest', 'ViSP Demo', 'Tank of War-VR', 'Final Strike', 'Show Must Go On', 'Hunting in Ancient Asia', 'Puppy Doge VR', 'Paradise City VR', 'AESCULAP® OrthoPilot®Elite VR Palpation', 'Hand Eye Cubination', 'Roman Sacrifice in Córdoba', 'Arcas Path VR', 'Unforgiven VR', 'Manifest 99', 'Flying in Labyrinth', 'Rockochet', 'Stunt Kite Masters VR', 'Mountain Mind - Headbangers VR', 'Oblivion Tesseract VR Demo', 'THE BOX VR', 'Kitty Nigiri', 'Combine War Toys', 'Virtual Army: Revolution', 'CAD XR', 'VRbloX', 'Organ Quarter', 'WackyMoles', 'Castaway VR', 'VoxVR', 'Red Bull 360', 'SightLineVR', 'Discontinue', 'The Risen Dead VR', 'The Armclaw Experiment', 'World Builder', 'Boundary', 'Zero Days VR', 'Google Spotlight Stories: Pearl', 'Satori Sounds VR', 'The Night Cafe: A VR Tribute to Vincent Van Gogh', 'Escape Artist: The Trial', 'Fastigium: Dead End', 'Adagio', 'Space Bit Attack', 'CYBER JOLT (VR)', 'Duck Force', 'GUNNVR', 'Z ViRus: V.I.R.M Uprising', 'Secret Savings', 'EGE DistantPlanet NonXXX', 'No Way Out - A Dead Realm Tale', 'Vault Resort', 'Valley Run', 'Rage Room', 'Guns and Notes', 'Legendary Hunter VR', 'Dream UniVRse Demo Demo', 'The Loopholes Chronicles', 'For Food Sake! VR', 'Robo Boop', 'Horror Rollercoaster', '994 W 24th Demo', 'RPG Merchant', 'Lucky Night VR', 'DreamDesk VR', 'ViveSpray', 'TrumPiñata', 'The Journey', 'Minesweeper Peak VR', 'Virtual Hero VR', 'Spartan VR', 'Football VR', 'WizzBall', 'Minigame Party VR', 'Mage VR: The Lost Memories', 'Immerse Creator', 'Space, VR!', 'Red Rover', 'Return Zero VR', 'VROOM: Galleon', 'Pirates of the Asteroid Belt VR', 'Jungle Adventure', 'Epic Fun - Kraken Eye', 'Crashimals', 'Bounce', 'Skyscraper Climb VR', 'HOME', 'A Fear Of Heights, And Other Things', 'GUNGRAVE VR', 'Live In Color', 'A Handful of Keflings', 'Impossible VR Ninja', 'Conjury of Nature', 'Funball Games VR Demo', 'Interplanetary Hunter Demo', 'Axe Throw VR', 'Super Puzzle Galaxy', 'VR Guest', 'Infinite Art Museum', 'Space Dream Demo', 'Remnith', 'Ghost Productions: Wraith VR Total Knee Replacement Surgery Simulation', 'Operation Apex', 'SceneThere', 'Dead Ground:Arena', 'Sacred Four', 'Hangry Bunnies From Mars', 'Anderson', 'Boom! Maze', 'Ganbatte', 'Vertigo Demo', '3C Wonderland Coaster', 'Struggle', 'A Large Quantity Of Mushrooms', 'Elevator VR', 'Humans 101', 'Sim 4K VR MediaPlayer', 'CuVRball', 'Space Station Loma: OPERATIONS', 'Sanctuary VR (Also contains non-VR version)', 'The Stanford Ocean Acidification Experience', 'Indentured Servant', 'VR0GU3™: Unapologetic Hardcore VR Edition', 'Siberian Run VR', 'Marimba VR', 'Re-bot VR', 'Ashes of the Ark', 'ProjectM : Dream', 'Draw Near', 'ObserVRtarium', '全副武装(Iniverse) Demo', 'Unimersiv', 'Go For Launch: Mercury', 'TRIPLE TWENTY - VR Darts', 'Under a Desert Sun', 'Reaping Rewards', 'Paradise Checkers VR', 'My Own Pet', 'Blade Runner 9732', 'Defendion', 'Flock VR', 'SpaceJourney VR', 'ShapeSim', 'Kartong - Death by Cardboard!', 'FREEDIVER: Triton Down', 'Biodigital', 'ESSENCE', 'Amaze VR - Show Pack 1', 'Wolf Must Die', 'Death Race', 'AngeliaLost', 'The Muybridge Mausoleum', 'Skill Master VR -- Learn Meditation', 'OfficeBots: Reality Bytes [VR]', 'Cave Digger: Supporters Pack', 'King of my Castle VR', 'Audio Infection Demo', 'KRAKEN', 'L U N E', 'Futurejam', 'Fovos VR', 'Elephant Express VR', 'Beach Ball Valley', 'Cartoon Network Journeys VR', 'DROP VR - AUDIO VISUALIZER', 'Bocce Beach', 'MGSLeisure1000 Demo', 'Chainless', 'Jeeboman', 'Infinity Disk', 'DEATH TRAIN - Warning: Unsafe VR Experience', 'The Last Day Defense - Demo', 'VR Regatta - The Sailing Game Demo', 'Virtual telescope', 'VRQ Test', 'Forgotten Chambers', 'Cross Death VR', 'Heart of the Emberstone: Coliseum', 'Donut Distraction', 'Pierhead Arcade 2', 'Wardens of the Amber Cage Demo', 'Trinity VR', 'Arabian Stones - The VR Sudoku Game', 'Icarus Six Sixty Six', 'Deadly Rescue', 'Epic Snowday Adventure', 'Stunt Corgi VR', 'Channel Player', 'Treasure Bolt', 'Kodon', 'Otawamure', 'XLR', '3dSunshine', 'Spare Teeth VR', 'Spooky Night 2', 'Garage Drummer VR', 'Scooter Delivery VR', 'Weelco VR', 'Epic Food Fight VR', 'Trek: Travel Around the World', 'GrabBag', 'Million Arthur VR: Character Command RPG', 'Rome Reborn: The Roman Forum', 'Poker Show VR', 'Galaxity Beta', 'Supermarket VR and mini-games', 'Zombie City', 'VR takibi', 'Letzte Worte VR', 'GyroCube VR', 'Defenders of the Realm VR', 'Sunset Giant Demo', 'Blind', 'Mental Asylum VR', 'Lodestone - The crazy cave adventures of mad Stony Tony and his encounter with the exploding rolling stones', 'Lone Pirate VR', 'Dating Lessons', 'The Relentless', 'ATV Simulator VR', 'Natural Locomotion Demo', 'Ungrounded: Ripple Unleashed VR', 'Poisoner', 'The Eerie Inn VR', 'Catify VR', 'The Source of Evil', 'Orc Assault', 'Big Breezy Boat', 'JUST BAT (VR CRICKET)', 'PuppetsVR', 'Guardians of Life VR', 'The Cabin: VR Escape the Room', 'Formula E: Grand Prix', 'Cubians VR', 'Pixel Arcade', 'Armor Clash VR', 'The Gallery - Episode 1: Call of the Starseed', 'Breach Point', 'WackIt', 'RollerForce', 'Combat Helicopter VR - Surgical Strike', 'Dragon Adventure VR', 'Periodonica', 'Adventure Game', 'Verto Studio VR', 'Heroes Never Die', 'VR Audio Visualizer', 'Desolate Sands', 'StroodleDoodle', 'Zuma Legend VR', 'Oval', 'ALONE? - VR', 'J15 Jet Fighter VR (歼15舰载机)', 'Reboant Demo', 'DiveReal', 'Master Pool', 'Gunjack', 'Chamber 19 Demo', 'STAR BARON – VR BEAST COMBAT GAME', 'Tomb Guard VR', 'VR Triber', 'Distant Nightmare - Virtual reality', 'Revoke', 'Its a Trap', 'Guardian of The Demon Valley', 'Zombie Buster VR', 'Follow the White Rabbit VR (화이트래빗)', 'GIPHY World VR', 'The Cathedral: Allisons Diary', 'Submerged: VR Escape the Room', 'SweeperVR', 'Naklua VR Demo', 'Google Spotlight Stories: Back to the Moon', 'CyberClub-2077', 'Epic Fun - Explosive War Coaster', 'Miney Company: A Data Racket', 'Vinhomes Metropolis VR Interior', 'edataconsulting VR Office', 'Hop Step Sing! Kimamani☆Summer vacation (HQ Edition)', 'Micro Cosmic Worlds', 'Escape Artist Demo', 'The Physiology of the Eye', 'Survivor VR', 'TRANCE VR Demo', 'Tales of Wedding Rings VR', 'Remembering Pearl Harbor', 'Crawl Space: The Mansion', 'LOST CAVE', 'Virtual Warfighter', 'Willies Haunted Hayride', 'TURRET SYNDROME', 'VR火灾逃生应急演练(VR fire emergency simulation system)', 'Header Goal VR: Being Axel Rix', 'Skybox Painter 3D', 'Frankenstein: Beyond the Time', 'FIGHT BALL - BOXING VR', 'Practisim VR', 'Faceted Flight', 'Star Hunter VR', 'The Torus Syndicate', 'Ski Jump VR', 'Space Conquest', 'Epic Roller Coasters — Wyvern Siege', 'Prevent The Fall', 'Infinity', 'Wand Wars VR Demo', 'SpaceCoaster VR', 'Left-Hand Path', 'on your mark', 'VR Shooter Guns Demo', 'Mage Guard: The Last Grimoire', 'Junkyard Wizard', 'Retro Block VR', '2017 VR', 'Abandoned Hospital VR', 'Evoke', 'Spooky Night', 'Virtual Virtual Reality', 'Crazy Alchemist', 'Housekeeping VR', 'Alpine Ski VR', 'AmaranTime Arena', 'Maze of Gaea（Real Maze VR Simulation）', '挙式VR 鴻上大和 編 Wedding VR : Yamato', 'Calm Down, Stalin - VR', 'The Arcslinger', 'Primitive Road', 'Table Games VR', 'Preta: Vendetta Rising', 'End of the Road VR', 'oVRshot', 'Forestry', 'Anceder', 'ABC Paint', 'Street of Sanctuary VR', 'Rumpus', 'Revoke Demo', 'Seance: The Unquiet (Demo 1)', 'Anime show 动漫时装秀', 'Cave Digger: Riches DLC', 'Justice Demo', 'Johns Wizard Dungeon', 'Desert Ride Coaster', 'VR Gallery', 'CryptoSpace', 'Science:The world is in your hands', 'Artstage', 'Diary of Defender', 'Ninja in Training', 'The Jigsaw Puzzle Room', 'Dig 4 Destruction', 'VR Disc Golf', 'Jake and the Giant', 'Racket:Nx Demo', 'Sanguo Warriors VR', 'Proton Ball', 'Star Kingdom - The Elements', 'Escape Camp Waddalooh', 'Fly Killer VR', 'Reality Blender', 'NVR Player', 'VirZOOM Arcade', 'Carpe Lucem - Seize The Light Demo', 'Waba', 'Cloudborn', 'Watching Grass Grow In VR - The Game', 'MORTEM - VR Edition', 'Trinity.Town: Monastery | Martial Arts and Meditation', 'Magical Squash', 'Mars 2030', 'Sky Jac', 'A-10 VR', 'SONAR - A Virtual Reality Experience', 'Radiant Crusade', 'Rich life simulator VR', 'Millionaire Dancer', 'Bitcoin VR', 'M.I.A. - Overture', 'Day of Destruction', 'RollerGirls From Beyond', 'The Final Image', 'Tiny Mortals VR', 'HVAC Simulator', 'STYLY', 'ActionpaintVR', 'DlodloVRPlayer', 'Iron Ground', 'Across The Line', 'Very Real Chess', 'Space Jones VR', 'Kyiv: from dusk till dawn with Lenovo Explorer', 'Kingdom City Drowning Episode 1 - The Champion', 'Alveari Demo', 'Time', 'Codename: Phantom', 'kicker', 'Poly Quest', 'HUGE BEER PONG CHALLENGES VR', 'Coffee VendoR', 'Apex Construct Demo', 'Found', 'Boxed In', 'Puppet Blaster', 'Sunset Giant', 'BinaryBotsVR', 'R2R Preseason Demo', 'MonkeyKing VR', 'Always Higher Demo', 'Vertigo!', 'SpaceWalker', 'RAYBEEM - Live in Your Music', 'I Pay No Rent', 'VRporize - VR FPS Demo', 'Celestrion', 'Boxing Apocalypse', 'Schlocks Demo', 'The Hunger Games 360', 'VRでエミリアと異世界生活-膝枕&添寝編', 'Dragon Orb Demo', 'No King No Kingdom VR', 'EGG HUNT VR', 'Project 59', 'HeadSquare - Multiplayer VR Ball Game', 'Tsuro - The Game of The Path', 'Witly - language tutoring in VR', 'Sommad', 'Ghost Mountain Roller Coaster', 'Chroma Lab', 'Inbound', 'Miniature TD - VR', 'Octoshield VR Demo', 'Street Champ VR', 'Song Samurai', 'The Assembly VR Unlock', 'ZenBlade', 'D.F.R.: The Light VR', 'Psyche Soldier VR', 'Humble Pie', 'Ahros: One Warrior Chronicle', 'Skylight', 'Drone Infiltrator', 'Endless Crusade', 'Fantasy Smith VR', 'Chambered Demo', 'VRun', 'The Cavern', 'Space Battle VR', 'Paws n Claws VR', 'Secret of Harrow Manor', 'Sea Battle VR', 'Holiday Simulator : Wacky Sleigh Ride', 'Tennis Arcade VR', 'Live the Guitar', 'Amaze VR - Thriller Pack 2', 'Hot Runback - VR Runner', 'The Impossible Travel Agency', 'Scorb VR', 'KungFu Town VR', 'MixCast VR Studio', 'Cove Point Fun Center VR', 'Planet Protector VR', 'The Twiggles VR', 'Jam Studio VR', 'Bygone Worlds: Ephesus', 'DollcitydemoV_1 Demo', 'Tower Island: Explore, Discover and Disassemble', 'Dream Channel', 'Sweeper Zero', 'Galaxis Wars', 'SourVR Video Player Deluxe Edition', 'RHCs StretchingVr', 'Protocol VR', 'Siege Hammer', 'VR Amazing Files: Horror Hospital', 'Captain 13 Beyond the Hero', 'Snowday', 'Beatcrash', 'Pinball Evolution VR', 'Keep Watching VR', 'Project Shield', 'Valiant', 'Warpin: Creation (VR)', 'Hide N Seek VR', 'VR-Xterminator', 'Talos VR', 'Cyberlink PowerDVD 17 Ultra', 'Welcome Above', 'Ancient Code VR( The Fantasy Egypt Journey)', 'Tanks VR', 'Block Rocking Beats', 'Dimensional (VR-Only) Demo', 'Paper Valley', 'Pinball Inside: A VR Arcade Game', 'Voxel Shot VR', 'Jam Studio VR EHC - Beamz Original Latin/Jazz/Blues Bundle', 'VR Soccer Training', 'Okay, Panic!', 'BARRAGE / 铁幕', 'Vanguard V', 'Dragon Roller Coaster VR', 'FragmentVR', 'Cortex Protocol Demo Demo', 'Border Patrol Demo Demo', 'Darts VR', 'Jam Studio VR EHC - Disney Camp Rock Bundle', 'Crisis VRigade', 'Demon Hunter', 'Behind You', 'Arcade Saga', 'Foosball VR', 'DOOORS VR', 'ALaLa: Wake Mi Up!', 'PartyLine VR', 'Kindled Cavern', 'Stonehenge VR SANDBOX', 'New Zealand Virtual Debating Chamber', 'Chop It', 'Wheelchair Simulator VR Demo', 'BLARP!', 'DCS: F/A-18C Hornet', 'Robot Incursion', 'Katana X', 'EggFight', 'Atlas Reactor VR Character Viewer', 'Red Bull Doodle Art - Global VR Gallery', 'Naturallandscape - Three Gorges (自然景观系列-长江三峡)', 'Late For Work', 'Country of One', 'Snowrifters VEX', 'Anticorps VR', 'Rollercoaster Xperience', 'Schlocks', 'Quickshot', 'Holoception', 'PlanTechtor', 'The Path of Greatest Resistance', 'NIGHTSTAR', 'NewTypes', 'Boo Breakers: The Ghostening', 'VR Snowballs', 'Dont Get Hit In The Face', 'Girls Dance VR', 'Mad Hunting Simulator VR', 'DrummingVR', 'Six Feet Under', '生死线 Dead Line', 'Evil Robot Traffic Jam HD', 'Lets Bowl VR - Bowling Game', 'Sexy Miss', 'Virtual Pirate VR', 'Sky Climbers', 'Teratini VR', 'Crisis on the Planet of the Apes', 'Boxplosion', 'PowerBeatsVR', 'VR施工安全培训系统', 'DarkMaze', 'Atramentum VR', 'Stack', 'Dark: Frontier', 'Soul Survival', 'River Relaxation VR', 'Galaxy Forces VR', 'A-Escape VR Demo', 'StickDodgeVR', 'Pathstow Mystery VR', 'Cairos Tale: The Big Egg', 'Spellbound', 'Cucumber Defense VR', 'Rainbow Reactor', 'Lair of the Titans', 'Mighty Monster Mayhem Demo', 'Ze VR', 'The Beanstalk', 'Moriarty: Endgame VR', 'Virtually Impossible', 'Until None Remain: Battle Royale VR', 'Gurugedara', 'Redfoot Bluefoot Dancing', 'Dungeon Maze', 'Virush', 'The Haunted Graveyard', 'Keep Defending', 'Legends of Catalonia: The Land of Barcelona', 'Scutter Demo', 'Streetball VR', 'The Tower', 'Sisters Demo', 'TSA Frisky', 'Google Spotlight Stories: Rain or Shine', 'Banana Invaders', 'Arc Surfer', 'Pilot Rudder VR', 'Kurios', '1, 2, 3... Bruegel!', 'The baron got you again', 'Its Fun To Break Things', 'Voyage Senki VR 海洋传说 VR', 'StageX', 'The Road to Hades', 'Magnificent Ships: Volume 2', 'Echoes in White', 'CloudCity VR', 'VR Robotics Simulator', 'Fruit Attacks VR', 'Surgera VR', 'Snailiens', 'Final Mission VR', 'The Technician', 'VR Battleship YAMATO', 'Synthetic Dreams', 'Crystal Reign', 'Fancy Trangram VR', 'Recreational Dreaming', 'Mr.Hack Jack: Robot Detective', 'Social Club VR : Casino Nights', 'VR Ultimate Paintball: Heartbreak, Regret & Paintbots', 'A-Tech Cybernetic Demo', 'Treasure Hunt VR', 'Adapt or Perish', 'Regenesis Arcade Lite', 'Primitive', 'My Lil Donut', 'Puppies vs Undead', 'Tunnel Runner VR', 'Shadows in the Darkness', 'Lordian: Karma', 'Doomsday Survival:Training', 'Space Junk Patrol', 'PitchFork', 'VR垃圾分类_Refuse classification', 'Virtual Fighting Championship (VFC)', 'Team Up', 'Interkosmos', 'SpaceSys - Formula Environment', 'Luxin Time', 'Ship It', 'O2Jam x DancingParty', 'The Blank Canvas - Hacking Nature', 'Realshot', 'The Arena of Gladiators', 'Skyland Defense', 'Jam Studio VR EHC - Fingerprints in the Sky - Craig Chaquico Bundle', 'Epic Roller Coasters — T-Rex Kingdom', 'Snow Fortress Demo', 'Dimensional', 'Craftmas', 'Overboard', 'RealBX VR (Apocalypse begins...)', 'VRQB', 'Astral Domine', 'The Unbreakable Gumball Demo', 'Epic Roller Coasters — Dread Blood', 'The Experiment: Escape Room', 'Blueshift', '挙式VR ヘンリー・A・スペンサー 編 Wedding VR : Henry', 'Flappy Arms', 'Werewolves Within™', 'Demon Grade VR', 'Zen Space Flight - VR Showcase', 'Icarus - Prima Regula', 'Glorious Noon', 'Operation Warcade VR Demo', 'Permission VR', 'Awesome Obstacle Challenge', 'Animal Force', 'Travelling around the world on a hot air balloon', 'Bacon Roll', 'SaberSaw VR', 'Shinrin-yoku: Forest Meditation and Relaxation', 'VR Party Pack', 'Paddle Master VR', 'Seeking Dawn: Free to Play Edition', 'Outrageous Grounds: The Maze', 'Epic Fun - Saloon Shooter', 'Townsmen VR', 'VR Crane Master', 'Hover Skate VR', 'Mob Stadium', 'Salvage Op', 'Super Amazeballs', 'Dinosaurus Life VR', 'FATED: The Silent Oath', 'Tower Ascent', 'Paper Fire Rookie Arcade', 'Marlene Demo', 'Noda', 'FINSummerVR', 'Chunky Orbits', 'ChefU', 'Mad Factory', 'Survival', 'Space Turret Gunner 宇宙大炮手', 'Going Up', 'Manastorm: Champions of Gnar', 'Bullet Dodge', 'Minigolf VR', 'SPECIAL FORCE VR: INFINITY WAR', 'Hell Breaker', 'Carpe Lucem - Seize The Light VR', 'Dafen Oil Painting Village: An Immersive Reality', 'DJ Whip VR', 'WiseMind', 'RuinsCity_VR', 'Dragon Orb', 'Grand Expanse', 'Wolves Team', 'AirMech Command', 'DUO', '[ R.U.M.A ]', 'Twinkle Star - 未来はすぐそこで待っている', 'Diesel Power', 'Final Approach: Pilot Edition', 'Draco Dux Demo', 'Justice: Fallen Clan', 'Pebbly Beach Nature Meditation | VR Meditation Sphaere | 360° Video | 6K/2D', 'Tunescape', 'Unbreakable Vr Runner', 'Bridge Trek', 'Pararea--Social VR for Everyone (Beta)', 'Cutlass', 'EggTime 2', 'VR Chair Games', 'Obscura', 'Bullet VR', 'Baseball Kings VR', 'Pirate Survival Fantasy Shooter', 'Nevrosa: Spider Song', 'Bazaar', 'Thread Studio', 'Super Island God VR', 'Gumball Drift', 'Club Dance Party VR', 'GoWings Safari', 'Princess Kidnapper 2 - VR', 'Puppy Chef Academy', 'DREAMFLIGHT VR', 'VR_PlayRoom', 'Wipe Out VR', 'GE Neuro', 'OzGrind Virtual Reality Showroom', 'Voronium - Locust Sols', 'Disc Golf Adventure VR', 'Sky Tower', 'Mind Sweeper VR', 'Space Dragon', 'Castle Demolition VR', 'Block Wave VR', 'Gravity Lab - Gravitational Testing Facility & Observations', 'Robert Rodriguez', 'Escape Room', 'Doritos VR Battle', 'Dantes Forest', 'AIRA VR', 'Google Spotlight Stories: On Ice', 'The Art of Fight | 4vs4 Fast-Paced FPS', 'Cosmos Crash VR', 'ZombiesTown VR', 'Hockey Player VR', 'SojournVR', 'Lucky Night: Texas Holdem VR', 'Queendoom', 'Star Rage VR', 'Underture', 'RacetronicVR', 'In Memory', 'If Only...', 'Spirit Guide Crucible', 'Clark | HOOVA VR', 'The American Dream', 'The Murder Room VR', 'Knife road', 'The Hospital: Allisons Diary', 'Book Of Merlin', 'PsychLabVR', 'VRetired', 'Trinity of Chaos', 'Strata inStudio VR', 'Dinosaur Hunter VR', 'Horror Ville Maze Escape', 'Acans Call: Act 1', 'Periodonica Demo', 'FARHOME', 'A Legend of Luca', 'Thailand VR Gallery', 'Beat Boxer', 'Stupid Cupid', 'Dunk It (VR Basketball)', 'Fightttris VR', 'Mech Skeleton', 'Sinister Halloween', 'Exterminator', 'The Veteran VR', 'Primal Carnage: Onslaught', 'Beyond the City VR', 'Defense of Castle Chilly', 'Toy Clash', 'Punch Pad Workout', 'VR Puzzle Box', 'Scrap Attack VR', 'Pen Island VR', 'bloxyz', 'Freeze Climbing', 'OK Bob', 'Jam Studio VR - Education & Health Care Edition', 'RED: Lucid Nightmare', 'Rhythm Defender', 'CyberDrifter Demo', 'Cow Milking Simulator', 'Slabo?', 'Maze Run VR', 'Arch Virtual HQ', 'The Toymakers Apprentice', 'Puzzle Lab', 'Magic Flight Academy', 'Dont Knock Twice', 'Francois BOUILLE', 'Chop and Drop VR', 'Cloudlands : VR Minigolf Demo', 'Skydiving Simulator VR', 'Highway Madness', 'Eggcellent VR', 'Journey to Alien Worlds', 'Starbear: Taxi', 'Jam Studio VR -- Music Fundamentals Series', 'Lighter Than AR', 'TrainerVR', 'COMBAT INSTINCT', 'Bleeding Kansas', 'VR Rome', 'Chicks and Tricks VR', 'RideOp - VR Pro Edition', 'Jaguar I-PACE Concept | Virtual Reality Experience', 'VR Squash 2017', 'Twin Roads', 'SoundTriggersVR', 'AVOlight.Space (Multi-Screen Media Player) Demo', 'PresenZ', 'SculptrVR', 'GemWars', 'Shadow Uprising', 'Dungeons & Treasure VR', 'Mind Map VR / マインドマップVR', 'Slamdunk VR', 'HVRGUN', 'High clear VR', 'Museum of Other Realities', 'Downward Spiral: Prologue', 'Beer and Skittls VR', 'Salsa-Virtual', 'High Templar VR', 'Swing the cat', 'Marble Land', 'LUMEN', 'Lumberjack VR', 'Avem888 VR', 'Driftwatch VR', 'Queendoom Demo', 'Medieval Mayhem', 'Hang Up', 'Quantized', 'Paulos Wing', 'COMPLEX a VR Puzzle Game', 'Asteroid Turret Defender VR', 'Etherian', 'Snake VR', 'F18 Carrier Landing', 'Together VR - PC Edition DLC', 'Bad Mojos', 'DUO Demo', 'A five-day tour in the morgue', 'The Rabbit Hole Demo', 'Marshmallow Melee', 'Slingshot Hero VR', 'BurningBridges VR', 'Skinscape', 'Sword Master VR', 'DrillsVR', 'Old Friend', 'House of Meditation', 'Here & Elsewhere', 'Mind Map VR Demo', 'Dawn of the Robot Empire', 'DrumSim', 'MagixHome™ VR', 'Escape The Gray', 'Disco Time 80s VR', 'Bomb U!', 'Empty Town', 'BellyBots', 'Dances with Butterflies VR', 'C.S.S. CITADEL VR', 'My RC Buggy! VR', 'Chicken VR', 'ABE VR', 'Innocent VR', 'Wheelchair Simulator VR', 'Naked Sun', 'Baskhead', 'Pavlov Demo', 'FORM - Episode 1 Demo', 'The Lost', 'CSI VR: Crime Scene Investigation', 'Hot Squat 2: New Glory', 'Slice&Dice', '无奇刀 Wookies Blade', 'Apollo 11 VR', 'VR Austria', 'Prehistoria', 'Tower VR', 'Table Tennis VR', 'Home A Drone', 'Bits n Bullets', 'Dashy Square VR', 'BVRGER VAN', 'Apperception', 'VR Drivers', 'ELASH', 'ZhanDou (VR and Non-VR)', 'Lemuria: Lost in Space - VR Edition', 'EVEREST VR™', 'RONE', 'Riley Short: Analog Boy - Episode 1', 'Rubber Ball VR', 'Spaaace Demo', 'Telia VR conference', 'Nutrients for Life', 'Equilibrium VR', 'Dealey Plaza Paintball', 'YAWS - Yet Another Waveshooter', 'The Homestead Invasion', 'WyVRn', 'Perfect Angle VR - Zen edition', 'Greenland Melting', 'Deadly Cryptids Demo', 'OnShape', 'Embrace The Fear', 'Destinations Workshop Tools', 'Northern Lights 01', 'Trakker', 'Mega Overload Demo', 'Limberjack', 'Juventus VR', 'Maze Of Time', 'Beyond the Stars VR', 'Innocent Forest: The Bird of Light', 'Punch Bomb', 'Darkest Mana : Master of the Table', 'Orch Star', 'Dodgeball Simulator VR', 'Dead Moon - Revenge on Phobos -', 'Bitslap', 'Oblivion Tesseract VR', 'Home Tech VR', 'Blue Effect VR', 'A Dragons Tale VR', 'SchoolJump', 'IrreVRsible', 'Disassembly VR', 'Inhumanus', 'Ship It Demo', 'Anamorphine', 'void LINK', 'NIGHTSTAR: Alliance', 'Tractorball', 'TendyTrainer', 'Wolfenstein: Cyberpilot International Version', 'Sign Here: _________', 'Anubis Challenge', 'Stop it - Driving Simulation', 'Insect Revolution VR', 'Jam Studio VR EHC - Disney Stars Bundle', 'Google Spotlight Stories: Special Delivery', 'HoloBall', 'Time Travel VR', 'Stardust VR', 'Basketball Hero VR', 'Poly Runner VR', 'Roller Coaster Egypt VR', 'Challenge Park', 'Arena Demo', '归墟纪·寂夜 FINAL WORLD', 'Zanshin', 'Keep Defending Demo', 'Takelings House Party', 'Athletics Games VR', 'CITY BALLS VR', 'World of Virtual Reality', 'True Blades™', 'TSA Frisky VR Demo', 'Cut Cut Buffet', 'DownStream: VR Whitewater Kayaking', 'Realities', 'Yacht Simulator VR', 'Eye in the Sky', 'Freedom Locomotion VR', 'BARDO', 'Butterfly Moment', 'Fujii', 'VR Battle Grid', 'Sensual VR', 'Qbike: Cyberpunk Motorcycles Demo', 'CUBE-C: VR Game Collection', 'Kamikazo VR', 'The Grand Canyon VR Experience', 'Lord Darydikilkil', 'Project Aeronaut', 'Astroderps', 'VR Table Sports', 'Differently Fast', 'The Fastest Fist', 'Vision Therapy VR', 'DUELEUM', 'Food Truck VR', 'Backgammon, Chess & Checkers', 'The Path of Greatest Resistance - Body Tracking with Vive Trackers', 'VRange', 'You Are Here', 'Nightmare Grotto', 'Podium Bash Demo', 'KÀ', 'VR Ping Pong', 'Grapply Demo', 'Wacky Wings VR', 'Ricerca VR', 'Community Garden', 'Bully Store', 'Spud Cricket VR', 'Follow My Footsteps Demo', 'HORROR OF THE DEEP - VR', 'Space Viking Raiders VR', 'Hyper Visualize.it', 'Vox-L', 'Armed Warrior VR', 'Wild West VR', 'Broken Blue', 'Spartaga', 'Dracula: Vampires vs. Zombies', 'Beyond Tokyo', 'VR Darts', 'Drive', 'World of Golf', 'Adventurous Life VR', 'hoVRboard', 'Drunk or Dead - On the Road', 'GALAXY TOP WING', 'VRchaeology: Prologue', 'VR Furballs - Demolition', 'The God', 'The Hunted Demo', 'World Apart', 'VR Trivia Battle', 'Kitty Rescue', 'The Copper Canyon Shoot Out', 'Make A Jigsaw Puzzle', 'Starmans VR Experience', 'WW2 Zombie Range VR', 'Mind OVR Matter', 'The Villa: Allisons Diary', 'Apocalypse Mechanism', 'Groundhog Day: Like Father Like Son', 'The Exorcist: Legion VR (Deluxe Edition)', 'CYBER VR', 'VR Meditation SkyRun', 'Quarterback SNAP', 'Drone Hero', 'Magnificent Ships: Volume 1', 'Operation Chromite 1950 VR', 'Tennis Tune-Up', 'Interplanetary Hunter', 'Radiant Ascent VR', 'Epic Fun - Viking Coaster', 'Special Delivery', 'Fruit for the Village', 'Amazing: A House In Kansas VR', 'Jungle Defense', 'Skyworld: Kingdom Brawl', 'Proxima B Music Video - Dalziel X Capon Design', 'VRiczat - The Virtual Reality Cricket Game', '¡Zombies! : Faulty Towers', 'Monster Reapers VR', 'THOSE DAMN ALIENS! VR', 'Tethered', 'Gooblins', 'INFINITI VR', 'Boxing Saga', 'Mind Labyrinth VR Dreams', 'Félix VR', 'Badminton Kings VR', 'Light Repair Team #4', 'CricVRX - VR Cricket', 'Quizality', 'Goalkeeper Legend', 'Oneiric Masterpieces - Paris', 'Depression', 'Xtreme Paddleball', 'ChessVR', 'Roomscale Tower', 'KENDO', 'SAMSKARA', 'The Next Day After Friday', 'Smell of Death Demo', 'Meme Dragons', 'Locked In VR', 'Cinderella VR', 'Arena', 'Douarnenez VR', 'NexVR Video Player', 'RoboTraps', 'Air Rage', 'Amaze VR - Rom Com Pack 1', 'Pixel Ripped 1989', 'DMT: Dynamic Music Tesseract', 'Orc Hunter VR', 'Piwall', 'Wizard Street', 'Firebird - The Unfinished', 'Muertes Arena', '2260 VR', 'Frontier VR', 'Jam Studio VR EHC - Beamz Original Rock/Country Bundle', 'Mars City', 'Professor Chuckenhope', 'Spectro', 'Storm VR', 'Archangel™: Hellfire Demo', 'Interworlds', 'VR Boxing Workout', 'Soundscape', 'Shatter Quest', 'Hex Tunnel', 'Where Thoughts Go: Prologue', 'Chunks', 'Tomb Exploration VR', 'How To Meat People', 'The Last Dinner', 'Dissection Simulator: Feline Edition', 'Aeronaut', 'Runaway VR', 'Fractal', 'DOPAMINE', 'Fear Simulator', 'Claybreaker - VR Clay Shooting', 'Rocket Swords', 'Passengers: Awakening VR Experience', 'Moon Landing VR', 'MINT VR', 'DreamWorks Voltron VR Chronicles', '8i - Make VR Human', 'Thunder Spheres - Virtual Reality 3D Pool', 'I See You', 'Slime Rancher: VR Playground', 'Rocketboarder', 'Touch the devil VR(おさわり魔王VR)', 'V-Racer Hoverbike', 'Brick Stack VR', 'The Poisoner', 'Castle Wars VR', 'Touring Karts', 'Catch & Release', 'Space Slingshot VR', 'Naklua VR', 'The Take', 'Filthy, Stinking, Orcs!', 'Obstruction : VR', 'JUMP', 'Balloonatics', 'Snow Games VR', 'Hopalong: The Badlands', 'aMAZEing adventures', 'Lost in the Rift - Reborn', 'OlympicVR', 'End of Days', 'Outrageous Grounds: The Maze Demo', 'Survival VR', 'VectorWars VR', 'Hammer & Anvil VR', 'Unknown Pharaoh', 'BE THE HERO', 'Witoo VR photo viewer', 'ShowdownVR', 'Toy Clash: Commander of Toys', 'Power Tools VR', 'The Same Crime', 'KENDAMVR - Virtual Reality Kendama', 'Soldiers of Heaven VR', 'Gravity Garden', 'NextVR - Live Sports and Entertainment in Virtual Reality', 'Pale Lands VR', 'Kygo Carry Me VR Experience', 'The Last Operator', 'Everyday Baseball VR', 'Vistascapes VR', 'Loading Human: Chapter 1', 'HOMEBOUND', 'Aliens Attack VR', 'Living with Jaguars', 'Guardian war VR', 'Oneirogen', 'AI Nightmare', 'World VR Competition', 'Galaxy Race Demo', 'Blue Flame VR', 'Adventure Time: Magic Mans Head Games', 'Conductor', 'Basic Car Repair Garage VR', 'Jingo', 'Capria: Magic of the Elements', 'CRAFT: Work VR Shop', 'Taptiles', 'Phantom Warfare', 'Beach Body Bros', 'The SoulKeeper VR', 'Temple of Pizza', 'DEADLOCK', 'Eye of the Owl - Bosch VR', 'Candy Island', 'Caelum: Into the Sky', 'SUSHIDO VS ZOMBIES', 'VR health care (running exercise): VR walking and running along beautiful seabeach and sakura forests', 'Neon', 'Delirium VR', 'The Way of Kings: Escape the Shattered Plains', 'Save Snegurochka!', 'Cave Digger: Riches Supporters Edition', 'FILE 9', 'Age of Heroes (VR)', 'A Haunting : Witching Hour', 'Little Einar Demo', 'Kanova', 'Quell 4D', 'Littlstar VR Cinema', 'VIRTUAnimator', 'Super Beam', 'Across', 'FAN CLUB', 'STAR SOD', 'Multiscreens', 'APEX Tournament', 'Flip the Table', 'Angry Ball VR Demo', 'Little Earth', 'AudioBeats', 'Organ Quarter Pre-Alpha Demo', 'Google Spotlight Stories: Sonaria', 'NASAs Exoplanet Excursions', 'Virtual Temple: Order of the Golden Dawn', 'ProjectM : Daydream', 'PALEO museum VR', 'Crazy Saloon VR', 'Ship Ahoy Open BETA', 'Outlands Safehouse', 'Arcane Trials', 'Danger Room VR', 'Brew-Ha', 'Calcflow', 'Diesel Express VR', 'GUNSMOKE', 'Cubians: Combine', 'Steves Pub - Soda on tap', 'VRSailing by BeTomorrow', 'Holomeld', 'The Spy Who Shrunk Me VR', 'Hop Step Sing! Kisekiteki Shining! (HQ Edition)', 'SiegeVR', 'Refinish Network - Paintboss VR', 'Paintey', 'Quanero VR', 'AliveInVR', 'People Cu3ed', 'Welcome to Wacken', 'The Dawn:First War', 'ViSP - Virtual Space Port', 'Spark of Light Demo', 'DreamTank', 'BlackShield: Upora Story', 'LyraVR', 'Smell Of Death', 'Death Dojo', 'Escape Room VR: Stories', 'Elephant Express VR Demo', 'WellTown', 'VR GAME-Brick of War', 'ToyShot VR', 'Conjure Strike', 'TITAN SLAYER Ⅱ Demo', 'Viking Days', 'Gun Range VR', 'Operation: Polarity Hook', 'Ludicrous Speed', 'Vision', 'Kunlun Fight', 'Mind Massaging Machine', 'Biathlon Battle VR', 'Theseus', 'The Glade', 'Tilted Mind Demo', 'Baskhead Training', 'Please State Your Name : A VR Animated Film', 'VectorWave Demo', 'LEGO® Batman "The Batmersive Experience"', 'Bitdude', 'Jam Studio VR EHC - The Learning Station Song Bundle', 'High Mountain Roller Coaster VR', 'Paper Toss VR', 'Throttle Powah VR', 'Birdtual Reality', 'Tombé Drums VR Demo', 'Amoreon NightClub', 'PowersVR', 'Conjure Strike Demo', 'Surgical Study and 3D Skeletons for Medical School Students', 'Star Epica 3720', 'Eleven Eleven', 'iOMoon', 'TublerVR', 'The Wire Loop Game VR', 'Voxel Tank VR', 'Tombé Drums VR', 'Sorcerers of Kinetics (VR)', 'Elite Escape', 'Neon VR', 'MAGIX Photostory Premium VR Steam Edition', 'Rome Circus Maximus: Chariot Race VR', 'Sweet Escape VR', 'VR Darts Zone', 'Naturallandscape - GuilinLandscape (自然景观系列-桂林山水)', 'Neonwall', 'Chess and Checkers VR', 'Gnomes & Goblins (preview)', 'Icesolation', 'VR Escape The Puzzle Room', 'Jam Studio VR EHC - Beamz Original Classical Bundle', 'Bike Rush', 'TRESPASS - Episode 2', 'Meu', 'Epic Roller Coasters — Lost Forest', 'Show Me What You Got', 'Experiment Gone Rogue', 'Tomorrow', 'Sweaty Palms', 'Goalie VR', 'Ginga Kagekidan - 放課後くるーずっ！', 'Lems', 'Heroes of the Seven Seas VR', 'Zero Caliber VR Demo', 'BowMage', 'Beat Blocks VR', 'Ascent Spirit', 'Perplexity: Suburban Home', 'Last Line VR: A Zombie Defense Game', 'Super Zombie Arcade', 'GIPHY Museum of GIF Art', 'King Kaiju', 'Locomancer Demo', 'Drops: Rhythm Garden', 'VR Swing Table Tennis Oculus', 'DrumKit VR - Play drum kit in the world of VR', 'Soviet Luna Park VR', '魔光', 'Island Getaway', 'SVRVIVE Demo', 'DoodleVR', 'Cute Girls', 'Solitaire VR', 'Anime Girls VR', 'Twilight Path', 'Cyberdrifter', '夕鬼 零 Yuoni: Rises', 'Personal Disco VR', 'Singularity 5', 'Drone Hunter VR', 'Dungeon Puzzle VR - Solve it or die', 'VRIQ', 'Minotaur Arcade Volume 1', 'Medicalholodeck Free', 'After Solitary'];

    filteredOptionsGames: Observable<string[]>;
    Type: Types[] = [
    { value: 'Female', viewValue: 'Female' },
    { value: 'Male', viewValue: 'Male' },
    { value: 'X', viewValue: 'X' },
    { value: 'NA', viewValue: 'NA' }
    ];

    constructor(private _snackBar: MatSnackBar,
      private httpClient: HttpClient, private router: Router, private spinner: NgxSpinnerService,
      public dialogRef: MatDialogRef<dialogEditUser>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    }
    public teamData: any;
    public userID: any;
    public userAuth: any;
    public arcadeID: any;
    public teamIDresponse: any;
    public usersMediaID: any;
    public teamDataID: any;
    public userData: any;
    public users: any;
    public Parties:any;
    public apiURL: string = environment.apiUrl;

    ngOnInit() {
this.spinner.show();
      this.filteredOptions = this.myControlGames.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
        );


      this.filteredOptionsGames = this.myControlGames.valueChanges.pipe(
        startWith(''),
        map(value => this._filterGames(value))
        );


      this.userDetailsPreEdit();
    }

    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }


    private _filterGames(value: string): string[] {
      const filterValue = value.toLowerCase();
      return this.games.filter(game => game.toLowerCase().indexOf(filterValue) === 0);
    }

    userDetailsPreEdit() {
      var uid = localStorage.getItem('uid');
      let postData = new FormData();
      postData.append('id', uid);
      // to do User Angular Service
      var aToken = localStorage.getItem('token');
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      const endpoint = 'user/profile'; 

      //this should be
      this.httpClient.post(this.apiURL + endpoint, postData, { headers })
      .subscribe((res: ResponseObject) => {
        this.users = res.data.result["0"];
        this.spinner.hide();
      });
    }


    usrDetails() {
      var AuthUser = localStorage.getItem('user');
      var uid = localStorage.getItem('uid');
      let postData = new FormData();
      postData.append('uid', uid);

      // TO DO User Angular Service
      var aToken = localStorage.getItem('token');
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      const endpoint = 'user/profile'; 

      //this should be
      this.httpClient.post(this.apiURL + endpoint, postData, { headers })
      .subscribe((res: ResponseObject) => {
        this.userData = res.data["0"].result;
        this.userID = res.data["0"].result["0"].id;
        this.arcadeID = res.data["0"].arcade["0"].id;

      });
    }


    onProfileSave(nameUpdate, email, phone, Address1,
      Address2,
      city,
      state,
      country,
     zipPost, dob, gender, headset,gamerTag, FavouriteVRTitle, HomeArcade) {
      let nameP = nameUpdate;
      let e = email;
      let p = phone;
      let a1 = Address1;
      let zP = zipPost;
      let db = dob;
      let x = gender;
      let primaryHeadset = headset;
      let hT = HomeArcade;
      let gT = gamerTag;
      let fvt = FavouriteVRTitle;
      const formData = new FormData();
      let ud = localStorage.getItem('uid');

      formData.append('id', this.users.id);
      formData.append('name', nameP);
      formData.append('email', e);
      formData.append('phone', p);
      formData.append('zip_postal', zP);
      formData.append('address1', a1);
      formData.append('address2', Address2);
      formData.append('city',city);
      formData.append('state',state);
      formData.append('country',country);
      formData.append('dob', db);
      formData.append('gender', x);
      formData.append('headset',primaryHeadset);
      formData.append('gamertag', gT);
      formData.append('favourite_VR_Title', fvt);
      formData.append('home_arcade', hT);

      var aToken = localStorage.getItem('token');
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      const endpoint = 'user/update'; 

      this.httpClient.post(this.apiURL + endpoint, formData, { headers })
      .subscribe(events => {
        console.log('file uploaded');
        let message = 'Success! Go grab a slice you earned it! 🍕';
        this.openSnackBar(message);
      this.router.navigate(['/settings']);
        this.timer();

      })
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    timer(){
      setTimeout(function(){ location.reload(); }, 3000);
    }


downloadCoverArtTemplate(){
window.location.href ='https://storage.googleapis.com/filestorage_valvr2020/media/VAL_PSD_Template.psd';
}

downloadAvatarTemplate(){
  window.location.href ='https://storage.googleapis.com/filestorage_valvr2020/media/VAL_PSD_Avatar_Template.psd';

}

    // response to send
    openSnackBar(message: string) {
      this._snackBar.open(message, '', {
        duration: 3000
      });

    }

  }


  //Media!
  //to do could recycled to do more
  @Component({
    selector: 'dialog-Add-Media',
    templateUrl: './bottomsheets/mediaUpload.html',
  })
  export class dialogAddMedia implements OnInit {
    fileData: File = null;
    previewUrl: any = null;
    fileUploadProgress: string = null;
    uploadedFilePath: string = null;

    uid: string;
    attendeeType: string;
    userType: string;

    constructor(private _snackBar: MatSnackBar,
      private httpClient: HttpClient,private router: Router, private spinner: NgxSpinnerService,
      public dialogRef: MatDialogRef<dialogAddMedia>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
      this.uid = data.id;
    }

    ngOnInit() {
    }
    public apiURL: string = environment.apiUrl;

    fileProgress(fileInput: any) {
      this.fileData = <File>fileInput.target.files[0];
      this.preview();
    }
    onNoClick(): void {
      this.dialogRef.close();
    }

    preview() {
      // Show preview
      var mimeType = this.fileData.type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }

      var reader = new FileReader();
      reader.readAsDataURL(this.fileData);
      reader.onload = (_event) => {
        this.previewUrl = reader.result;
      }
    }

    onSubmit() {
      const formData = new FormData();

      formData.append('logo', this.fileData);
      formData.append('userID', this.uid);
      formData.append('title', 'Media Image');
      formData.append('category_id', '1');
      var aToken = localStorage.getItem('token');
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      const endpoint = 'user/files'; 

      this.httpClient.post(this.apiURL + endpoint, formData, { headers })
      .subscribe(events => {
        console.log('file uploaded');
        let message = 'Success! Go grab a slice you earned it! 🍕';
                this.router.navigate(['/settings']);

        this.openSnackBar(message);
      })
    }

    // response to send
    openSnackBar(message: string) {
      this._snackBar.open(message, '', {
        duration: 3000
      });
    }

  }

  // media model for settins
  @Component({
    selector: '',
    templateUrl: './file.html',
    styleUrls: ['./settings.component.scss']
  })
  export class dialogMediaSettings implements OnInit {

    MediaID: string;

    constructor(private _snackBar: MatSnackBar,
      private httpClient: HttpClient,
      private router: Router, private spinner: NgxSpinnerService,
      public dialogRef: MatDialogRef<dialogMediaSettings>,
      @Inject(MAT_DIALOG_DATA) public data: any) {

      this.MediaID = data.MID;

    }

    ngOnInit() {
      this.spinner.show();
      this.mediaData();
      this.userDetails();
    }
    public apiURL: string = environment.apiUrl;
    public userID: any;
    public userAuth: any;
    public arcadeID: any;
    public usersData: any;
    public teamID: any;

    userDetails() {
      var AuthUser = localStorage.getItem('user');
      var uid = localStorage.getItem('uid');

      let postData = new FormData();
      postData.append('id', uid);
      // to do User Angular Service
      var aToken = localStorage.getItem('token');
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      const endpoint = 'user/profile'; 

      //this should be
      this.httpClient.post(this.apiURL + endpoint, postData, { headers })
      .subscribe((res: ResponseObject) => {
        this.userAuth = res.data.result["0"].userType;
        this.usersData = res.data.result["0"]
        this.teamID = res.data.result["0"].team;
        this.userID = res.data.result["0"].id;
        this.arcadeID = res.data.arcade["0"].id;
      });
    }

    onNoClick(): void {
      this.dialogRef.close();
    }



    public usersMediaID: any;

    mediaData() {
      let postData = new FormData();
      let mid = this.MediaID;
      postData.append('mid', mid);
      // to do User Angular Service
      var aToken = localStorage.getItem('token');
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      const endpointMedia = 'user/media/item'; 

      //this should be
      this.httpClient.post(this.apiURL + endpointMedia, postData, { headers })
      .subscribe((res: ResponseObject) => {
        this.usersMediaID = res.data["0"];
        this.spinner.hide();

      });

    }

    setProfilePicture(fid: string) {
      var fid = fid;
      const formData = new FormData();
      formData.append('profilePic', fid);
      formData.append('id', this.userID);
      var aToken = localStorage.getItem('token');
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      const endpoint = 'user/update'; 

      this.httpClient.post(this.apiURL + endpoint, formData, { headers })
      .subscribe((res: ResponseObject) => {
        let message = 'You got it: 🤳 Avatar is SET!'
        this.openSnackBar(message);
        this.timer();
      });
    }

    //to do DRY
    setCoverPicture(fid: string) {
      const formData = new FormData();
      formData.append('coverboard', fid);
      formData.append('id', this.userID);
      var aToken = localStorage.getItem('token');
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      const endpoint = 'user/update'; 

      this.httpClient.post(this.apiURL + endpoint, formData, { headers })
      .subscribe((res: ResponseObject) => {
        let message = 'You got it: 🖼 Coverboard is SET!'
        this.openSnackBar(message);
      });
    }



    setTeamLogo(fid: string) {
      var fid = fid;
      const formData = new FormData();
      formData.append('team_Logo', fid);
      formData.append('id', this.teamID);
      var aToken = localStorage.getItem('token');
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      const endpoint = 'teams/update'; 

      this.httpClient.post(this.apiURL + endpoint, formData, { headers })
      .subscribe((res: ResponseObject) => {
        let message = 'You got it. Logo is SET!'
        this.openSnackBar(message);
        this.timer();

      });
    }



    setBusinessLogo(fid: string) {
      var fid = fid;
      const formData = new FormData();
      formData.append('logo', fid);
      formData.append('id', this.arcadeID);
      var aToken = localStorage.getItem('token');
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      const endpoint = 'arcade/update/arcade'; 

      this.httpClient.post(this.apiURL + endpoint, formData, { headers })
      .subscribe((res: ResponseObject) => {
        let message = 'You got it. Business Logo is SET!'
        this.openSnackBar(message);
        this.timer();
      });
    }

// to do dry
    setArcadeCoverboard(fid: string) {
      var fid = fid;
      const formData = new FormData();
      formData.append('bannerID', fid);
      formData.append('id', this.arcadeID);
      var aToken = localStorage.getItem('token');
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      const endpoint = 'arcade/update/arcade'; 

      this.httpClient.post(this.apiURL + endpoint, formData, { headers })
      .subscribe((res: ResponseObject) => {
        //messages should be in array for translations to do
        let message = 'You got it: 🖼 Artboard is SET!'
        this.openSnackBar(message);
        this.timer();
      });
    }


    deleteMedia(fid: string) {
      var fid = fid;
      const formData = new FormData();
      formData.append('id', fid);
      var aToken = localStorage.getItem('token');
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      const endpoint = 'user/profile/delete/media'; 
      this.httpClient.post(this.apiURL + endpoint, formData, { headers })
      .subscribe((res: ResponseObject) => {
        let message = 'ASTA LA VISTA FILE 🤖, FILE DELETED '
        this.openSnackBar(message);
        this.timer();
      });
    }

    timer() {
      setTimeout(function() { 
        this.router.navigate(['/settings']);
      }, 3000);
    }

    // response to send
    openSnackBar(message: string) {
      this._snackBar.open(message, '', {
        duration: 12000
      });

    }


  }

  //Team Create

  @Component({
    selector: '',
    templateUrl: './bottomsheets/dialogTeamCreate.html',
    styleUrls: ['./settings.component.scss']
  })
  export class dialogTeamCreate implements OnInit {
    constructor(private _snackBar: MatSnackBar,
      private httpClient: HttpClient, private router: Router, private spinner: NgxSpinnerService,
      public dialogRef: MatDialogRef<dialogTeamCreate>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
      this.usrDetails();
    }
    public apiURL: string = environment.apiUrl;

    public teamData: any;
    public userID: any;
    public userAuth: any;
    public arcadeID: any;
    public teamIDresponse: any;
    public usersMediaID: any;
    public teamDataID: any;
    public userData: any;

    usrDetails() {
      var AuthUser = localStorage.getItem('user');
      var uid = localStorage.getItem('uid');
      let postData = new FormData();
      postData.append('uid', uid);

      // TO DO User Angular Service
      var aToken = localStorage.getItem('token');
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      const endpoint = 'user/profile'; 

      //this should be
      this.httpClient.post(this.apiURL + endpoint, postData, { headers })
      .subscribe((res: ResponseObject) => {
        this.userData = res.data.result;
        this.userID = res.data.result["0"].id;
        this.arcadeID = res.data.arcade["0"].id;

      });
    }

    onNoClick(): void {
      this.dialogRef.close();
    }



    onTeamStore(nameUpdate: string,
      home_ArcadeUpdate: string,
      twitterUpdate: string,
      twitchUpdate: string,
      websiteUpdate: string,
      discordUpdate: string,
      instagramUpdate: string) {
      let postData = new FormData();
      let team_Name = nameUpdate;
      let home_Arcade = home_ArcadeUpdate;
      let twitter = twitterUpdate;
      let twitch = twitchUpdate;
      let website = websiteUpdate;
      let discord = discordUpdate;
      let instagram = instagramUpdate;
      var uid = localStorage.getItem('uid');
      var aToken = localStorage.getItem('token');
      postData.append('team_Manager', uid);
      postData.append('team_Name', team_Name);
      postData.append('home_Arcade', home_Arcade);
      postData.append('twitter', twitter);
      postData.append('twitch', twitch);
      postData.append('website', website);
      postData.append('discord', discord);
      postData.append('instagram', instagram);
      const endpoint = 'teams/store'; 

      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      this.httpClient.post(this.apiURL + endpoint, postData, { headers })
      .subscribe((res: ResponseObject) => {
        this.spinner.hide();
        let message = 'Team Profile created! Now go get some beautiful players!'
        this.openSnackBar(message);
        this.timer();
      });
    }


    timer() {
      setTimeout(function() { 
        this.router.navigate(['/settings']);


      }, 3000);
    }

    // response to send
    openSnackBar(message: string) {
      this._snackBar.open(message, '', {
        duration: 12000
      });

    }

  }



  // team Settings rebuild
  @Component({
    selector: '',
    templateUrl: './bottomsheets/dialogTeamCreate.html',
    styleUrls: ['./settings.component.scss']
  })
  export class dialogTeamSettings implements OnInit {

    teamID: string;

    constructor(private _snackBar: MatSnackBar,
      private httpClient: HttpClient, private router: Router, private spinner: NgxSpinnerService,
      public dialogRef: MatDialogRef<dialogMediaSettings>,
      @Inject(MAT_DIALOG_DATA) public data: any) {

      this.teamID = data.tid;

    }

    ngOnInit() {
      this.spinner.show();
      // this.mediaData();
      this.onTeamShow();
    }
    public apiURL: string = environment.apiUrl;

    public teamData: any;
    public userID: any;
    public userAuth: any;
    public arcadeID: any;
    public teamIDresponse: any;
    public usersMediaID: any;
    public teamDataID: any;
    public tData: any;


    onTeamShow() {
      let postData = new FormData();
      var tid = localStorage.getItem('uid');
      postData.append('id', this.teamID);
      // TO DO User Angular Service
      var aToken = localStorage.getItem('token');
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      const endpoint = 'teams/show'; 

      //this should be
      this.httpClient.post(this.apiURL + endpoint, postData, { headers })
      .subscribe((res: ResponseObject) => {
        this.teamData = res.data["0"];
        this.teamDataID = res.data["0"].id;
        this.spinner.hide();
      });

    }

    onTeamStore(nameUpdate:string,
      home_ArcadeUpdate:string,
      twitterUpdate:string,
      twitchUpdate:string,
      websiteUpdate:string,
      discordUpdate:string,
      instagramUpdate:string){
      this.spinner.show();
      let postData = new FormData();
      let id = this.teamDataID;
      let team_Name = nameUpdate;
      let home_Arcade = home_ArcadeUpdate;
      let twitter = twitterUpdate;
      let twitch = twitchUpdate;
      let website = websiteUpdate;
      let discord = discordUpdate;
      let instagram = instagramUpdate;
      var aToken = localStorage.getItem('token');
      var uid = localStorage.getItem('uid');

      postData.append('id',this.tData);
      postData.append('team_Name',team_Name);
      postData.append('home_Arcade',home_Arcade);
      postData.append('twitter',twitter);
      postData.append('twitch',twitch);
      postData.append('website',website);
      postData.append('discord',discord);
      postData.append('instagram',instagram);
      const endpoint = 'teams/update'; 

      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      this.httpClient.post(this.apiURL + endpoint,postData,{headers})
      .subscribe( (res: ResponseObject) => {
        this.spinner.hide();
        let message = 'Updated your Team Profile is looking good '
        this.openSnackBar( message);
        this.timer();
      });
    }


    timer() {
      setTimeout(function() { 
        this.router.navigate(['/settings']);
      }, 3000);
    }

    // response to send
    openSnackBar(message: string) {
      this._snackBar.open(message, '', {
        duration: 12000
      });

    }

    onNoClick(): void {
      this.dialogRef.close();
    }
  }

  // new social modal



//new arcade update

  @Component({
    templateUrl: './bottomsheets/arcadeInfo.html',
  })
  export class dialogArcadeInfo implements OnInit {
    fileData: File = null;
    previewUrl: any = null;
    fileUploadProgress: string = null;
    uploadedFilePath: string = null;

    uid: string;
    attendeeType: string;
    userType: string;

    constructor(private _snackBar: MatSnackBar,
      private httpClient: HttpClient,private router: Router, private spinner: NgxSpinnerService,
      public dialogRef: MatDialogRef<dialogAddMedia>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
      this.uid = data.id;
    }

   public apiURL: string = environment.apiUrl;

    Liceenses: Lincenses[] = [
    { value: 'PLVR', viewValue: 'PLVR' },
    { value: 'Springboard', viewValue: 'Springboard' },
    { value: 'Ctrl V', viewValue: 'Ctrl V' },
    { value: 'Synthesis', viewValue: 'Synthesis' },
    { value: 'Steam Cafe', viewValue: 'Steam Cafe' },
    { value: 'Viveport', viewValue: 'Viveport' },
    { value: 'Neurogaming', viewValue: 'Neurogaming' },
    { value: 'MK2', viewValue: 'MK2' },
    { value: 'direct deals', viewValue: 'direct deals' },
    { value: 'other', viewValue: 'Other' }
    ];


    ngOnInit() {
      this.userArcadePreEdit();
    }

    arcades: any;

    userArcadePreEdit() {
      var uid = localStorage.getItem('uid');

      let postData = new FormData();
      postData.append('uid', uid);
      // to do User Angular Service
      var aToken = localStorage.getItem('token');
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      const endpoint = 'user/arcades'; 

      //this should be
      this.httpClient.post(this.apiURL + endpoint, postData, { headers })
      .subscribe((res: ResponseObject) => {
        this.arcades = res.data["0"];
      });
    }


    updateArcade(
      name: string,
      email: string,
      phone: string,
      hours: string,
      Address1: string,
      Address2: string,
      city: string,
      state: string,
      Country: string,
      zipPost: string,
      desc: string,
      website: string,
      licensing: string,
      discord: string,
      twitter: string,
      twitch: string,
      youtube: string) {
      let postData = new FormData();
      postData.append('id', this.arcades.id);
      postData.append('arcadeName', name);
      postData.append('email', email);
      postData.append('phone', phone);
      postData.append('hours', hours);
      postData.append('address1', Address1);
      postData.append('address2', Address2);
      postData.append('state', state);
      postData.append('city', city);
      postData.append('country', Country);
      postData.append('zip_Postal', zipPost);
      postData.append('description', desc);
      postData.append('website', website);
      postData.append('licensing', licensing);
      postData.append('discord', discord);
      postData.append('twitter', twitter);
      postData.append('twitch', twitch);
      postData.append('youtubeChannel', youtube);

      // to do User Angular Service
      var aToken = localStorage.getItem('token');
      var message = "Updated your Arcade info go take 5 ! 🎮";
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      const endpoint = 'arcade/update/arcade'; 

      //this should be
      this.httpClient.post(this.apiURL + endpoint, postData, { headers })
      .subscribe((res: ResponseObject) => {
        this.openSnackBar(message);
        this.router.navigate(['/signin']);
      });
    }
   
    updateSocial(facebook:string, youtube: string, snapchat: string, twitter: string, twitch: string, telegram: string, discord: string, instagram: string) {
      var uid = localStorage.getItem('uid');
      let postData = new FormData();
      postData.append('id', uid);
      postData.append('facebook',facebook);
      postData.append('youtube', youtube);
      postData.append('snapchat', snapchat);
      postData.append('twitter', twitter);
      postData.append('twitch', twitch);
      postData.append('telegram', telegram);
      postData.append('discord', discord);
      postData.append('instagram', instagram);

      // to do User Angular Service
      var aToken = localStorage.getItem('token');
      let message = "Updated Social go take 5 ! 🎮";
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      //this should be
      const endpoint = 'user/update/social'; 

      this.httpClient.post(this.apiURL + endpoint, postData, { headers })
      .subscribe((res: ResponseObject) => {
        this.openSnackBar(message);
        location.reload();
      });
    }

    // response to send
    openSnackBar(message: string) {
      this._snackBar.open(message, '', {
        duration: 3000
      });
    }

}


  //to do could recycled to do more
  @Component({
    templateUrl: './bottomsheets/socialInfo.html',
  })
  export class dialogSocialSettings implements OnInit {
    fileData: File = null;
    previewUrl: any = null;
    fileUploadProgress: string = null;
    uploadedFilePath: string = null;

    uid: string;
    attendeeType: string;
    userType: string;

    constructor(private _snackBar: MatSnackBar,
      private httpClient: HttpClient,private router: Router, private spinner: NgxSpinnerService,
      public dialogRef: MatDialogRef<dialogAddMedia>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
      this.uid = data.id;
    }

    ngOnInit() {
      this.spinner.show();
      this.userSocialsPreEdit();

    }

    users: any;


    public apiURL: string = environment.apiUrl;


    onNoClick(): void {
      this.dialogRef.close();
    }
    userSocialsPreEdit() {
      var uid = localStorage.getItem('uid');

      let postData = new FormData();
      postData.append('id', uid);
      // to do User Angular Service
      var aToken = localStorage.getItem('token');
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      const endpoint = 'user/profile'; 

      //this should be
      this.httpClient.post(this.apiURL + endpoint, postData, { headers })
      .subscribe((res: ResponseObject) => {
        this.users = res.data.result["0"];
        this.spinner.hide();

      });
    }


    updateSocial(facebook:string, youtube: string, snapchat: string, twitter: string, twitch: string, telegram: string, discord: string, instagram: string) {
      var uid = localStorage.getItem('uid');
      let postData = new FormData();
      postData.append('id', uid);
      postData.append('facebook',facebook);
      postData.append('youtube', youtube);
      postData.append('snapchat', snapchat);
      postData.append('twitter', twitter);
      postData.append('twitch', twitch);
      postData.append('telegram', telegram);
      postData.append('discord', discord);
      postData.append('instagram', instagram);

      // to do User Angular Service
      var aToken = localStorage.getItem('token');
      let message = "Updated Social go take 5 ! 🎮";
      const headers = new HttpHeaders().set("Authorization", "Bearer " + aToken);
      //this should be
      const endpoint = 'user/update/social'; 

      this.httpClient.post(this.apiURL + endpoint, postData, { headers })
      .subscribe((res: ResponseObject) => {
        this.openSnackBar(message);
        location.reload();
      });
    }

    // response to send
    openSnackBar(message: string) {
      this._snackBar.open(message, '', {
        duration: 3000
      });
    }

  }


