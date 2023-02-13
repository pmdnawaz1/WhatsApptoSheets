## WhatsApp to SpreadSheet.

This is a WhatsApp bot which inserts the data into the Google sheet from WhatsApp built on Nodejs using `google-spreadsheet` and `whatsapp-web.js` npm packages


Usage:- 
- Download the code or clone into repository.
- cd folder.
- npm i
- Check that all the essential packages are installed properly.



## Authors

- [@pmdnawaz1](https://www.github.com/pmdnawaz1)





## Environment Variables

To run this project, you will need to add the following environment variables to your .env file which we get by downloading credentials from google api console. Access them in this way in your index file.

```
"type": process.env.TYPE,

"project_id": process.env.PROJECT_ID,

"private_key_id": process.env.PRIVATE_KEY_ID,

"private_key": process.env.PRIVATE KEY,

"client_email": process.env.CLIENT EMAIL,

"client_id": process.env.CLIENT_ID,

"auth_uri": process.env.AUTH_URI,

"token_uri": process.env. TOKEN_URI,

"auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,

"client_x509_cert_url": process.env.CLIENT_X509 CERT_URL
```


## Functionality.

#### type `Hello` to get started.

```
Hai there! Please type Add name [yourName] Add name [yourAge] Add name [yourGender] to enter data to spreadsheet with given id
```

| Parameter | Type     | Description    |
| :-------- | :------- | :------------------------- |
| `Add name` | `string` | **Required**.  |
| `Add age` | `string` | **Required**.  |
| `Add gender` | `string` | **Required**.  |
| `Save` | `string` | **Required**.  |

#### `Save` command enters data to the spreadsheet.

```
Your data has been saved successfully to the spreadsheet.
```

#### await addDatatoSpreadsheet

Takes two parameters one is spreadsheetId and other is data object to be added.

