import * as sql from 'msnodesqlv8';

export default class DbUtils {

    private readonly user: string;
    private readonly password: string;
    private server: string;
    private dataBase;

    constructor() {
        this.user = "ysokolianska";
        this.password = "Chepets_098poilk1";
        // this.user = "svc-jenkinsblds";
        // this.password = "Pom1dor4ik";
        this.server = "AWECORPQA1DB01.onetech.local";
        this.dataBase = "OTServices";
    }

    async executeQuery(query: string) {
        const connectionString = `DSN=${this.server};server=${this.server};Database=${this.dataBase};Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}`;
        const connectionStringJava = "jdbc:sqlserver://AWECORPQA1DB01.onetech.local;integratedSecurity=true;";

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