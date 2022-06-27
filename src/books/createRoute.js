// import service
import { bookService, isBookExist, isNameExist } from "./service";

export default async (req, res, next) => {
    console.log("req-----------<>", req);
    const data = req.body;
    if (!req.isSuperAdmin) {
        data.user_id = req && req.user && req.user.id;
    }

    //Validation
    if (!data.book_title) {
        return res.status(400).send({ message: "Book Name is required" });
    }
    if (!data.author) {
        return res.status(400).send({ message: "Author Name is required" });
    }
    const isBookExists = await isBookExist(data.book_title);
    if (isBookExists) {
        return res.status(400).send({ message: "Book Name already exist" });
    }

    const isNameExists = await isNameExist(data.author);
    if (isNameExists) {
        return res.status(400).send({ message: "Author Name already exist" });
    }

    // Create portal Data
    const createData = bookService.toDbObject(data);

    try {
        await bookService.create(createData);

        res.status(200).send({ message: "Book Added Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
