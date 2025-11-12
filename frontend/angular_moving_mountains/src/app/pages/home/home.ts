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
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  auth = inject(Auth);
  mountainService = inject(MountainService);

  ngOnInit() {
    this.loadMountains();
  }

  loadMountains() {
    this.loading.set(true);
    this.error.set(null);
    this.mountainService.all().subscribe({
      next: (data) => {
        this.mountains.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading mountains:', error);
        this.error.set('Failed to load mountains. Please try again later.');
        this.loading.set(false);
      }
    });
  }

  getImageUrl(image: string): string {
    if (!image) return '';
    if (image.startsWith('http')) return image;
    return `http://localhost:8000/storage/${image}`;
  }

  formatHeight(height: number): string {
    return `${height.toLocaleString()}m`;
  }
}
