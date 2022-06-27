// import service
import { isBookExist, isNameExist, bookService } from "./service";

export default async (req, res, next) => {
    const data = req.body;
    const { id } = req.params;

    // Validate id
    if (!id) {
        return res.status(400).send({ message: "Book id is required" });
    }

    //Validation
    if (!data.book_title) {
        return res.status(400).send({ message: "Book Name is required" });
    }
    if (!data.author) {
        return res.status(400).send({ message: "Author Name is required" });
    }

    const isBookExists = await isBookExist(data.book_title, id);
    if (isBookExists) {
        return res.status(400).send({ message: "Book Name already exist" });
    }

    const isNameExists = await isNameExist(data.author, id);
    if (isNameExists) {
        return res.status(400).send({ message: "Author Name already exist" });
    }

    // Update Book Data
    const updateData = bookService.toDbObject(data);

    try {
        await bookService.update(updateData, {
            where: { id },
        });

        res.status(200).send({ message: "Book Updated successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
