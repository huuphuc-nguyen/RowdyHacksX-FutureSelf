import emailjs from "emailjs-com";

export const sendScheduledEmail = async (data) => {
  const serviceId = "service_5op7fd9";
  const templateId = "template_gia39le";
  const publicKey = "r45fNu_IBqC6PAfXd";

  const templateParams = {
    from_name: data.fromName,
    message: data.message,
    to_email: data.toEmail,
  };
  try {
    // const result = await emailjs.send(
    //   serviceId,
    //   templateId, 
    //   templateParams,
    //   publicKey
    // );
    console.log("Scheduled email sent successfully:", result);
  } catch (error) {
    console.error("Failed to send scheduled email:", error);
  }
};

