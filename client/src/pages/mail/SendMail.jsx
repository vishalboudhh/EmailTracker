import SendMailForm from "../../components/mail/SendMailForm";

export default function SendMail() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Send Job Application Email
      </h1>

      <SendMailForm />
    </div>
  );
}
