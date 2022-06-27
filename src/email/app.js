"use strict";
import { STATUS_ISSUED } from "../userBook/Constant";
import models from "../../db/models";
import { defaultDateFormat } from "../../common/utils";

// Send Email
const sendMail = require("../../common/sendMail");
const nodemailer = require("nodemailer");
const { user_book, users } = models;

const nodeCron = require("node-cron");

async function sentOverDueMail() {
    try {
        const currentDate = new Date();
        const query = {
            where: { status: STATUS_ISSUED },
            include: [{ required: true, model: users, as: "userData" }],
            attributes: { exclude: ["deletedAt"] },
        };

        //Mail setting
        let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, //"sakthi.sk.jai@gmail.com", // generated ethereal user
//       pass: testAccount.pass, //"SakthiSk98@", // generated ethereal password
//     },
//   });



        const userMail = await user_book.findAll(query);
        let overdue, overDueDate;
        userMail &&
            userMail.length > 0 &&
            userMail.forEach( async bookData => {
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
                    if (overDueDate >= 30) {
                        // const emailSubstitution = {
                        //     accountNumber: bookData && bookData.account_number,
                        //     bookTitle: bookData && bookData.book_title,
                        //     author: bookData && bookData.author,
                        //     dueDate: overdue,
                        //     homeUrl:
                        //         "https://libraryfrontend.herokuapp.com/login",
                        //     emailPrimaryBackgroundColor: "#000000",
                        // };

                        // const emailData = {
                        //     to:
                        //         bookData &&
                        //         bookData.userData &&
                        //         bookData.userData.email,
                        //     from: "admin@library.com",
                        //     subject: `Your Book Date is Overdued for ${overdue}`,
                        //     template: "overDue",
                        //     subtitution: emailSubstitution,
                        //     homeUrl:
                        //         "https://libraryfrontend.herokuapp.com/login",
                        //     emailPrimaryBackgroundColor: "#000000",
                        // };

                        // return sendMail(emailData, err => {
                        //     console.log("mail sent");
                        //     if (err) {
                        //         console.log(err);
                        //     }
                        // });

                    //Using Node Mailer
                    // send mail with defined transport object
                    try {
                        
                   
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                          user: 'sakthi.sk.jai@gmail.com',
                          pass: 'SakthiSk98@'
                        }
                      });

                    const toMail = bookData && bookData.userData && bookData.userData.email;
                    const bookName = bookData && bookData.book_title;
                    const accountNumber = bookData && bookData.account_number;
                    const author = bookData && bookData.author;

                    let info = await transporter.sendMail({
                        from: '"Admin Library" <krrishmk@gmail.com>', // sender address
                        to: toMail, // list of receivers
                        subject: "Book Return Remainder Notification ✔", // Subject line
                        text: `Your taken Book ${bookName} is Overdued for ${overdue}`, // plain text body
                        html: `<b>BookName: ${bookName}</b>,</br>
                               <b>AccountNumber: ${accountNumber}</b>,</br>
                               <b>Author: ${author}</b>,</br>
                               Your Book is Overdue for ${overdue}`, // html body
                    });
                } catch (error) {
                        console.log("Mail error---",error);
                        throw error;
                }
                    }
                }
            });
    } catch (error) {
        console.log(error);
    }
}
// Schedule a job to run every two minutes
const job = nodeCron.schedule("0 9 * * Monday-Friday", sentOverDueMail); //Sent Mail Every Morning 9AM
// const job = nodeCron.schedule("*/3 * * * * *", sentOverDueMail); //For Checking Mail Console for 1 Minutes
export default job;
