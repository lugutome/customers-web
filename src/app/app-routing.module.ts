import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CustomerComponent } from './modules/customer/customer.component';
import { IndicatorsComponent } from './modules/indicators/indicators.component';
import { MainComponent } from './modules/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
        { path: '', component: MainComponent, pathMatch: 'full' },
        { path: 'customers', component: CustomerComponent, pathMatch: 'full' },
        { path: 'indicators', component: IndicatorsComponent, pathMatch: 'full' },
    ]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
