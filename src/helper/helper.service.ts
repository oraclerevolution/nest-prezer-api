import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import InfisicalClient from 'infisical-node';

@Injectable()
export class HelperService {
    public static getConfigBoolValue(
        configService: ConfigService,
        key: string,
      ): boolean {
        const rawConfigValue = configService.get<boolean>(key);
        let configValue = false;
        if (typeof rawConfigValue === 'boolean') {
          configValue = rawConfigValue;
        }
        if (typeof rawConfigValue === 'string') {
          const sslString = rawConfigValue as string;
          configValue = sslString === 'true';
        }
        return configValue;
    }

    public static async infisicalCreateClient(env: string) {
        const client = new InfisicalClient({
            token:"186edbd8c56c1fef7058b198de3fde07"
        });
        
        const variable = await client.getSecret(env);
        console.log("variable", variable);
        return variable
    }
}
