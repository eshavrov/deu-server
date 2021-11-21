import React from 'react';

type Lang = string | null;

interface Voice {
  id: string;
  name: string;
  language: string;
  lang: string;
  origin: SpeechSynthesisVoice;
}

const phrase = {
  ru: 'Вот так, звучит мой голос.',
  de: 'So hört sich meine Stimme an.',
  en: 'This is how my voice sounds.',
  fr: "C'est ainsi que résonne ma voix.",
  default: 'Sorry, but we did not find a suitable phrase.',
};

const projectionVoice = (voice) => ({
  id: voice.voiceURI,
  name: voice.name,
  language: voice.lang.split('-')[0],
  lang: voice.lang,
  origin: voice,
});

const applyVoice = (setConfig) => (status: boolean, voiceId: string) => {
  setConfig((config) => {
    let voices: string[] = config?.slice() ?? [];

    if (!status) {
      voices = voices.filter((id) => id !== voiceId);
    }

    if (status && !voices.includes(voiceId)) {
      voices.push(voiceId);
    }

    return voices;
  });
};

const useVoiceConfig = () => {
  const [lang, setLang] = React.useState<Lang>(null);
  const [existVoices, setExistVoices] = React.useState<Voice[]>([]);
  const [voices, setVoices] = React.useState<string[]>([]);

  const apply = React.useCallback(applyVoice(setVoices), [setVoices]);

  return {
    lang,
    setLang,
    existVoices,
    setExistVoices,
    voices,
    setVoices,
    apply,
  };
};

interface VoicesConfigOptions {
  onEnd?: () => void;
}

export const useVoicesConfig = (options: VoicesConfigOptions = {}) => {
  const { onEnd } = options;

  const main = useVoiceConfig();
  const learn = useVoiceConfig();

  const [isSupported, setIsSupported] = React.useState(false);
  const [isSpeaking, setIsSpeaking] = React.useState(false);

  const _onEnd = () => {
    setIsSpeaking(false);

    if (onEnd) {
      onEnd();
    }
  };

  const speechSynth = React.useRef({
    synth: undefined,
  });

  const speak = (voice) => (message?) => {
    if (!speechSynth.current) return;
    if (!isSupported) {
      return;
    }

    const { synth } = speechSynth.current;

    if (!synth) return;

    synth.cancel();
    setIsSpeaking(true);

    const utterMessage =
      typeof message === 'string'
        ? message
        : phrase[voice.language] ?? phrase.default;

    if (!utterMessage) return;

    const utterThis = new SpeechSynthesisUtterance(utterMessage);

    utterThis.voice = voice.origin;
    utterThis.onend = _onEnd;

    synth.speak(utterThis);
  };

  const cancel = () => {
    // if (!isSupported) {
    //   return;
    // }
    setIsSpeaking(false);
    window.speechSynthesis.cancel();
  };

  const processVoices = (voices) => {
    const _voices = voices.map(projectionVoice);

    // Получить голоса для основного языка
    main.setExistVoices(
      _voices.filter(({ language }) => language === main.lang),
    );

    // Получить голоса для изучаемого языка
    learn.setExistVoices(
      _voices.filter(({ language }) => language === learn.lang),
    );
  };

  const getVoices = async (): Promise<void> => {
    let voiceOptions = await window.speechSynthesis.getVoices();

    // если список голосов уже определен
    if (voiceOptions.length > 0) {
      processVoices(voiceOptions);

      return;
    }

    // если список не определен, то ожидаем его по событию `onvoiceschanged`
    window.speechSynthesis.onvoiceschanged = (event) => {
      voiceOptions = (event.target as any).getVoices();

      processVoices(voiceOptions);
    };
  };

  React.useEffect(() => {
    const _voices = JSON.parse(localStorage.getItem('voices')) ?? {
      main: {},
      learn: {},
    };

    if (_voices.main.lang) {
      main.setLang(_voices.main.lang);
    }

    if (_voices.learn.lang) {
      learn.setLang(_voices.learn.lang);
    }
  }, []);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setIsSupported(true);
    } else {
      return;
    }

    speechSynth.current.synth = window.speechSynthesis;

    getVoices();

    const _voices = JSON.parse(localStorage.getItem('voices')) ?? {
      main: {},
      learn: {},
    };

    if (main.lang) {
      main.setVoices(_voices.main[main.lang] ?? []);
    }

    if (learn.lang) {
      learn.setVoices(_voices.learn[learn.lang] ?? []);
    }
  }, [main.lang, learn.lang, main.setLang, learn.setLang]);

  const save = React.useCallback(() => {
    const _voices = JSON.parse(localStorage.getItem('voices')) ?? {
      main: {},
      learn: {},
    };

    const voices = {
      main: {
        ..._voices.main,
        lang: main.lang,
        [main.lang]: main.voices,
      },

      learn: {
        ..._voices.learn,
        lang: learn.lang,
        [learn.lang]: learn.voices,
      },
    };

    localStorage.setItem('voices', JSON.stringify(voices));
  }, [main.lang, main.voices, learn.lang, learn.voices]);

  return {
    isSpeaking,
    isSupported,
    main: {
      lang: main.lang,
      setLang: main.setLang,
      apply: main.apply,
      allVoices: main.existVoices,
      voices: main.voices,
      speak: (message) => {
        const voices = main.voices.map((id) => {
          return main.existVoices.find((voice) => voice.id === id);
        });

        if (voices[0]) {
          return speak(voices[0])(message);
        }
      },
    },

    learn: {
      lang: learn.lang,
      setLang: learn.setLang,
      apply: learn.apply,
      allVoices: learn.existVoices,
      voices: learn.voices,
      speak: (message) => {
        const voices = learn.voices.map((id) => {
          return learn.existVoices.find((voice) => voice.id === id);
        });

        if (voices[0]) {
          return speak(voices[0])(message);
        }
      },
    },

    save,
    speak,
    cancel,
  };
};
