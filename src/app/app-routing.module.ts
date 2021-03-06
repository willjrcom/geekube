import { StatisticComponent } from './views/statistic/statistic.component';
import { HistoryComponent } from './views/history/history.component';
import { EditUserComponent } from './views/edit-user/edit-user.component';
import { ProductComponent } from './views/product/product.component';
import { RegisterUserComponent } from './views/register-user/register-user.component';
import { ViewCenterComponent } from './components/view-center/view-center.component';
import { CartComponent } from './views/cart/cart.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './views/index/index.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    pathMatch: 'full'
  },
  {
    path: 'center',
    component: ViewCenterComponent,
    children : [{
      path: '', 
      component: LoginComponent,
      pathMatch: 'full'
    },
    {
      path: 'register', 
      component: RegisterUserComponent
    },
    {
      path: 'edit',
      component: EditUserComponent
    }
  ]
  },
{
  path: 'product',
  component: ProductComponent
},
{
  path: 'cart',
  component: CartComponent
},
{
  path: 'history',
  component: HistoryComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
