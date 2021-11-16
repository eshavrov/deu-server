declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
    mozSpeechRecognition: any;
    msSpeechRecognition: any;
    oSpeechRecognition: any;
  }
}

const NativeSpeechRecognition =
  typeof window !== 'undefined' &&
  (window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition ||
    window.oSpeechRecognition);

export const isNative = (SpeechRecognition) =>
  SpeechRecognition === NativeSpeechRecognition;

export default NativeSpeechRecognition;
