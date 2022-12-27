import { PHONE_NUMBERS, MESSAGE } from '@env';

const phoneNumbers = (PHONE_NUMBERS || '').trim().split(',');
const message = (MESSAGE || '').trim().replace(/\\n/g, '\n');

const SMSConfig = {
  addresses: phoneNumbers,
  text: message.trim(),
  // multipart: {
  //   attachments: {
  //     uri: 'path/myfile.png',
  //     mimeType: 'image/png',
  //     filename: 'myfile.png',
  //   },
  // },
};

console.log(SMSConfig);
export default SMSConfig;
