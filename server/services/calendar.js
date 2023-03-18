require('dotenv').config();
const { google } = require('googleapis');
const { outlook } = require('authenticate-azuread');
const moment = require('moment');

const CALENDAR_ID = process.env.CALENDAR_ID;
const TIME_ZONE = 'UTC';

// Set up Google Calendar API client
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/calendar'],
});
const calendar = google.calendar({ version: 'v3', auth });

// Send calendar invitation using Outlook API
const sendOutlookInvitation = async ({
  name,
  description,
  startDateTime,
  endDateTime,
  attendees,
  location,
}) => {
  try {
    const eventResponse = await outlook.sendEmail({
      token: process.env.OUTLOOK_TOKEN,
      message: {
        toRecipients: attendees,
        subject: name,
        body: {
          contentType: 'HTML',
          content: description,
        },
        start: {
          dateTime: startDateTime,
          timeZone: TIME_ZONE,
        },
        end: {
          dateTime: endDateTime,
          timeZone: TIME_ZONE,
        },
        location: {
          displayName: location,
        },
        isOnlineMeeting: false,
        allowNewTimeProposals: true,
        responseRequested: true,
        attachments: [
          {
            '@odata.type': '#microsoft.graph.eventMessage',
            'event@odata.bind': `https://graph.microsoft.com/v1.0/users/${process.env.OUTLOOK_USER_ID}/events/${
              eventResponse.id
            }`,
          },
        ],
      },
    });
    return eventResponse;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to send calendar invitation using Outlook API');
  }
};

// Send calendar invitation using Google Calendar API
const sendGoogleInvitation = async ({
  name,
  description,
  startDateTime,
  endDateTime,
  attendees,
  location,
}) => {
  try {
    const eventStartTime = moment.utc(startDateTime).format();
    const eventEndTime = moment.utc(endDateTime).format();
    const event = {
      summary: name,
      description,
      location,
      start: {
        dateTime: eventStartTime,
        timeZone: TIME_ZONE,
      },
      end: {
        dateTime: eventEndTime,
        timeZone: TIME_ZONE,
      },
      attendees,
      reminders: {
        useDefault: true,
      },
    };
    const eventResponse = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      resource: event,
    });
    return eventResponse;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to send calendar invitation using Google Calendar API');
  }
};

module.exports = {
  sendOutlookInvitation,
  sendGoogleInvitation,
};
