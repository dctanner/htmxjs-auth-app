export const sendEmail = async (payload) => {
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

export const sendSignupVerifyEmail = async (to, link) => {
  return await sendEmail({
    personalizations: [
      {
        to: [{ email: to }],
      },
    ],
    from: {
      email: 'sender@example.com',
      name: 'Auth',
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
