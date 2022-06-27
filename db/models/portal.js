export default (sequelize, DataTypes) => {
    const portal = sequelize.define(
        "portal",
        {
            portal_name: {
                type: DataTypes.STRING,
            },
            portal_url: {
                type: DataTypes.STRING,
            },
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );
    return portal;
};
