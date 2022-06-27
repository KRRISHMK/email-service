// import service

//Service
import { isUserExistsByEmail, userService } from "../user/service";

// Common
import {
    hasher,
    isFalse,
    getSQlCurrentDateTime,
    getHashPassword,
} from "../../common/utils";
import { BAD_REQUEST, NOT_FOUND, OK, UNAUTHORIZED } from "../../common/status";
import { isEmail } from "../../common/validator";
import { USER_ROLE_ID_SUPER_ADMIN } from "../../common/roles";
import { getPortalFromRequest } from "../portal/service";
import UserData from "../../db/data/userVerify";
import { usersService } from "../portalUser/service";

/**
 *Verify User Exist In Portal
 *
 * @param user
 * @param callback
 */
// async function verifyUserExistInPortal(user, portalId, callback) {
//     const { id, email, role_id, first_name, last_name, token } = user.get();

/**
 * After Login Success
 *
 * @param user
 * @param callback
 */
async function afterLoginSuccess(user, callback) {
    const { id, email, role_id, first_name, last_name, token } = user.get();
    const session_id = token || Math.floor(Date.now());

    user.updateAttributes({
        last_loggedin_at: getSQlCurrentDateTime(),
        token: session_id,
    })
        .then(() => {
            callback(null, OK, {
                message: "User LoggedIn SuccessFully",
                token: session_id,
                userId: id,
                role: role_id,
                firstName: first_name,
                lastName: last_name,
                email,
            });
        })
        .catch(err => callback(err));
}

/**
 * Login By Password
 *
 * @param email
 * @param password
 * @param callback
 * @returns {*}
 */
async function loginByPassword(email, password, callback) {
    // Validate if email is null
    if (!email) {
        return callback(new Error("Email is required"));
    }

    email = email.toLowerCase().trim();

    // Validate if email is invalid
    if (!isEmail(email)) {
        return callback(new Error("Invalid email"));
    }

    // Validate if password is null
    if (!password) {
        return callback(new Error("Password is required"));
    }

    await isUserExistsByEmail(email, (isExists, userEmail) => {
        // Validate if user is not registered yet
        if (isExists != true) {
            return callback(new Error("Invalid email or password"), NOT_FOUND);
        }

        usersService
            .findOne({
                attributes: [
                    "id",
                    "first_name",
                    "last_name",
                    "email",
                    "role_id",
                    "password",
                ],
                where: { email: userEmail },
            })
            .then(async userDetails => {
                // Validate if user is not registered yet
                if (!userDetails) {
                    return callback(
                        new Error("Invalid email or password"),
                        NOT_FOUND
                    );
                }
                if (!hasher(password, userDetails.get().password)) {
                    // Validate if user password is not matching
                    return callback(
                        new Error("Invalid email or password"),
                        UNAUTHORIZED
                    );
                }
                return afterLoginSuccess(userDetails, callback);
            });
    });
    // }
}
export default async (req, res) => {
    const { email, password } = req.body;

    try {
        UserData &&
            UserData.forEach(async value => {
                const isExist = await usersService.findOne({
                    where: { reg_no: value.Reg_No, roll_no: value.Roll_No },
                });

                if (!isExist) {
                    getHashPassword(
                        "Password01*",
                        async (err, password, hashPassword) => {
                            const createData = {
                                roll_no: value.Roll_No,
                                reg_no: value.Reg_No,
                                first_name: value.Name,
                                gender: value.Gender,
                                phone_number: value.Mobile,
                                email: value.Mail_Id,
                                dob: value.DOB,
                                role_id: 2,
                                password: hashPassword,
                                createdAt: new Date(),
                                updatedAt: new Date(),
                            };

                            await usersService.create(createData);
                        }
                    );
                }
            });
    } catch (error) {
        console.log(error);
    }

    return loginByPassword(email, password, (err, status, result) => {
        if (err) {
            return res
                .status(status || BAD_REQUEST)
                .send({ message: err.message });
        }
        return res.json(result);
    });
};
