const express = require('express');
const dotenv = require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const port = process.env.PORT || 4000;

const app = express();
app.listen(port, () => console.log('Server started'));
app.use(express.static('public'));
app.use(express.json()); 

app.get('/', (req, res) => {
  res.status(200).json({ success: true });
});

const config = new Configuration({ apiKey: process.env.API_KEY });
const openai = new OpenAIApi(config);;

app.post('/createimage', async (req, res) => {
  let str = req.body.str;
  console.log("inside createimage" + str);
  try {
        const resp = await openai.createImage({
           prompt: str,
	   n: 1,
	   size: '512x512'
	});
	console.log(resp);
	const url = resp.data.data[0].url;

        res.status(200).json({ success: true, url: url });
     } catch(error) {
        res.status(200).json({ success: false, error: "Something went wrong" })
     }
});

