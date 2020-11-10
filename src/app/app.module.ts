import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { StudentComponent } from './student/student.component';
import { StudentDetailComponent } from './student/student-detail.component';
import { StudentUpdateComponent } from './student/student-update.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthExpiredInterceptor } from './interceptors/auth-expired.inteceptor';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { MainComponent } from './main/main.component';
import { ReactiveFormsModule  } from '@angular/forms';

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http); //(http, 'app/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    StudentDetailComponent, 
    StudentUpdateComponent,
    LoginComponent,
    PageNotFoundComponent, 
    ForbiddenPageComponent,
    NavbarComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({ 
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory, //useFactory: (http: Http) => new TranslateStaticLoader(http, 'app/common/i18n', '.json'),
        deps: [HttpClient]
      },
      defaultLanguage: 'hr'
     })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
