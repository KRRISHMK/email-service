// import service
import { bookService } from "./service";

export default async (req, res, next) => {
    const id = parseInt(req.params.id, 10);

    // Validate id
    if (!id) {
        return res.status(400).send({ message: "Book is required" });
    }

    try {
        //  Get Book Details
        const bookDetails = await bookService.findOne({
            attributes: ["id"],
            where: { id },
        });

        // Book Not Found
        if (!bookDetails) {
            return res.status(400).send({ message: "Book not found" });
        }

        // Delete The Book Details
        await bookDetails.destroy();

        // Success
        res.send({
            message: "Book deleted successfully",
        });
    } catch (err) {
        err => res.status(400).send({ message: err.message });
    }
};
