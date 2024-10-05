import { ModuleWithProviders, NgModule } from '@angular/core';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { RouterModule } from '@angular/router';
import { MiantContainerModule } from './maint-container/maint-container.module';

@NgModule({
  imports: [MaintenanceRoutingModule,
    RouterModule,
    MiantContainerModule
  ]
})
export class MaintenanceModule {
    public static forRoot(): ModuleWithProviders<MaintenanceModule> {
      return {
        ngModule: MaintenanceModule,
        providers: [
        ]
      };
    }
  
    public static forChild(): ModuleWithProviders<MaintenanceModule> {
      return {
        ngModule: MaintenanceModule,
        providers: [
        ]
      };
    }
}
