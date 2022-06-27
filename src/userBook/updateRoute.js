// import service
import { isBookExist, isNameExist, userBookService } from "./service";

export default async (req, res, next) => {
    const data = req.body;
    const { id } = req.params;
    let userId = req && req.user && req.user.id;
    // Validate id
    if (!id) {
        return res.status(400).send({ message: "Book id is required" });
    }

    // Update Book Data
    const createData = {
        book_id: data.id,
        book_title: data.book_title,
        author: data.author,
        status: data.status,
        account_number: data.account_number,
        user_id: userId,
    };
    const updateData = {
        status: data.status,
    };
    const isExist = await userBookService.findOne({
        where: { account_number: data.account_number },
    });
    try {
        if (isExist) {
            if (isExist.status == data.status) {
                res.status(400).send({
                    message: `Book Already ${data.status}`,
                });
            } else if (isExist.status != data.status) {
                await userBookService.update(updateData, {
                    where: { id: id },
                });
                res.status(200).send({
                    message: `Book ${data.status} successfully`,
                });
            }
        } else {
            await userBookService.create(createData);

            res.status(200).send({
                message: `Book ${data.status} successfully`,
            });
        }
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
