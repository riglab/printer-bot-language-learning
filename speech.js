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

  /***********************/
  /**** First Attempt ****/
  /***********************/
  text = 'Not quite, but we can work through it together. Let\’s try it again, but this time we\’ll go through the task step by step. I\’ve split the video\’s dialogue into chunks. Here\’s the first one:';
  speech(getRequest(text), 'not_quite.mp3');

  /****************/
  /**** Repeat ****/
  /****************/
  text = 'Repeat this.';
  speech(getRequest(text), 'repeat.mp3');

  /***********************/
  /**** First Correct ****/
  /***********************/
  text = 'You got it!';
  speech(getRequest(text), 'got_it.mp3');

  /***********************/
  /**** First Incorrect ****/
  /***********************/
  text = 'Not quite. Let\’s go back and try it again:';
  speech(getRequest(text), 'try_again.mp3');

  /*****************************/
  /**** English Translation ****/
  /*****************************/
  text = 'Here’s an English translation that may help.';
  speech(getRequest(text), 'translation.mp3');

  /*****************/
  /**** Context ****/
  /*****************/
  text = 'Let\’s see if you can repeat the chunk again, in context. First, I\’ll replay the video:';
  speech(getRequest(text), 'context.mp3');

  /***********************/
  /**** Transcription ****/
  /***********************/
  text = 'Here\’s a transcription you can use as a guide. Of course, I hid the chunk you just learned. Try repeating what was said:';
  speech(getRequest(text), 'transcription.mp3');

  /********************/
  /**** Keep Going ****/
  /********************/
  text = 'Nice job. We’re making great progress. Let’s keep going!';
  speech(getRequest(text), 'keep_going.mp3');

  /********************/
  /**** Try Again ****/
  /********************/
  text = 'Let’s try it again.';
  speech(getRequest(text), 'try_again_simple.mp3');
}
