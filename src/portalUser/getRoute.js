// utils
import { defaultDateFormat } from "../../common/utils";

// import service
import { portalUserService } from "./service";

export default async (req, res, next) => {
    const { id } = req.params;

    // Validate id
    if (!id) {
        return res.status(400).send({ message: "User Id is required" });
    }

    try {
        const userDetails = await portalUserService.findOne({
            where: { id },
            attributes: { exclude: ["deletedAt"] },
        });

        if (!userDetails) {
            return res.status(400).send({ message: "Portal not found" });
        }

        const data = {
            id: userDetails.id,
            first_name: userDetails.first_name,
            last_name: userDetails.last_name,
            role: userDetails.role,
            email: userDetails.email,
            portal_id: userDetails.portal_id,
            createdAt: defaultDateFormat(userDetails.createdAt),
            updatedAt: defaultDateFormat(userDetails.updatedAt),
        };

        res.status(200).send(data);
    } catch (err) {
        res.status(400).send({ message: err.message });
        next(err);
    }
};
