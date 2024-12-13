import {test} from './utils/testFixtures';

test.only('Verify that user with the State eligible for the online cancel ' +
    'is able to cancel and reactivate from the Portal.',
    // ToDo: refactor to not include classes to the test call
    async ({userUtils, loginPage, headerPage, myAccountPage, cancelMembershipPage, accountReinstatementPage}) => {

        // #0 - Create user -> ToDo
        // ToDo: Load user from local file
        // let login = 'anneabtestcsid@dataart.com';
        let login = userUtils.getLogin();
        let password = userUtils.getPassword();
        // let password = 'password1';

            // test.setTimeout(150_000);

        // #1
        await loginPage.login(login, password);
        await headerPage.hoverProfileIcon();
        await headerPage.clickAccountSettings();
        // #2
        await myAccountPage.clickCancelMembership();
        await cancelMembershipPage.verifyCancelUrl();
        // #3
        await cancelMembershipPage.clickYesCancelMembershipButton();
        await cancelMembershipPage.verifySurveyUrl();
        await cancelMembershipPage.verifyTitle();
        await cancelMembershipPage.verifySubTitle();
        const number = await cancelMembershipPage.getNumberFromSubtitle();
        const date = await cancelMembershipPage.getDateFromSubtitle();
        // #4 - DB check -> ToDo
        // #5
        await cancelMembershipPage.clickCloseButton();
        await headerPage.hoverProfileIcon();
        await headerPage.clickAccountSettings();
        // #6
        await myAccountPage.verifyAccountCancelTitles();
        await myAccountPage.verifyAccountCancelTitleContainsNumber(number);
        await myAccountPage.verifyAccountCancelTitleContainsDate(date);
        await myAccountPage.clickReinstateAccountButton();
        // #7
        await accountReinstatementPage.confirmButtonClick(myAccountPage);
        // #8 - DB check -> ToDo
});