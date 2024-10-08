
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contrat } from '../class/contrat';
import { Page } from '../class/page';

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  private baseUrl = 'http://localhost:8080/api/contrats';
  private assureBaseUrl = 'http://localhost:8080/api/assures';
  private baseUrl1 = 'http://localhost:8080/api/contrats/pagination';

  constructor(private httpClient: HttpClient) {}
  

  getContratsSorted(sortOrder: string): Observable<Contrat[]> {
    const params = new HttpParams().set('sortOrder', sortOrder);
    return this.httpClient.get<Contrat[]>(`${this.baseUrl}/sorted`, { params });
  }

  getAllContrats(): Observable<Contrat[]> {
    return this.httpClient.get<Contrat[]>(this.baseUrl);
  }

  // getContratsFiltered(status?: string, assureId?: number, sortOrder?: 'asc' | 'desc'): Observable<Contrat[]> {
  //   let params = new HttpParams();
  //   if (status) {
  //     params = params.append('status', status);
  //   }
  //   if (assureId) {
  //     params = params.append('assureId', assureId.toString());
  //   }
  //   if (sortOrder) {
  //     params = params.append('sortOrder', sortOrder);
  //   }
  //   console.log('Fetching contracts with params:', params.toString());
  //   return this.httpClient.get<Contrat[]>(`${this.baseUrl}/filter`, { params });
  // }


  getContratsFiltered(status?: string, assureId?: number, sortOrder?: 'asc' | 'desc'): Observable<Page<Contrat>> {
    let params = new HttpParams();
    if (status) {
      params = params.append('status', status);
    }
    if (assureId) {
      params = params.append('assureId', assureId.toString());
    }
    if (sortOrder) {
      params = params.append('sortOrder', sortOrder);
    }
    console.log('Fetching contracts with params:', params.toString());
    return this.httpClient.get<Page<Contrat>>(`${this.baseUrl}/filter`, { params });
  }
  

  getContratsByAssure(assureId: number): Observable<Contrat[]> {
    return this.httpClient.get<Contrat[]>(`${this.baseUrl}/assure/${assureId}`);
  }

  getContratById(id: number): Observable<Contrat> {
    return this.httpClient.get<Contrat>(`${this.baseUrl}/${id}`);
  }

  createContrat(contrat: Contrat): Observable<Contrat> {
    return this.httpClient.post<Contrat>(this.baseUrl, contrat);
  }

  updateContrat(id: number, contrat: Contrat): Observable<Contrat> {
    return this.httpClient.put<Contrat>(`${this.baseUrl}/${id}`, contrat);
  }

  deleteContrat(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  getAssureById(assureId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.assureBaseUrl}/${assureId}`);
  }

  getContratsByDateRange(startDate: string, endDate: string): Observable<Contrat[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.httpClient.get<Contrat[]>(`${this.baseUrl}/filterByDateRange`, { params });
  }

  searchContratsByAssure(assureId: number, police: string): Observable<Contrat[]> {
    const params = new HttpParams()
      .set('assureId', assureId.toString())
      .set('police', police);
    return this.httpClient.get<Contrat[]>(`${this.baseUrl}/search`, { params });
  }

  getContratsExpiringAfter(periodType: string): Observable<Contrat[]> {
    const params = new HttpParams().set('periodType', periodType);
    return this.httpClient.get<Contrat[]>(`${this.baseUrl}/filterByExpiration`, { params });
  }

  searchContratsByPolice(police: string): Observable<Contrat[]> {
    const params = new HttpParams().set('police', police);
    return this.httpClient.get<Contrat[]>(`${this.baseUrl}/searchByPolice`, { params });
  }

  getContratCount(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/contrats/count`);
  }
  // getContratsPaginated(page: number, size: number, status: string): Observable<any> {
  //   return this.httpClient.get<any>(`${this.baseUrl}/paginated?page=${page}&size=${size}&status=${status}`);
  // }

  getContratsSortedByDateSignature(sortOrder: string): Observable<Contrat[]> {
    const params = new HttpParams().set('sortOrder', sortOrder);
    return this.httpClient.get<Contrat[]>(`${this.baseUrl}/sortedByDateSignature`, { params });
  }

    // Méthode pour obtenir les contrats triés par date d'expiration
    getContratsSortedByDateExpiration(sortOrder: string): Observable<Contrat[]> {
      const params = new HttpParams().set('sortOrder', sortOrder);
      return this.httpClient.get<Contrat[]>(`${this.baseUrl}/sortedByDateExpiration`, { params });
    }


     // Méthode pour obtenir les contrats triés par numéro de police
  getContratsSortedByPolice(sortOrder: string): Observable<Contrat[]> {
    const params = new HttpParams().set('sortOrder', sortOrder);
    return this.httpClient.get<Contrat[]>(`${this.baseUrl}/sortedByPolice`, { params });
  }

   // Méthode pour obtenir les contrats triés par ID
   getContratsSortedById(sortOrder: string): Observable<Contrat[]> {
    const params = new HttpParams().set('sortOrder', sortOrder);
    return this.httpClient.get<Contrat[]>(`${this.baseUrl}/sortedById`, { params });
  }


  getContratsSortedByCin(sortOrder: string): Observable<Contrat[]> {
    return this.httpClient.get<Contrat[]>(`${this.baseUrl}/assure/sortedByCin?order=${sortOrder}`);
  }




 


  getContrats(page: number, size: number): Observable<Page<Contrat>> {
    return this.httpClient.get<Page<Contrat>>(`${this.baseUrl1}/contrats?page=${page}&size=${size}`);
  }

  // getContrats(status: string, sortOrder: string, sortCriteria: string): Observable<Page<Contrat>> {
  //   return this.httpClient.get<Page<Contrat>>(`${this.baseUrl}/filter`, {
  //     params: new HttpParams()
  //       .set('status', status)
  //       .set('sortOrder', sortOrder)
  //       .set('sortCriteria', sortCriteria)
  //   });
  // }
  

  getContratsSortedByAssureName(sortOrder: string, page: number, size: number): Observable<Page<Contrat>> {
    const params = new HttpParams()
      .set('sortOrder', sortOrder)
      .set('page', page.toString())
      .set('size', size.toString());
  
    return this.httpClient.get<Page<Contrat>>(`${this.baseUrl}/sortedByAssureName`, { params });
  }
 
  

  getContratsSortedByAssureCin(sortOrder: string): Observable<Contrat[]> {
    const params = new HttpParams().set('sortOrder', sortOrder);
    return this.httpClient.get<Contrat[]>(`${this.baseUrl}/sortedByAssureCin`, { params });
  }


  getContratsSortedByAssureNom(sortOrder: string): Observable<Contrat[]> {
    const params = new HttpParams().set('sortOrder', sortOrder);
    return this.httpClient.get<Contrat[]>(`${this.baseUrl}/sortedByAssureNom`, { params });
  }



  getContratsSortedByAssureId(sortOrder: string): Observable<Contrat[]> {
    const params = new HttpParams().set('sortOrder', sortOrder);
    return this.httpClient.get<Contrat[]>(`${this.baseUrl}/sortedByAssureId`, { params });
  }
  
  filterContratsByDateRange(startDate: string, endDate: string): Observable<Contrat[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.httpClient.get<Contrat[]>(`${this.baseUrl}/filterByDateRange`, { params });
  }

  // getContratsByStatus(status: string): Observable<Contrat[]> {
  //   let params = new HttpParams().set('status', status);
  //   return this.httpClient.get<Contrat[]>(`${this.baseUrl}/filterByStatus`, { params });
  // }

  getContratsByStatus(status: string): Observable<Contrat[]> {
    let params = new HttpParams().set('status', status);
    return this.httpClient.get<Contrat[]>(`${this.baseUrl}/filterByStatus`, { params });
  }

  

  getContratsByExpiration(periodType: string): Observable<Contrat[]> {
    const params = new HttpParams().set('periodType', periodType);
    return this.httpClient.get<Contrat[]>(`${this.baseUrl}/filterByExpiration`, { params });
  }



  
  
  
  
  




  

 
}




