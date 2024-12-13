import {expect, Locator, Page} from "@playwright/test";

import { format } from 'date-fns';

export class LoginPage {
    private readonly email: Locator;
    private readonly password: Locator;
    private readonly signInBtn: Locator;


    constructor(public readonly page: Page) {
        this.email = this.page.locator('[name="username"]');
        this.password = this.page.locator('[name="password"]');
        this.signInBtn = this.page.locator('Button[name="sign-in"]');
    }

    async login(email: string, password: string) {
        await this.page.goto("/Authentication/");
        await this.email.fill(email);
        await this.password.fill(password);
        await this.signInBtn.click();
        await this.page.waitForTimeout(20_000);

        let formattedDate: string = format(new Date(), `MM-dd HH:mm:ss:sss`);

        await expect(this.page.locator('div#applicationHost [data-control="Mobile-Menu-Bar-Logo"]'))
            .toHaveClass('page-mobile-menu-logo')
        //     .then(() => {
        //         this.page.screenshot({ path: `./tests/screenshots/${formattedDate}.png`, fullPage: true })
        // })
        // ToDo: Extract screenshot function
    }

}