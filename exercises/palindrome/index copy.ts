type DateString = string;

/**
 * Parse shorthand date string into a Date object in UTC.
 * @param datestring - The shorthand date string, e.g., 'now-1d/d'.
 * @returns The parsed Date object in UTC.
 */
function parse2(datestring: DateString): Date {
    // Start with the current date in UTC
    let now = new Date();
    let baseDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 
                                     now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));

    if (!datestring.startsWith('now')) {
        throw new Error("Invalid date string: Must start with 'now'.");
    }

    // Parse the operations after 'now'
    let operations = datestring.slice(3); // Remove 'now'
    let roundingUnit: string | null = null;

    // Detect rounding operation
    const roundingMatch = operations.match(/\/([dMyhmsw])/);
    if (roundingMatch) {
        roundingUnit = roundingMatch[1];
        operations = operations.split('/')[0]; // Remove rounding part
    }

    // Regular expression to match operations like '-1d' or '+2M'
    const operationRegex = /([+-])(\d+)([dMyhmsw])/g;
    let match: RegExpExecArray | null;

    while ((match = operationRegex.exec(operations)) !== null) {
        const sign = match[1];
        const value = parseInt(match[2], 10);
        const unit = match[3];

        switch (unit) {
            case 'd':
                baseDate.setUTCDate(baseDate.getUTCDate() + (sign === '+' ? value : -value));
                break;
            case 'M':
                baseDate.setUTCMonth(baseDate.getUTCMonth() + (sign === '+' ? value : -value));
                break;
            case 'y':
                baseDate.setUTCFullYear(baseDate.getUTCFullYear() + (sign === '+' ? value : -value));
                break;
            case 'h':
                baseDate.setUTCHours(baseDate.getUTCHours() + (sign === '+' ? value : -value));
                break;
            case 'm':
                baseDate.setUTCMinutes(baseDate.getUTCMinutes() + (sign === '+' ? value : -value));
                break;
            case 's':
                baseDate.setUTCSeconds(baseDate.getUTCSeconds() + (sign === '+' ? value : -value));
                break;
            case 'w':
                baseDate.setUTCDate(baseDate.getUTCDate() + (sign === '+' ? value * 7 : -value * 7));
                break;
        }
    }

    // Apply rounding if necessary
    if (roundingUnit) {
        switch (roundingUnit) {
            case 'd':
                baseDate.setUTCHours(0, 0, 0, 0);
                break;
            case 'M':
                baseDate.setUTCDate(1);
                baseDate.setUTCHours(0, 0, 0, 0);
                break;
            case 'y':
                baseDate.setUTCMonth(0, 1);
                baseDate.setUTCHours(0, 0, 0, 0);
                break;
            case 'h':
                baseDate.setUTCMinutes(0, 0, 0);
                break;
            case 'm':
                baseDate.setUTCSeconds(0, 0);
                break;
            case 's':
                baseDate.setUTCMilliseconds(0);
                break;
            case 'w':
                const day = baseDate.getUTCDay();
                baseDate.setUTCDate(baseDate.getUTCDate() - day);
                baseDate.setUTCHours(0, 0, 0, 0);
                break;
        }
    }

    return baseDate;
}

/**
 * Convert a Date object to a shorthand date string format.
 * @param date - The Date object to convert.
 * @returns The shorthand date string, e.g., 'now-1d/d'.
 */
function stringify2(date: Date): DateString {
    // Start with the current date in UTC
    const now = new Date();
    const nowUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 
                                     now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));

    let result = "now";

    // Calculate the difference
    let diffMs = date.getTime() - nowUTC.getTime();
    const sign = diffMs >= 0 ? '+' : '-';
    diffMs = Math.abs(diffMs);

    const msInSecond = 1000;
    const msInMinute = msInSecond * 60;
    const msInHour = msInMinute * 60;
    const msInDay = msInHour * 24;
    const msInWeek = msInDay * 7;
    const msInMonth = msInDay * 30; // Approximation
    const msInYear = msInDay * 365; // Approximation

    const years = Math.floor(diffMs / msInYear);
    if (years > 0) {
        result += `${sign}${years}y`;
        diffMs %= msInYear;
    }

    const months = Math.floor(diffMs / msInMonth);
    if (months > 0) {
        result += `${sign}${months}M`;
        diffMs %= msInMonth;
    }

    const weeks = Math.floor(diffMs / msInWeek);
    if (weeks > 0) {
        result += `${sign}${weeks}w`;
        diffMs %= msInWeek;
    }

    const days = Math.floor(diffMs / msInDay);
    if (days > 0) {
        result += `${sign}${days}d`;
        diffMs %= msInDay;
    }

    const hours = Math.floor(diffMs / msInHour);
    if (hours > 0) {
        result += `${sign}${hours}h`;
        diffMs %= msInHour;
    }

    const minutes = Math.floor(diffMs / msInMinute);
    if (minutes > 0) {
        result += `${sign}${minutes}m`;
        diffMs %= msInMinute;
    }

    const seconds = Math.floor(diffMs / msInSecond);
    if (seconds > 0) {
        result += `${sign}${seconds}s`;
    }

    return result;
}

// Example Usage
const exampleDateStr = "now-1y/y";
const parsedDate = parse(exampleDateStr);
console.log("Parsed Date:", parsedDate.toISOString());

const dateStr = stringify(parsedDate);
console.log("Stringified Date:", dateStr);
