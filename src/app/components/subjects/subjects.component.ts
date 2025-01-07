import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from './models/subject.model';
import { SubjectService } from './services/subject.service';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-subjects',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
  
})
export class SubjectsComponent {
  subjects: Subject[] = [];
  subject: Subject  = { subjectId: 0, description: '' };
  isEditing: boolean = false; // Para controlar se estamos no modo de edição ou inserção
  isModalOpen = false; // Controla a exibição do modal
  isDeleteModalOpen = false;
  subjectIdToDelete:number = 0;
  constructor(private assuntoService: SubjectService, private appComponent: AppComponent) {}

  ngOnInit(): void {
   this.getSubjects();
  }
  openDeleteModal(id: number): void {
    this.subjectIdToDelete = id;
    this.isDeleteModalOpen = true;
  }

  // Fechar o modal
  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.subjectIdToDelete = 0;
  }
  openModal(): void {
    this.isModalOpen = true; // Abre o modal
  }

  closeModal(): void {
    this.isModalOpen = false; // Fecha o modal
  }
  addSubject(): void {
    this.subject  = { subjectId: 0, description: '' };
    this.openModal();
    
  }
  // Função para buscar todos os assuntos
  getSubjects(): void {
    this.assuntoService.getSubjects().subscribe((response) => {
      if (response.isSuccess) {
        
        if (Array.isArray(response.data)) {
          // Caso data seja um array
          this.subjects = response.data;
          
        } 
      } else {
        this.appComponent.showAlert(response.message,'danger');
        console.error('Erro ao buscar assuntos: ', response.message);
      }
    });
  }

  // Função para adicionar um novo assunto
  saveSubject(): void {

    if (this.subject.subjectId && this.subject.subjectId > 0) {
      
      // Atualizar assunto existente
      this.assuntoService.updateSubject(this.subject.subjectId, this.subject).subscribe((response) => {
        if (response.isSuccess) {
          this.getSubjects(); // Atualiza a lista
          this.closeModal();
          this.appComponent.showAlert('Assunto salvo com sucesso!','success');

        } else {
          this.appComponent.showAlert(response.message,'danger');
          console.error('Erro ao buscar assuntos: ', response.message);
        }
       
      });
    } else {
      // Adicionar novo assunto
      this.assuntoService.addSubject(this.subject).subscribe((response) => {
        if (response.isSuccess) {
          this.getSubjects(); // Atualiza a lista
          this.closeModal();
          this.appComponent.showAlert('Assunto salvo com sucesso!','success');

        } else {
          this.appComponent.showAlert(response.message,'danger');
          console.error('Erro ao buscar registros: ', response.message);
        }
      });
    }
  }
 
  // Função para editar um assunto
  editSubject(id: number): void {

    this.assuntoService.getSubject(id).subscribe((response ) => {
      if (response.isSuccess) {
        if (!Array.isArray(response.data)) {
          // Caso data seja um array
          this.subject = response.data;
        } 
        this.isModalOpen = true;// Preenche os campos para edição
        debugger
      } else {
        console.error('Erro ao buscar registro: ', response.message);
      }
    });
  }

  // Função para excluir um assunto
  deleteSubject(): void {
    if(this.subjectIdToDelete > 0){
      this.assuntoService.deleteSubject(this.subjectIdToDelete).subscribe((response) => {
        if (response.isSuccess) {
          this.appComponent.showAlert('Assunto deletado com sucesso!','success');
  
          this.getSubjects(); // Atualiza a lista após exclusão
          this.closeDeleteModal()
        }else {
          this.appComponent.showAlert("Erro ao deletar registro",'danger');
          console.error('Erro ao deletar registro: ', response.message);
        }
      });
    }
   
  }


}