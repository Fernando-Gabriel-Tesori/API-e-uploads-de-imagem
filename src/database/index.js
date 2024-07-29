import Sequelize from 'sequelize';
import configDatabase from '../config/database';
import User from '../app/models/User';

const models = [User]; 

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(configDatabase);
        models.forEach((model) => model.init(this.connection)); // Ajuste para usar forEach em vez de map
    }
}

export default new Database();
