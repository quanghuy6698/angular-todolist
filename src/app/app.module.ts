import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ErrorPage } from './pages/error/error.page';
import { AppRoot } from './app';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppRoot, ErrorPage],
  imports: [BrowserModule, AppRoutingModule, RouterModule],
  providers: [],
  bootstrap: [AppRoot],
})
export class AppModule {}
