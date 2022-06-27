export default (sequelize, DataTypes) => {
    const user = sequelize.define(
        "user",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            roll_no: DataTypes.STRING,
            dob: DataTypes.STRING,
            reg_no: DataTypes.STRING,
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            gender: DataTypes.STRING,
            phone_number: DataTypes.INTEGER,
            avatar: DataTypes.STRING,
            token: DataTypes.STRING,
            portal_id: DataTypes.INTEGER,
            company_id: DataTypes.INTEGER,
            role_id: DataTypes.INTEGER,
            password_token: DataTypes.STRING,
            last_loggedin_at: DataTypes.DATE,
            google_auth_token: DataTypes.TEXT,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );

    return user;
};
