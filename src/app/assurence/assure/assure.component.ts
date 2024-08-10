






import { Component, OnInit, HostListener } from '@angular/core';
import { AssureService } from '../../../app/folderService/assure.service';
import { Assure } from '../../../app/class/assure';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-assure',
  templateUrl: './assure.component.html',
  styleUrls: ['./assure.component.css']
})
export class AssureComponent implements OnInit {
  assures: Assure[] = [];
  newAssure: Assure = new Assure();
  editAssure: Assure | null = null;
  isModalOpen: boolean = false;
  menuOpen: boolean = false;
  currentAssureId: number | null = null;
  searchKeyword: string = '';
  filterStartDate: string = '';
  filterEndDate: string = '';
  filterCin: string = '';
    // Remplacez par le type de vos données
  p: number = 1;
  itemsPerPage: number = 3;




  assureForm: FormGroup;
  successMessage: string = '';
  isSuccessMessageVisible: boolean = false;
  


  
  successMessageClass: string = '';




  constructor(
    private fb: FormBuilder,
    private assureService: AssureService,
    private router: Router
  ) {
    this.assureForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      cin: ['', Validators.required],
      dateNaissance: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.getAllAssures();
  }

  getAllAssures(): void {
    this.assureService.getAllAssures().subscribe(data => {
      this.assures = data;
      this.sortAssuresById(); 
    });
  }








  createAssure(): void {
    if (this.assureForm.valid) {
      const assureData: Assure = this.assureForm.value;
      if (this.editAssure) {
        this.assureService.updateAssure(this.editAssure.id!, assureData).subscribe(() => {
          this.getAllAssures();
          this.showSuccessMessage('Assure updated successfully.', 'update');
          this.closeModal();
          this.p = 1;
        });
      } else {
        this.assureService.createAssure(assureData).subscribe(() => {
          this.getAllAssures();
          this.showSuccessMessage('Assure added successfully.', 'add');
          this.closeModal();
          this.p = 1;
        });
      }
    } else {
      this.assureForm.markAllAsTouched();
    }
  }

  showSuccessMessage(message: string, action: 'add' | 'update'): void {
    this.successMessage = message;
    this.isSuccessMessageVisible = true;

    
    if (action === 'add') {
      this.successMessageClass = 'bg-green-100  text-green-700';
    } else if (action === 'update') {
      this.successMessageClass = 'p-2 rounded-md text-orange-600 bg-orange-100 hover:bg-orange-200 focus:outline-none';
    }

    setTimeout(() => {
      this.isSuccessMessageVisible = false;
    }, 3000); // Le message disparaît après 3 secondes
  }








 


  
  

  viewContrats(assureId: number): void {
    this.router.navigate(['assure/contrat', assureId]);
  }

 
  editAssureDetails(assure: Assure): void {
    this.editAssure = assure;
    
    this.assureForm.setValue({
      nom: assure.nom,
      prenom: assure.prenom,
      cin: assure.cin,
      dateNaissance: assure.dateNaissance
    });
    this.openModal();
    this.closeMenu(); 
  }
  

  openModal(): void {
    this.isModalOpen = true;

  }
  

  closeModal(): void {
    this.isModalOpen = false;
    this.newAssure = new Assure();
    this.editAssure = null;
  


  
    this.assureForm.reset();
    
  }

  toggleMenu(event: MouseEvent, assureId: number): void {
    event.stopPropagation();
    this.menuOpen = !this.menuOpen;
    this.currentAssureId = this.menuOpen ? assureId : null;
  }

  closeMenu(): void {
    this.menuOpen = false;
    this.currentAssureId = null;
  }

  // Close the menu when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const menuElement = document.querySelector('.dropdown-menu');
    if (menuElement && !menuElement.contains(target)) {
      this.closeMenu();
    }
  }

  searchAssures(): void {
    if (this.searchKeyword) {
      this.assureService.searchAssures(this.searchKeyword).subscribe(data => {
        this.assures = data;
      });
    } else {
      this.getAllAssures();
    }
  }
  filterAssuresByDate(): void {
    if (this.filterStartDate && this.filterEndDate) {
      this.assureService.filterAssuresByDate(this.filterStartDate, this.filterEndDate).subscribe(data => {
        this.assures = data;
      });
    } else {
      this.getAllAssures();
    }
  }
  filterAssuresByCin(): void {
    if (this.filterCin) {
      this.assureService.filterAssuresByCin(this.filterCin).subscribe(data => {
        this.assures = data;
      });
    } else {
      this.getAllAssures();
    }
  }

  updatePagination(): void {
  
    this.assureService.getAssureCount().subscribe(count => {
      if (count > this.itemsPerPage && this.p === 1) {
        this.p = 2;
      }
    });
  }
  sortAssuresById(): void {
    this.assures.sort((a, b) => b.id - a.id);
  }



  deleteAssure(id: number): void {
    this.assureService.deleteAssure(id).subscribe(() => {
      this.getAllAssures();
      this.closeModal();
      this.closeMenu(); 
    });
  }
  
}
