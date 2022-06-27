// import service
import { userBookService } from "./service";

export default async (req, res, next) => {
    const id = parseInt(req.params.id, 10);

    // Validate id
    if (!id) {
        return res.status(400).send({ message: "Book Id is required" });
    }

    try {
        //  Get User Details
        const bookDetails = await userBookService.findOne({
            attributes: ["id"],
            where: { id: id },
        });

        // User Not Found
        if (!bookDetails) {
            return res.status(400).send({ message: "Book not Found" });
        }

        // Delete The User Details
        await bookDetails.destroy();

        // Success
        res.send({
            message: "Book Declined Successfully",
        });
    } catch (err) {
        err => res.status(400).send({ message: err.message });
    }
};
