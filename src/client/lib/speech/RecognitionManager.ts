import isAndroid from './isAndroid';
import { debounce, concatTranscripts, browserSupportsPolyfills } from './utils';
import NativeSpeechRecognition, { isNative } from './NativeSpeechRecognition';
import {
  Callbacks,
  DisconnectType,
  IStartListening,
  SpeechRecognition,
  SpeechRecognitionErrorType,
  SpeechRecognitionEvent,
} from './types';

const EMPTY = () => {
  return undefined;
};

export default class RecognitionManager {
  recognition: SpeechRecognition | null;
  pauseAfterDisconnect: boolean;
  interimTranscript: string;
  finalTranscript: string;
  listening: boolean;
  isMicrophoneAvailable: boolean;
  subscribers: Record<string, Callbacks>;
  previousResultWasFinalOnly: boolean;

  onStopListening: (value?: any) => void;

  constructor(SpeechRecognition = NativeSpeechRecognition) {
    this.recognition = null;
    this.pauseAfterDisconnect = false;
    this.interimTranscript = '';
    this.finalTranscript = '';
    this.listening = false;
    this.isMicrophoneAvailable = true;
    this.subscribers = {};
    this.previousResultWasFinalOnly = false;

    this.onStopListening = () => {
      return undefined;
    };

    this.setSpeechRecognition(SpeechRecognition);

    if (isAndroid()) {
      this.updateFinalTranscript = debounce(
        this.updateFinalTranscript,
        250,
        true,
      );
    }
  }

  /**
   * Устанавливаем инстанс распознования речи `SpeechRecognition`
   * По мимо браузерного можно использовать стороние реализации
   */
  setSpeechRecognition = (SpeechRecognitionConstructor): void => {
    const browserSupportsRecogniser =
      !!SpeechRecognitionConstructor &&
      (isNative(SpeechRecognitionConstructor) || browserSupportsPolyfills());

    if (browserSupportsRecogniser) {
      this.disableRecognition();
      this.recognition =
        new SpeechRecognitionConstructor() as SpeechRecognition;
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.onresult = this.updateTranscript;
      this.recognition.onend = this.onRecognitionDisconnect;
      this.recognition.onerror = this.onError;
    }

    this.emitBrowserSupportsSpeechRecognitionChange(browserSupportsRecogniser);
  };

  subscribe(id: string, callbacks: Callbacks): void {
    this.subscribers[id] = callbacks;
  }

  unsubscribe(id: string): void {
    delete this.subscribers[id];
  }

  private emitListeningChange(listening: boolean): void {
    this.listening = listening;

    Object.keys(this.subscribers).forEach((id) => {
      const { onListeningChange } = this.subscribers[id];

      onListeningChange(listening);
    });
  }

  private emitMicrophoneAvailabilityChange(
    isMicrophoneAvailable: boolean,
  ): void {
    this.isMicrophoneAvailable = isMicrophoneAvailable;

    Object.keys(this.subscribers).forEach((id) => {
      const { onMicrophoneAvailabilityChange } = this.subscribers[id];

      onMicrophoneAvailabilityChange(isMicrophoneAvailable);
    });
  }

  private emitTranscriptChange(
    interimTranscript: string,
    finalTranscript: string,
  ): void {
    Object.keys(this.subscribers).forEach((id) => {
      const { onTranscriptChange } = this.subscribers[id];

      onTranscriptChange(interimTranscript, finalTranscript);
    });
  }

  private emitClearTranscript(): void {
    Object.keys(this.subscribers).forEach((id) => {
      const { onClearTranscript } = this.subscribers[id];

      onClearTranscript();
    });
  }

  private emitBrowserSupportsSpeechRecognitionChange(
    browserSupportsSpeechRecognitionChange: boolean,
  ): void {
    Object.keys(this.subscribers).forEach((id) => {
      const {
        onBrowserSupportsSpeechRecognitionChange,
        onBrowserSupportsContinuousListeningChange,
      } = this.subscribers[id];

      onBrowserSupportsSpeechRecognitionChange(
        browserSupportsSpeechRecognitionChange,
      );

      onBrowserSupportsContinuousListeningChange(
        browserSupportsSpeechRecognitionChange,
      );
    });
  }

  private disconnect(disconnectType: DisconnectType) {
    if (!this.recognition || !this.listening) {
      return;
    }

    switch (disconnectType) {
      case 'ABORT':
        this.pauseAfterDisconnect = true;
        this.abort();
        break;

      case 'RESET':
        this.pauseAfterDisconnect = false;
        this.abort();
        break;

      case 'STOP':
      default:
        this.pauseAfterDisconnect = true;
        this.stop();
    }
  }

  private disableRecognition = () => {
    if (!this.recognition) {
      return;
    }

    this.recognition.onresult = EMPTY;
    this.recognition.onend = EMPTY;
    this.recognition.onerror = EMPTY;

    if (this.listening) {
      this.stopListening();
    }
  };

  onError = (event) => {
    if (event?.error === SpeechRecognitionErrorType.notAllowed) {
      this.emitMicrophoneAvailabilityChange(false);
      this.disableRecognition();
    }
  };

  onRecognitionDisconnect = () => {
    this.onStopListening();
    this.listening = false;

    if (this.pauseAfterDisconnect) {
      this.emitListeningChange(false);
    } else if (this.recognition) {
      if (this.recognition.continuous) {
        this.startListening({ continuous: this.recognition.continuous });
      } else {
        this.emitListeningChange(false);
      }
    }

    this.pauseAfterDisconnect = false;
  };

  updateTranscript = ({
    results,
    resultIndex,
  }: SpeechRecognitionEvent): void => {
    const currentIndex =
      resultIndex === undefined ? results.length - 1 : resultIndex;

    this.interimTranscript = '';
    this.finalTranscript = '';

    for (let i = currentIndex; i < results.length; ++i) {
      const result = results[i];
      const alternative = result[0];

      if (result.isFinal && (!isAndroid() || alternative.confidence > 0)) {
        // Если этот результат окончательный, и имеет положительную оценку
        this.updateFinalTranscript(alternative.transcript);
      } else {
        // Если этот результат промежуточный, и имеет отрицательную оценку
        this.interimTranscript = concatTranscripts(
          this.interimTranscript,
          alternative.transcript,
        );
      }
    }

    let isDuplicateResult = false;

    if (this.interimTranscript === '' && this.finalTranscript !== '') {
      if (this.previousResultWasFinalOnly) {
        isDuplicateResult = true;
      }

      this.previousResultWasFinalOnly = true;
    } else {
      this.previousResultWasFinalOnly = false;
    }

    // Если не является повторным результатом, то фиксируем расшифровку
    if (!isDuplicateResult) {
      this.emitTranscriptChange(this.interimTranscript, this.finalTranscript);
    }
  };

  updateFinalTranscript(newFinalTranscript) {
    this.finalTranscript = concatTranscripts(
      this.finalTranscript,
      newFinalTranscript,
    );
  }

  /**
   * Сброс расшифровки стенограммы микрофона.
   * > Обратите внимание, что это локально для вашего компонента и не влияет на другие компоненты, использующие распознавание речи.
   */
  resetTranscript = () => {
    this.disconnect('RESET');
  };

  /**
   * По умолчанию микрофон перестает слушать, когда пользователь перестает говорить.
   * Если вы хотите слушать непрерывно, установите для `continuous` свойства значение `true` при вызове `startListening`.
   * Микрофон продолжит слушать даже после того, как пользователь перестанет говорить.
   *
   * > Имейте в виду, что не все браузеры поддерживают непрерывное прослушивание.
   * > В частности, Chrome на Android постоянно перезапускает микрофон, что приводит к неприятным и шумному (из-за звукового сигнала) восприятию.
   * > Чтобы избежать включения непрерывного прослушивания в этих браузерах,
   * > вы можете использовать `browserSupportsContinuousListening` состояние для обнаружения поддержки этой функции.
   */
  startListening = async ({
    continuous = false,
    language,
  }: IStartListening = {}): Promise<void> => {
    if (!this.recognition) {
      return;
    }

    const isContinuousChanged = continuous !== this.recognition.continuous;
    const isLanguageChanged = !!language && language !== this.recognition.lang;

    // Если изменен continuous или lang, то обновляем
    if (isContinuousChanged || isLanguageChanged) {
      // Если сейчас слушаем, то прервать текущее прослушивание
      if (this.listening) {
        await this.stopListening();
      }

      // Если `continuous` изменен, обновляем значание
      this.recognition.continuous = isContinuousChanged
        ? continuous
        : this.recognition.continuous;

      // Если `lang` изменен, обновляем значание
      this.recognition.lang = isLanguageChanged
        ? language
        : this.recognition.lang;
    }

    // Если сейчас слушаем, то продолжаем слушать, ничего не делаем
    if (this.listening) {
      return;
    }

    // Прослушивания нет, и ожидание единичнго реузультата, то
    if (!this.recognition.continuous) {
      this.resetTranscript();
      this.emitClearTranscript();
    }

    try {
      await this.start();

      this.emitListeningChange(true);
    } catch (e) {
      // Не DOMException исключения указывают на ложный запуск микрофона - безопасно проглотить
      if (!(e instanceof DOMException)) {
        this.emitMicrophoneAvailabilityChange(false);
      }
    }
  };

  abortListening = async () => {
    this.disconnect('ABORT');
    this.emitListeningChange(false);

    await new Promise((resolve) => {
      this.onStopListening = resolve;
    });
  };

  stopListening = async () => {
    this.disconnect('STOP');
    this.emitListeningChange(false);

    await new Promise((resolve) => {
      this.onStopListening = resolve;
    });
  };

  getRecognition() {
    return this.recognition;
  }

  async start() {
    if (this.recognition && !this.listening) {
      await this.recognition.start();
      this.listening = true;
    }
  }

  stop() {
    if (this.recognition && this.listening) {
      this.recognition.stop();
      this.listening = false;
    }
  }

  abort() {
    if (this.recognition && this.listening) {
      this.recognition.abort();
      this.listening = false;
    }
  }
}
