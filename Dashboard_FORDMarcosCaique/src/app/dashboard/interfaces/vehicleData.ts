export interface VehiclesDatas extends Array<VehicleData> {}

export interface VehicleData {
  id: number
  vin: string
  odometer: string
  tirePressure: string
  status: string
  batteryStatus: string
  fuelLevel: string
  latitude: string
  longitude: string
}

export interface vehicleDataAPI {
  vehicleData: VehiclesDatas
}
