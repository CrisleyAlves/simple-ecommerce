import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { NgxViacepModule } from '@brunoc/ngx-viacep';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from 'src/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { DangerModalComponent } from './shared/danger-modal/danger-modal.component';
import { NotificationComponent } from './shared/notification/notification.component';
import { ProductService } from 'src/services/products.service';
import { OrderService } from 'src/services/orders.service';
import { CategoryService } from 'src/services/category.service';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DangerModalComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    NgxViacepModule
  ],
  providers: [
    UserService,
    ProductService,
    OrderService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
