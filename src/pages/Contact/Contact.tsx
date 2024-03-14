import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-hot-toast";
import { sendContactMessage } from "../../utils/api";
import useRedirectLoggedOutUser from "../../hooks/useRedirectLoggedOutUser";
import Card from "../../components/Card/Card";
import styles from "./Contact.module.scss";
import "../../styles/buttons.scss";
import useWindowDimensions from "../../hooks/useWindowDimensions";

interface ContactMessage {
  subject: string;
  message: string;
}

const Contact = () => {
  useRedirectLoggedOutUser("/login");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const { height } = useWindowDimensions();

  let rows: number;

  if (height <= 768) {
    rows = 5;
  } else {
    rows = 10;
  }

  const contactMessage: ContactMessage = {
    subject,
    message,
  };

  const sendEmail = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await sendContactMessage(contactMessage);
      setSubject("");
      setMessage("");

      toast.success(response.message);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const sendFormEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await sendContactMessage(contactMessage);
      setSubject("");
      setMessage("");

      toast.success(response.message);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.contact}>
      <Card cardClass="contact">
        <h3>Contact Us</h3>
        <p>
          Feel free to contact us by submitting the form below and we will get
          back to you as soon as possible.
        </p>
        <div>
          <form onSubmit={sendFormEmail}>
            <div className={styles.contact__info}>
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                value={subject}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSubject(e.target.value)
                }
              />
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Write your message..."
                required
                value={message}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setMessage(e.target.value)
                }
                cols={30}
                rows={rows}
              />
            </div>
          </form>
          <button type="submit" onClick={sendEmail} className="primary-button">
            Send message
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Contact;
