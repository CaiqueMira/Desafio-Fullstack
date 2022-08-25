import { VehicleData, vehicleDataAPI, VehiclesDatas } from './../interfaces/vehicleData';
import { Veiculo, Veiculos, VeiculosAPI } from './../interfaces/veiculo.model';
import { map, Observable, tap, pluck } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


const API = environment.apiUrl;


@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private httpClient: HttpClient) {}

  getAllVehicles(): Observable<Veiculos> {
    return this.httpClient.get<VeiculosAPI>(`${API}/vehicleModel`).pipe(
      map((value) => value?.vehicles)
    );
  }

  getVehicleData(value?: string): Observable<VehiclesDatas> {
    return this.httpClient.get<vehicleDataAPI>(`${API}/vehicleDataVin/${value}`).pipe(
      tap((apiDatas) => console.log(apiDatas)),
      map((apiDatas) => apiDatas?.vehicleData)
    )
  }

}
