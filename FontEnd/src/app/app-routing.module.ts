import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { ProductListComponent } from './pages/admin/product-list/product-list.component';
import { ProductAddComponent } from './pages/admin/product-add/product-add.component';
import { ProductEditComponent } from './pages/admin/product-edit/product-edit.component';
import { WebsiteLayoutComponent } from './layout/website-layout/website-layout.component';
import { HomePageComponent } from './pages/client/home-page/home-page.component';
import { ProductComponent } from './pages/client/product/product.component';
import { CategoryListComponent } from './pages/admin/category-list/category-list.component';
import { CategoryAddComponent } from './pages/admin/category-add/category-add.component';
import { CategoryEditComponent } from './pages/admin/category-edit/category-edit.component';
import { CategoriesComponent } from './pages/client/categories/categories.component';
import { SigninComponent } from './pages/client/signin/signin.component';
import { RegisterComponent } from './pages/client/register/register.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'product', pathMatch: 'full' },
      { path: 'product', component: ProductListComponent },
      { path: 'product/add', component: ProductAddComponent },
      { path: 'product/:id/edit', component: ProductEditComponent },
      { path: 'category', component: CategoryListComponent },
      { path: 'category/add', component: CategoryAddComponent },
      { path: 'category/:id/edit', component: CategoryEditComponent },
    ],
  },
  {
    path: '',
    component: WebsiteLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'category/:id', component: CategoriesComponent },
      { path: 'category', component: CategoriesComponent },
      { path: 'product/:id', component: ProductComponent },
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: RegisterComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
