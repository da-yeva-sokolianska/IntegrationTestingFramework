import {expect, test} from './utils/testFixtures';

test.describe('Experiments with new utils', () => {

    test('DB connection', async ({userUtils, dbUtils}) => {
        let query = `select * from CreditFulfillment..aspnet_Users where username=
                                                    ${userUtils.getLogin()}`
        await dbUtils.executeQuery(query);

        try {
            const results = await dbUtils.executeQuery(query);
            console.log("$$$ Query Results:", results);
        } catch (error) {
            console.error("$$$ Query failed:", error);
        }
        console.log("$$$ Execution complete!");

    });

    test('DB connection Tedious', async ({userUtils, dbUtilsTedious}) => {
        let query = `select * from CreditFulfillment..aspnet_Users where username=
                                                    ${userUtils.getLogin()}`
        await dbUtilsTedious.executeQuery(query);

        try {
            const results = await dbUtilsTedious.executeQuery(query);
            console.log("$$$ Query Results:", results);
        } catch (error) {
            console.error("$$$ Query failed:", error);
        }
        console.log("$$$ Execution complete!");
    });

    test.only('DB connection Sql', async ({userUtils, dbUtilsSql}) => {
        let query = `select * from CreditFulfillment..aspnet_Users where username=
                                                    ${userUtils.getLogin()}`
        await dbUtilsSql.executeQuery(query);

        try {
            const results = await dbUtilsSql.executeQuery(query);
            console.log("$$$ Query Results:", results);
        } catch (error) {
            console.error("$$$ Query failed:", error);
        }
        console.log("$$$ Execution complete!");

    });
});