import { default as config } from '../../playwright.config.js';
import {format} from "date-fns";

export default class PwUtils {

    getBaseUrl() {
        return config.use.baseURL;
    }

    takeScreenshot(page) {
        let formattedDate: string = format(new Date(), `MM-dd HH:mm:ss:sss`);
        page.screenshot({ path: `./tests/screenshots/${formattedDate}.png`, fullPage: true })
    }
}