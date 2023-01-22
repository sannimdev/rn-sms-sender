import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import { PHONE_NUMBERS, MESSAGE, ATTATCHMENTS_MIME, ATTATCHMENTS_FILENAME } from '@env';

const phoneNumbers = (PHONE_NUMBERS || '').replace(/\-/g, '').trim().split(',');
const message = (MESSAGE || '').trim().replace(/\\n/g, '\n');

const SMSConfig = {
  addresses: phoneNumbers,
  text: message.trim(),
  /*multipart: {
    attachments: {
      uri: FileSystem.getContentUriAsync(uri).then((cUri) => {
        console.log(cUri);
        IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
          data: cUri,
          flags: 1,
        });
      }),
      mimeType: ATTATCHMENTS_MIME,
      filename: ATTATCHMENTS_FILENAME,
    },
  },*/
};

console.log(SMSConfig);
export default SMSConfig;
