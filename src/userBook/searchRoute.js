// import service
import { userBookService } from "./service";
import { defaultDateFormat, concatName } from "../../common/utils";
import models from "../../db/models";
import { STATUS_ISSUED, STATUS_OVERDUED } from "./Constant";

const { users } = models;
export default async (req, res, next) => {
    let {
        page,
        pageSize,
        search,
        sort,
        sortDir,
        pagination,
        status,
    } = req.query;

    const currentDate = new Date();
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
    if (!req.isSuperAdmin) {
        where.user_id = req && req.user && req.user.id;
    }

    if (status) {
        if (status != STATUS_OVERDUED) {
            where.status = status;
        } else where.status = STATUS_ISSUED;
    }

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
    console.log("wehre------>", where);
    const query = {
        order: [[sortParam, sortDirParam]],
        where,
        include: [{ required: true, model: users, as: "userData" }],
        attributes: { exclude: ["deletedAt"] },
    };

    if (pagination) {
        if (pageSize > 0) {
            query.limit = pageSize;
            query.offset = (page - 1) * pageSize;
        }
    }
    // Get list and count
    userBookService
        .findAndCount(query)
        .then(results => {
            let overdue, overDueDate;
            // Return null
            if (results.count === 0) {
                return res.status(200).send(null);
            }
            const data = [];
            results.rows.forEach(bookData => {
                if (bookData.status == STATUS_ISSUED) {
                    let newDate = currentDate.toLocaleString();
                    let bookDate =
                        bookData && bookData.updatedAt.toLocaleString();

                    let changedNewDate = defaultDateFormat(newDate);
                    let changedBookDate = defaultDateFormat(bookDate);
                    const date1 = new Date(changedNewDate);
                    const date2 = new Date(changedBookDate);
                    //Days Calculation with two Different Date
                    const diffTime = Math.abs(date1 - date2);
                    const diffDays = Math.ceil(
                        diffTime / (1000 * 60 * 60 * 24)
                    );
                    overDueDate = diffDays;
                    overdue = diffDays + " days";
                    console.log(diffDays + " days");
                    if (status == STATUS_OVERDUED && overDueDate >= 30) {
                        data.push({
                            id: bookData.id,
                            account_number: bookData.account_number,
                            book_title: bookData.book_title,
                            author: bookData.author,
                            roll_no:
                                bookData &&
                                bookData.userData &&
                                bookData.userData.roll_no,
                            user_name:
                                bookData &&
                                bookData.userData &&
                                concatName(
                                    bookData.userData.first_name
                                        ? bookData.userData.first_name
                                        : "",
                                    bookData.userData.last_name
                                        ? bookData.userData.last_name
                                        : ""
                                ),
                            status: bookData.status,
                            dueDate: overdue ? overdue : "",
                            createdAt: defaultDateFormat(bookData.createdAt),
                            updatedAt: defaultDateFormat(bookData.updatedAt),
                        });
                    }
                }
                if (status != STATUS_OVERDUED) {
                    data.push({
                        id: bookData.id,
                        account_number: bookData.account_number,
                        book_title: bookData.book_title,
                        author: bookData.author,
                        roll_no:
                            bookData &&
                            bookData.userData &&
                            bookData.userData.roll_no,
                        user_name:
                            bookData &&
                            bookData.userData &&
                            concatName(
                                bookData.userData.first_name
                                    ? bookData.userData.first_name
                                    : "",
                                bookData.userData.last_name
                                    ? bookData.userData.last_name
                                    : ""
                            ),
                        status: bookData.status,
                        dueDate: overdue ? overdue : "",
                        createdAt: defaultDateFormat(bookData.createdAt),
                        updatedAt: defaultDateFormat(bookData.updatedAt),
                    });
                }
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
