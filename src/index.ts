import {
  google,
  Common
} from 'googleapis';
import { keyFilename, calendarId } from './credentials';

function isError(e: unknown): e is Common.GaxiosError {
  return !!(e as Common.GaxiosError).response;
}

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFilename,
    scopes: ['https://www.googleapis.com/auth/calendar']
  });

  const calendar = google.calendar({
    version: 'v3',
    auth,
  });


  try {
    const { data } = await calendar.events.list({
      calendarId,
      timeMin: (new Date()).toISOString()
    });
    console.log(data);
  } catch (e) {
    if (isError(e)) {
      const err = e;
      console.error(err.response);
    }
    throw e;
  }
}
main();
