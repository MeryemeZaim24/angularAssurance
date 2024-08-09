

























































import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contrat } from 'src/app/class/contrat';
import { ContratService } from 'src/app/folderService/contrat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Assure } from 'src/app/class/assure';

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.css']
})
export class ContratComponent implements OnInit {
  contrats: Contrat[] = [];
  isEditing: boolean = false;
  editedContratId: number | null = null;
  isModalOpen: boolean = false;
  searchQuery: string = '';

  p: number = 1;
  itemsPerPage: number = 3;

  contratForm: FormGroup;

  assures: Map<number, { nom: string, prenom: string }> = new Map();
  assureId: number | null = 2;

  successMessage: string = '';
  isSuccessMessageVisible: boolean = false;
  successMessageClass: string = '';

  constructor(
    private contratService: ContratService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.contratForm = this.fb.group({
      police: ['', Validators.required],
      dateSignature: ['', Validators.required],
      dateExpiration: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('id'))

      this.assureId = +params.get('id')!;
      this.loadAssure(this.assureId);
      this.loadContrats();
    });
  }



  loadContrats() {
    console.log("Loading contracts for assureId: ", this.assureId);
    if (this.assureId) {
      this.contratService.getContratsByAssure(this.assureId).subscribe(
        (data: Contrat[]) => {
          console.log("Contracts loaded successfully: ", data);
          this.contrats = data;
          this.contrats.forEach(contrat => {
            if (contrat.assure.id && !this.assures.has(contrat.assure.id)) {
              this.loadAssure(contrat.assure.id);
            }
          });
          this.sortContratsById();
          this.updatePagination();
        },
        error => {
          console.error('Error loading contracts', error);
        }
      );
    }
  }
  
  




  createOrUpdateContrat() {
    if (this.contratForm.invalid) {
      this.contratForm.markAllAsTouched();
      return;
    }
  
    var contratData: Contrat = this.contratForm.value;
    console.log("Sending contract data to API: ", contratData);
  
    if (this.isEditing && this.editedContratId) {
      this.contratService.updateContrat(this.editedContratId, contratData).subscribe(
        () => {
          console.log("Contract updated successfully");
          this.loadContrats();
          this.showSuccessMessage('Contract updated successfully.', 'update');
          this.closeModal();
        },
        error => {
          console.error('Error updating contract', error);
        }
      );
    } else {
      if (this.assureId) {
       const assure : Assure = {
         id: this.assureId,
         nom: '',
         prenom: '',
         cin: '',
         dateNaissance: undefined
       }; 
        contratData.assure = assure;
        this.contratService.createContrat(contratData).subscribe(
          (data: Contrat) => {
            console.log("Contract created successfully: ", data);
            this.contrats.push(data);
            this.sortContratsById();
            this.showSuccessMessage('Contract added successfully.', 'add');
            this.closeModal();
          },
          error => {
            console.error('Error creating contract', error);
          }
        );
      }
    }
  }
  

  showSuccessMessage(message: string, action: 'add' | 'update'): void {
    this.successMessage = message;
    this.isSuccessMessageVisible = true;

    if (action === 'add') {
      this.successMessageClass = 'bg-green-100 text-green-700';
    } else if (action === 'update') {
      this.successMessageClass = 'p-2 rounded-md text-orange-600 bg-orange-100 hover:bg-orange-200 focus:outline-none';
    }

    setTimeout(() => {
      this.isSuccessMessageVisible = false;
    }, 3000);
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.contratForm.reset();
    this.isEditing = false;
    this.editedContratId = null;
  }

  startEditContrat(contrat: Contrat) {
    this.isEditing = true;
    this.editedContratId = contrat.id;
    this.contratForm.patchValue({
      police: contrat.police,
      dateSignature: contrat.dateSignature,
      dateExpiration: contrat.dateExpiration
    });
    this.openModal();
  }

  deleteContrat(id: number) {
    this.contratService.deleteContrat(id).subscribe(
      () => {
        this.contrats = this.contrats.filter(contrat => contrat.id !== id);
        // this.showSuccessMessage('Contrat deleted successfully.', 'delete');
      },
      error => {
        console.error('Erreur lors de la suppression du contrat', error);
      }
    );
  }

  searchContrats() {
    if (this.assureId) {
      if (this.searchQuery.trim() === '') {
        this.loadContrats();
      } else {
        this.contratService.searchContratsByAssure(this.assureId, this.searchQuery).subscribe(
          (data: Contrat[]) => {
            this.contrats = data;
          },
          error => {
            console.error('Erreur lors de la recherche des contrats', error);
          }
        );
      }
    }
  }

  loadAssure(assureId: number) {
    this.contratService.getAssureById(assureId).subscribe(
      data => {
        if (data && data.nom && data.prenom) {
          this.assures.set(assureId, { nom: data.nom, prenom: data.prenom });
        } else {
          console.error(`Assuré avec l'ID ${assureId} n'a pas retourné les données attendues`);
        }
      },
      error => {
        console.error('Erreur lors de la récupération des informations de l\'assuré', error);
      }
    );
  }

  updatePagination(): void {
    this.contratService.getContratCount().subscribe(count => {
      if (count > this.itemsPerPage && this.p === 1) {
        this.p = 2;
      }
    });
  }

  sortContratsById(): void {
    this.contrats.sort((a, b) => b.id - a.id);
  }
}
