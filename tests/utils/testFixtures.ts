import { test as base } from '@playwright/test';
import LoginPage from "../pages/loginPage";
import HeaderPage from "../pages/headerPage";
import MyAccountPage from "../pages/myAccountPage";
import CancelMembershipPage from "../pages/cancelMembershipPage";
import AccountReinstatementPage from "../pages/accountReinstatementPopup";
import TextUtils from "./textUtils";
import UserUtils from "./userUtils";
import PwUtils from "./pwUtils";
import DbUtils from "./dbUtils";

type MyFixtures = {
    loginPage: LoginPage;
    headerPage: HeaderPage;
    myAccountPage: MyAccountPage;
    cancelMembershipPage: CancelMembershipPage;
    accountReinstatementPage: AccountReinstatementPage;
    textUtils: TextUtils;
    userUtils: UserUtils;
    pwUtils: PwUtils;
    dbUtils: DbUtils;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {await use (new LoginPage(page))},
    headerPage: async ({ page }, use) => {await use (new HeaderPage(page))},
    myAccountPage: async ({ page }, use) => {await use (new MyAccountPage(page))},
    cancelMembershipPage: async ({ page }, use) => {await use (new CancelMembershipPage(page))},
    accountReinstatementPage: async ({ page }, use) => {await use (new AccountReinstatementPage(page))},
    textUtils: async ({}, use) => {await use (new TextUtils())},
    userUtils: async ({}, use) => {await use (new UserUtils())},
    pwUtils: async ({}, use) => {await use (new PwUtils())},
    dbUtils: async ({}, use) => {await use (new DbUtils())},
});

export { expect } from '@playwright/test';
