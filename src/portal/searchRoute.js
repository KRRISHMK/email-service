// import service
import { portalService } from "./service";
import models from "../../db/models";
const { books } = models;

import { defaultDateFormat } from "../../common/utils";
import BookData from "../../db/data/books";

export default async (req, res, next) => {
    let { page, pageSize, search, sort, sortDir, pagination } = req.query;

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
        id: "id",
        portal_name: "portal_name",
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    };

    const sortParam = sort || "portal_name";
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

    BookData &&
        BookData.forEach(async value => {
            const isExist = await books.findOne({
                where: { account_number: value.account_number },
            });

            if (!isExist) {
                const createData = {
                    s_no: value.s_no,
                    account_number: value.account_number,
                    book_title: value.book_title,
                    author: value.author,
                    cost: value.cost,
                    rack: value.rack,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };

                await books.create(createData);
            }
        });

    const where = {};

    // Search by term
    const searchTerm = search ? search.trim() : null;
    if (searchTerm) {
        where.$or = [
            {
                portal_name: {
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

    // Get list and count
    portalService
        .findAndCount(query)
        .then(results => {
            // Return null
            if (results.count === 0) {
                return res.status(200).send(null);
            }

            const data = [];
            results.rows.forEach(portalData => {
                data.push({
                    id: portalData.id,
                    portalName: portalData.portal_name,
                    portalUrl: portalData.portal_url,
                    createdAt: defaultDateFormat(portalData.createdAt),
                    updatedAt: defaultDateFormat(portalData.updatedAt),
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
