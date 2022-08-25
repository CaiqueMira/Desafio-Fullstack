export interface Veiculos extends Array<Veiculo> {}

export interface Veiculo{
  id: number
  model: string
  totalVolume: number
  connected: number
  softwareUpdates: number
}

export interface VeiculosAPI {
  vehicles: Veiculos;
}
