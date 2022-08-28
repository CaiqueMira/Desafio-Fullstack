export interface Vehicles extends Array<Vehicle> {}

export interface Vehicle{
  id: number
  model: string
  totalVolume: number
  connected: number
  softwareUpdates: number
}

export interface VehiclesAPI {
  vehicles: Vehicles;
}
