import { usersService } from "../portalUser/service";
import { getHashPassword, defaultDateFormat } from "../../common/utils";

export default async (req, res, next) => {
    const data = req.body;
    let dateOfBirth;
    if (
        data &&
        data.register_number &&
        data.date_of_birth &&
        !data.newPassword &&
        !data.confirmPassword
    ) {
        const isRegNum = await usersService.findOne({
            where: { reg_no: data.register_number },
        });
        if (!isRegNum) {
            return res
                .status(400)
                .send({ message: "Register Number Not Found" });
        }
        
        if(data.date_of_birth){
            dateOfBirth = defaultDateFormat(data.date_of_birth);
        }
        const isUserExist = await usersService.findOne({
            where: { reg_no: data.register_number, dob: dateOfBirth },
        });
        if (!isUserExist) {
            return res
                .status(400)
                .send({ message: "Please Enter Correct Date Of Birth" });
        }
        try {
            const value = await usersService.findOne({
                where: {
                    reg_no: data.register_number,
                    dob: dateOfBirth,
                },
            });
            res.status(200).send({ value, message: "User Found Successfully" });
        } catch (err) {
            res.status(400).send(err);
            next(err);
        }
    }
    if (data && data.newPassword && data.confirmPassword) {
        try {
            const value = await usersService.findOne({
                where: {
                    reg_no: data.register_number,
                    dob: dateOfBirth,
                },
            });
            if (value) {
                await getHashPassword(
                    data.newPassword,
                    async (err, password, hashPassword) => {
                        const updateData = {
                            password: hashPassword,
                        };
                        await usersService.update(updateData, {
                            where: { id: value.id },
                        });
                    }
                );
            }
            res.status(200).send({
                value,
                message: "Password Changed Successfully",
            });
        } catch (err) {
            res.status(400).send(err);
            next(err);
        }
    }
};
