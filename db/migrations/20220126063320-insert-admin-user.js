const config = require("../../config");
const { getHashPassword } = require("../../common/utils");
const { USER_ROLE_ID_SUPER_ADMIN } = require("../../common/roles");
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize
            .query('SELECT * FROM "users" WHERE email = ? ', {
                replacements: [config.defaultSuperAdminEmail],
                type: queryInterface.sequelize.QueryTypes.SELECT,
            })
            .then(users => {
                if (Object.keys(users).length === 0) {
                    // Generate Hash Password
                    getHashPassword(
                        config.defaultSuperAdminPassword,
                        (err, password, hashPassword) => {
                            return queryInterface.bulkInsert("users", [
                                {
                                    email: config.defaultSuperAdminEmail,
                                    first_name: "SuperAdmin",
                                    last_name: "Library",
                                    role_id: USER_ROLE_ID_SUPER_ADMIN,
                                    password: hashPassword,
                                    createdAt: new Date(),
                                    updatedAt: new Date(),
                                },
                            ]);
                        }
                    );
                }
            });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("user");
    },
};
