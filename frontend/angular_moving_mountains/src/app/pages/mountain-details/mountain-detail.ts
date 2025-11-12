import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
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

    mountainId!: number;
    mountain: Mountain | null = null;

    form = new FormGroup({
        name: new FormControl('', [Validators.required]),
        location: new FormControl('', [Validators.required]),
        height: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        image: new FormControl('', [Validators.required]),
    });

    ngOnInit(): void {
        this.mountainId = Number(this.route.snapshot.params['id']);
        this.loadMountain();
    }

    loadMountain() {
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
            },
        });
    }


    update() {

        const formValue = this.form.value;
        const updatePayload: Partial<Mountain> = {
        name: formValue.name!,
        location: formValue.location!,
        height: Number(formValue.height), // string → number
        description: formValue.description!,
        image: formValue.image!,
        };

        this.mountainService.update(this.mountainId, updatePayload).subscribe({
            next: (updated) => {
              alert('Mountain updated successfully');
              this.mountain = updated;
              this.form.patchValue({
                ...updatePayload,
                height: updatePayload.height?.toString() ?? ''
              });
            },
            error: (err) => console.error('Update failed', err),
        });

      }
    
      delete() {
        if (confirm('Are you sure you want to delete this mountain?')) {
          this.mountainService.delete(this.mountainId).subscribe({
            next: () => {
              alert('Mountain deleted');
              window.history.back(); // of router.navigate(['/home'])
            },
            error: (err) => console.error('Delete failed', err),
          });
        }
      }
    }