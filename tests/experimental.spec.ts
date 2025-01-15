import {expect, test} from './utils/testFixtures';

test.describe('Experiments with new utils', () => {

    test('DB connection', async ({userUtils, dbUtils}) => {
        let query = `select * from CreditFulfillment..aspnet_Users where username=
                                                    ${userUtils.getLogin()}`
        // await dbUtils.executeQuery(query);

        try {
            const results = await dbUtils.executeQuery(query);
            console.log("Query Results:", results);
        } catch (error) {
            console.error("Query failed:", error);
        }
        console.log("Execution complete!");

    });

    test.skip('Enrollment test', async({userUtils}) => {

        const userName = 'CSIDAnneabTest';
        const env = 'AWEQA1';
        await userUtils.enroll(userName, env, true)
            .then((response) => {

                expect(response).toBe(303)})

    })
});