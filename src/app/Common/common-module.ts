import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Header } from './header/header';
import { Footer } from './footer/footer';

@NgModule({
  imports: [CommonModule, RouterModule, Header, Footer],
  exports: [Header, Footer],
})
export class CustomCommonModule {}
