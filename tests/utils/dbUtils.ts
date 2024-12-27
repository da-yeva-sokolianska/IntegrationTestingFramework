import { Client } from "pg";

export default class DbUtils {
    private DBConfig = {
        user: "db_user",
        host: "localhost", // https://environment.onetech.local
        database: "local_db", // "jdbc:sqlserver://environment.onetech.local;databaseName=OTServices;integratedSecurity=true;"
        password: "pass",
        port: 5477,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    };

    async executeQuery(query: string) {
        const client = new Client(this.DBConfig);
        await client.connect();
        const result = await client.query(query);
        console.log(result.rows);
        await client.end();
    }
}

