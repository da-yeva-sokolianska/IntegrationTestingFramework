import {expect, Locator, Page} from "@playwright/test";
import {MyAccountPage} from "./myAccountPage";

export class AccountReinstatementPage {
    private readonly confirmButton: Locator;

    constructor(public readonly page: Page) {
        this.confirmButton = this.page.locator('[data-control="Confirm"]');
    }

    async confirmButtonClick(myAccountPage: MyAccountPage) {
        await expect (this.confirmButton).toBeVisible().then(() => {
            this.confirmButton.click();
        });
        await myAccountPage.verifyMembershipReinstatedCheckmarkIsDisplayed();
    }
}