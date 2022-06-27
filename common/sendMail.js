import sendgrid from "sendgrid";
import emailTemplates from "email-templates";

const mailHelper = sendgrid.mail;
const EmailTemplate = emailTemplates.EmailTemplate;

export async function sendMail(data, callback) {
    const {
        from,
        to,
        template,
        subject,
        substitutions,
        attachment,
        fileName,
        homeUrl,
    } = data;
    const sendgridAPI = sendgrid(
        "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"
    );

    // Validate if from email is null
    if (!from) {
        return callback(new Error("From email is required"));
    }

    const toEmails = typeof to === "string" ? [to] : to;

    // Validate if toEmail is found or not
    if (!toEmails) {
        return callback();
    }

    // Validate if to email length is 0
    if (toEmails && toEmails.length === 0) {
        return callback(new Error("To email is required"));
    }

    // Email templates
    const emailTemplate = new EmailTemplate(
        `${process.cwd()}/email-templates/${template}`
    );

    // Render email templates
    emailTemplate.render(substitutions, (err, results) => {
        if (err) {
            return callback(err);
        }

        const content = new mailHelper.Content("text/html", results.html);

        const personalization = new mailHelper.Personalization();
        toEmails.forEach(toEmail => {
            toEmail = new mailHelper.Email(toEmail);

            personalization.addTo(toEmail);
        });

        const mailDetail = new mailHelper.Mail();
        mailDetail.addPersonalization(personalization);
        mailDetail.setSubject(subject);

        if (typeof from === "string") {
            mailDetail.setFrom(new mailHelper.Email(from));
        } else {
            mailDetail.setFrom(from);
        }

        // Attachment data
        if (attachment) {
            const attachmentHelper = new mailHelper.Attachment();
            attachmentHelper.setContent(attachment);
            attachmentHelper.setType(mime.lookup(fileName));
            attachmentHelper.setFilename(fileName);
            attachmentHelper.setDisposition("attachment");
            mailDetail.addAttachment(attachmentHelper);
        }

        mailDetail.addContent(content);

        const request = sendgridAPI.emptyRequest({
            method: "POST",
            path: "/v3/mail/send",
            body: mailDetail.toJSON(),
        });

        // Call send API to send an email
        sendgridAPI.API(request, err => {
            if (err) {
                return callback(err);
            }
            return callback();
        });
    });
}

module.exports = sendMail;
