import { VehicleData, VehiclesData } from '../interfaces/vehicleData.model';
import { switchMap, filter, debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { Vehicle, Vehicles } from '../interfaces/vehicleModel.model';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { faArrowsRotate, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

const WAIT_TYPING = 350
declare var google: any


@Component({
  selector: 'app-dashboard-info',
  templateUrl: './dashboard-info.component.html',
  styleUrls: ['./dashboard-info.component.css']
})
export class DashboardInfoComponent implements OnInit {
  allVehicles!: Vehicles;
  vehicleObject!: Vehicle;
  vehicleUrl!: string;
  selectInput!: string;
  vehicleData!: VehicleData | undefined;
  tableForm!: FormGroup;
  chartsData!: number[][]
  chartPercentageConnected!: string
  chartPercentageSoftwareUpdates!: string

  faPlus = faPlus
  faArrowsRotate = faArrowsRotate
  faTrashCan = faTrashCan

  constructor(
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder
  ) {}

  // Verifica qual veículo com suas respectivas informações deve ser exibido
  verifyVehicle() {
    const vehicleName = this.selectInput;
    this.allVehicles.forEach((vehicleInfo) => {
      if (vehicleName === vehicleInfo.model) {
        this.vehicleObject = vehicleInfo;

        // Faz a busca da imagem do veículo de acordo com o seu nome
        this.vehicleUrl = `../../../assets/imgs/${this.formatString(this.vehicleObject.model)}.png`;
      }
    });
    this.showDonutCharts()
  }

  // Verifica quais dados devem ser exibidos de acordo com o código inserido e filtra somente um conjunto de dados
  verifyVehicleData(arrayDatas: VehiclesData) {
    console.log(arrayDatas)
    arrayDatas.length == 1
      ? (this.vehicleData = arrayDatas.shift())
      : (this.vehicleData = undefined);
  }

  // Realiza a conversão camelCase da string que irá buscar a imagem do carro
  formatString(string: string) {
    const arrString = string.toLowerCase().split(" ")
    if(arrString.length > 1){
      for(let i = 1 ; i < arrString.length ; i++) {
        arrString[i] = arrString[i][0].toUpperCase() + arrString[i].substring(1)
      }
    }
    const formatedString = arrString.join('')
    return formatedString
  }

  // Método responsável por exibir e atualizar os gráficos
  showDonutCharts(): void {
    this.donutChartConnected()
    this.donutChartSoftwareUpdates()
  }


  // Seta as configurações do gráfico de conectados
  donutChartConnected(): void {
    const elementRef = document.getElementById('donut_chart_connected')

    const chart = new google.visualization.PieChart(elementRef)
    const options = this.getOptions("Conectados")

    options['pieHole'] = 0.6
    chart.draw(this.getDataTable("Conectados", this.vehicleObject.connected), options)
    this.chartPercentageConnected = ((this.vehicleObject.connected / this.vehicleObject.totalVolume) * 100).toFixed(2)
  }

  // Seta as configurações do gráfico de update software
  donutChartSoftwareUpdates() {
    const elementRef = document.getElementById('donut_chart_software_updates')

    const chart = new google.visualization.PieChart(elementRef)
    const options = this.getOptions("Update Software")

    options['pieHole'] = 0.6
    chart.draw(this.getDataTable("Atualizados", this.vehicleObject.softwareUpdates), options)
    this.chartPercentageSoftwareUpdates = ((this.vehicleObject.softwareUpdates / this.vehicleObject.totalVolume) * 100).toFixed(2)
  }

  // Configuração dos conteúdos dos gráficos
  getDataTable(column: string, value: number): any {
    const data = new google.visualization.DataTable()

    data.addColumn('string', 'Category')
    data.addColumn('number', 'Amount');
    let row = [
      [column, value],
      ["Total", this.vehicleObject.totalVolume - value]
    ]

    data.addRows(row)

    return data
  }

  // Opções e configurações de estilo dos gráficos
  getOptions(title: string): any {
    return {
      'title': title,
      'titleTextStyle': {
        fontSize: '23'
      },
      'width': 400,
      'height': 300,
      'legend': 'none',
      'slices': {
        0: { color: '#02165E' },
        1: { color: '#DCDCDA'}
      },
      'pieSliceTextStyle': {
        color: '#DC6A62'
      }
    }
  }



  ngOnInit(): void {

    // Obtem todos os veículos cadastrados no backend
    if(!this.allVehicles) {
      this.dashboardService.getAllVehicles().subscribe({
        next: (apiReturn) => {
          this.allVehicles = apiReturn;
          this.vehicleObject = this.allVehicles[0];
          this.vehicleUrl = `../../../assets/imgs/${this.formatString(this.vehicleObject.model)}.png`;
        },
        error: (error) => {
          console.log(error);
        },
      });
    }

    // Inicializa o formulário onde será inserido o código Vin
    this.tableForm = this.formBuilder.group({
      vinCodeInput: [''],
    });

    // Inicializa API de gráficos
    if(typeof(google) !== 'undefined') {
      google.charts.load('current', {'packages':['corechart']});
      setTimeout(() => {
        google.charts.setOnLoadCallback(this.showDonutCharts())
      }, 1000)
    }


    // Realiza a requisição no backend para coletar os dados dos veículos de acordo com o código obtido do formulário
    this.tableForm
      .get('vinCodeInput')
      ?.valueChanges.pipe(
        debounceTime(WAIT_TYPING),
        filter((typedValue) => typedValue.length >= 17),
        distinctUntilChanged(),
        switchMap((typedValue) =>
          this.dashboardService.getVehicleData(typedValue)
        )
      )
      .subscribe({
        next: (arrayDatas) => {
          this.verifyVehicleData(arrayDatas);
        },
        error: (error) => console.log(error),
      });
  }

}
