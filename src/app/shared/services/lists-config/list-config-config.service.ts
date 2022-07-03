import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListsConfigService {

  private discount = new BehaviorSubject<number>(1)
  public discount$ = this.discount.asObservable();

  constructor() { }
  
}