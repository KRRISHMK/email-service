"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            const tableDefinition = await queryInterface.describeTable(
                "setting"
            );

            if (tableDefinition && tableDefinition["portal_id"]) {
                queryInterface.changeColumn("setting", "portal_id", {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                });
            }
        } catch (err) {
            console.log(err);
        }
    },

    down: async (queryInterface, Sequelize) => {
        const tableDefinition = await queryInterface.describeTable("setting");

        if (tableDefinition && tableDefinition["portal_id"]) {
            queryInterface.changeColumn("setting", "portal_id", {
                type: Sequelize.INTEGER,
                allowNull: false,
            });
        }
    },
};
