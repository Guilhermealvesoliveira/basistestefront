import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SaleType } from './models/saletype.model';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../../app.component';
import { SaleTypeService } from './services/saletype.service';

@Component({
  selector: 'app-saleTypes',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './saletype.component.html',
  styleUrl: './saletype.component.css'
  
})
export class SaleTypesComponent {
  saleTypes: SaleType[] = [];
  saleType: SaleType  = { saleTypeId: 0, description: '' };
  isEditing: boolean = false; // Para controlar se estamos no modo de edição ou inserção
  isModalOpen = false; // Controla a exibição do modal
  isDeleteModalOpen = false;
  saleTypeIdToDelete:number = 0;
  constructor(private saleTypeService: SaleTypeService, private appComponent: AppComponent) {}

  ngOnInit(): void {
   this.getSaleTypes();
  }
  openDeleteModal(id: number): void {
    this.saleTypeIdToDelete = id;
    this.isDeleteModalOpen = true;
  }

  // Fechar o modal
  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.saleTypeIdToDelete = 0;
  }
  openModal(): void {
    this.isModalOpen = true; // Abre o modal
  }

  closeModal(): void {
    this.isModalOpen = false; // Fecha o modal
  }
  addSaleType(): void {
    this.saleType  = { saleTypeId: 0, description: '' };
    this.openModal();
    
  }
  // Função para buscar todos os assuntos
  getSaleTypes(): void {
    this.saleTypeService.getSaleTypes().subscribe((response) => {
      if (response.isSuccess) {
        
        if (Array.isArray(response.data)) {
          // Caso data seja um array
          this.saleTypes = response.data;
          
        } 
      } else {
        this.appComponent.showAlert(response.message,'danger');
        console.error('Erro ao buscar assuntos: ', response.message);
      }
    });
  }

  // Função para adicionar um novo assunto
  saveSaleType(): void {

    if (this.saleType.saleTypeId && this.saleType.saleTypeId > 0) {
      
      // Atualizar assunto existente
      this.saleTypeService.updateSaleType(this.saleType.saleTypeId, this.saleType).subscribe((response) => {
        if (response.isSuccess) {
          this.getSaleTypes(); // Atualiza a lista
          this.closeModal();
          this.appComponent.showAlert('Tipo de venda salvo com sucesso!','success');

        } else {
          this.appComponent.showAlert(response.message,'danger');
          console.error('Erro ao buscar assuntos: ', response.message);
        }
       
      });
    } else {
      // Adicionar novo assunto
      this.saleTypeService.addSaleType(this.saleType).subscribe((response) => {
        if (response.isSuccess) {
          this.getSaleTypes(); // Atualiza a lista
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
  editSaleType(id: number): void {

    this.saleTypeService.getSaleType(id).subscribe((response ) => {
      if (response.isSuccess) {
        if (!Array.isArray(response.data)) {
          // Caso data seja um array
          this.saleType = response.data;
        } 
        this.isModalOpen = true;// Preenche os campos para edição
        debugger
      } else {
        console.error('Erro ao buscar registro: ', response.message);
      }
    });
  }

  // Função para excluir um assunto
  deleteSaleType(): void {
    if(this.saleTypeIdToDelete > 0){
      this.saleTypeService.deleteSaleType(this.saleTypeIdToDelete).subscribe((response) => {
        if (response.isSuccess) {
          this.appComponent.showAlert('Tipo de venda deletado com sucesso!','success');
  
          this.getSaleTypes(); // Atualiza a lista após exclusão
          this.closeDeleteModal()
        }else {
          this.appComponent.showAlert("Erro ao deletar registro",'danger');
          console.error('Erro ao deletar registro: ', response.message);
        }
      });
    }
   
  }


}