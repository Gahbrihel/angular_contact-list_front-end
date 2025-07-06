import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContatoService } from '../contato.service'; // Ajuste o caminho se necessário

@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  formGroupContact: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contatoService: ContatoService
  ) {
    this.formGroupContact = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthday: [''],
      address: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      company: [''],
      position: [''],
      category: ['', Validators.required]
    });
  }
  
  loadContats(){
    this.contatoService.getContacts().subscribe({})
  }

  save(): void {
    if (this.formGroupContact.invalid) {
      return;
    }

    this.contatoService.addContact(this.formGroupContact.value).subscribe({
      next: () => {
        console.log('Contato salvo, notificação enviada para a lista.');
        this.formGroupContact.reset();
        alert('Contato salvo com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao salvar contato', err);
        alert('Não foi possível salvar o contato.');
      }
    });
  }

  update() {
    this.contatoService.updateContact(this.formGroupContact.value).subscribe(
      {
        next: () => {
          this.loadContats();
          this.clear();
        }
      }
    )
  }

  clear(){
    this.formGroupContact.reset();
  }
}