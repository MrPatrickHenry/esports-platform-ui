import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ActivationComponent } from './auth/activation/activation.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { SettingsComponent,dialogTeamSettings,dialogTeamCreate,dialogEditUser,dialogSocialSettings,dialogAddMedia,dialogArcadeInfo,dialogMediaSettings } from './user/settings/settings.component';

// views 

import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { PlayerComponent } from './profile/player/player.component';
import { ArcadesComponent } from './profile/arcades/arcades.component';
import { DevelopersComponent } from './profile/developers/developers.component';
import { ContactComponent } from './contact/contact.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { DirectoryComponent } from './directory/directory.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { TeamComponent } from './team/team.component';
import { RecruitmentComponent } from './team/recruitment/recruitment.component';

import { AdminTournamentsComponent,dialogCreateTournamentsType,dialogEditTournament,dialogTournamentHosts,dialogCreateTournament } from './admin/tournaments/tournaments.component';
import { UsersComponent ,dialogEdit} from './admin/users/users.component';
import { ScoreManagementComponent,scoreDetails } from './admin/score-management/score-management.component';
import { AdminArcadesComponent ,dialogEditArcade,dialogCreateArcade} from './admin/arcades/arcades.component';
import { PageComponent,ScoreSubmissionComponent} from './tournaments/page/page.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TodoComponent,dialogCreateTask } from './arcade/todo/todo.component';
import { ListComponent } from './arcade/todo/list/list.component';
import { VideoComponent } from './library/video/video.component';
import { ArcaadeDashboardComponent } from './arcade/dashboard/dashboard.component';
import { BracketComponent } from './bracket/bracket.component';
import { TitlesComponent } from './profile/titles/titles.component';
import { TitleComponent } from './profile/titles/title/title.component';

import { NotificationsComponent } from './user/notifications/notifications.component';
import { SearchComponent } from './search/search.component';
import { TrophiesComponent } from './user/trophies/trophies.component';
import { RedirectComponent } from './redirect/redirect.component';
import { AdminTitlesComponent  } from './admin/titles/titles.component';
import { UpdatesComponent } from './admin/updates/updates.component';

const routes: Routes = [
{ path: '', pathMatch:  'full', redirectTo:  'about' },

//bad Patrick 
{ path: 'processing', component: RedirectComponent},

//Auth
  { path: 'signin', component: SignInComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'activation', component: ActivationComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'password/reset/:token', component:PasswordResetComponent},


//Titles

//Tournaments
  { path: 'tournaments', component:TournamentsComponent },
  { path: 'leaderboard', component:LeaderboardComponent },
  { path: 'tournament/:shorttag', component: PageComponent},
  { path: 'bracket', component: BracketComponent },
//Profiles
  { path: 'player/profile/:gamertag', component: PlayerComponent },
  { path: 'arcade/profile/:arcadeName', component: ArcadesComponent },
  { path: 'title/:titleName', component: TitleComponent },
    { path: 'titles', component: TitlesComponent },

//User
  { path: 'settings', component: SettingsComponent },
  { path: 'search/:searchTerm', component:SearchComponent},
  { path: 'notifications', component: NotificationsComponent },
  { path: 'arcade/profile', component: ArcadesComponent },
  { path: 'developer/profile', component: DevelopersComponent },
  { path: 'trophies', component: TrophiesComponent },
//Arcades
  { path: 'directory', component: DirectoryComponent },
  { path: 'todo/:shorttag', component: TodoComponent}, 
  { path: 'arcade/list', component: ListComponent}, 
  { path: 'arcade/dashboard', component: ArcaadeDashboardComponent}, 
//developer

//library
  { path: 'content-locker/video', component: VideoComponent}, 


//admin
{ path: 'admin', component:DashboardComponent },
{ path: 'admin/users', component: UsersComponent },
{ path: 'admin/arcades', component: AdminArcadesComponent },
{ path: 'admin/tournaments', component: AdminTournamentsComponent },
{ path: 'admin/scores',component:ScoreManagementComponent },
{ path: 'admin/titles', component:AdminTitlesComponent},
//team and roster
{ path: 'team/:status', component: TeamComponent },
{ path: 'open/team', component: RecruitmentComponent },
//locator


//general
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'home', component: HomeComponent },
  { path: 'release-notes', component: UpdatesComponent },
//errors and redirects  
 { path: '**',
  redirectTo: 'error' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
