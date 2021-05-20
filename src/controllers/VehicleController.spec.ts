import * as chai from 'chai';
import VehicleController from './VehicleController';
import VehicleDatabase from '../database/VehicleDatabase';
import VehicleEntity from '../entity/Vehicle';
import IVehicleEntity from '../interface/models/IVehicleEntity';
import 'mocha';
const expect = chai.expect;

var global_vehicle;

describe("Teste unitário do controlador de Veículo", function() {
    const VE:IVehicleEntity = new VehicleEntity({
      placa: 'TESTE12',
      renavam: '12345678910', 
      chassi: '12345678910', 
      ano: 1999,
      modelo: 'MODELO_TESTE',
      marca: 'MARCA_TESTE'
    });
    describe("CRUD", function() {
      it("Deve criar um veículo no banco de dados", async function() {
        const VehicleUnit = new VehicleController(new VehicleDatabase());
        const vehicle = await VehicleUnit.create(VE);
        expect(vehicle).to.have.property('id');
        global_vehicle = vehicle;
      });

      it("Deve alterar um veículo no banco de dados", async function() {
        const VehicleUnit = new VehicleController(new VehicleDatabase());
        global_vehicle.marca = 'ALTERAÇÃO_MARCA_TESTE';
        let vehicle = await VehicleUnit.edit(global_vehicle);
        expect(vehicle).to.have.property('marca').eql(global_vehicle.marca);
      });

      it("Ler uma lista de veículos", async function() {
        const VehicleUnit = new VehicleController(new VehicleDatabase());
        let vehicles = await VehicleUnit.get_list();
        expect(vehicles).to.have.be.an('array');
      });

      it("Remover o veículo criado", async function() {
        const VehicleUnit = new VehicleController(new VehicleDatabase());
        let vehicles = await VehicleUnit.remove(global_vehicle.id);
        expect(vehicles).to.be.equal(1);
      });
    });
  });
