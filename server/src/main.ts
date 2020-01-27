import { join } from "path";
import { Connection, createConnection } from "typeorm";
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import * as DBConfig from '../ormconfig.json';
import Logger from './common/Logger';
import Server from './server';

DBConfig.entities.push(join(__dirname, '/database/entities/*Entity.ts'))
console.clear();
new Server(3000);
async function init(): Promise<void> {
    try {
        const connection = await createConnection(DBConfig as MysqlConnectionOptions).then((connection: Connection) => {
            Logger.imp('Connected to ' + connection.options.database)
        });
    }

    catch (err) {
        Logger.error(err.message || err);
    }
}

init();