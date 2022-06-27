// utils
import { defaultDateFormat } from "../../common/utils";

// import service
import { portalService } from "./service";

export default async (req, res, next) => {
    const { id } = req.params;

    // Validate id
    if (!id) {
        return res.status(400).send({ message: "Portal id is required" });
    }

    if (!req.isSuperAdmin) {
        return res.status(400).send({ message: "Portal not found" });
    }

    try {
        const portalDetails = await portalService.findOne({
            where: { id },
            attributes: { exclude: ["deletedAt"] },
        });

        if (!portalDetails) {
            return res.status(400).send({ message: "Portal not found" });
        }

        const data = {
            id: portalDetails.id,
            portal_name: portalDetails.portal_name,
            portal_url: portalDetails.portal_url,
            createdAt: defaultDateFormat(portalDetails.createdAt),
            updatedAt: defaultDateFormat(portalDetails.updatedAt),
        };

        res.status(200).send(data);
    } catch (err) {
        res.status(400).send({ message: err.message });
        next(err);
    }
};
