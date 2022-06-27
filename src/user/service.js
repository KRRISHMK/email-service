import models from "../../db/models";
import DataBaseService from "../../common/DataBaseService";

export const userService = new DataBaseService(models.users);
// Models
const { users } = models;

export const isUserExistsByEmail = async (email, callback) => {
    await users
        .findAll({
            attributes: ["id", "email"],
        })
        .then(async userList => {
            let userEmail = "";
            await userList.forEach(userDetails => {
                if (
                    userDetails.email.toLowerCase().trim() ===
                    email.toLowerCase().trim()
                ) {
                    userEmail = userDetails.email;
                }
            });

            if (userEmail) {
                return callback(true, userEmail);
            } else {
                return callback(false, "");
            }
        });
};
export const getUserDetailByEmail = async email => {
    const userDetails = await user.findOne({
        where: { email: email },
    });
    if (!userDetails) {
        return null;
    }
    return userDetails;
};
export const getUserDetailById = async id => {
    const userDetails = await user.findOne({
        where: { id: id },
    });
    if (!userDetails) {
        return null;
    }
    return userDetails;
};
export const isUserExist = async (roll_no, reg_no) => {
    if (!roll_no) {
        return null;
    }
    if (!reg_no) {
        return null;
    }
    const isUserExist = await usersService.findOne({
        where: { roll_no: roll_no, reg_no: reg_no },
    });
    return isUserExist;
};
export default {
    userService,
    isUserExist,
    isUserExistsByEmail,
    getUserDetailByEmail,
    getUserDetailById,
};
