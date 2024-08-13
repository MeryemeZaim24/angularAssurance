













































import { Component, OnInit } from '@angular/core';
import { ContratService } from 'src/app/folderService/contrat.service';
import { AssureService } from 'src/app/folderService/assure.service';
import { Contrat } from 'src/app/class/contrat';
import { Assure } from 'src/app/class/assure';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Page } from 'src/app/class/page';


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

  assureId: number | null = null;
 
  assures: Map<number, { nom: string, prenom: string }> = new Map();
  isFormInvalid: boolean = false;
  successMessage: string = '';
  isSuccessMessageVisible: boolean = false;
  successMessageClass: string = '';


  sortOrder: string = 'asc'; 

  status: string = 'all';  
startDate: string = '';
  endDate: string = '';

  selectedStatus: string = 'current';  // Valeur par défaut
  searchQuery: string = '';


  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 10;
  

  totalItems: number = 0; // Ajout de cette ligne
  selectedAssureId: number | null = null;
  // sortOrder: string = 'asc';


  sortColumn: string = '';
  // sortDirection: 'asc' | 'desc' = 'asc';


  sortCriteria: string = 'dateSignature';

  periodType: string = 'day';



  totalElements: number = 0;
  page: number = 0;
  size: number = 10;
  






  
 
  searchPolice: string = '';


  // periodType: string = '';

  assuress = []; // Remplacez ceci par votre liste de données
  sortKey: string = '';


  sortDirection: 'asc' | 'desc' = 'asc'; // Valeur initiale par défaut

  sortOrderr: 'asc' | 'desc' = 'asc'; // Valeur par défaut, ajustez si nécessaire


  constructor(
    private contratService: ContratService,
    private assureService: AssureService,
    private fb: FormBuilder,
    private router: Router
  ) { }


  sort(column: string): void {
    if (this.sortColumn === column) {
      
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
     
      this.sortDirection = 'asc';
    }
    this.sortColumn = column;
    this.sortData();
  }

  




  sortData(): void {
    this.contrats.sort((a, b) => {
      const valueA = a[this.sortColumn];
      const valueB = b[this.sortColumn];
      const compare = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      return this.sortDirection === 'asc' ? compare : -compare;
    });
  }



  

  ngOnInit(): void {
    this.loadContrats();
  }




  
  loadContrats(): void {
    console.log('Loading contracts with status:', this.status, 'and sortOrder:', this.sortOrder, 'and sortCriteria:', this.sortCriteria);
  
    const page = this.currentPage;
    const size = this.pageSize;
    
  
    let observable: Observable<Page<Contrat>>;
   
  
    switch (this.sortCriteria) {
      case 'dateSignature':
      case 'dateExpiration':
      case 'police':
      case 'id':
      
        observable = this.contratService.getContrats(page, size);
        break;
     
       
      default:
        observable = this.contratService.getContrats(page, size);
    }
  
    observable.subscribe(
      (data: Page<Contrat>) => {
        this.contrats = data.content; // Assurez-vous que votre réponse a une propriété `content`
        this.totalPages = data.totalPages;
        this.totalItems = data.totalElements;
        this.loadAssuresForContrats();
        this.onFilterByStatus(this.selectedStatus)
      },
      (error) => console.error('Error fetching contracts', error)
    );
  }
  

  goToPage(page: number): void {
    if (page < 0 || page >= this.totalPages) {
      return; // Page hors des limites
    }
    this.currentPage = page;
    this.loadContrats();
  }
  
 pagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  
  getStatus(dateExpiration: Date): string {
    return new Date(dateExpiration) < this.today ? 'Expired' : 'Current';
  }
  
  // onFilterChange(status: string): void {
  //   this.status = status;
  //   this.loadContrats();
  // }

  
 


  
  // onFilterChange(status: string): void {
  //   this.loadContrats(status === 'all' ? undefined : status);
  // }
  changeSortOrder(order: string): void {
    this.sortOrder = order;
    this.loadContrats();
  }

  changeSortCriteria(criteria: string): void {
    this.sortCriteria = criteria;
    this.loadContrats();
    
  }


  
  loadContratsSortedByAssureCin(sortOrder: string) {
    this.contratService.getContratsSortedByAssureCin(sortOrder).subscribe(
      (contrats) => {
        this.contrats = contrats;
        // Vous pouvez également afficher un message de succès ici si nécessaire
        // this.successMessage = 'Contrats triés par CIN avec succès!';
        this.isSuccessMessageVisible = true;
      },
      (error) => {
        console.error('Erreur lors du tri des contrats:', error);
        // Afficher un message d'erreur si nécessaire
        this.successMessage = 'Erreur lors du tri des contrats.';
        this.isSuccessMessageVisible = true;
      }
    );
  }

  loadContratsSortedByAssureNom(sortOrder: string) {
    this.contratService.getContratsSortedByAssureNom(sortOrder).subscribe(
      (contrats) => {
        this.contrats = contrats;
        // this.successMessage = 'Contrats triés par nom d’assuré avec succès!';
        this.isSuccessMessageVisible = true;
      },
      (error) => {
        console.error('Erreur lors du tri des contrats:', error);
        this.successMessage = 'Erreur lors du tri des contrats.';
        this.isSuccessMessageVisible = true;
      }
    );
  }


 



  loadContratsSortedByAssureId(sortOrder: string) {
    this.contratService.getContratsSortedByAssureId(sortOrder).subscribe(
      (contrats) => {
        this.contrats = contrats;
        // this.successMessage = 'Contrats triés par assure_id avec succès!';
        this.isSuccessMessageVisible = true;
      },
      (error) => {
        console.error('Erreur lors du tri des contrats:', error);
        this.successMessage = 'Erreur lors du tri des contrats.';
        this.isSuccessMessageVisible = true;
      }
    );
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



  loadContratsByStatus(status: string): void {
    console.log('Loading contracts with status:', status, 'and sortOrder:', this.sortOrder);
  
    const page = this.currentPage;
    const size = this.pageSize;
  
    let observable: Observable<Page<Contrat>>;
    observable = this.contratService.getContratsFiltered(
      status !== 'all' ? status : undefined,
      undefined, // Assure ID est undefined dans cet exemple. Remplacez-le si nécessaire.
      this.sortOrderr
    );



  
  
    observable.subscribe(
      (data: Page<Contrat>) => {
        this.contrats = data.content; // Assurez-vous que votre réponse a une propriété `content`
        this.totalPages = data.totalPages;
        this.totalItems = data.totalElements;
        this.loadAssuresForContrats();
      },
      (error) => console.error('Error fetching contracts', error)
    );
  }
  

  onFilterChange(status: string): void {
    this.status = status;
    this.loadContratsByStatus(status);
  }



  filterContrats(): void {
    if (this.startDate && this.endDate) {
      this.contratService.filterContratsByDateRange(this.startDate, this.endDate)
        .subscribe(
          (data: Contrat[]) => {
            this.contrats = data;
          },
          (error) => {
            console.error('Error fetching contracts', error);
          }
        );
    }
  }



  // onFilterByStatus(status: string) {
  //   this.selectedStatus = status;
  //   this.contratService.getContratsByStatus(status)
  //     .subscribe(
  //       (data: Contrat[]) => {
  //         this.contrats = data;
  //       },
  //       error => {
  //         console.error('Erreur lors de la récupération des contrats', error);
  //       }
  //     );
  // }

  onFilterByStatus(status: string) {
    this.selectedStatus = status;
    this.contratService.getContratsByStatus(status)
      .subscribe(
        (data: Contrat[]) => {
          this.contrats = data;
        },
        error => {
          console.error('Erreur lors de la récupération des contrats', error);
        }
      );
  }


  


  
  


  fetchContrats(): void {
    this.contratService.getContratsByExpiration(this.periodType).subscribe(
      (data: Contrat[]) => {
        this.contrats = data;
      },
      error => {
        console.error('Error fetching contracts:', error);
      }
    );
  }

  onPeriodChange(newPeriodType: string): void {
    this.periodType = newPeriodType;
    this.fetchContrats();
  }





  



  
  
  
  


}













































