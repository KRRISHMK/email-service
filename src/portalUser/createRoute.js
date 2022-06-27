// import service
import { getPortalFromRequest } from "../portal/service";
import { userService, isUserExist } from "./service";

export default async (req, res, next) => {
    const data = req.body;

    let portalDetail = await getPortalFromRequest(req);
    if (portalDetail) {
        data.portal_id = portalDetail.id;
    }

    const isUserExists = await isUserExist(data.roll_no, data.portal_id);
    if (isUserExists) {
        return res.status(400).send({ message: "User already exist" });
    }

    // Create portal User
    const createData = userService.toDbObject(data);

    try {
        await userService.create(createData);

        res.status(200).send({ message: "Portal User Created Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
