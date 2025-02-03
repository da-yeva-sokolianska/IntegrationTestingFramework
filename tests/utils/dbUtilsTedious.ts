// import * as sql from 'mssql';
import * as fs from 'fs';
// import * as sql from "mssql/msnodesqlv8";
import { Connection, Request } from 'tedious';

export default class DbUtilsTedious {

    private user: string;
    private password: string;
    private server: string;
    private dataBase;
    private domain;

    constructor() {
        this.user = "svc-jenkinsblds";
        this.password = "Pom1dor4ik";
        this.server = "AWECORPQA1DB01.onetech.local";
        this.dataBase = "OTServices";
        this.domain = "ONETECH.local"
    }

    async executeQuery(query: string) {

        type AuthenticationType =
            | 'ntlm'
            | 'default'
            | 'token-credential'
            | 'azure-active-directory-password'
            | 'azure-active-directory-msi-app-service'
            | 'azure-active-directory-msi-vm'
            | 'azure-active-directory-access-token'
            | 'azure-active-directory-service-principal-secret'
            | 'azure-active-directory-default';

        const config = {
            server: this.server, // Replace with your SQL Server hostname or IP
            authentication:{
                type: 'ntlm' as AuthenticationType, // Use NTLM for Windows Authentication
                options: {
                    userName: this.user, // Replace with your Windows username
                    password: this.password, // Replace with your Windows password
                    domain: this.domain      // Replace with your Windows domain
                }
            },
            options: {
                database: this.dataBase,          // Replace with your database name
                encrypt: true,                      // Enable encryption (recommended for production)
                trustServerCertificate: true        // Skip certificate validation (useful for development)
            }
        };

        console.log("$$$ Start Connection");

            return new Promise((resolve, reject) => {
                const connection = new Connection(config);

                connection.on('connect', (err) => {
                    if (err) {
                        reject(`Connection failed: ${err.message}`);
                    } else {
                        console.log('Connected to SQL Server!');

                        const request = new Request(query, (err) => {
                            if (err) {
                                reject(`Error executing query: ${err.message}`);
                            }
                        });

                        const results: any[] = [];

                        request.on('row', (columns) => {
                            const result: Record<string, any> = {};
                            columns.forEach((column) => {
                                result[column.metadata.colName] = column.value;
                            });
                            results.push(result);
                        });

                        request.on('doneInProc', (rowCount, more) => {
                            console.log(`${rowCount} rows returned.`);
                            resolve(results); // Resolve with the results when done
                        });

                        request.on('error', (err) => {
                            reject(`Error during request: ${err.message}`);
                        });

                        connection.execSql(request);
                    }
                });

                connection.on('error', (err) => {
                    reject(`Connection error: ${err.message}`);
                });

                connection.connect();
            });
        };

}