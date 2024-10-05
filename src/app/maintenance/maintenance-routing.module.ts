import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'user-account', loadChildren: () => import('../frame-page/app-user-account-info/user-account-info.module').then((m) => m.UserAccountInfoModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports : [RouterModule]
})
export class MaintenanceRoutingModule {
    public static forRoot(): ModuleWithProviders<MaintenanceRoutingModule> {
      return {
        ngModule: MaintenanceRoutingModule,
        providers: [
        ]
      };
    }
  
    public static forChild(): ModuleWithProviders<MaintenanceRoutingModule> {
      return {
        ngModule: MaintenanceRoutingModule,
        providers: [
        ]
      };
    }
}
