import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./frame-page/dashboard/dashboard.module').then((m) => m.DashboardModule) },
  { path: 'basic-info', loadChildren: () => import('./frame-page/basic-info/basic-info.module').then((m) => m.BasicInfoModule) },
  { path: 'frame-config', loadChildren: () => import('./frame-page/app-frm-config/app-frm-config.module').then((m) => m.FrameConfigModule) },
  { path: 'settings', loadChildren: () => import('./frame-page/settings/settings.module').then((m) => m.SettingsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
