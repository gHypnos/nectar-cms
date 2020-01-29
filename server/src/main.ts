import { join } from "path";
import { Connection, createConnection } from "typeorm";
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { Config } from '../config';
import * as DBConfig from '../ormconfig.json';
import Logger from './common/Logger';
import NectarSettings from './database/nectarSettings';
import Server from './server';

DBConfig.entities.push(join(__dirname, '/database/entities/*Entity.ts'))
console.clear();
async function init(): Promise<void> {
    try {
        new Server(Config.port);
        const connection = await createConnection(DBConfig as MysqlConnectionOptions).then((connection: Connection) => {
            Logger.imp('Connected to ' + connection.options.database)
        });
        await new NectarSettings();
    }

    catch (err) {
        Logger.error(err.message || err);
    }
}

init();