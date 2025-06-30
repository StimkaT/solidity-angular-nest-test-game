import {inject, Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Store} from '@ngrx/store';
import {setSidebar} from '../+state/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isExpandedSubject = new BehaviorSubject<boolean>(false);
  private store = inject(Store);

  isExpanded$ = this.isExpandedSubject.asObservable();

  toggleSidebar() {
    this.isExpandedSubject.next(!this.isExpandedSubject.value);
    this.store.dispatch(setSidebar({sidebarValue: this.isExpandedSubject.value}))
  }
}
