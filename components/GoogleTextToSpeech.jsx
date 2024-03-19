import React, { useState } from 'react';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import apiKeys from "../apiKeys.json"

const GoogleTextToSpeech = () => {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const handleClick = async () => {
    try {
      const client = new TextToSpeechClient({credentials: apiKeys});
      const [response] = await client.synthesizeSpeech({
        input: { text },
        voice: { languageCode: 'pt-BR', ssmlGender: 'NEUTRAL' },
        audioConfig: { audioEncoding: 'MP3' },
      });
      const audioContent = response.audioContent;
      const audioBlob = new Blob([audioContent], { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    } catch (error) {
      console.error('Error synthesizing speech:', error);
    }
  };

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleClick}>Synthesize Speech</button>
      {audioUrl && <audio controls src={audioUrl} />}
    </div>
  );
};

export default GoogleTextToSpeech;
