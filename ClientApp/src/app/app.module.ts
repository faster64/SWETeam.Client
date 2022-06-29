import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SnackbarModule } from './shared/components/snackbar/snackbar.module';
import './shared/extension-methods/array-extension';
import './shared/extension-methods/string-extension';
import { RequestHandlingInterceptor } from './shared/interceptors/request.interceptor';
import { SharedModule } from './shared/shared.module';
import { MessageBoxModule } from './shared/components/message-box/message-box.module';
import { AccessDeniedComponent } from './shared/components/access-denied/access-denied.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'vi',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    SnackbarModule,
    MessageBoxModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestHandlingInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
