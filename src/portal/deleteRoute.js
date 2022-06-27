// import service
import { portalService } from "./service";

export default async (req, res, next) => {
    const id = parseInt(req.params.id, 10);

    // Validate id
    if (!id) {
        return res.status(400).send({ message: "Portal is required" });
    }

    try {
        //  Get Portal Details
        const portalDetails = await portalService.findOne({
            attributes: ["id"],
            where: { id },
        });

        // Portal Not Found
        if (!portalDetails) {
            return res.status(400).send({ message: "Portal not found" });
        }

        // Delete The Portal Details
        await portalDetails.destroy();

        // Success
        res.send({
            message: "Portal deleted successfully",
        });
    } catch (err) {
        err => res.status(400).send({ message: err.message });
    }
};
