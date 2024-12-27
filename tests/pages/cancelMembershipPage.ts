import {expect, Locator, Page} from "@playwright/test";
import TextUtils from "../utils/textUtils";
import PwUtils from "../utils/pwUtils";

export default class CancelMembershipPage {
    private readonly yesCancelMembershipButton: Locator;
    private readonly closeButton: Locator;
    private readonly canceledSubscriptionSubtitle: Locator;
    private readonly textUtils: TextUtils;
    private readonly pwUtils: PwUtils;

    constructor(public readonly page: Page) {
        this.yesCancelMembershipButton = this.page.locator('[data-id="cancel-membership-button"] button');
        this.closeButton = this.page.locator('[data-id="close-button"] button');
        this.canceledSubscriptionSubtitle = this.page.locator('.text-navy');
        this.textUtils = new TextUtils();
        this.pwUtils = new PwUtils();
    }

    async clickYesCancelMembershipButton() {
        await this.yesCancelMembershipButton.click()
    }

    async verifyTitle() {
        await expect(this.page.locator('app-card-layout'))
            .toContainText(' membership has been canceled. ');
    }

    async verifySubTitle() {
        await expect.soft(this.canceledSubscriptionSubtitle)
            .toContainText(' You will continue to have access to your account ' +
                'until your current billing cycle ends on ');
        await expect.soft(this.canceledSubscriptionSubtitle)
            .toContainText('Your confirmation number is '); +
        await expect.soft(this.canceledSubscriptionSubtitle)
            .toContainText('Thank you. ');
    }

    async getNumberFromSubtitle() {
        const subtitleText = await this.canceledSubscriptionSubtitle.textContent();
        this.textUtils.extractNumberFromText(subtitleText).then((number) => {
            console.log(`Extracted number is ${number}`);
            return number;
        });
    }

    async getDateFromSubtitle() {
        const subtitleText = await this.canceledSubscriptionSubtitle.textContent();
        this.textUtils.extractDateFromText(subtitleText).then((date) => {
            console.log(`Extracted date is ${date}`);
            return date;
        })
    }

    async getSubtitleText() {
        return this.canceledSubscriptionSubtitle.textContent();
    }

    async clickCloseButton() {
        await this.closeButton.click();
    }

    async verifyCancelUrl() {
        await expect(this.page).toHaveURL(`${this.pwUtils.getBaseUrl()}/cip/account/cancel`);
    }

    async verifySurveyUrl() {
        await expect(this.page).toHaveURL(`${this.pwUtils.getBaseUrl()}/cip/account/cancel/survey`);
    }
}