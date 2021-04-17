import { BrowserModule } from '@angular/platform-browser';

/* Routing */
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/* FormsModule */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Angular Flex Layout */
import { FlexLayoutModule } from '@angular/flex-layout';

/* Components */
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ShortUrlComponent } from './components/short-url/short-url.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { VerifiedComponent } from './components/verified/verified.component';
import { FooterComponent } from './components/footer/footer.component';
import { DisplayShortUrlComponent } from './components/modal/display-short-url.component';
import { AlertComponent } from './components/modal/alert.component';
import { CreateCollectionPopupComponent } from './components/modal/create-collection-popup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CreateCollectionComponent } from './components/create-collection/create-collection.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { ListCollectionComponent } from './components/list-collection/list-collection.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { ViewCollectionsComponent } from './components/view-collections/view-collections.component';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    RegisterComponent,
    LogInComponent,
    ShortUrlComponent,
    DisplayShortUrlComponent,
    AlertComponent,
    VerifiedComponent,
    FooterComponent,
    ProfileComponent,
    CreateCollectionPopupComponent,
    CreateCollectionComponent,
    CollectionsComponent,
    ListCollectionComponent,
    PrivacyPolicyComponent,
    ViewCollectionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    NgxSpinnerModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [NgxSpinnerModule, NgxSpinnerService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    DisplayShortUrlComponent, AlertComponent, CreateCollectionPopupComponent
  ]
})

export class AppModule { }
