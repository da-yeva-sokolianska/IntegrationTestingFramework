import {Locator, Page} from "@playwright/test";

export default class HeaderPage {
    private readonly profileIcon: Locator;
    private readonly accountSettings: Locator;

    constructor(public readonly page: Page) {
        this.profileIcon = this.page.locator('.my-accounts-dropdown');
        this.accountSettings = this.page.locator('.my-accounts-menu-item[data-control="NavLink-MyAccount"]');
    }

    async hoverProfileIcon() {
        await this.profileIcon.hover();
    }

    async clickAccountSettings() {
        await this.accountSettings.click();
    }
}