import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { AppComponent } from '../../app.component';
import { SaleTypeBookPrice } from './models/saletypebookprice.model';
import { SaleTypeBookPriceService } from './services/saletypebookprice.services';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-SaleTypeBookPrices',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './sale-typebookprice.component.html',
  styleUrl: './sale-typebookprice.component.css'
  
})
export class SaleTypeBookPricesComponent {
  saleTypeBookPrices: SaleTypeBookPrice[] = [];
  saleTypeBookPrice: SaleTypeBookPrice  = { bookId: 0, price: 0,saleTypeId:0  };
  isEditing: boolean = false; // Para controlar se estamos no modo de edição ou inserção
  isModalOpen = false; // Controla a exibição do modal
  isDeleteModalOpen = false;
  SaleTypeBookPriceIdToDelete:number = 0;
  bookId:number = 0;
  
  constructor(private assuntoService: SaleTypeBookPriceService, private appComponent: AppComponent,     private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.bookId = +params['id']; // Converte para número e atribui
        this.getSaleTypeBookPrices(); // Chama a função para carregar os dados
      }
    });
  }
  openDeleteModal(id: number): void {
 
    this.SaleTypeBookPriceIdToDelete = id;
    this.isDeleteModalOpen = true;
  }

  // Fechar o modal
  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.SaleTypeBookPriceIdToDelete = 0;
  }
  openModal(): void {
    this.isModalOpen = true; // Abre o modal
  }

  closeModal(): void {
    this.isModalOpen = false; // Fecha o modal
  }
  addSaleTypeBookPrice(): void {
    this.saleTypeBookPrice   = { bookId: 0, price: 0,saleTypeId:0  };
    this.openModal();   
  }
  // Função para buscar todos os assuntos
  getSaleTypeBookPrices(): void {
    this.assuntoService.getSaleTypeBookPrices(this.bookId).subscribe((response) => {
      if (response.isSuccess) {
        
        if (Array.isArray(response.data)) {
          // Caso data seja um array
          this.saleTypeBookPrices = response.data;
          
        } 
      } else {
        this.appComponent.showAlert(response.message,'danger');
        console.error('Erro ao buscar assuntos: ', response.message);
      }
    });
  }

  // Função para adicionar um novo assunto
  saveSaleTypeBookPrice(): void {

    if (this.saleTypeBookPrice.bookId && this.saleTypeBookPrice.bookId > 0) {
      
      // Atualizar assunto existente
      this.assuntoService.updateSaleTypeBookPrice(this.saleTypeBookPrice.bookId,this.saleTypeBookPrice.saleTypeId, this.saleTypeBookPrice).subscribe((response) => {
        if (response.isSuccess) {
          this.getSaleTypeBookPrices(); // Atualiza a lista
          this.closeModal();
          this.appComponent.showAlert('Assunto salvo com sucesso!','success');

        } else {
         
          this.appComponent.showAlert(response.message,'danger');
          console.error('Erro ao buscar assuntos: ', response.message);
        }
       
      });
    } else {
      // Adicionar novo assunto
      this.assuntoService.addSaleTypeBookPrice(this.saleTypeBookPrice).subscribe((response) => {
        if (response.isSuccess) {
          this.getSaleTypeBookPrices(); // Atualiza a lista
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
  editSaleTypeBookPrice(id: number): void {

    this.assuntoService.getSaleTypeBookPrice(id, this.bookId).subscribe((response ) => {
      if (response.isSuccess) {
        if (!Array.isArray(response.data)) {
          // Caso data seja um array
          this.saleTypeBookPrice = response.data;
        } 
        this.isModalOpen = true;// Preenche os campos para edição
        debugger
      } else {
        console.error('Erro ao buscar registro: ', response.message);
      }
    });
  }

  // Função para excluir um assunto
  deleteSaleTypeBookPrice(): void {
    if(this.SaleTypeBookPriceIdToDelete > 0){
      this.assuntoService.deleteSaleTypeBookPrice(this.SaleTypeBookPriceIdToDelete, this.bookId).subscribe((response) => {
        if (response.isSuccess) {
          this.appComponent.showAlert('Assunto deletado com sucesso!','success');
  
          this.getSaleTypeBookPrices(); // Atualiza a lista após exclusão
          this.closeDeleteModal()
        }else {
          this.appComponent.showAlert("Erro ao deletar registro",'danger');
          console.error('Erro ao deletar registro: ', response.message);
        }
      });
    }
   
  }


}