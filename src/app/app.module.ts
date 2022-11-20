import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TrainTypeComponent } from './train-type/train-type.component';
import { TrainInfoComponent } from './train-info/train-info.component';
import { HomeComponent } from './home/home.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { transformTrainNumberToTrainType } from './shared/transformtraintype.pipe';
import { CompositionNumberModule } from './composition-number/composition-number.module';

@NgModule({
  declarations: [
    AppComponent,
    TrainTypeComponent,
    TrainInfoComponent,
    HomeComponent,
    SideBarComponent,
    transformTrainNumberToTrainType,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule,
    CompositionNumberModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
