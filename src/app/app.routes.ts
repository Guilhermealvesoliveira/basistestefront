import { Routes } from '@angular/router';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { BooksComponent } from './components/books/books.component';
import { SaleTypeBookPricesComponent } from './components/sale-typebookprice/sale-typebookprice.component';
import { SaleTypesComponent } from './components/saletype/saletype.component';

export const routes: Routes = [
    { path: '', component: BooksComponent }, 
    { path: 'Autores', component: AuthorsComponent }, 
    { path: 'Assuntos', component: SubjectsComponent }, 
    { path: 'TiposVenda', component: SaleTypesComponent }, 
    { path: 'Valores/:id', component: SaleTypeBookPricesComponent }, 
];
