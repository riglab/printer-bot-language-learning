const textToSpeech = require('@google-cloud/text-to-speech');
const client = new textToSpeech.TextToSpeechClient();
const fs = require('fs');

function speech(request, fileName) {
  // Performs the Text-to-Speech request
  client.synthesizeSpeech(request, (err, response) => {
    if (err) {
      console.error('ERROR:', err);
      return;
    }

    // Write the binary audio content to a local file
    fs.writeFile('public/audio/' + fileName, response.audioContent, 'binary', err => {
      if (err) {
        console.error('ERROR:', err);
        return;
      }
      console.log('Audio content written to file: ' + fileName);
    });
  });
}

function getRequest(text) {
  return {
    input: {text: text},
    // Select the language and SSML Voice Gender (optional)
    voice: {languageCode: 'en-US', 'name':'en-US-Wavenet-D', ssmlGender: 'MALE'},
    // Select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };
}

exports.synthesize = function() {

  /**********************/
  /**** Introduction ****/
  /**********************/
  var text = 'Hi, I\’m Pingu. Nice to meet you. I\’m a social robot designed to help people improve their Spanish listening comprehension skills. I\’ve heard you want to learn Spanish. Luckily,I know a language learning activity that may help. Let me know when you’re ready!';
  speech(getRequest(text), 'intro.mp3');

  /********************/
  /**** Start Task ****/
  /********************/
  text = 'Great, let’s go! I’ll start by playing a video clip in Spanish and you’ll try to repeat what was said. Here’s the video:';
  speech(getRequest(text), 'start.mp3');

  /************************/
  /**** What was said? ****/
  /************************/
  text = 'What was said?';
  speech(getRequest(text), 'what_said.mp3');
}
