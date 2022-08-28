import { VehicleData, vehicleDataAPI, VehiclesData } from './interfaces/vehicleData.model';
import { Vehicles, VehiclesAPI } from './interfaces/vehicleModel.model';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


const API = environment.apiUrl;


@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  constructor(private httpClient: HttpClient) {}

  getAllVehicles(): Observable<Vehicles> {
    return this.httpClient.get<VehiclesAPI>(`${API}/vehicleModel`).pipe(
      map((value) => value?.vehicles)
      );
  }

  getVehicleData(value?: string): Observable<VehiclesData> {
    return this.httpClient.get<vehicleDataAPI>(`${API}/vehicleDataVin/${value}`).pipe(
      map((apiDatas) => apiDatas?.vehicleData)
      )
  }

  addVehicleData(vehicleData: VehicleData) {
    return this.httpClient.post(`${API}/vehicleData`, vehicleData)
  }


  updateVehicleData(id: number, vehicleData: VehicleData) {
    return this.httpClient.patch(`${API}/vehicleData/${id}`, vehicleData)
  }

  removeVehicleData(id: number) {
    return this.httpClient.delete(`${API}/vehicleData/${id}`)
  }

  existingVINCode(vin: string) {
    return this.httpClient.get(`${API}/vehicleDataVin/exists/${vin}`)
  }

}
