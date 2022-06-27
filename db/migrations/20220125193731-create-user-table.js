export function up(queryInterface, Sequelize) {
    console.log("Creating users table");
    return queryInterface.createTable("users", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        roll_no: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        reg_no: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        phone_number: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        dob: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        avatar: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        role_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        token: {
            type: Sequelize.STRING,
        },
        last_loggedin_at: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        password_token: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: true,
            type: Sequelize.DATE,
        },
        deletedAt: {
            allowNull: true,
            type: Sequelize.DATE,
        },
    });
}
export function down(queryInterface, Sequelize) {
    console.log("Dropping users table");
    return queryInterface.dropTable("users");
}
