// import service
import { portalUserService } from "./service";

export default async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const portalId = req.query && req.query.portalId;

    // Validate id
    if (!id) {
        return res.status(400).send({ message: "User Id is required" });
    }

    try {
        //  Get User Details
        const userDetail = await portalUserService.findOne({
            attributes: ["id"],
            where: { id, portal_id: portalId },
        });

        // User Not Found
        if (!userDetail) {
            return res.status(400).send({ message: "User not found" });
        }

        // Delete The User Details
        await userDetail.destroy();

        // Success
        res.send({
            message: "User deleted successfully",
        });
    } catch (err) {
        err => res.status(400).send({ message: err.message });
    }
};
