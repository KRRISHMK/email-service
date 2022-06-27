const config = require("../../config");
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize
            .query('SELECT * FROM "portal" WHERE portal_url = ? ', {
                replacements: [config.appUrl],
                type: queryInterface.sequelize.QueryTypes.SELECT,
            })
            .then(portal => {
                if (Object.keys(portal).length === 0) {
                    // Create Default Portal
                    return queryInterface.bulkInsert("portal", [
                        {
                            portal_url: config.appUrl,
                            portal_name: "OnePortal",
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        },
                    ]);
                }
            });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("portal");
    },
};
