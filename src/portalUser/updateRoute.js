// import service
import { portalUserService } from "./service";

export default async (req, res, next) => {
    const data = req.body;
    const { id } = req.params;

    // Validate id
    if (!id) {
        return res.status(400).send({ message: "User id is required" });
    }

    // Update Portal Data
    const updateData = portalUserService.toDbObject(data);

    try {
        await portalUserService.update(updateData, {
            where: { id },
        });

        res.status(200).send({ message: "Portal User saved successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
