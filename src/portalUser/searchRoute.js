// import service
import { userService } from "./service";
import { defaultDateFormat } from "../../common/utils";
import UserData from "../../db/data/userVerify";

export default async (req, res, next) => {
    let { page, pageSize, search, sort, sortDir, pagination } = req.query;
    const { id } = req.params;

    // Validate if page is not a number
    page = page ? parseInt(page, 10) : 1;
    if (isNaN(page)) {
        return res.status(400).send({ message: "Invalid page" });
    }

    // Validate if page size is not a number
    pageSize = pageSize ? parseInt(pageSize, 10) : 10;
    if (isNaN(pageSize)) {
        return res.status(400).send({ message: "Invalid page size" });
    }

    const validOrder = ["ASC", "DESC"];
    const sortableFields = {
        first_name: "first_name",
        last_name: "last_name",
        role_name: "role_name",
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    };

    const sortParam = sort || "first_name";
    // Validate sortable fields is present in sort param
    if (!Object.keys(sortableFields).includes(sortParam)) {
        return res
            .status(400)
            .send({ message: `Unable to sort tag by ${sortParam}` });
    }

    const sortDirParam = sortDir ? sortDir.toUpperCase() : "ASC";
    // Validate order is present in sortDir param
    if (!validOrder.includes(sortDirParam)) {
        return res.status(400).send({ message: "Invalid sort order" });
    }

    const where = {};
    if (id) {
        where.portal_id = id;
    }

    // Search by term
    const searchTerm = search ? search.trim() : null;
    if (searchTerm) {
        where.$or = [
            {
                first_name: {
                    $ilike: `%${searchTerm}%`,
                },
            },
        ];
    }

    const query = {
        order: [[sortParam, sortDirParam]],
        where,
        attributes: { exclude: ["deletedAt"] },
    };

    if (pagination) {
        if (pageSize > 0) {
            query.limit = pageSize;
            query.offset = (page - 1) * pageSize;
        }
    }

    UserData &&
        UserData.forEach(async value => {
            const isExist = await userService.findOne({
                where: { reg_no: value.Reg_No, roll_no: value.Roll_No },
            });

            if (!isExist) {
                const createData = {
                    roll_no: value.Roll_No,
                    reg_no: value.Reg_No,
                    first_name: value.Name,
                    gender: value.Gender,
                    phone_number: value.Mobile,
                    email: value.Mail_Id,
                    dob: value.DOB,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };

                await userService.create(createData);
            }
        });
    // Get list and count
    userService
        .findAndCount(query)
        .then(async results => {
            console.log("sk results", results);
            // Return null
            if (results.count === 0) {
                return res.status(200).send(null);
            }
            const data = [];
            await results.rows.forEach(async userData => {
                data.push({
                    id: userData.id,
                    roll_no: userData.Roll_No,
                    reg_no: userData.Reg_No,
                    first_name: userData.Name,
                    gender: userData.Gender,
                    phone_number: userData.Mobile,
                    email: userData.Mail_Id,
                    dob: userData.DOB,
                    createdAt: defaultDateFormat(userData.createdAt),
                    updatedAt: defaultDateFormat(userData.updatedAt),
                });
            });
            res.send({
                totalCount: results.count,
                currentPage: page,
                pageSize,
                data,
            });
        })
        .catch(err => {
            next(err);
        });
};
