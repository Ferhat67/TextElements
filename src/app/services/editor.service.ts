import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  textElement = {keyword: '', german: '', english: '', french: '', spanish: ''};

  private textElements = [
    {keyword: 'address', german: 'Adresse', english: 'Address', french: 'Adresse', spanish: 'Dirección'},
    {keyword: 'name', german: 'Ihr Name:', english: 'Your name:', french: 'Votre nom:', spanish: 'Tu nombre:'},
    {keyword: 'bill', german: 'Rechnung', english: 'Bill', french: 'Facture', spanish: 'Proyecto de ley'},
    {keyword: 'deliverynote', german: 'Lieferschein', english: 'Delivery note', french: 'Bon de livraison', spanish: 'Recibo de entrega'},
    {keyword: 'date', german: 'Datum', english: 'Date', french: 'Date', spanish: 'Fecha'},
    {keyword: 'recipient', german: 'Empfänger', english: 'Recipient', french: 'Récepteur', spanish: 'Receptor'},
  ];

  constructor() { }

  edit(element) {
    this.textElement = element;
  }

  reset() {
    this.textElement = {keyword: '', german: '', english: '', french: '', spanish: ''};
  }

  getCurrent() {
    return this.textElement;
  }

  public getTextElements() {
    return this.textElements;
  }

  public add(element) {
    this.textElements.push(element);
  }

  public remove(keyword) {
    this.textElements = this.textElements.filter(t => t.keyword !== keyword);
  }
}
