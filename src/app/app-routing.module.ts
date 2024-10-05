import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiantContainerComponent } from './maintenance/maint-container/maint-container.component';

const routes: Routes = [
  { path: '',
    component : MiantContainerComponent,
    children : [
      {
        path : 'maintenance',
        loadChildren: () => import('./maintenance/maintenance.module').then((m) => m.MaintenanceModule)
      },
      { path: 'dashboard', loadChildren: () => import('./frame-page/dashboard/dashboard.module').then((m) => m.DashboardModule) },
      { path: 'basic-info', loadChildren: () => import('./frame-page/basic-info/basic-info.module').then((m) => m.BasicInfoModule) },
      { path: 'frame-config', loadChildren: () => import('./frame-page/app-frm-config/app-frm-config.module').then((m) => m.FrameConfigModule) },
      { path: 'settings', loadChildren: () => import('./frame-page/settings/settings.module').then((m) => m.SettingsModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    RouterModule
  ]
})
export class AppRoutingModule { }
