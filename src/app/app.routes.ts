import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PrinterComponent } from './pages/printer/printer.component';

export const routes: Routes = [
    {
        path: '', component: DashboardComponent
    },
    {
        path: 'dashboard', component: DashboardComponent
    },
    {
        path: 'printer/:id', component: PrinterComponent
    }
];
