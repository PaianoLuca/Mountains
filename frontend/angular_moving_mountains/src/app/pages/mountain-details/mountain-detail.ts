import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { MountainService } from '../../core/services/mountain';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Mountain } from '../../core/models/mountain';

@Component({
  selector: 'app-mountain-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './mountain-detail.html',
  styleUrls: ['./mountain-detail.scss']
})

export class MountainDetail implements OnInit {
    private mountainService = inject(MountainService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    mountainId: number | null = null;
    mountain: Mountain | null = null;
    loading = false;
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

    ngOnInit(): void {
        const idParam = this.route.snapshot.params['id'];
        this.mountainId = Number(idParam);
        if (this.mountainId && !isNaN(this.mountainId)) {
            this.loadMountain();
        }
    }

    getImagePreviewUrl(): string {
        const imageValue = this.form.get('image')?.value;
        if (!imageValue) return '';
        return this.getImageUrl(imageValue);
    }

    hasImagePreview(): boolean {
        return !!this.form.get('image')?.value;
    }

    loadMountain() {
        if (!this.mountainId) return;
        
        this.loading = true;
        this.error = null;
        
        this.mountainService.get(this.mountainId).subscribe({
            next: (data) => {
                this.mountain = data;
                this.form.patchValue({
                    name: data.name ?? '',
                    location: data.location ?? '',
                    height: data.height?.toString() ?? '',
                    description: data.description ?? '',
                    image: data.image ?? '',
                });
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading mountain:', error);
                this.error = 'Failed to load mountain. Please try again.';
                this.loading = false;
            }
        });
    }

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


    update() {
        if (this.form.invalid || !this.mountainId) {
            this.form.markAllAsTouched();
            return;
        }

        this.saving = true;
        this.error = null;
        this.successMessage = null;

        const formValue = this.form.value;
        const updatePayload: Partial<Mountain> = {
            name: formValue.name!,
            location: formValue.location!,
            height: Number(formValue.height),
            description: formValue.description!,
            image: formValue.image!,
        };

        this.mountainService.update(this.mountainId, updatePayload).subscribe({
            next: (updated) => {
                this.saving = false;
                this.successMessage = 'Mountain updated successfully!';
                this.mountain = updated;
                this.form.patchValue({
                    ...updatePayload,
                    height: updatePayload.height?.toString() ?? ''
                });
                setTimeout(() => {
                    this.successMessage = null;
                }, 3000);
            },
            error: (err) => {
                console.error('Update failed', err);
                this.error = err.error?.message || 'Failed to update mountain. Please try again.';
                this.saving = false;
            },
        });
    }
    
    delete() {
        if (!this.mountainId) return;
        
        if (confirm('Are you sure you want to delete this mountain? This action cannot be undone.')) {
            this.saving = true;
            this.error = null;
            
            this.mountainService.delete(this.mountainId).subscribe({
                next: () => {
                    this.saving = false;
                    this.router.navigate(['/home']);
                },
                error: (err) => {
                    console.error('Delete failed', err);
                    this.error = err.error?.message || 'Failed to delete mountain. Please try again.';
                    this.saving = false;
                },
            });
        }
    }
    }