import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Routing } from './shared/constants/common.constant';
import { BaseGuard } from './shared/guard/base.guard';
import { BaseResolver } from './shared/resolver/base.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: Routing.REGISTER,
    pathMatch: 'full',
    resolve: {
      Resolver: BaseResolver
    }
  },
  {
    path: Routing.ACCESS_DENIED,
    loadChildren: () => import('./shared/components/access-denied/access-denied.module').then(m => m.AccessDeniedModule),
    resolve: {
      Resolver: BaseResolver
    }
  },
  {
    path: Routing.REGISTER,
    loadChildren: () => import('./auth/components/register/register.module').then(m => m.RegisterModule),
    resolve: {
      Resolver: BaseResolver
    }
  },
  {
    path: Routing.LOGIN,
    loadChildren: () => import('./auth/components/login/login.module').then(m => m.LoginModule),
    resolve: {
      Resolver: BaseResolver
    }
  },
  {
    path: `${Routing.VERIFY_REGISTER}/:mailEncode`,
    loadChildren: () => import('./auth/components/register-verify/register-verify.module').then(m => m.RegisterVerifyModule),
    resolve: {
      Resolver: BaseResolver
    }
  },
  {
    path: Routing.VERIFY_LOGIN,
    loadChildren: () => import('./auth/components/login-verify/login-verify.module').then(m => m.LoginVerifyModule),
    resolve: {
      Resolver: BaseResolver
    }
  },
  {
    path: Routing.DASHBOARD,
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [BaseGuard],
    resolve: {
      Resolver: BaseResolver
    }
  },
  {
    path: Routing.NOT_FOUND,
    loadChildren: () => import('./shared/components/not-found/swe-team-not-found.module').then(m => m.SWETeamNotFoundModule),
    resolve: {
      Resolver: BaseResolver
    }
  },
  {
    path: "**",
    redirectTo: `/${Routing.NOT_FOUND}`,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
