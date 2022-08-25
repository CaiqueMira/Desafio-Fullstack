class Database {
  connection;

  init(connection) {
    this.connection = connection;

    this.createVehicleModelsTable();
    this.createVehiclesDataTable();
    this.createUserTable();  
    
  }
  

  

  createVehicleModelsTable() {
    const sql = `CREATE TABLE IF NOT EXISTS vehicle_models (
            id int NOT NULL AUTO_INCREMENT, 
            model varchar(50) NOT NULL UNIQUE, 
            totalVolume int NOT NULL, 
            connected int NOT NULL, 
            softwareUpdates int NOT NULL, 
            PRIMARY KEY(id)
            )`;
    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("vehicle_models table created successfuly");
        this.insertVehicleModel_1();
        this.insertVehicleModel_2();
        this.insertVehicleModel_3();
        this.insertVehicleModel_4();
        this.listVehicleModels();
        

      }
    });
  }

  insertVehicleModel_1() {
    const sql = `INSERT INTO vehicle_models 
    (
        model,
        totalVolume,
        connected,
        softwareUpdates) 
        SELECT
        'Ranger',
        145760,
        70000,
        27550
        WHERE NOT EXISTS (SELECT * FROM vehicle_models WHERE model = 'Ranger')`;
    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  insertVehicleModel_2() {
    const sql = `INSERT INTO vehicle_models 
    (
        model,
        totalVolume,
        connected,
        softwareUpdates
        ) 
        SELECT
        'Mustang',
        1500,
        500,
        750
        WHERE NOT EXISTS (SELECT * FROM vehicle_models WHERE model = 'Mustang')`;
    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  insertVehicleModel_3() {
    const sql = `INSERT INTO vehicle_models 
    (
        model,
        totalVolume,
        connected,
        softwareUpdates
        ) 
        SELECT
        'Territory',
        4560,
        4000,
        3050
        WHERE NOT EXISTS (SELECT * FROM vehicle_models WHERE model = 'Territory')`;
    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  insertVehicleModel_4() {
    const sql = `INSERT INTO vehicle_models 
    (
        model,
        totalVolume,
        connected,
        softwareUpdates
        ) 
        SELECT
        'Bronco Sport',
        7560,
        4060,
        2050
        WHERE NOT EXISTS (SELECT * FROM vehicle_models WHERE model = 'Bronco Sport')`;
    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  createVehiclesDataTable() {
    const sql = `CREATE TABLE IF NOT EXISTS vehicles_data (
            id int NOT NULL AUTO_INCREMENT, 
            vin varchar(20) NOT NULL UNIQUE, 
            odometer varchar(10) NOT NULL, 
            tirePressure varchar(20) NOT NULL, 
            status varchar(20) NOT NULL, 
            batteryStatus varchar(20) NOT NULL, 
            fuelLevel varchar(10) NOT NULL, 
            latitude varchar(20) NOT NULL, 
            longitude varchar(20) NOT NULL, 
            PRIMARY KEY(id))`;
    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("vehicles_data table created successfully");
        this.insertVehicleData_1();
        this.insertVehicleData_2();
        this.insertVehicleData_3();
        this.insertVehicleData_4();
        this.insertVehicleData_5();
        this.insertVehicleData_6();
        this.listVehiclesData();
      }
    });
  }

  insertVehicleData_1() {
    const sql = `INSERT INTO vehicles_data (            
        vin,
        odometer,
        tirePressure,
        status,
        batteryStatus,
        fuelLevel,
        latitude,
        longitude) 
        SELECT
        '2FRHDUYS2Y63NHD22454',
        '23344',
        '36,36,35,34',
        'on',
        'Ok',
        '76',
        '-12,2322',
        '-35,2314'
        WHERE NOT EXISTS (SELECT * FROM vehicles_data WHERE vin = '2FRHDUYS2Y63NHD22454')`;
    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  insertVehicleData_2() {
    const sql = `INSERT INTO vehicles_data (            
        vin,
        odometer,
        tirePressure,
        status,
        batteryStatus,
        fuelLevel,
        latitude,
        longitude) 
        SELECT
        '2FRAASDY54E4HDU34874',
        '130000',
        '36,34,36,33',
        'Off',
        'Recharge',
        '19',
        '-12,2322',
        '-35,2314'
        WHERE NOT EXISTS (SELECT * FROM vehicles_data WHERE vin = '2FRAASDY54E4HDU34874')`;
    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  insertVehicleData_3() {
    const sql = `INSERT INTO vehicles_data (            
        vin,
        odometer,
        tirePressure,
        status,
        batteryStatus,
        fuelLevel,
        latitude,
        longitude) 
        SELECT
        '2FRHDUYS2Y63NHD22455',
        '50000',
        '36,36,35,34',
        'on',
        'Ok',
        '90',
        '-12,2322',
        '-35,2314'
        WHERE NOT EXISTS (SELECT * FROM vehicles_data WHERE vin = '2FRHDUYS2Y63NHD22455')`;
    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  insertVehicleData_4() {
    const sql = `INSERT INTO vehicles_data (            
        vin,
        odometer,
        tirePressure,
        status,
        batteryStatus,
        fuelLevel,
        latitude,
        longitude) 
        SELECT
        '2RFAASDY54E4HDU34875',
        '10000',
        '36,34,33,33',
        'off',
        'Ok',
        '25',
        '-12,2322',
        '-35,2314'
        WHERE NOT EXISTS (SELECT * FROM vehicles_data WHERE vin = '2RFAASDY54E4HDU34875')`;
    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  insertVehicleData_5() {
    const sql = `INSERT INTO vehicles_data (            
        vin,
        odometer,
        tirePressure,
        status,
        batteryStatus,
        fuelLevel,
        latitude,
        longitude) 
        SELECT
        '2FRHDUYS2Y63NHD22654',
        '23544',
        '36,36,35,34',
        'on',
        'Ok',
        '76',
        '-12,2322',
        '-35,2314'
        WHERE NOT EXISTS (SELECT * FROM vehicles_data WHERE vin = '2FRHDUYS2Y63NHD22654')`;
    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  insertVehicleData_6() {
    const sql = `INSERT INTO vehicles_data
    (                   
        vin,
        odometer,
        tirePressure,
        status,
        batteryStatus,
        fuelLevel,
        latitude,
        longitude
        ) 
        SELECT
        '2FRHDUYS2Y63NHD22854',
        '23574',
        '36,36,35,34',
        'on',
        'Ok',
        '76',
        '-12,2322',
        '-35,2314'
        WHERE NOT EXISTS (SELECT * FROM vehicles_data WHERE vin = '2FRHDUYS2Y63NHD22854')`;
    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  createUserTable() {
    const sql = `CREATE TABLE IF NOT EXISTS user (
                id int NOT NULL AUTO_INCREMENT, 
                name varchar(20) NOT NULL UNIQUE, 
                email varchar(100) NOT NULL, 
                password varchar(100) NOT NULL, 
                fullName varchar(100) NOT NULL, 
                signupDate datetime NOT NULL, 
                PRIMARY KEY(id))`;
    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("user table created successfully");
        this.insertUser_1();
        this.insertUser_2();
        this.listUsers();
      }
    });
  }

  insertUser_1() {
    const sql = `INSERT INTO user (
        name,
        email,
        password,
        fullName,
        signupDate
        ) 
        SELECT
        'admin', 
        'admin@ford.com', 
        '123456', 
        'Admin', 
        '2021-10-07 13:28:36'            
        WHERE NOT EXISTS (SELECT * FROM user WHERE name = 'admin')`;
    this.connection.query(sql, (error, results) => {
      if (error) {
        console.log(error);
      }
    });
  }

  insertUser_2() {
    const sql = `INSERT INTO user (
        name,
        email,
        password,
        fullName,
        signupDate
        ) 
        SELECT
        'diogo', 
        'diogo@ford.com', 
        '1234', 
        'Diogo', 
        '2021-10-07 13:28:36'            
        WHERE NOT EXISTS (SELECT * FROM user WHERE name = 'diogo')`;
    this.connection.query(sql, (error, results) => {
      if (error) {
        console.log(error);
      }
    });
  }

  /***************************************/

  listUsers() {
    const sql = `SELECT * FROM user`;

    this.connection.query(sql, (error, user) => {
      console.log("Users");
      console.log(user);
    });
  }

  listVehiclesData() {
    const sql = `SELECT * FROM vehicles_data`;

    this.connection.query(sql, (error, vehiclesData) => {
      console.log("VehiclesData");
      console.log(vehiclesData);
    });
  }

  listVehicleModels() {
    const sql = `SELECT * FROM vehicle_models`;

    this.connection.query(sql, (error, vehicleModels) => {
      console.log("VehicleModels");
      console.log(vehicleModels);
    });
  }
}

module.exports = new Database();
