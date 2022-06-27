// import service
import { portalService } from "./service";

export default async (req, res, next) => {
    const data = req.body;
    const { id } = req.params;

    // Validate id
    if (!id) {
        return res.status(400).send({ message: "Portal id is required" });
    }

    if (!data.portal_name) {
        return res.status(400).send({ message: "Portal Name is required" });
    }

    if (!data.portal_url) {
        return res.status(400).send({ message: "Portal Url is required" });
    }

    // Update Portal Data
    const updateData = portalService.toDbObject(data);

    try {
        await portalService.update(updateData, {
            where: { id },
        });

        res.status(200).send({ message: "Portal saved successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
