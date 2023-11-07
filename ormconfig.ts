const ConnectionOptions = require('typeorm');
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configSerive = new ConfigService();

export default new ConnectionOptions.DataSource({
  type: 'mysql',
  host: configSerive.get('DB_HOST'),
  port: configSerive.get('DB_PORT'),
  username: configSerive.get('DB_USER'),
  password: configSerive.get('DB_PASSWORD'),
  database: configSerive.get('DB_NAME'),
  entities: ['dist/**/*.entity{.ts,.js}'],

  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  migrationsRun: true,
  logging: false,
  // logger: 'file',

  migrations: ['dist/src/database/*{.ts,.js}'],
  cli: {
    migrationsDir: './src/database',
  },
  migrationsTableName: 'migrations',
});