import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { AboutComponent } from './page/about/about.component';
import { LoginComponent } from './page/login/login.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { NewsManagementComponent } from './admin/news-management/news-management.component';
import { AdminAuthGuard } from './admin/admin-auth/admin-auth.guard';
import { ResultComponent } from './result/result.component';
import { ProductsComponent } from './page/products/products.component';
import { ContactUsComponent } from './page/contact-us/contact-us.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'onboarding', component: OnboardingComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/news', component: NewsManagementComponent, canActivate: [AdminAuthGuard] },
  { path: 'result', component: ResultComponent }, 
  { path: 'products', component: ProductsComponent},
  { path: 'contact', component: ContactUsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
