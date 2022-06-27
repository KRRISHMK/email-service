//Common
import { isEmail } from "../../common/validator";
import {
    getHashPassword,
    hasher,
    removeUndefinedKeys,
} from "../../common/utils";

import { isInteger } from "../../common/validator";

//Service
import { userService } from "./service";

export default async (req, res, next) => {
    const data = req.body;

    let { id } = req.params;

    if (isInteger(id)) {
        id = id;
    }

    let userId = id;
    if (!userId) {
        userId = req.user.id;
    }

    const email = data.email.toLowerCase().trim();

    // Validate if email is null
    if (!email) {
        return res.status(400).send({ message: "Email is required" });
    }

    // Validate if email is invalid format
    if (!isEmail(email)) {
        return res.status(400).send({ message: "Invalid email" });
    }

    userService
        .findOne({
            where: { id: userId },
        })
        .then(userDetails => {
            if (!userDetails) {
                return res.status(400).send({ message: "User not found" });
            }

            const { password } = userDetails.get();
            const currentPassword = data.currentPassword;
            let newPassword = data.newPassword;

            // If current password does not match with current password
            if (currentPassword && !hasher(currentPassword, password)) {
                return res
                    .status(400)
                    .send({ message: "Password not matched" });
            }

            const where = { email, id: { $ne: userId } };

            userService.findOne({ where }).then(userExists => {
                if (userExists) {
                    return res
                        .status(400)
                        .send({ message: "User already exist" });
                }

                const updateData = {
                    first_name: data.firstName,
                    last_name: data.lastName,
                    email: email,
                    role_id: parseInt(data.roleId, 10),
                };

                if (data.partnerUserId && data.password) {
                    newPassword = data.password;
                    updateData["token"] = Math.floor(Date.now());
                }

                // Generate Hash Password
                getHashPassword(newPassword, (err, password, hashPassword) => {
                    if (hashPassword) {
                        updateData["password"] = hashPassword;
                    }

                    userService
                        .update(removeUndefinedKeys(updateData), {
                            where: { id: userId },
                            returning: true,
                            plain: true,
                        })
                        .then(userData => {
                            const resData = {
                                token: userData[1].token,
                                role: userData[1].role_id,
                                userId: userData[1].id,
                            };

                            res.status(200).send({
                                token: userData[1].token,
                                role: userData[1].role_id,
                                userId: userData[1].id,
                                message: "User saved successfully",
                            });
                        });
                });
            });
        })
        .catch(err => res.status(400).send({ message: err.message }));
};
