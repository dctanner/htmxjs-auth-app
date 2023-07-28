import { emailConfig } from "./constants";

export const sendEmail = async (context, payload) => {
  // Mailchannels not supported on localhost so just log the email
  if (new URL(context.req.url).hostname === "localhost") {
    console.log("Email: ", JSON.stringify(payload, null, 2))
    return true
  } else {
    const response = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 202) return true;

    try {
      const { errors } = await response.clone().json();
      console.log("Error sending mailchannels email: ", JSON.stringify(errors, null, 2))
      return false
    } catch {
      console.log("Error sending mailchannels email: ", response.statusText)
      return false
    }
  }
}

export const sendSignupMagicLinkEmail = async (context, to, link) => {
  return await sendEmail(context, {
    personalizations: [
      {
        to: [{ email: to }],
      },
    ],
    from: {
      email: emailConfig.from,
      name: emailConfig.name,
    },
    subject: 'Verify your email address',
    content: [
      {
        type: 'text/plain',
        value: 'Click this link to verify your email address: ' + link,
      },
    ],
  })
}

export const sendLoginMagicLinkEmail = async (context, to, link) => {
  return await sendEmail(context, {
    personalizations: [
      {
        to: [{ email: to }],
      },
    ],
    from: {
      email: emailConfig.from,
      name: emailConfig.name,
    },
    subject: 'Confirm login',
    content: [
      {
        type: 'text/plain',
        value: 'Click this link to login: ' + link,
      },
    ],
  })
}
