import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AssureComponent } from './assure/assure.component';
import { ContratComponent } from './contrat/contrat.component';
import { ShowContratComponent } from './show-contrat/show-contrat.component';


const routes: Routes = [
    {
        // path:'assure',
        path:'assure',
        component:AssureComponent,
        data:{
            title:'assure'
        }
    },
    {
        path:'contrat/:id',
        component:ContratComponent,
        data:{
            title:'contrat'
        }
    },
    {
        // path:'assure',
        path:'contrats',
        component:ShowContratComponent,
        data:{
            title:'List of Contracts'
        }
    },
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AssureRoutingModule {}



