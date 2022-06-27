const bcrypt = require("bcrypt");
const Moment = require("moment");
const MomentRange = require("moment-range");
const moment = MomentRange.extendMoment(Moment);

import { passwordSaltKey } from "../config";
import { isUndefined } from "../common/validator";
const config = require("../config");

const utils = (module.exports = {
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
     * Formatted Full Date Format
     */
    formattedFullDateFormat: "MMMM DD, YYYY",

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

    getFormattedDateTime(value) {
        const formattedDateTime = moment(value).format("DD MMM, Y h:mm A");
        const todayDate = moment(new Date()).format("DD MMM, YYYY");
        const yesterdayDate = moment()
            .subtract(1, "days")
            .format("DD MMM, YYYY");
        const messageTime = moment(value).format("h:mm A");
        let messageDate = moment(value).format("DD MMM, YYYY");

        messageDate =
            todayDate === messageDate
                ? `Today at ${messageTime}`
                : yesterdayDate === messageDate
                ? `Yesterday at ${messageTime}`
                : formattedDateTime;

        return messageDate;
    },

    /**
     * Get SQl Current Date Time
     */
    getSQlCurrentDateTime: () => moment.utc().format(),

    /**
     * Default Date Format
     *
     * @param date
     * @param format
     * @returns {null|*}
     */
    defaultDateFormat: (date, format = utils.dateFormat) => {
        if (!date) {
            return null;
        }

        return moment(date).format(format);
    },

    /**
     *  Compare new data with old data
     *
     * @param data
     * @param encdata
     * @returns {boolean}
     */
    hasher: (data, encdata) => {
        // if encrypted data is passed, check it against input (data)
        if (encdata) {
            if (bcrypt.compareSync(data, encdata.substr(0, 60))) {
                return true;
            }
            return false;
        }
    },

    /**
     * Get Hash Password
     */
    getHashPassword: (password, callback) => {
        if (!password) {
            return callback();
        }

        // Generate the salt key
        bcrypt.genSalt(8, (err, salt) => {
            if (err) {
                return callback(err);
            }

            let saltKey = "";
            if (passwordSaltKey) {
                saltKey = salt.replace(passwordSaltKey, "");
            }

            // Generate the hash password using password and salt
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    return callback;
                }

                return callback(null, password, hash + saltKey);
            });
        });
    },

    /**
     * Generate Random Password
     */
    randomPassword: callback => {
        const password = utils.randomString(8);
        bcrypt.genSalt(8, (err, salt) => {
            if (err) {
                return callback(err);
            }

            const saltKey = salt.replace("$2b$08$", "");
            bcrypt.hash(password, salt, "", (err, hash) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, password, hash + saltKey);
            });
        });
    },
    /**
     * Is data True
     * @param value
     */
    isTrue: value => {
        if (value == "true") {
            return true;
        } else return false;
    },

    /**
     * Is data False
     * @param value
     */
    isFalse: value => {
        if (value != "true") {
            return true;
        } else return false;
    },

    /**
     * Remove Undefined Keys
     *
     * @param object
     */
    removeUndefinedKeys: object => {
        const returnObject = {};

        Object.keys(object).forEach(key => {
            if (!isUndefined(object[key])) {
                returnObject[key] = object[key];
            }
        });

        return returnObject;
    },

    /**
     * Get Extension By Type
     *
     * @param fileType
     * @returns {*}
     */
    getExtensionByType: fileType => {
        switch (fileType) {
            case "image/png":
                return "png";
            case "image/jpeg":
            case "image/jpg":
                return "jpg";
            case "image/gif":
                return "gif";
            case "image/bmp":
                return "bmp";
            default:
                return "";
        }
    },

    /**
     * Get Concat Name
     *
     * @param firstName
     * @param lastName
     * @returns {*}
     */
    concatName: (firstName, lastName) => {
        let name = [];

        if (firstName) {
            name.push(firstName);
        }

        if (lastName) {
            name.push(lastName);
        }

        if (name) {
            return name.join(" ");
        }

        return "";
    },
    /**
     * Get User avatar Url
     *
     * @param slug
     * @returns {*}
     */
    getUserMediaUrl: slug => {
        if (!slug) {
            return null;
        }
        const parts = slug.split("/");
        const image = parts[parts.length - 1];

        return `${config.baseUrl}/v1/user/avatar/${image}`;
    },
});
