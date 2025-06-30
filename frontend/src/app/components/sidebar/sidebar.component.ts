import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidebarService } from '../../services/sidebar.service';
import {ProfileContainerComponent} from '../../containers/profile-container/profile-container.component';
import {IPlayer} from '../../+state/auth/auth.reducer';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, ProfileContainerComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() user: IPlayer | null = null
  constructor(
    public sidebarService: SidebarService
  ) {}

  isExpanded = false;
  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }
}
