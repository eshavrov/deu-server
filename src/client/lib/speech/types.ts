export interface IStartListening {
  continuous?: boolean;
  language?: string;
}

export type StartListening = (value?: IStartListening) => Promise<void>;

export type Subcommand = any;

export interface UseSpeechRecognitionOptions {
  transcribing?: boolean;
  clearTranscriptOnListen?: boolean;
  commands?: any[];
}

export type DisconnectType = 'ABORT' | 'RESET' | 'STOP';

export enum SpeechRecognitionErrorType {
  /**
   * Речи не обнаружено.
   * */
  noSpeech = 'no-speech',

  /**
   * Речевой ввод был каким-то образом прерван, возможно, из-за какого-то специфичного для пользовательского агента поведения,
   * например, кнопки, которую пользователь может нажать, чтобы отменить речевой ввод.
   */
  aborted = 'aborted',

  /**
   * Не удалось захватить звук.
   */
  audioCapture = 'audio-capture',

  /**
   * Сбой сетевого подключения, необходимого для завершения распознавания.
   */
  network = 'network',

  /**
   * Пользовательский агент запретил ввод речи из соображений безопасности, конфиденциальности или предпочтений пользователя.
   */
  notAllowed = 'not-allowed',

  /**
   * Пользовательский агент запретил запрошенную службу распознавания речи либо потому, что
   * пользовательский агент не поддерживает ее, либо из соображений безопасности, конфиденциальности
   * или предпочтений пользователя. В этом случае вместо этого можно было бы использовать другую,
   * более подходящую службу распознавания речи.
   */
  serviceNotAllowed = 'service-not-allowed',

  /**
   * Произошла ошибка в грамматике или семантических тегах распознавания речи,
   * либо выбранный формат грамматики или семантический тег не поддерживался.
   */
  badGrammar = 'bad-grammar',

  /**
   * Язык не поддерживался.
   */
  languageNotSupported = 'language-not-supported',
}

export interface SpeechRecognitionErrorEvent {
  /**
   * Возвращает тип ошибки
   */
  error?: SpeechRecognitionErrorType;

  /**
   * Содержащие более подробную информацию об ошибке, который был поднят.
   * Обратите внимание, что в спецификации не определена точная формулировка
   * этих сообщений - это остается на усмотрение разработчиков.
   */
  message?: string;
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
 */
export interface SpeechRecognition {
  // TODO: Не описан тип данных
  /**
   * Возвращает и задает коллекцию `SpeechGrammar` объектов, представляющих грамматики,
   * которые будут понятны текущему `SpeechRecognition`.
   */
  grammars: null;

  /**
   * Возвращает и устанавливает язык текущего `SpeechRecognition`.
   * Если не указано, по умолчанию используется `lang` значение атрибута HTML или
   * языковой параметр пользовательского агента, если он также не установлен.
   */
  lang: string;

  /**
   * Определяет, будут ли возвращаться непрерывные результаты для каждого распознавания или только один результат. По умолчанию одиночный (`false`)
   */
  continuous: boolean;

  /**
   * Определяет, должны ли возвращаться промежуточные результаты (`true`) или нет (`false`).
   * Промежуточные результаты - это результаты, которые еще не являются окончательными (например, `SpeechRecognitionResult.isFinal` свойство есть `false`)
   */
  interimResults: boolean;

  /**
   * Устанавливает максимальное количество `SpeechRecognitionAlternatives` для каждого результата. Значение по умолчанию `-1`.
   */
  maxAlternatives: number;

  abort: () => void;
  start: () => void;
  stop: () => void;

  /**
   * Вызывается, когда пользовательский агент начал захватывать звук.
   */
  onaudiostart: () => void;

  /**
   * Запускается, когда пользовательский агент закончил запись звука.
   */
  onaudioend: () => void;

  /**
   * Возникает при отключении службы распознавания речи.
   */
  onend: () => void;

  /**
   * Срабатывает при возникновении ошибки распознавания речи.
   */
  onerror: (event?: { error?: string }) => void;

  /**
   * Вызывается, когда служба распознавания речи возвращает окончательный результат без значительного распознавания.
   * Это может включать некоторую степень признания, которая не соответствует confidence пороговому значению или превышает его.
   */
  onnomatch: () => void;

  /**
   * Срабатывает, когда служба распознавания речи возвращает результат - слово или фраза были распознаны положительно и были возвращены.
   */
  onresult: (event: SpeechRecognitionEvent) => void;

  /**
   * Срабатывает при обнаружении любого звука - распознаваемой речи или нет.
   */
  onsoundstart: () => void;

  /**
   * Срабатывает, когда любой звук - распознаваемая речь или нет - перестает обнаруживаться.
   */
  onsoundend: () => void;

  /**
   * Срабатывает при обнаружении звука, который распознается службой распознавания речи как речь.
   */
  onspeechstart: () => void;

  /**
   * Вызывается, когда перестает обнаруживаться речь, распознанная службой распознавания речи.
   */
  onspeechend: () => void;

  /**
   * Запускается, когда служба распознавания речи начала прослушивать входящий звук с намерением распознавать грамматики, связанные с текущим `SpeechRecognition`.
   */
  onstart: () => void;

  // serviceURI: string; // Deprecated
}

/**
 * Объект события, содержит все данные, связанные с временным или конечным результатом распознавания речи
 */
export interface SpeechRecognitionEvent {
  /**
   * Возвращает `SpeechRecognitionResultList` объект, представляющий все результаты распознавания речи для текущего сеанса.
   */
  readonly results: SpeechRecognitionResultList;

  /**
   * Возвращает результат с наименьшим значением индекса в `SpeechRecognitionResultList` "массиве", который фактически изменился.
   */
  readonly resultIndex: number;

  /**
   * Возвращает Extensible MultiModal Annotation (EMMA) - XML ​​- представление результата.
   * > Устарело: эта функция больше не рекомендуется.
   */
  readonly emma: any;

  /**
   * Возвращает семантическое значение того, что сказал пользователь.
   * > Устарело: эта функция больше не рекомендуется.
   */
  readonly interpretation: any;
}

/**
 * Интерфейс представляет собой список `SpeechRecognitionResult` объектов, или одного, если результаты захватывается в `continuous` режиме
 */
export interface SpeechRecognitionResultList
  extends Iterable<SpeechRecognitionResult> {
  readonly length: number;
}

/**
 * представляет собой один матч распознавания, который может содержать несколько `SpeechRecognitionAlternative` объектов
 */
export interface SpeechRecognitionResult
  extends Iterable<SpeechRecognitionAlternative> {
  [key: number]: SpeechRecognitionAlternative;
  /**
   * Логическое значение, указывающее, является ли этот результат окончательным (истина) или нет (ложь)
   * - если да, то это последний раз, когда этот результат будет возвращен;
   * - в противном случае этот результат является промежуточным и может быть обновлен позже.
   */
  readonly isFinal: boolean;

  /**
   * Возвращает длину «массива» - количество SpeechRecognitionAlternative объектов, содержащихся в результате
   * (также называемых «n-лучшими альтернативами»).
   */
  readonly length: number;
}

/**
 * Объект слова, которое было признано службой распознавания речи.
 *  https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognitionAlternative
 */
export interface SpeechRecognitionAlternative {
  /**
   * Расшифровка распознанного слова
   */
  readonly transcript: string;

  /**
   * Числовая оценка того, насколько система распознавания речи уверена в правильности распознавания.
   */
  readonly confidence: number;
}

export interface Callbacks {
  onListeningChange: (isListening: boolean) => void;

  onTranscriptChange: (
    interimTranscript: string,
    finalTranscript: string,
  ) => void;

  onClearTranscript: () => void;

  onMicrophoneAvailabilityChange?: (isMicrophoneAvailable: boolean) => void;

  onBrowserSupportsSpeechRecognitionChange?: (
    isBrowserSupportsRecogniser: boolean,
  ) => void;

  onBrowserSupportsContinuousListeningChange?: (
    isBrowserSupportsContinuous: boolean,
  ) => void;
}
