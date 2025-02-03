import sql from 'mssql';

export default class DbUtilsSql {

    private readonly user: string;
    private readonly password: string;
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
        const config = {
            server: this.server,
            database: this.dataBase,
            authentication:{
                type: 'ntlm', // Use NTLM for Windows Authentication
                options: {
                    // userName: this.user, // Replace with your Windows username
                    // password: this.password, // Replace with your Windows password
                    domain: this.domain      // Replace with your Windows domain
                }
            },
            options: {
                encrypt: true,
                trustServerCertificate: true
            }
        };


        console.log("$$$ Start Connection");

        try {
            // Establish a connection using the connection string
            const pool = await sql.connect(config);
            console.log("$$$ Connection Established");

            // Execute the query
            const result = await pool.request().query(query);
            console.log("$$$ Query Executed");

            return result.recordset; // Return the rows from the result
        } catch (err) {
            console.error("$$$ Database Query Failed", err);
            throw err; // Propagate the error
        } finally {
            // Ensure the connection is closed
            await sql.close();
            console.log("$$$ Connection Closed");
        }
    }

    async executeQuery2(query: string) {
        const connectionStringFull = `Server=${this.server};Database=${this.dataBase};User ID=${this.user};Password=${this.password};Encrypt=True;TrustServerCertificate=True;`;
        const connectionString = `Server=${this.server};Database=${this.dataBase};Encrypt=True;TrustServerCertificate=True;IntegratedSecurity=true;`;
        console.log(`Connection string: ${connectionString}`);

        console.log("$$$ Start Connection");

        try {
            // Establish a connection using the connection string
            const pool = await sql.connect(connectionString);
            console.log("$$$ Connection Established");

            // Execute the query
            const result = await pool.request().query(query);
            console.log("$$$ Query Executed");

            return result.recordset; // Return the rows from the result
        } catch (err) {
            console.error("$$$ Database Query Failed", err);
            throw err; // Propagate the error
        } finally {
            // Ensure the connection is closed
            await sql.close();
            console.log("$$$ Connection Closed");
        }
    }

    async executeQuery1(query: string) {
        const connectionString = `DSN=${this.server};server=${this.server};Database=${this.dataBase};Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}`;
        const connectionStringJava = "jdbc:sqlserver://AWECORPQA1DB01.onetech.local;integratedSecurity=true;";
        const connectionStringBryan = `Server=${this.server};Database=${this.dataBase};User ID=${this.user};Password=${this.password};Encrypt=True;TrustServerCertificate=True;`
        console.log("Start Connection");

        return new Promise((resolve, reject) => { // Wrap the SQL query in a Promise
            sql.query(connectionString, query, (err, rows) => {
                console.log("Inside Connection");
                if (err) {
                    reject(err); // Reject the promise if there is an error
                } else {
                    resolve(rows); // Resolve the promise with the results
                }
            });
        });
    }
}