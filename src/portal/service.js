import models from "../../db/models";
import DataBaseService from "../../common/DataBaseService";

export const portalService = new DataBaseService(models.portal);

export const isNameExist = async name => {
    if (!name) {
        return null;
    }
    const isNameExist = await portalService.findOne({
        where: { portal_name: name },
    });
    return isNameExist;
};
export const isUrlExist = async url => {
    if (!url) {
        return null;
    }
    const isUrlExist = await portalService.findOne({
        where: { portal_url: url },
    });
    return isUrlExist;
};

export const getPortalFromRequest = async (req, id) => {
    let portal;
    let portalUrl = req.headers.origin;
    if (id) {
        const portalDetails = await portalService.findOne({
            attributes: ["id", "portal_name", "portal_url"],
            where: { id: id },
        });
        if (!portalDetails) {
            return "";
        }
        if (portalDetails) {
            portal = portalDetails;
        }
    } else {
        const portalDetails = await portalService.findOne({
            attributes: ["id", "portal_name", "portal_url"],
            where: { portal_url: { $like: portalUrl } },
        });
        if (!portalDetails) {
            return "";
        }
        if (portalDetails) {
            portal = portalDetails;
        }
    }
    if (portal) return portal;
};
export default {
    portalService,
    isNameExist,
    isUrlExist,
    getPortalFromRequest,
};
