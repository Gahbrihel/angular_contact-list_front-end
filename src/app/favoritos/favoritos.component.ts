import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact, ContatoService } from '../contato.service';

@Component({
  selector: 'app-favoritos',
  standalone: false,
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit, OnDestroy {
  favoriteContacts: Contact[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private contatoService: ContatoService) { }

  ngOnInit(): void {
    this.loadFavoriteContacts();
    this.subscription = this.contatoService.contactChanged$.subscribe(() => {
      this.loadFavoriteContacts();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadFavoriteContacts(): void {
    this.contatoService.getContacts().subscribe({
      next: (data) => {
        this.favoriteContacts = data.filter(contact => contact.favorite);
      },
      error: (err) => console.error('Erro ao carregar contatos favoritos', err)
    });
  }
}