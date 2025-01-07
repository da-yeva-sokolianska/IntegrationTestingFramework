import { Client } from "pg";


export default class DbUtils {
    // private DBConfig = {
    //     user: "svc-jenkinsblds",
    //     host: "AWECORPQA1DB01.onetech.local", // https://environment.onetech.local
    //     // database: "AWECORPQA1DB01", // "jdbc:sqlserver://environment.onetech.local;databaseName=OTServices;integratedSecurity=true;"
    //     password: "Pom1dor4ik",
    //     port: 1433,
    //     idleTimeoutMillis: 300000,
    //     connectionTimeoutMillis: 20000,
    //     // options: {
    //     //     encrypt: true,
    //     //     trustServerCertificate: true,
    //     //     integratedSecurity: true
    //     // }
    //     ssl: {
    //         rejectUnauthorized: false
    //     }
    // };

    private DBConfig = {
        user: "svc-jenkinsblds",
        host: "AWECORPQA1DB01.onetech.local",
        database: "OTServices",
        password: "Pom1dor4ik",
        port: 1433,
        idleTimeoutMillis: 300000,
        connectionTimeoutMillis: 20000,
        ssl: {
            rejectUnauthorized: false
        }
    };

    // async executeQuery(query: string) {
    //     // const client = new Client(this.DBConfig);
    //     // await client.connect();
    //     // const result = await client.query(query);
    //     // console.log(result.rows);
    //     // await client.end();
    //
    //     const client = new Client(this.DBConfig);
    //     try {
    //         await client.connect();
    //         const result = await client.query(query);
    //         console.log(result.rows);
    //     } catch (error) {
    //         console.error('Error executing query:', error);
    //     } finally {
    //         await client.end();
    //     }
    // }

    async executeQuery(query: string) {
        const client = new Client({
            ...this.DBConfig,
            native: true // Use pg-native for Windows Authentication
        });
        try {
            await client.connect();
            const result = await client.query(query);
            console.log(result.rows);
        } catch (error) {
            console.error('Error executing query:', error);
        } finally {
            await client.end();
        }
    }
}

