







import { Component, OnInit } from '@angular/core';
import { ContratService } from 'src/app/folderService/contrat.service';
import { AssureService } from 'src/app/folderService/assure.service';
import { Contrat } from 'src/app/class/contrat';
import { Assure } from 'src/app/class/assure';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-contrat',
  templateUrl: './show-contrat.component.html',
  styleUrls: ['./show-contrat.component.css']
})
export class ShowContratComponent implements OnInit {

  contrats: Contrat[] = [];
  assuresMap: Map<number, Assure> = new Map();
  
  newContrat: Contrat = new Contrat();
  newAssure: Assure = new Assure();
  isModalOpen: boolean = false;
  isEditing: boolean = false;
  editedContratId: number | null = null;
  today: Date = new Date();
  // p: number = 1;
  // itemsPerPage: number = 3;
  assureId: number | null = null;
 
  assures: Map<number, { nom: string, prenom: string }> = new Map();
  isFormInvalid: boolean = false;
  successMessage: string = '';
  isSuccessMessageVisible: boolean = false;
  successMessageClass: string = '';

  sortCriteria: string = 'id'; 

  sortOrder: string = 'asc'; // Assurez-vous que la valeur par défaut est correcte





  // sortOrder: 'asc' | 'desc' = 'asc'; // Added for sorting
  status: string = 'all';  // Valeur par défaut




  // startDate: Date | null = null;
  // endDate: Date | null = nulls
  
  startDate: string = '';
  endDate: string = '';


  searchQuery: string = '';


  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 10;
  

  totalItems: number = 0; // Ajout de cette ligne
  selectedAssureId: number | null = null;
  // sortOrder: string = 'asc';


  
  

  constructor(
    private contratService: ContratService,
    private assureService: AssureService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadContrats();
  }




  loadContrats(status?: string): void {
    console.log('Loading contracts with status:', status, 'and sortOrder:', this.sortOrder, 'and sortCriteria:', this.sortCriteria);
  
    if (status === undefined) {
      console.warn('Status is undefined');
    }
  
    this.contratService.getContratsFiltered(status, this.selectedAssureId).subscribe(
      (data) => {
        console.log('Contracts fetched:', data);
        this.contrats = data;
        this.loadAssuresForContrats();
      },
      (error) => console.error('Error fetching contracts', error)
    );
  }
  

















  


  
  
  onFilterChange(status: string): void {
    this.loadContrats(status === 'all' ? undefined : status);
  }
  

  
 

 
  
  
 
  

  


  

  loadAssuresForContrats(): void {
    this.assuresMap.clear();
    this.contrats.forEach(contrat => {
      if (contrat.assure.id && !this.assuresMap.has(contrat.assure.id)) {
        this.assureService.getAssureById(contrat.assure.id).subscribe(
          (assure: Assure) => {
            this.assuresMap.set(assure.id, assure);
          },
          (error) => console.error('Error fetching assure', error)
        );
      }
    });
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.newContrat = new Contrat();
    this.newAssure = new Assure();
    this.isEditing = false;
    this.editedContratId = null;
    this.isFormInvalid = false;
  }

  

  getStatus(dateExpiration: Date): string {
    return new Date(dateExpiration) < this.today ? 'Expired' : 'Current';
  }

  // updatePagination(): void {
  //   this.assureService.getAssureCount().subscribe(count => {
  //     if (count > this.itemsPerPage && this.p === 1) {
  //       this.p = 2;
  //     }
  //   });
  // }




  editContrat(contrat: Contrat): void {
    this.isEditing = true;
    this.editedContratId = contrat.id;
    this.newContrat = { ...contrat };
  
    this.assureService.getAssureById(contrat.assure.id).subscribe(
      (assure: Assure) => {
        this.newAssure = assure;
        this.openModal();
      },
      (error) => console.error('Error fetching assure details', error)
    );
  }
  

  deleteContrat(contratId: number): void {
    if (confirm('Are you sure you want to delete this contract?')) {
      this.contratService.deleteContrat(contratId).subscribe(
        () => {
          this.contrats = this.contrats.filter(contrat => contrat.id !== contratId);
        },
        (error) => console.error('Error deleting contract', error)
      );
    }
  }

  createContrat(): void {
    if (!this.newContrat.police || !this.newContrat.dateSignature || !this.newContrat.dateExpiration || 
        !this.newAssure.prenom || !this.newAssure.nom || !this.newAssure.cin || !this.newAssure.dateNaissance) {
      this.isFormInvalid = true;
      return;
    }

    this.isFormInvalid = false;

    if (this.isEditing && this.editedContratId !== null) {
      this.contratService.updateContrat(this.editedContratId, this.newContrat).subscribe(
        (contrat: Contrat) => {
          const index = this.contrats.findIndex(c => c.id === this.editedContratId);
          if (index !== -1) {
            this.contrats[index] = contrat;
          }

          if (this.newAssure.id) {
            this.assureService.updateAssure(this.newAssure.id, this.newAssure).subscribe(
              () => {
                this.closeModal();
                this.showSuccessMessage('Contract and Assure updated successfully!', 'update');
              },
              (error) => console.error('Error updating assure', error)
            );
          } else {
            this.closeModal();
            this.showSuccessMessage('Contract updated successfully!', 'update');
          }
        },
        (error) => console.error('Error updating contract', error)
      );
    } else {
      this.assureService.createAssure(this.newAssure).subscribe(
        (assure: Assure) => {
          this.newContrat.assure.id = assure.id;
          this.contratService.createContrat(this.newContrat).subscribe(
            (contrat: Contrat) => {
              this.contrats.push(contrat);
              this.closeModal();
              this.showSuccessMessage('Contract and Assure created successfully!', 'add');
            },
            (error) => console.error('Error creating contract', error)
          );
        },
        (error) => console.error('Error creating assure', error)
      );
    }
  }

  showSuccessMessage(message: string, action: 'add' | 'update'): void {
    this.successMessage = message;
    this.isSuccessMessageVisible = true;

    this.successMessageClass = action === 'add' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-600';

    setTimeout(() => {
      this.isSuccessMessageVisible = false;
    }, 3000);
  }

  searchContrats(): void {
    if (this.assureId) {
      if (this.searchQuery.trim() === '') {
        this.loadContrats();
      } else {
        this.contratService.searchContratsByAssure(this.assureId, this.searchQuery).subscribe(
          (data: Contrat[]) => {
            this.contrats = data;
          },
          (error) => console.error('Error searching contracts', error)
        );
      }
    }
  }

  loadAssure(assureId: number): void {
    this.assureService.getAssureById(assureId).subscribe(
      (data: Assure) => {
        if (data && data.nom && data.prenom) {
          this.assures.set(assureId, { nom: data.nom, prenom: data.prenom });
        } else {
          console.error(`Assure with ID ${assureId} did not return expected data`);
        }
      },
      (error) => console.error('Error fetching assure information', error)
    );
  }






  filterByDateRange(): void {
    if (this.startDate && this.endDate) {
      this.contratService.getContratsByDateRange(this.startDate, this.endDate).subscribe(
        data => {
          this.contrats = data;
        },
        error => {
          console.error('Error fetching contrats by date range', error);
        }
      );
    }
  }
  





  filterContratsByExpiration(periodType: string): void {
    this.contratService.getContratsExpiringAfter(periodType).subscribe(
      (data: Contrat[]) => {
        this.contrats = data;
        // this.sortContrats();  // Assurez-vous que la méthode `sortContrats` trie correctement
      },
      (error) => console.error('Error fetching contracts by expiration', error)
    );
  }




  searchByPolice(): void {
    this.contratService.searchContratsByPolice(this.searchQuery).subscribe(
      (data) => this.contrats = data,
      (error) => console.error('Error searching contracts', error)
    );
  }



}












































