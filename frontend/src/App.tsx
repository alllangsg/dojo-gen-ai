//libraries
import React from "react"
import 'audio-react-recorder/dist/index.css';
import AudioReactRecorder, {RecordState} from "audio-react-recorder"
import { Streamlit } from "streamlit-component-lib"



export const App = () => {
  
  //React states
  const [recordState, setRecordState]= React.useState(null)
  const [audioDataURL, setAudioDataURL] = React.useState('');

  //fonction qui sera appelée à la fin de l’enregistrement
  const onStop = (data) => {
    // sauvegarder l'url pour pouvoir ré-écouter l'enregistrement
    setAudioDataURL(data.url);  // update a state
    // envoyer le contenu du fichier au back pour pouvoir le manipuler par la suite
    data.blob.arrayBuffer().then((arrayBuffer) => {
       const uint8Array = new Uint8Array(arrayBuffer);
        Streamlit.setComponentValue({ "arr": uint8Array });
     });
  };

  //fontion appellé quand le button et cliqué.
  const onClick = () => {
    if (recordState === RecordState.START) {
      setRecordState(RecordState.STOP);
      return 
    } 
    setAudioDataURL('');
    setRecordState(RecordState.START);
  };

  //html constants
  const recordButtonLabel = recordState === RecordState.START ? 'Stop Recording' : 'Start Recording'
  
  //html document
  return (
  <div>
    Ready to build your AI note taker ? Let's go 🚀🚀🔥
    
    <button 
    id ='toggle'
    onClick={onClick}
    style={{marginBottom:10}}

    >  
	  {recordButtonLabel}

    </button>

    <AudioReactRecorder state={recordState} onStop = {onStop} canvasHeight={20}/>

    <audio id = "audio" controls src = {audioDataURL} style={{marginTop:10}} />
    
  </div>
  );
};
