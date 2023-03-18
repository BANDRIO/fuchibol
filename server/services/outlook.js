const request = require('request-promise-native');
const moment = require('moment-timezone');

const sendEmail = async ({ token, message }) => {
  const options = {
    method: 'POST',
    uri: 'https://outlook.office.com/api/v2.0/me/sendmail',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: {
      Message: message,
      SaveToSentItems: 'true',
    },
    json: true,
  };

  try {
    const response = await request(options);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAccessToken = async ({ clientId, clientSecret, refreshToken }) => {
  const options = {
    method: 'POST',
    uri: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    form: {
      grant_type: 'refresh_token',
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      scope: 'https://outlook.office.com/.default',
    },
    json: true,
  };

  try {
    const response = await request(options);
    return response.access_token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createMessage = ({ toRecipients, subject, body, start, end, location, attachments }) => {
  const attendees = toRecipients.map((recipient) => ({
    emailAddress: {
      address: recipient.email,
      name: recipient.name,
    },
    type: 'required',
  }));

  const timeZone = start.timeZone;

  const startDateTime = moment.tz(start.dateTime, timeZone).format();
  const endDateTime = moment.tz(end.dateTime, timeZone).format();

  const message = {
    Subject: subject,
    Body: {
      ContentType: 'HTML',
      Content: body,
    },
    Start: {
      DateTime: startDateTime,
      TimeZone: timeZone,
    },
    End: {
      DateTime: endDateTime,
      TimeZone: timeZone,
    },
    Location: {
      DisplayName: location,
    },
    ToRecipients: attendees,
  };

  if (attachments && attachments.length) {
    message.Attachments = attachments.map((attachment) => ({
      '@odata.type': '#Microsoft.OutlookServices.FileAttachment',
      Name: attachment.name,
      ContentBytes: attachment.content,
    }));
  }

  return message;
};

module.exports = {
  sendEmail,
  getAccessToken,
  createMessage,
};
