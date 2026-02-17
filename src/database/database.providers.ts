import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [ConfigService],
    useFactory: (configService: ConfigService): Promise<typeof mongoose> => {
      const dbPassword = configService.get<string>('DB_PASSWORD');

      if (!dbPassword) {
        throw new Error(
          'não foi possível conectar ao banco de dados. a variável DB_PASSWORD não foi encontrada',
        );
      }

      const url = `mongodb+srv://rauatorres:${dbPassword}@library-app-cluster.cpuaij6.mongodb.net/?appName=library-app-cluster`;
      return mongoose.connect(url);
    },
  },
];
