import { usersService } from "../portalUser/service";
import { getHashPassword, defaultDateFormat } from "../../common/utils";

export default async (req, res, next) => {
    const data = req.body;

    const isRollNum = await usersService.findOne({
        where: { roll_no: data.roll_no },
    });
    if (isRollNum) {
        return res.status(400).send({ message: "Roll Number already exist" });
    }
    const isRegNum = await usersService.findOne({
        where: { reg_no: data.reg_no },
    });
    if (isRegNum) {
        return res
            .status(400)
            .send({ message: "Register Number already exist" });
    }

    const isEmail = await usersService.findOne({
        where: { email: data.email },
    });
    if (isEmail) {
        return res.status(400).send({ message: "Email already exist" });
    }
    data.role_id = 2;

    try {
        await getHashPassword(
            "Password01*",
            async (err, password, hashPassword) => {
                data.password = hashPassword;
                const createData = usersService.toDbObject(data);
                createData.dob =  defaultDateFormat(data.dob)
                await usersService.create(createData);
            }
        );
        res.status(200).send({ message: "User Added Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
