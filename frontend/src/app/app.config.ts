import { OpaqueToken } from "@angular/core";

export let APP_CONFIG = new OpaqueToken("app.config");

export interface IAppConfig {
    apiEndpoint: string;
}

export const AppConfig: IAppConfig = {
    apiEndpoint: "http://localhost:3002"
    //apiEndpoint: "http://ec2-35-160-38-34.us-west-2.compute.amazonaws.com:3002"
};


