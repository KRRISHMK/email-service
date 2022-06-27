module.exports = {
    currency(value) {
        if (value) {
            return parseFloat(value).toFixed(2);
        } else {
            return null;
        }
    },
};
