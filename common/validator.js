import validator from "validator";

/**
 * Validate Email
 *
 * @param email
 * @returns {boolean}
 */
export function isEmail(email) {
    return validator.isEmail(email);
}

/**
 * Validate URL
 *
 * @param url
 * @returns {boolean}
 */
export function isURL(url) {
    return validator.isURL(url, { require_protocol: true });
}

/**
 * Validate ZipCode
 *
 * @param zip
 * @param locale
 * @returns {boolean}
 */
export function isZipCode(zip, locale = "US") {
    return validator.isPostalCode(zip, locale);
}

export function isDateTime(value) {
    const dateRegex = /^(\d{4})-(\d{2})-(\d{2})/;
    const dateTimeRegex = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;

    if (!dateRegex.test(value) && !dateTimeRegex.test(value)) {
        return false;
    }

    return true;
}

module.exports = {
    /**
     * Is Empty
     *
     * @param value
     * @returns {boolean}
     */
    isEmpty: value => (typeof value !== "undefined" && !value) || !value,

    /**
     * Is Undefined
     *
     * @param key
     * @returns {boolean}
     */
    isUndefined: key => typeof key === "undefined" || key === "undefined",

    /**
     * Validate Email
     *
     * @param email
     * @returns {boolean}
     */
    isEmail: email => {
        const emailRegex = /[a-z0-9!#$%&"*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&"*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!emailRegex.test(email)) {
            return false;
        }

        return true;
    },

    /**
     * Validate URL
     *
     * @param URL
     * @returns {boolean}
     */
    isURL: url => {
        const regexp = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&"\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&"\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&"\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&"\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&"\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
        if (!regexp.test(url)) {
            return false;
        }

        return true;
    },
    /**
     * Is Phone
     *
     * @param phone
     * @returns {boolean}
     */
    isPhone: phone => {
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!phoneRegex.test(phone)) {
            return false;
        }

        return true;
    },

    /**
     * Is ZipCode
     *
     * @param zip
     * @returns {boolean}
     */
    isZipCode: zip => {
        const zipCodeRegEx = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
        if (!zipCodeRegEx.test(zip)) {
            return false;
        }

        return true;
    },

    /**
     * Is PostalCode
     *
     * validates Canadian postal code
     * @param postal
     * @returns {boolean}
     * */
    isPostalCode: postal => {
        const postalCodeRegEx = /^\s*([ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z])\s*([0-9][ABCEGHJ-NPRSTV-Z][0-9])\s*$/i;
        if (!postalCodeRegEx.test(postal)) {
            return false;
        }

        return true;
    },

    /**
     * Is Integer
     *
     * @param int
     * @returns {boolean}
     */
    isInteger: int => {
        if (isNaN(int)) {
            return false;
        }

        return true;
    },

    /**
     * Is Price
     *
     * @param price
     * @returns {boolean}
     */
    isPrice: price => {
        const priceRegEx = /^[1-9]\d{0,7}(?:\.\d{1,4})?|\.\d{1,4}$/; // must be a positive number not starting with a zero and can have decimal point values
        if (!priceRegEx.test(price)) {
            return false;
        }

        return true;
    },

    /**
     * Is Date
     *
     * @param value
     * @returns {*}
     */
    isDateTime: value => {
        const dateRegex = /^(\d{4})-(\d{2})-(\d{2})/;
        const dateTimeRegex = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;

        if (!dateRegex.test(value) && !dateTimeRegex.test(value)) {
            return false;
        }

        return true;
    },

    isStrongPassword: value => {
        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

        if (!passwordRegex.test(value)) {
            return false;
        }

        return true;
    },

    /**
     * Validate slug
     *
     * @param slug
     * @returns {boolean}
     */
    isSlug: slug => {
        const regex = RegExp(/^[a-z0-9-_-]+$/);
        return regex.test(slug);
    },
};
