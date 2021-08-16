import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScrollDirective } from './directives/scroll.directive';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ScrollDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  exports: [
      HeaderComponent,
      ScrollDirective
  ],
})
export class CoreModule { }
