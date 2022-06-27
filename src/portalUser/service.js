import models from "../../db/models";
import DataBaseService from "../../common/DataBaseService";

export const usersService = new DataBaseService(models.users);

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
    usersService,
    isUserExist,
};
