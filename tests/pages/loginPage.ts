import {expect, Locator, Page} from "@playwright/test";
import UserUtils from "../utils/userUtils";

export default class LoginPage {
    private readonly email: Locator;
    private readonly password: Locator;
    private readonly signInBtn: Locator;
    private readonly loadingWave: Locator;

    private userUtils: UserUtils;


    constructor(public readonly page: Page) {
        this.email = this.page.locator('[name="username"]');
        this.password = this.page.locator('[name="password"]');
        this.signInBtn = this.page.locator('Button[name="sign-in"]');
        this.loadingWave = this.page.locator('#applicationHost .splashV3 .loadingWave');
        this.userUtils = new UserUtils();
    }

    async login(email: string, password: string) {
        await this.page.goto("/Authentication/");
        await this.email.fill(email);
        await this.password.fill(password);
        await this.signInBtn.click();
        await this.loadingWave.waitFor({state:'hidden'})

        await expect(this.page.locator('div#applicationHost [data-control="Mobile-Menu-Bar-Logo"]'))
            .toHaveClass('page-mobile-menu-logo')
    }

    async loginDefault() {
        await this.login(
            this.userUtils.getLogin(),
            this.userUtils.getPassword()
        )
    }

}