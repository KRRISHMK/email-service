import models from "../../db/models";
import DataBaseService from "../../common/DataBaseService";

export const bookService = new DataBaseService(models.books);

export const isBookExist = async (book, id) => {
    if (!book) {
        return null;
    }
    let where = {};
    if (id) {
        const ids = [id];
        where.id = { $notIn: ids };
    }
    where.book_title = book;
    const isBookExist = await bookService.findOne({
        where: where,
    });
    return isBookExist;
};

export const isNameExist = async (name, id) => {
    if (!name) {
        return null;
    }
    let where = {};
    if (id) {
        const ids = [id];
        where.id = { $notIn: ids };
    }
    where.author = name;
    const isNameExist = await bookService.findOne({
        where: where,
    });
    return isNameExist;
};

// export const getPortalFromRequest = async (req, id) => {
//     let portal;
//     let portalUrl = req.headers.origin;
//     if (id) {
//         const portalDetails = await bookService.findOne({
//             attributes: ["id", "portal_name", "portal_url"],
//             where: { id: id },
//         });
//         if (!portalDetails) {
//             return "";
//         }
//         if (portalDetails) {
//             portal = portalDetails;
//         }
//     } else {
//         const portalDetails = await bookService.findOne({
//             attributes: ["id", "portal_name", "portal_url"],
//             where: { portal_url: { $like: portalUrl } },
//         });
//         if (!portalDetails) {
//             return "";
//         }
//         if (portalDetails) {
//             portal = portalDetails;
//         }
//     }
//     if (portal) return portal;
// };
export default {
    bookService,
    isBookExist,
    isNameExist,
    // getPortalFromRequest,
};
