import {expect, test} from './utils/testFixtures';

test.describe('Experiments with new utils', () => {

    test('DB connection', async ({userUtils, dbUtils}) => {
        let query = `select * from CreditFulfillment..aspnet_Users where username=
                                                    ${userUtils.getLogin()}`
        await dbUtils.executeQuery(query);
    });

    test.skip('Enrollment test', async({userUtils}) => {

        const userName = 'CSIDAnneabTest';
        const env = 'AWEQA2';
        await userUtils.enroll(userName, env, true)
            .then((response) => {

                expect(response).toBe(303)})

    })
});