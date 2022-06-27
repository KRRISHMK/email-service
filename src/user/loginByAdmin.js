//Service
import { getUserDetailById } from "../user/service";

// Common
import { getSQlCurrentDateTime } from "../../common/utils";
import { BAD_REQUEST, OK } from "../../common/status";
import { getPortalFromRequest } from "../portal/service";

/**
 * After Login Success
 *
 * @param user
 * @param callback
 */
async function afterLoginSuccess(user, portalDetails, callback) {
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
                portalId: portalDetails && portalDetails.id,
                portalName: portalDetails && portalDetails.portal_name,
                portalUrl: portalDetails && portalDetails.portal_url,
            });
        })
        .catch(err => callback(err));
}

export default async (req, res) => {
    let { id } = req.params;
    if (!id) {
        return callback(new Error("Portal Not Found"));
    }
    let userId = req && req.user && req.user.id;

    let portalDetails = await getPortalFromRequest(req, id);

    if (!portalDetails) {
        return callback(new Error("Portal Not Found"));
    }
    const userDetails = await getUserDetailById(userId);
    if (!userDetails) {
        return callback(new Error("User Not Found"));
    }

    return afterLoginSuccess(
        userDetails,
        portalDetails,
        (err, status, result) => {
            if (err) {
                return res
                    .status(status || BAD_REQUEST)
                    .send({ message: err.message });
            }
            return res.json(result);
        }
    );
};
