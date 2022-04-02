let data = 'c3RhY2thYnVzZS5jb20=';
let buff = new Buffer(data, 'base64');
let text = buff.toString('ascii');

const mailjet = require ('node-mailjet')
.connect('c6405dde1982a78727c2633927b59f03', 'cf5af5fdd19e9269c96fba44f98c314e')
const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": "eitan2007@gmail.com",
        "Name": "Eitan"
      },
      "To": [
        {
          "Email": "eitan2007@gmail.com",
          "Name": "Eitan"
        }
      ],
      "Subject": "Greetings from Mailjet.",
      "TextPart": "My first Mailjet email",
      "HTMLPart": text,
      "CustomID": "AppGettingStartedTest"
    }
  ]
})
request
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    console.log(err.statusCode)
  })