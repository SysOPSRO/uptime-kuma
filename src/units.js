/**
 * Shared unit definitions for the front-end.
 */

export const VALID_UNITS = ["ms", "second", "percent", "MB", "GB"];
export const DEFAULT_UNIT = "ms";

export const UNIT_OPTIONS = [
    { value: "ms",      label: "Milliseconds (ms)" },
    { value: "second",  label: "Seconds (s)" },
    { value: "percent", label: "Percent (%)" },
    { value: "MB",      label: "Megabytes (MB)" },
    { value: "GB",      label: "Gigabytes (GB)" },
];

/**
 * Short suffix for display.
 */
export const UNIT_SUFFIX = {
    ms:      "ms",
    second:  "s",
    percent: "%",
    MB:      "MB",
    GB:      "GB",
};

/**
 * Format a raw ping/metric value for display, respecting the monitor's unit.
 *
 * For active (non-push) monitors the raw value is always in milliseconds.
 * If the monitor's unit is "second" we convert; for percent/MB/GB we show
 * the raw value with the chosen suffix (the user is responsible for
 * ensuring their push payload matches the unit).
 *
 * @param {number|null|undefined} value   Raw value (heartbeat.ping)
 * @param {string}               unit    Monitor unit
 * @param {boolean}              isActive  true for non-push monitor types
 * @returns {string}  e.g. "123 ms", "0.42 s", "78.3 %"
 */
export function formatPingWithUnit(value, unit = "ms", isActive = false) {
    if (value === null || value === undefined || value === "") return "-";
    const numVal = Number(value);
    if (isNaN(numVal)) return "-";

    const suffix = UNIT_SUFFIX[unit] || "ms";

    switch (unit) {
        case "second":
            // Active monitors store ms natively; push monitors send seconds directly
            return isActive
                ? (numVal / 1000).toFixed(3) + " " + suffix
                : numVal.toFixed(3) + " " + suffix;
        case "percent":
            return numVal.toFixed(2) + " " + suffix;
        case "MB":
        case "GB":
            return numVal.toFixed(2) + " " + suffix;
        case "ms":
        default:
            return Math.round(numVal) + " " + suffix;
    }
}

/**
 * Get just the short suffix string for a unit.
 * @param {string} unit
 * @returns {string}
 */
export function getUnitSuffix(unit) {
    return UNIT_SUFFIX[unit] || "ms";
}
