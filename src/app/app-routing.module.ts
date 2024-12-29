import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)},
  {path: 'order', loadChildren: () => import('./order/order.module').then(m => m.OrderModule)},
  {path: 'products', loadChildren: () => import('./product/product.module').then(m => m.ProductModule)},
  {path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
