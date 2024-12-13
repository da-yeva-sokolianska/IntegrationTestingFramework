import {expect, Locator, Page} from "@playwright/test";

export class MyAccountPage {
    private readonly cancelMembershipButton: Locator;
    private readonly reinstateAccountButton: Locator;
    private readonly membershipReinstatedBanner: Locator;
    private readonly canceledTitle: Locator;
    private readonly canceledSubTitle: Locator;

    constructor(public readonly page: Page) {
        this.cancelMembershipButton = this.page.locator('.form-cta-button[data-control="CancelMembershipBtn"]');
        this.reinstateAccountButton = this.page.locator('[data-control="ReinstateAccountBtn"]');
        this.membershipReinstatedBanner = this.page.locator('.membership-reinstatment-success-banner-text');
        this.canceledTitle = this.page.locator('.main-cancel-text');
        this.canceledSubTitle = this.page.locator('.sub-cancel-text');
    }

    async clickCancelMembership() {
        await this.cancelMembershipButton.scrollIntoViewIfNeeded();
        await  expect(this.cancelMembershipButton).toBeVisible().then(() => {
            this.cancelMembershipButton.click();
        })
        await this.page.waitForSelector('button:has-text(" Yes, Cancel Membership ")');
    }

    async verifyAccountCancelTitles() {
        await this.reinstateAccountButton.scrollIntoViewIfNeeded();
        await expect.soft(this.canceledTitle).toContainText(
            'Your ScoreSense account is canceled.'
        );
        await expect.soft(this.canceledSubTitle).toContainText(
            'You will continue to have access to your account until the end ' +
            'of your current billing cycle on '
        );
        await expect.soft(this.canceledSubTitle).toContainText(
            'Your confirmation number is '
        );
        await expect.soft(this.canceledSubTitle).toContainText(
            'We\'ll miss you.'
        );
    }

    async verifyAccountCancelTitleContainsNumber(number: any) {
        async (num) => {
            num = number;
            await this.reinstateAccountButton.scrollIntoViewIfNeeded();
            await expect.soft(this.canceledTitle).toContainText(num);
        }
    }

    async verifyAccountCancelTitleContainsDate(date: any) {
        async (dat) => {
            dat = date;
            await this.reinstateAccountButton.scrollIntoViewIfNeeded();
            await expect.soft(this.canceledTitle).toContainText(dat);
        }
    }

    async clickReinstateAccountButton() {
        await this.reinstateAccountButton.scrollIntoViewIfNeeded();
        await this.reinstateAccountButton.click();
    }

    async verifyMembershipReinstatedCheckmarkIsDisplayed() {
        await expect(this.membershipReinstatedBanner)
            .toContainText('Confirmation: Your membership has been reinstated.');
    }
}