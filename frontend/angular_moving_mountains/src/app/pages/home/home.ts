import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { MountainService } from '../../core/services/mountain';
import { Mountain } from '../../core/models/mountain';
import { Auth } from '../../core/auth/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  mountains = signal<Mountain[]>([]);
  auth = inject(Auth);
  mountainService = inject(MountainService);

  ngOnInit() {
    this.loadMountains();
  }

  loadMountains() {
    this.mountainService.all().subscribe({
      next: (data) => {
        this.mountains.set(data);
      },
      error: (error) => {
        console.error('Error loading mountains:', error);
      }
    });
  }
}
