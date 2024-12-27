export default class TextUtils {


    async extractDateFromText(text: string) {
        const datePattern = /(\d{1,2}\/\d{1,2}\/\d{4})/; // Matches format MM/DD/YYYY
        const dateMatch = text.match(datePattern);
        const date = dateMatch ? dateMatch[0] : null; // Extracted date or null if not found
        console.log('Date:', date);
        return date;
    }

    async extractNumberFromText(text: string) {
        const numberPattern = /(?<=\s)\d{4}(?=\.)/; // Matches any number
        const numberMatch = text.match(numberPattern);
        const number = numberMatch ? numberMatch[0] : null; // Extracted number or null if not found
        console.log('Confirmation Number:', number);
        return number;
    }
}