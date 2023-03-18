const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const moment = require('moment');

const createEvent = async (accessToken, event) => {
  try {
    const oauth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
    oauth2Client.setCredentials({
      access_token: accessToken,
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const startDateTime = moment(event.date).add(event.time, 'hours').toISOString();
    const endDateTime = moment(startDateTime).add(2, 'hours').toISOString();
    const attendees = event.attendees.map(attendee => ({ email: attendee.email }));

    const calendarEvent = {
      summary: event.name,
      location: event.location,
      description: event.description,
      start: {
        dateTime: startDateTime,
        timeZone: 'UTC',
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'UTC',
      },
      attendees,
      reminders: {
        useDefault: true,
      },
    };

    const res = await calendar.events.insert({
      calendarId: 'primary',
      resource: calendarEvent,
    });

    return res.data.id;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create Google Calendar event');
  }
};

module.exports = { createEvent };
