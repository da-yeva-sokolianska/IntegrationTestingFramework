import {test} from './utils/testFixtures';

test.describe('Online canceling UI', () => {
        test.only('Verify that user with the State eligible for the online cancel ' +
            'is able to cancel and reactivate from the Portal.',
            // ToDo: refactor to not include classes to the test call ?
            async ({loginPage, headerPage, myAccountPage, cancelMembershipPage,
                           accountReinstatementPage}) => {

                // #0 - Create user -> ToDo
                // ToDo: Load user from local file ???

                await test.step('#1 Login to ScoreSense and navigate to Account Settings', async () => {
                        await loginPage.loginDefault();
                        await headerPage.hoverProfileIcon();
                        await headerPage.clickAccountSettings();
                });

                await test.step('#2 Click "Cancel Membership" button', async () => {
                        await myAccountPage.clickCancelMembership();
                        await cancelMembershipPage.verifyCancelUrl();
                });

                await test.step('#3 Click "Yes, Cancel Membership" button', async () => {
                        await cancelMembershipPage.clickYesCancelMembershipButton();
                        await cancelMembershipPage.verifySurveyUrl();
                        await cancelMembershipPage.verifyTitle();
                        await cancelMembershipPage.verifySubTitle();
                })

                const [number, date] = await test.step('Save cancellation number and date', async() => {
                        return [await cancelMembershipPage.getNumberFromSubtitle(),
                                await cancelMembershipPage.getDateFromSubtitle()];
                })

                // #4 - DB check -> ToDo

                await test.step('#5 Click "Close" button and navigate to the Account Settings', async () => {
                        await cancelMembershipPage.clickCloseButton();
                        await headerPage.hoverProfileIcon();
                        await headerPage.clickAccountSettings();
                })

                await test.step('#6 Click "Reinstate Account" button', async () => {
                        await myAccountPage.verifyAccountCancelTitles();
                        await myAccountPage.verifyAccountCancelTitleContainsNumber(number);
                        await myAccountPage.verifyAccountCancelTitleContainsDate(date);
                        await myAccountPage.clickReinstateAccountButton();
                })

                await test.step('#7 Click "Confirm" button on Account Reinstatement', async () => {
                        await accountReinstatementPage.confirmButtonClick(myAccountPage);
                })
                // #8 - DB check -> ToDo
        })

        test.afterEach( async ({ loginPage, headerPage, myAccountPage, accountReinstatementPage }, testInfo) => {
                await test.step('TearDown: Reinstate Account', async () => {
                        if (testInfo.status !== testInfo.expectedStatus) {
                                console.log('TearDown: Reinstate Account');
                                await loginPage.loginDefault();
                                await headerPage.hoverProfileIcon();
                                await headerPage.clickAccountSettings();
                                await myAccountPage.clickReinstateAccountButtonIfExists();
                                await accountReinstatementPage.confirmButtonClick(myAccountPage);
                        }
                })
        })
});