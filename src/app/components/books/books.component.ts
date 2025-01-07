import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../../app.component';
import { Book } from './models/book.model';
import { BookService } from './services/book.service';
import { AuthorService } from '../authors/services/author.service';
import { SubjectService } from '../subjects/services/subject.service';
import { Subject } from '../subjects/models/subject.model';
import { Author } from '../authors/models/author.model';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-Books',
  standalone:true,
  imports: [FormsModule,CommonModule, RouterModule],
  templateUrl: './Books.component.html',
  styleUrl: './Books.component.css'
  
})
export class BooksComponent {
  books: Book[] = [];
  authors: Author[] = [];
  subjects: Subject[] = [];
  book: Book  = { bookId: 0, title: '',edition:'',publisher:'',publicationYear:'',authorsId:[],subjectsId:[] };
  isEditing: boolean = false; // Para controlar se estamos no modo de edição ou inserção
  isModalOpen = false; // Controla a exibição do modal
  isDeleteModalOpen = false;
  BookIdToDelete:number = 0;
  constructor(private bookService: BookService, private appComponent: AppComponent, private authorService: AuthorService, private subjectService: SubjectService) {}

  ngOnInit(): void {
   this.getBooks();
   this.getAuthors(); // Carregar autores
   this.getSubjects(); // Carregar assuntos
  }

  getAuthors(): void {
    this.authorService.getAuthors().subscribe((response) => {
      if (response.isSuccess) {
          
        if (Array.isArray(response.data)) {
          // Caso data seja um array
          this.authors = response.data;
          
        } 
      
      } else {
        this.appComponent.showAlert(response.message, 'danger');
      }
    });
  }

  getSubjects(): void {
    this.subjectService.getSubjects().subscribe((response) => {
      if (response.isSuccess) {
        if (Array.isArray(response.data)) {
          // Caso data seja um array
          this.subjects = response.data;
          
        } 
      } else {
        this.appComponent.showAlert(response.message, 'danger');
      }
    });
  }
  openDeleteModal(id: number): void {
    this.BookIdToDelete = id;
    this.isDeleteModalOpen = true;
  }

  // Fechar o modal
  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.BookIdToDelete = 0;
  }
  openModal(): void {
    this.isModalOpen = true; // Abre o modal
  }

  closeModal(): void {
    this.isModalOpen = false; // Fecha o modal
  }
  addBook(): void {
    this.book  ={ bookId: 0, title: '',edition:'',publisher:'',publicationYear:'',authorsId:[],subjectsId:[] };
    this.openModal();
    
  }
  // Função para buscar todos os assuntos
  getBooks(): void {
    this.bookService.getBooks().subscribe((response) => {
      if (response.isSuccess) {
        
        if (Array.isArray(response.data)) {
          // Caso data seja um array
          this.books = response.data;
          
        } 
      } else {
        this.appComponent.showAlert(response.message,'danger');
        console.error('Erro ao buscar assuntos: ', response.message);
      }
    });
  }

  // Função para adicionar um novo assunto
  saveBook(): void {

    if (this.book.bookId && this.book.bookId > 0) {
      
      // Atualizar assunto existente
      this.bookService.updateBook(this.book.bookId, this.book).subscribe((response) => {
        if (response.isSuccess) {
          this.getBooks(); // Atualiza a lista
          this.closeModal();
          this.appComponent.showAlert('Assunto salvo com sucesso!','success');

        } else {
         
          this.appComponent.showAlert(response.message,'danger');
          console.error('Erro ao buscar assuntos: ', response.message);
        }
       
      });
    } else {
      // Adicionar novo assunto
      this.bookService.addBook(this.book).subscribe((response) => {
        if (response.isSuccess) {
          this.getBooks(); // Atualiza a lista
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
  editBook(id: number): void {

    this.bookService.getBook(id).subscribe((response ) => {
      if (response.isSuccess) {
        if (!Array.isArray(response.data)) {
          // Caso data seja um array
          this.book = response.data;
        } 
        this.isModalOpen = true;// Preenche os campos para edição
        debugger
      } else {
        console.error('Erro ao buscar registro: ', response.message);
      }
    });
  }

  // Função para excluir um assunto
  deleteBook(): void {
    if(this.BookIdToDelete > 0){
      this.bookService.deleteBook(this.BookIdToDelete).subscribe((response) => {
        if (response.isSuccess) {
          this.appComponent.showAlert('Assunto deletado com sucesso!','success');
  
          this.getBooks(); // Atualiza a lista após exclusão
          this.closeDeleteModal()
        }else {
          this.appComponent.showAlert("Erro ao deletar registro",'danger');
          console.error('Erro ao deletar registro: ', response.message);
        }
      });
    }
   
  }


}