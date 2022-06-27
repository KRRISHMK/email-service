const Moment = require("moment");
const MomentRange = require("moment-range");
const moment = MomentRange.extendMoment(Moment);
const momentTime = require("moment-timezone");
const timeZone = require("../config").defaultTimeZone;

const formats = {
    /**
     * Date Format
     */
    dateFormat: "DD-MM-YYYY",

    /**
     *  Frontend Time
     */
    frontEndTime: "h:mm A",

    /**
     * Default Date Format
     */
    defaultFormat: "MM/DD/YYYY",

    /**
     * Formatted Date Format
     */
    formattedDateFormat: "MMM DD, YYYY",

    /**
     * MySQL Date Format
     */
    mySQLDateFormat: "YYYY-MM-DD",

    /**
     *
     */
    FrontEndDateTimeFormat: "DD-MM-YYYY hh:mm:ss A",

    /**
     * Frontend 12 hours Date Time format
     */
    frontendDateTime12HoursFormat: "DD MMM, Y h:mm A",

    /**
     * Format date by day, month name and year
     */
    shortDate: "DD-MM-YY",

    /**
     * Format date by day, month name, year and time
     */
    shortDateAndTime: "DD-MM-YY hh:mm A",
};

module.exports = {
    /**
     * Custom Date
     *
     * @param date
     * @param fromFormat
     * @param format
     */
    customDate: (date, fromFormat, format = formats.dateFormat) => {
        if (!date) {
            return null;
        }

        return moment(date, fromFormat).format(format);
    },

    /**
     * Format Date
     *
     * @param date
     * @param format
     * @returns {string|null}
     */
    formatDate: (date, format = formats.dateFormat) => {
        if (!date) {
            return null;
        }

        return moment(date).format(format);
    },

    /**
     * Default Date Format
     *
     * @param date
     * @param format
     * @returns {null|*}
     */
    defaultDateFormat: (date, format = formats.defaultFormat) => {
        if (!date) {
            return null;
        }

        return moment(date).format(format);
    },

    /**
     * Formatted Date
     *
     * @param date
     * @param format
     * @returns {string|null}
     */
    formattedDate: (date, format = formats.formattedDateFormat) => {
        if (!date) {
            return null;
        }

        return moment(date).format(format);
    },

    /**
     * Get SQl Formatted Date
     *
     * @param date
     * @param format
     */
    getSQlFormattedDate: (date = "", format = formats.mySQLDateFormat) => {
        if (date) {
            return moment(date).format(format);
        }
        return moment().format(format);
    },

    /**
     * Format Local Date
     *
     * @param date
     * @param format
     */
    formatLocalDate: (date, format = formats.dateFormat) => {
        if (!date) {
            return null;
        }

        return momentTime(date)
            .tz(timeZone)
            .format(format);
    },

    /**
     * Formatted date time
     *
     * @param date
     * @returns {null|*}
     */
    formatDateTime: date => {
        if (!date) {
            return null;
        }

        return moment(date).format(formats.frontEndTime);
    },

    /**
     * Format date by day-monthName-year
     *
     * @param date
     * @returns {null|*}
     */
    shortDate: date => {
        if (!date) {
            return null;
        }

        return moment(date).format(formats.shortDate);
    },

    /**
     * Format date by day, month name, year and time
     *
     * @param date
     * @returns {null|*}
     */
    shortDateAndTime: date => {
        if (!date) {
            return null;
        }

        return moment(date).format(formats.shortDateAndTime);
    },

    /**
     * Get Ago
     *
     * @param date
     */
    ago: date => moment(date).fromNow(),

    /**
     * Get SQl Current Date Time
     */
    getSQlCurrentDateTime: () => moment.utc().format(),
};
