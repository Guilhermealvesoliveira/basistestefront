import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { AppComponent } from '../../app.component';
import { AuthorService } from './services/author.service';
import { Author } from './models/author.model';

@Component({
  selector: 'app-Authors',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './Authors.component.html',
  styleUrl: './Authors.component.css'
  
})
export class AuthorsComponent {
  Authors: Author[] = [];
  Author: Author  = { authorId: 0, name: '' };
  isEditing: boolean = false; // Para controlar se estamos no modo de edição ou inserção
  isModalOpen = false; // Controla a exibição do modal
  isDeleteModalOpen = false;
  AuthorIdToDelete:number = 0;
  constructor(private assuntoService: AuthorService, private appComponent: AppComponent) {}

  ngOnInit(): void {
   this.getAuthors();
  }
  openDeleteModal(id: number): void {
    this.AuthorIdToDelete = id;
    this.isDeleteModalOpen = true;
  }

  // Fechar o modal
  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.AuthorIdToDelete = 0;
  }
  openModal(): void {
    this.isModalOpen = true; // Abre o modal
  }

  closeModal(): void {
    this.isModalOpen = false; // Fecha o modal
  }
  addAuthor(): void {
    this.Author  = { authorId: 0, name: '' };
    this.openModal();
    
  }
  // Função para buscar todos os assuntos
  getAuthors(): void {
    this.assuntoService.getAuthors().subscribe((response) => {
      if (response.isSuccess) {
        
        if (Array.isArray(response.data)) {
          // Caso data seja um array
          this.Authors = response.data;
          
        } 
      } else {
        this.appComponent.showAlert(response.message,'danger');
        console.error('Erro ao buscar assuntos: ', response.message);
      }
    });
  }

  // Função para adicionar um novo assunto
  saveAuthor(): void {

    if (this.Author.authorId && this.Author.authorId > 0) {
      
      // Atualizar assunto existente
      this.assuntoService.updateAuthor(this.Author.authorId, this.Author).subscribe((response) => {
        if (response.isSuccess) {
          this.getAuthors(); // Atualiza a lista
          this.closeModal();
          this.appComponent.showAlert('Assunto salvo com sucesso!','success');

        } else {
         
          this.appComponent.showAlert(response.message,'danger');
          console.error('Erro ao buscar assuntos: ', response.message);
        }
       
      });
    } else {
      // Adicionar novo assunto
      this.assuntoService.addAuthor(this.Author).subscribe((response) => {
        if (response.isSuccess) {
          this.getAuthors(); // Atualiza a lista
          this.closeModal();
          this.appComponent.showAlert('Assunto salvo com sucesso!','success');

        } else {
          alert("sadsd")
          this.appComponent.showAlert(response.message,'danger');
          console.error('Erro ao buscar registros: ', response.message);
        }
      });
    }
  }
 
  // Função para editar um assunto
  editAuthor(id: number): void {

    this.assuntoService.getAuthor(id).subscribe((response ) => {
      if (response.isSuccess) {
        if (!Array.isArray(response.data)) {
          // Caso data seja um array
          this.Author = response.data;
        } 
        this.isModalOpen = true;// Preenche os campos para edição
        debugger
      } else {
        console.error('Erro ao buscar registro: ', response.message);
      }
    });
  }

  // Função para excluir um assunto
  deleteAuthor(): void {
    if(this.AuthorIdToDelete > 0){
      this.assuntoService.deleteAuthor(this.AuthorIdToDelete).subscribe((response) => {
        if (response.isSuccess) {
          this.appComponent.showAlert('Assunto deletado com sucesso!','success');
  
          this.getAuthors(); // Atualiza a lista após exclusão
          this.closeDeleteModal()
        }else {
          this.appComponent.showAlert("Erro ao deletar registro",'danger');
          console.error('Erro ao deletar registro: ', response.message);
        }
      });
    }
   
  }


}