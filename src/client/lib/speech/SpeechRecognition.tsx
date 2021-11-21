import React from 'react';

import {
  concatTranscripts,
  commandToRegExp,
  compareTwoStringsUsingDiceCoefficient,
} from './utils';
import { clearTrancript, appendTrancript } from './actions';
import { transcriptReducer } from './reducers';
import RecognitionManager from './RecognitionManager';

import type { IStartListening, UseSpeechRecognitionOptions } from './types';

export const useSpeechRecognition = ({
  transcribing = true,
  clearTranscriptOnListen = true,
  commands = [],
}: UseSpeechRecognitionOptions = {}) => {
  const [recognitionManager] = React.useState(
    SpeechRecognition.getRecognitionManager(),
  );

  const [{ interimTranscript, finalTranscript }, dispatch] = React.useReducer(
    transcriptReducer,
    {
      interimTranscript: recognitionManager.interimTranscript,
      finalTranscript: '',
    },
  );

  const [listening, setListening] = React.useState(
    recognitionManager.listening,
  );

  const commandsRef = React.useRef(commands);

  commandsRef.current = commands;

  const clearTranscript = () => {
    dispatch(clearTrancript());
  };

  const resetTranscript = React.useCallback(() => {
    recognitionManager.resetTranscript();
    clearTranscript();
  }, [recognitionManager]);

  const testFuzzyMatch = (
    command,
    input,
    fuzzyMatchingThreshold,
  ): {
    command: any;
    commandWithoutSpecials: any;
    howSimilar: any;
    isFuzzyMatch: boolean;
  } => {
    const commandToString =
      typeof command === 'object' ? command.toString() : command;

    const commandWithoutSpecials = commandToString
      .replace(/[&/\\#,+()!$~%.'":*?<>{}]/g, '')
      .replace(/  +/g, ' ')
      .trim();

    const howSimilar = compareTwoStringsUsingDiceCoefficient(
      commandWithoutSpecials,
      input,
    );

    if (howSimilar >= fuzzyMatchingThreshold) {
      return {
        command,
        commandWithoutSpecials,
        howSimilar,
        isFuzzyMatch: true,
      };
    }

    return null;
  };

  const testMatch = (command, input) => {
    const pattern = commandToRegExp(command);
    const result = pattern.exec(input);

    if (result) {
      return {
        command,
        parameters: result.slice(1),
      };
    }

    return null;
  };

  const matchCommands = React.useCallback(
    (newInterimTranscript, newFinalTranscript) => {
      commandsRef.current.forEach(
        ({
          command,
          callback,
          matchInterim = false,
          isFuzzyMatch = false,
          fuzzyMatchingThreshold = 0.8,
          bestMatchOnly = false,
        }) => {
          const input =
            !newFinalTranscript && matchInterim
              ? newInterimTranscript.trim()
              : newFinalTranscript.trim();

          const subcommands = Array.isArray(command) ? command : [command];

          const results: any[] = subcommands
            .map((subcommand) => {
              if (isFuzzyMatch) {
                return testFuzzyMatch(
                  subcommand,
                  input,
                  fuzzyMatchingThreshold,
                );
              }

              return testMatch(subcommand, input);
            })
            .filter((x) => x);

          if (isFuzzyMatch && bestMatchOnly && results.length >= 2) {
            results.sort((a, b) => b.howSimilar - a.howSimilar);

            const { command, commandWithoutSpecials, howSimilar } = results[0];

            callback(commandWithoutSpecials, input, howSimilar, {
              command,
              resetTranscript,
            });
          } else {
            results.forEach((result) => {
              if (result.isFuzzyMatch) {
                const { command, commandWithoutSpecials, howSimilar } = result;

                callback(commandWithoutSpecials, input, howSimilar, {
                  command,
                  resetTranscript,
                });
              } else {
                const { command, parameters } = result;

                callback(...parameters, { command, resetTranscript });
              }
            });
          }
        },
      );
    },
    [resetTranscript],
  );

  const handleTranscriptChange = React.useCallback(
    (newInterimTranscript, newFinalTranscript) => {
      if (transcribing) {
        dispatch(appendTrancript(newInterimTranscript, newFinalTranscript));
      }

      matchCommands(newInterimTranscript, newFinalTranscript);
    },
    [matchCommands, transcribing],
  );

  const handleClearTranscript = React.useCallback(() => {
    if (clearTranscriptOnListen) {
      clearTranscript();
    }
  }, [clearTranscriptOnListen]);

  React.useEffect(() => {
    const id = SpeechRecognition.counter;

    SpeechRecognition.counter += 1;

    const callbacks = {
      onListeningChange: setListening,
      onTranscriptChange: handleTranscriptChange,
      onClearTranscript: handleClearTranscript,
    };

    recognitionManager.subscribe(id, callbacks);

    return () => {
      recognitionManager.unsubscribe(id);
    };
  }, [
    transcribing,
    clearTranscriptOnListen,
    recognitionManager,
    handleTranscriptChange,
    handleClearTranscript,
  ]);

  const transcript = concatTranscripts(finalTranscript, interimTranscript);

  return {
    transcript,
    interimTranscript,
    finalTranscript,
    isListening: listening,
    resetTranscript,
  };
};

let recognitionManager;

const SpeechRecognition = {
  counter: 0,

  getRecognitionManager: () => {
    if (!recognitionManager) {
      recognitionManager = new RecognitionManager();
    }

    return recognitionManager;
  },

  getRecognition: () => {
    const recognitionManager = SpeechRecognition.getRecognitionManager();

    return recognitionManager.getRecognition();
  },

  startListening: async ({
    continuous,
    language,
    onStart,
  }: IStartListening = {}): Promise<void> => {
    const recognitionManager = SpeechRecognition.getRecognitionManager();

    await recognitionManager.startListening({ continuous, language });

    if (onStart) {
      onStart();
    }
  },

  stopListening: async (): Promise<void> => {
    const recognitionManager = SpeechRecognition.getRecognitionManager();

    await recognitionManager.stopListening();
  },

  abortListening: async (): Promise<void> => {
    const recognitionManager = SpeechRecognition.getRecognitionManager();

    await recognitionManager.abortListening();
  },

  browserSupportsSpeechRecognition: () => {
    const recognitionManager = SpeechRecognition.getRecognitionManager();

    return recognitionManager.browserSupportsSpeechRecognition;
  },
};

export default SpeechRecognition;
