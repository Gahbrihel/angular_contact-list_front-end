import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact, ContatoService } from '../contato.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lista',
  standalone: false,
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  formGroupContact: FormGroup;
  isEditing: boolean = false;
  searchTerm: string = '';
  categoryFilter: string = '';
  selectedContact: Contact | null = null;

  constructor(
    private contatoService: ContatoService,
    private formBuilder: FormBuilder
  ) {
    this.formGroupContact = formBuilder.group({
      id: [''],
      name: [''],
      phone: [''],
      email: [''],
      birthday: [''],
      address: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      company: [''],
      position: [''],
      category: [''],
      favorite: [false]
    });
  }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contatoService.getContacts().subscribe({
      next: (contacts) => {
        this.contacts = contacts;
        this.filteredContacts = contacts;
      },
      error: (error) => {
        console.error('Erro ao carregar contatos:', error);
      }
    });
  }

  filterContacts(): void {
    let filtered = this.contacts;

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(term) ||
        contact.phone.toLowerCase().includes(term) ||
        contact.email.toLowerCase().includes(term)
      );
    }

    if (this.categoryFilter && this.categoryFilter !== '') {
      filtered = filtered.filter(contact => contact.category === this.categoryFilter);
    }

    this.filteredContacts = filtered;
  }

  save(): void {
    if (this.isEditing) {
      this.update();
    } else {
      this.contatoService.addContact(this.formGroupContact.value).subscribe({
        next: () => {
          this.formGroupContact.reset();
          this.loadContacts();
        },
        error: (error) => {
          console.error('Erro ao salvar contato:', error);
        }
      });
    }
  }

  delete(contact: Contact): void {
    this.contatoService.deleteContact(contact).subscribe({
      next: () => {
        this.loadContacts();
      },
      error: (error) => {
        console.error('Erro ao deletar contato:', error);
      }
    });
  }

  update(): void {
    this.contatoService.updateContact(this.formGroupContact.value).subscribe({
      next: () => {
        this.loadContacts();
        this.clear();
      },
      error: (error) => {
        console.error('Erro ao atualizar contato:', error);
      }
    });
  }

  edit(contact: Contact): void {
    this.isEditing = true;
    this.formGroupContact.patchValue(contact);
  }

  clear(): void {
    this.isEditing = false;
    this.formGroupContact.reset();
    this.formGroupContact.patchValue({
      favorite: false
    });
  }

  toggleFavorite(contact: Contact): void {
    const updatedContact = { ...contact, favorite: !contact.favorite };
    this.contatoService.updateContact(updatedContact).subscribe({
      next: () => {
        this.loadContacts();
      },
      error: (error) => {
        console.error('Erro ao atualizar favorito:', error);
      }
    });
  }

  onSearchChange(): void {
    this.filterContacts();
  }

  onCategoryChange(): void {
    this.filterContacts();
  }

    showContactDetails(contact: Contact): void {
    this.selectedContact = contact;
  }

  closeContactDetails(): void {
    this.selectedContact = null;
  }
}