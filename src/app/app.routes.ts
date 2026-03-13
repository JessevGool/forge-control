import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '', component: DashboardComponent
    }
];
