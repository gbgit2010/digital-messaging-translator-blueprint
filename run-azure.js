const https = require('https');
const fs = require('fs');
const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');

// Azure Translator service configuration
const AZURE_TRANSLATOR_ENDPOINT = process.env.AZURE_TRANSLATOR_ENDPOINT;
const AZURE_TRANSLATOR_KEY = process.env.AZURE_TRANSLATOR_KEY;
const AZURE_TRANSLATOR_REGION = process.env.AZURE_TRANSLATOR_REGION;

const app = express();

// Local SSL certificates (for HTTPS)
const privateKey = fs.readFileSync('ssl/_localhost.key', 'utf8');
const certificate = fs.readFileSync('ssl/_localhost.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

app.use(cors());
app.use(express.static('docs'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpsServer = https.createServer(credentials, app);

// POST endpoint for translation
app.post('/translate', async (req, res) => {
    const body = req.body;
    console.log("gb_body"+JSON.stringify(body))
    
    const params = {
        text: body.raw_text,
        from: body.source_language, // source language (optional)
        to: body.target_language     // target language
    };

    const translateURL = `${AZURE_TRANSLATOR_ENDPOINT}/translate?api-version=3.0&to=${params.to}`;
    
    // Azure Translate request headers
    const headers = {
        'Ocp-Apim-Subscription-Key': AZURE_TRANSLATOR_KEY,
        'Ocp-Apim-Subscription-Region': AZURE_TRANSLATOR_REGION,
        'Content-Type': 'application/json'
    };

    // Request body format for Azure Translate
    const requestBody = [
        {
            "Text": params.text
        }
    ];

    try {
        // Send translation request to Azure
        const response = await axios.post(translateURL, requestBody, { headers });
        
        // Extract translated text
        const translatedText = response.data[0].translations[0].text;
        
        console.log("detectedLanguage: "+JSON.stringify( response.data[0].detectedLanguage.language))
        
        res.status(200).json({
            source_language: response.data[0].detectedLanguage.language,
            translated_text: translatedText

           
        });
    } catch (error) {
        console.error('Error during translation:', error);
        res.status(400).json({ error: 'Translation failed', details: error.message });
    }
});

httpsServer.listen(443, () => {
    console.log('HTTPS Server listening on port 443');
});
