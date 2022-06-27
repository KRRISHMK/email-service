// import service
import { portalService, isNameExist, isUrlExist } from "./service";

export default async (req, res, next) => {
    const data = req.body;

    //Validation
    if (!data.portal_name) {
        return res.status(400).send({ message: "Portal Name is required" });
    }
    if (!data.portal_url) {
        return res.status(400).send({ message: "Portal URL is required" });
    }
    const isNameExists = await isNameExist(data.portal_name);
    if (isNameExists) {
        return res.status(400).send({ message: "Portal Name already exist" });
    }

    const isUrlExists = await isUrlExist(data.portal_url);
    if (isUrlExists) {
        return res.status(400).send({ message: "Portal URL already exist" });
    }

    // Create portal Data
    const createData = portalService.toDbObject(data);

    try {
        await portalService.create(createData);

        res.status(200).send({ message: "Portal Created Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
