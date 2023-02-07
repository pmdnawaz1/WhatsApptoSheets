const { Client, LocalAuth } = require('whatsapp-web.js');
const creds = require('./creds.json')
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { promisify } = require('util');

const client = new Client({
   authStrategy: new LocalAuth(),
 });
const userData = {};

client.initialize();

client.once('qr', (qr) => {
  console.log("Please scan the QR code to log in.");
  console.log(qr);
});

client.on('authenticated', (session) => {
  console.log("Authenticated Successfully.");
});

const addDataToSheet = async (sheetId, data) => {
  console.log(data)
   const doc = new GoogleSpreadsheet(sheetId);
   async function accessSpreadsheet() {
      await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
      });
      await doc.loadInfo(); 
      const sheet = doc.sheetsByIndex[0];
      console.log(doc.title); 
      console.log(sheet.title);
      console.log(sheet.rowCount);
      const rowValues = Object.values(data);
      const addRow = promisify(sheet.addRow)
      await promisify(sheet.addRow)(rowValues);
   }
   accessSpreadsheet();
 };

client.on('message', async (message) => {
  const { from, body } = message;

  if (!userData[from]) {
    userData[from] = {};
  }

  if (body === 'Hello') {
    client.sendMessage(from, 'Hello there! To add data, send "Add name [your name]", "Add age [your age]", or "Add gender [your gender]". To save your data, send "Save".');
  } else if (body.startsWith('Add name')) {
    const name = body.split(' ')[2];
    userData[from].Name = name;
    client.sendMessage(from, `Name "${name}" added successfully!`);
  } else if (body.startsWith('Add age')) {
    const age = body.split(' ')[2];
    userData[from].Age = age;
    client.sendMessage(from, `Age "${age}" added successfully!`);
  } else if (body.startsWith('Add gender')) {
    const gender = body.split(' ')[2];
    userData[from].Gender = gender;
    client.sendMessage(from, `Gender "${gender}" added successfully!`);
  } else if (body === 'Save') {
    await addDataToSheet('1mbvrmGbwZBlPYaYSf-Ftoeoz9Jirhmeg1HmLre_KlQ4',{
      Name: userData[from].Name,
      Age: userData[from].Age,
      Gender: userData[from].Gender
    });
    client.sendMessage(from, 'Data saved successfully!');
    delete userData[from];
  }
});
