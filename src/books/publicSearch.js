// import service
import { bookService } from "./service";
import { defaultDateFormat } from "../../common/utils";

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
        book_title: "book_title",
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    };

    const sortParam = sort || "book_title";
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

    // Search by term
    const searchTerm = search ? search.trim() : null;
    if (searchTerm) {
        where.$or = [
            {
                book_title: {
                    $ilike: `%${searchTerm}%`,
                },
            },
            {
                author: {
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
    bookService
        .findAndCount(query)
        .then(results => {
            // Return null
            if (results.count === 0) {
                return res.status(200).send(null);
            }

            const data = [];
            results.rows.forEach(bookData => {
                data.push({
                    id: bookData.id,
                    account_number: bookData.account_number,
                    book_title: bookData.book_title,
                    author: bookData.author,
                    rack: bookData.rack,
                    cost: bookData.cost,
                    createdAt: defaultDateFormat(bookData.createdAt),
                    updatedAt: defaultDateFormat(bookData.updatedAt),
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
