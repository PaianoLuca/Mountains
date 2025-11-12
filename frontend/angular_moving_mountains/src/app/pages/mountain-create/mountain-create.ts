import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MountainService } from '../../core/services/mountain';
import { RouterModule, Router } from '@angular/router';
import { Mountain } from '../../core/models/mountain';

@Component({
  selector: 'app-mountain-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './mountain-create.html',
  styleUrls: ['./mountain-create.scss']
})
export class MountainCreate {
  private mountainService = inject(MountainService);
  private router = inject(Router);

  saving = false;
  error: string | null = null;
  successMessage: string | null = null;

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    location: new FormControl('', [Validators.required, Validators.minLength(2)]),
    height: new FormControl('', [Validators.required, Validators.min(1)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    image: new FormControl('', [Validators.required]),
  });

  getFieldError(fieldName: string): string | null {
    const field = this.form.get(fieldName);
    if (field && field.invalid && (field.dirty || field.touched)) {
      if (field.errors?.['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors?.['minlength']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is too short`;
      }
      if (field.errors?.['min']) {
        return 'Height must be at least 1 meter';
      }
    }
    return null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getImageUrl(image: string): string {
    if (!image) return '';
    if (image.startsWith('http')) return image;
    return `http://localhost:8000/storage/${image}`;
  }

  getImagePreviewUrl(): string {
    const imageValue = this.form.get('image')?.value;
    if (!imageValue) return '';
    return this.getImageUrl(imageValue);
  }

  hasImagePreview(): boolean {
    return !!this.form.get('image')?.value;
  }

  create() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.error = null;
    this.successMessage = null;

    const formValue = this.form.value;
    const createPayload: Partial<Mountain> = {
      name: formValue.name!,
      location: formValue.location!,
      height: Number(formValue.height),
      description: formValue.description!,
      image: formValue.image!,
    };

    this.mountainService.create(createPayload).subscribe({
      next: (created) => {
        this.saving = false;
        this.successMessage = 'Mountain created successfully!';
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1500);
      },
      error: (err) => {
        console.error('Create failed', err);
        this.error = err.error?.message || 'Failed to create mountain. Please try again.';
        this.saving = false;
      },
    });
  }
}