import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatToolbarModule,
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
} from  '@angular/material';
import {NgTournamentTreeModule} from 'ng-tournament-tree';
import { filter, scan } from 'rxjs/operators';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { AdminArcadesComponent,dialogEditArcade,dialogCreateArcade } from './admin/arcades/arcades.component';

import { FooterComponent } from './footer/footer.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ActivationComponent } from './auth/activation/activation.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminTournamentsComponent,dialogCreateTournament,dialogCreateTournamentsType,dialogEditTournament,dialogTournamentHosts } from './admin/tournaments/tournaments.component';
import { UsersComponent,dialogEdit } from './admin/users/users.component';
import { ScoreManagementComponent ,scoreDetails} from './admin/score-management/score-management.component';
import { SettingsComponent,dialogTeamSettings,dialogTeamCreate,dialogMediaSettings,dialogEditUser,dialogSocialSettings,dialogAddMedia,dialogArcadeInfo } from './user/settings/settings.component';
import { TeamComponent } from './team/team.component';
import { RecruitmentComponent } from './team/recruitment/recruitment.component';
import { ErrorComponent } from './error/error.component';
import { BracketComponent } from './bracket/bracket.component';
import { TodoComponent,dialogCreateTask } from './arcade/todo/todo.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ArcadesComponent } from './profile/arcades/arcades.component';
import { PlayerComponent } from './profile/player/player.component';
import { TeamsComponent } from './profile/teams/teams.component';
import { TitlesComponent } from './profile/titles/titles.component';
import { DevelopersComponent } from './profile/developers/developers.component';
import { ContactComponent } from './contact/contact.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { DirectoryComponent } from './directory/directory.component';
import { PageComponent,ScoreSubmissionComponent } from './tournaments/page/page.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FeedbackComponent,dialogFeedback} from './feedback/feedback.component';
import { ListComponent } from './arcade/todo/list/list.component';
import { VideoComponent } from './library/video/video.component';
import { ArcaadeDashboardComponent } from './arcade/dashboard/dashboard.component';
import {NgttDoubleEliminationTreeModule} from '../../projects/ng-tournament-tree/src/lib/double-elimination-tree/ngtt-double-elimination-tree.module';
import {NgttSingleEliminationTreeModule} from '../../projects/ng-tournament-tree/src/lib/single-elimination-tree/ngtt-single-elimination-tree.module';
import { NotificationsComponent } from './user/notifications/notifications.component';
import { AboutUsComponent } from './marketing/about-us/about-us.component';
import { PartnersComponent } from './marketing/partners/partners.component';
import { DiscordComponent, discordDialog } from './discord/discord.component';
import { SearchComponent } from './search/search.component';
import { SignupModalComponent } from './marketing/signup-modal/signup-modal.component';
import { CountdownModule } from 'ngx-countdown';
import { TrophiesComponent } from './user/trophies/trophies.component';
import { RedirectComponent } from './redirect/redirect.component';
import { TitleComponent } from './profile/titles/title/title.component';
import { AdminTitlesComponent } from './admin/titles/titles.component';
 import { EditorModule } from '@tinymce/tinymce-angular';
import { UpdatesComponent } from './admin/updates/updates.component';

@NgModule({
  declarations: [
  AppComponent,
  HomeComponent,
  AboutComponent,
  FooterComponent,
  SignInComponent,
  SignUpComponent,
FeedbackComponent,
  ForgotPasswordComponent,
  ActivationComponent,
  PasswordResetComponent,
  LogoutComponent,
  DashboardComponent,
  AdminTournamentsComponent,
  dialogCreateTournamentsType,
  dialogCreateTournament,
  dialogCreateTask,
  dialogEdit,
  scoreDetails,
  dialogCreateArcade, 
  dialogEditTournament,
  dialogTournamentHosts,
  AdminArcadesComponent,
  TournamentsComponent,
  UsersComponent,
  ScoreManagementComponent,
  SettingsComponent,
  TeamComponent,
  RecruitmentComponent,
  ScoreSubmissionComponent,
  ErrorComponent,
  PageComponent,
  BracketComponent,
  TodoComponent,
  LeaderboardComponent,
  ArcadesComponent,
  PlayerComponent,
  TeamsComponent,
  TitlesComponent,
  DevelopersComponent,
  ContactComponent,
  ListComponent,
  ArcaadeDashboardComponent,
  dialogTeamSettings,dialogFeedback,
  dialogEditArcade,dialogTeamCreate,
  dialogMediaSettings,dialogEditUser,
  dialogSocialSettings,dialogAddMedia,
  dialogArcadeInfo, 
  DirectoryComponent, PageComponent,
  NavigationComponent, ListComponent, 
  VideoComponent, NotificationsComponent,
   AboutUsComponent, PartnersComponent, 
   DiscordComponent,discordDialog, SearchComponent,
    SignupModalComponent,
    TrophiesComponent,
    RedirectComponent,
    TitleComponent,
    AdminTitlesComponent,
    UpdatesComponent,
  ],
  imports: [
  BrowserModule,
  EditorModule,
   NgttSingleEliminationTreeModule,
    NgttDoubleEliminationTreeModule,
  FormsModule,
  CountdownModule,
  ReactiveFormsModule,
  DeviceDetectorModule.forRoot(),
  AppRoutingModule,
  HttpClientModule,
  BrowserAnimationsModule,
  FlexLayoutModule,
  NgxSpinnerModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule,
  MatAutocompleteModule,
  MatAutocompleteModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  ],
  entryComponents: 
  [
  dialogMediaSettings,
  dialogTeamSettings,
  dialogCreateTask,
  dialogTeamCreate,
  dialogEditArcade,
  ScoreSubmissionComponent,
  PlayerComponent,
  dialogEditUser,
  dialogSocialSettings,
  dialogArcadeInfo,
  dialogCreateTournament,
  dialogAddMedia,
  dialogCreateArcade,
  dialogCreateTournamentsType,
  dialogEditTournament,
  dialogTournamentHosts,
  dialogCreateArcade,
  dialogEdit,
  dialogFeedback,
  discordDialog,  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
