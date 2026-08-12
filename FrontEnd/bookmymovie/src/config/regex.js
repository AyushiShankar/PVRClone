/* eslint-disable no-useless-escape */
const REGEX = {
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  EMAIL_5: /^[\w-\.]+@([\w-]+\.)+[a-zA-Z]{2,}$/,
  EMAIL_4: /^[\w-\.]+@([a-zA-Z]+\.)+[a-zA-Z]{2,3}$/, // only alphabets and dot(.) allowed after @
  EMAIL_MOTOR:
    /^([A-Za-z0-9])+([A-Za-z0-9-_.]+)*@([A-Za-z-_0-9]+)\.([A-Za-z]{2,3})(.[A-Za-z]{2,3})?$/g, //local part that starts with alphanumeric characters and can include hyphens(“-”), underscores(“_”), and periods(“.”)
  CUSTOMER_NAME: /^(?!.*\u00A0\t)[\s]*([A-Za-z]+)+(([\s])([A-Za-z]+))([\s]*)$/,
  ONE_WORD_NAME: /^(?!.*\u00A0\t)[A-Za-z]{3,}( [A-Za-z]+)*$/,
  WORD_WITH_TRAILING: /^(?!.*[\u00A0\t])[A-Za-z]{3,}( [A-Za-z]+)* *$/,
  TWO_THREE_WORD_NAME:
    /^(?!.*\u00A0\t)[\s]*([A-Za-z]+)+(([\s])([A-Za-z]+)){1,2}([\s]*)$/,
  ONE_TO_FOUR_WORD_NAME: /^(?!.*\u00A0\t)[ ]*([A-Za-z]+)( [A-Za-z]+){1,3}[ ]*$/,
  CUSTOMER_SINGLENAME: /^[a-zA-Z]+[\s]*$/,
  DOB: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
  MONTH_YEAR: /^(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
  NOMINEE_DOB: /^[\d]{2}[\/]{1}[\d]{2}[\/]{1}[\d]{4}$/,
  NOMINEE_NAME: /[A-z][\s/][A-z]/,
  ASSIGNEE_NAME: /^([A-Za-z]+)( [A-Za-z]+){1,3}$/,
  MOBILE_NUMBER: /^[6-9][0-9]{9}$/,
  PHONE: /^\d{10}$/,
  REGISTRATION_NUMBER: /^(([A-Za-z]){2}[0-9]{1,2}[A-Za-z]{1,3}([0-9]){4})$/g,
  REGISTRATION_NUMBER_WITHOUT_G:
    /^(([A-Za-z]){2}[0-9]{1,2}[A-Za-z]{1,3}([0-9]){4})$/, // separate regex to stop toggling behaviour
  ENGINE_NUMBER:
    /^[a-zA-Z0-9\*\-\/\.\#\`\'\~\@\=\,\\\(\)\]\+\[\&\?\:\}\!<]{6,30}$/,
  CHASSIS_NUMBER:
    /^[a-zA-Z0-9\*\-\/\.\#\`\'\~\@\=\,\\\(\)\]\+\[\&\?\:\}\!<]{5,16}$/,
  CHASSIS_NUMBER_NEW:
    /^[a-zA-Z0-9\*\-\/\.\#\`\'\~\@\=\,\\\(\)\]\+\[\&\?\:\}\!<]{16}$/,
  CHASSIS_NUMBER_V2:
    /^[a-zA-Z0-9\*\-\/\.\#\`\'\~\@\=\,\\\(\)\]\+\[\&\?\:\}\!<]{6,30}$/,
  CHASSIS_NUMBER_NEW_VEHICLE:
    /^[a-zA-Z0-9\*\-\/\.\#\`\'\~\@\=\,\\\(\)\]\+\[\&\?\:\}\!<]{10,25}$/,
  POLICY_NUMBER:
    /^(?![-\/])(?!.*(--|\/\/|-\/|\/-|:| ))^[\a-zA-Z0-9\-\/]{1,50}(?!_)(?:[a-zA-z0-9])$/,
  PREV_POLICY_NUMBER:
    /^(?![-\/])(?!.*(--|\/\/|-\/|\/-|:| ))^[\a-zA-Z0-9\-\/]{4,50}(?!_)(?:[a-zA-z0-9])$/,
  PAY_AMT: /\B(?=(\d{3})+(?!\d))/g,
  PAN_KYC: /^[A-Z]{3}[PCHFATBLJG][A-Z][0-9]{4}[A-Z]$/,
  PAN_PERSONAL_REGEX: /^[A-Z]{3}[P][A-Z][0-9]{4}[A-Z]$/,
  AADHAR: /^\d{12}$/,
  PINCODE: /^\d{6}$/,
  ABHA_ID: /^\d{14}$/,
  TEN_DIGIT_NUMBER: /^[\d]+/g,
  TEN_DIGIT_NUMBER_2: /^[0-9]{10}$/,
  NON_MANDATORY_TEN_DIGIT: /^(?:[6-9][0-9]{9}|)$/,
  TATA_EMPLOYEE_CODE: /^[a-zA-Z0-9]*$/,
  REGISTRATION_NUMBER_2: /^([A-Za-z]{2}[0-9]{1}[A-Za-z]{1}[0-9]{4})/,
  REGISTRATION_NUMBER_3_G:
    /^([A-Za-z]{2}[\s][0-9]{1,2}[\s][A-Za-z]{1,3}[\s][0-9])$/g,

  REGISTRATION_NUMBER_WITHOUT_SPACES:
    /^(([A-Za-z]){2}[\s][0-9]{1,2}[\s][A-Za-z]{1,3}[\s]([0-9]){4})$/,

  REGISTRATION_NUMBER_PATTERN_1: /^([A-Za-z]{2}[\s][0-9]{1}[A-Za-z]{1,3})/g,
  REGISTRATION_NUMBER_PATTERN_2: /^([A-Za-z]{2}[\s][0-9]{2}[A-Za-z]{1,3})/g,
  REGISTRATION_NUMBER_PATTERN_3: /^([A-Za-z]{2}[\s][0-9]{1}[\s][A-Za-z]{1,3})/g,
  REGISTRATION_NUMBER_PATTERN_4: /^([A-Za-z]{2}[\s][0-9]{2}[\s][A-Za-z]{1,3})/g,
  REGISTRATION_NUMBER_PATTERN_5:
    /^([A-Za-z]{2}[\s][0-9]{1,2}[\s][A-Za-z]{1}[0-9])/g,
  REGISTRATION_NUMBER_PATTERN_6:
    /^([A-Za-z]{2}[\s][0-9]{1,2}[\s][A-Za-z]{2}[0-9])/g,
  REGISTRATION_NUMBER_PATTERN_7:
    /^([A-Za-z]{2}[\s][0-9]{1,2}[\s][A-Za-z]{3}[0-9])/g,
  REGISTRATION_NUMBER_PATTERN_8:
    /^([A-Za-z]{2}[\s][0-9]{1,2}[\s][A-Za-z]{1}[\s][0-9])/g,
  REGISTRATION_NUMBER_PATTERN_9:
    /^([A-Za-z]{2}[\s][0-9]{1,2}[\s][A-Za-z]{2}[\s][0-9])/g,
  REGISTRATION_NUMBER_PATTERN_10:
    /^([A-Za-z]{2}[\s][0-9]{1,2}[\s][A-Za-z]{3}[\s][0-9])/g,
  NAME_REGEX: /[^A-Za-z\s]/g,
  SPACE_REGEX: /\s{2,}/g,

  EMAIL_2:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // editOTPSave 265 //inputSave 114
  TEXT_WITH_SPACES: /[A-Za-z\s]/,
  ALPHANUMERIC_WITH_HYPHEN: /[A-Za-z0-9/-]/,
  ALPHANUMERIC: /[A-Za-z0-9]/,
  ALPHANUMERIC_2: /^[a-zA-Z0-9]*$/,
  DOB_2: /^[\d\/]+/g,

  AADHAR_REGEX: /^\d{12}$/,
  CKYCNUMBER_REGEX: /^\d{14}$/,
  PASSPORT_REGEX: /^([a-zA-Z]){1}([0-9]){7}$/,
  PASSPORT_FILE_REGEX: /^[a-zA-Z0-9]*$/,
  VOTERID_REGEX: /^([a-zA-Z]){3}([0-9]){7}?$/,
  DL_REGEX: /^[a-zA-Z0-9\/-]*$/,
  WORDS_N_SPACES: /\w\S*/g,
  HEIGHT_INCH: /^((\d)|([0-1][0-1]))?[\"]?$/,
  HEIGHT_FEET: /^[1-8]{1}$/,
  WEIGHT: /^(?!0+$)\d+$/,

  ALPHANUMERIC_WITH_HYPHEN_BACKSLASH: /[A-Za-z0-9/\\-]/,
  EMAIL_3: /^[\w+\.?\w+]{1,64}@\w+\.\w+$/,
  ALPHABETS_WITH_SPACES: /^[a-zA-Z ]+$/,
  ALPHABETS_WITH_SPACES_AND_QUOTES: /^[a-zA-Z' ]+$/,
  TIME: /^(1[012]|0[1-9]):[0-5][0-9]\s?(am|pm)$/i,
  ALPHANUMERIC_WITH_SPACES: /[A-Za-z0-9\s]/,
  CLAIM_REGISTER_POLICY_NUMBER: /^[0-9a-zA-Z]{6,20}$/,
  CLAIM_REGISTER_PHONE_NO: /^[0-9]{1,15}$/,
  FREE_TEXT: '[A-Za-z0-9\\s.\\"\\\\@/|#&\'$-:\\]\\[,]',
  FREE_TEXT_2: /^.*$/,
  location: /^[a-zA-Z0-9][a-zA-Z0-9, ]*$/,
  FREE_TEXT3: /^[a-zA-Z0-9 \/\-\,\\]*$/,
  RENEWAL_NOMINEE_NAME: /[a-zA-Z][\s/][a-zA-Z]/,
  FREE_TEXT4: /^(?!.*[\/\\,\-]{2}).*$/,
  FREE_TEXT5: /^(?!.*\u00A0\t)[a-zA-Z0-9,/\-. ]*$/,
  //   ATLEAST_1_LETTER_1_DIGIT: /([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*/, // Atleast 1 letter and 1 digit
  ATLEAST_1_LETTER_1_DIGIT: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, // Atleast 1 letter and 1 digit
  ALL_ZEROS: /^0+$/,
  POLICY_NUMBER_SPECIAL_CHARACTERS: /[/_\-\s]/g,
  MULTIPLE_SPACES: /\s+/g,
  BACKSLASH: /\\/g,
  WHITESPACES: /\s/g,
  REMOVETITLE: /(MR|MS)\s/g,
  DIAGNOSIS_DATE: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,

  // Can be removed
  AADHAR_KYC: /^[2-9][0-9]{3}\s[0-9]{4}\s[0-9]{4}$/,
  CKYCNUMBER_KYC: /^\d{14}$/,
  PASSPORT_KYC: /^([a-zA-Z]){1}([0-9]){7}$/,
  PASSPORT_FILE_KYC: /^[a-zA-Z0-9]*$/,
  VOTERID_KYC: /^([a-zA-Z]){3}([0-9]){7}?$/,
  // eslint-disable-next-line no-useless-escape
  DL_KYC: /^[a-zA-Z0-9\/-]*$/,
  RTO_REGEX: /[^A-Za-z0-9\s-]/g,
  LEADING_WHITE_SAPCES: /^\s+/,

  COMMA_SEPARATED: /\B(?=(\d{3})+(?!\d))/g,

  TWO_WORD_ALPHANUMERIC: /^[A-Za-z]{1,2}$/,
  BHARAT_REG_PART3_REGEX: /^(\d+)[A-Za-z]/,
  BHARAT_REG_PART2_PART3_REGEX: /^(\d{1,4})([A-Za-z]{1,2})$/,
  city: /^[a-zA-Z]+(?:[\s-&][a-zA-Z]+)*$/,
  NUMBER_INPUT_WITH_BACKSPACE: /^[0-9\b]+$/,
  NUMBER_ONLY: /[^0-9]/g,
  COMMMA: /,/g,
  GSTIN:
    /^(?!.*\u00A0\t)[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[0-9]{1}[zZ]{1}[0-9A-Za-z]{1}$/,

  GSTIN_MOTOR: /^[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z][1-9A-Za-z]Z[0-9A-Za-z]$/,
  POLICY_NO: /[0-9A-Za-z]/g,
  POLICY_NUMBER_NINE_REGEX: /^[0-9]{9}$/,
  POLICY_NUMBER_TEN_REGEX: /^[0-9]{10}$/,
  POLICY_NUMBER_ELEVEN_REGEX: /^[0-9]{10}C{1}$/,
  POLICY_NUMBER_TWELVE_REGEX: /^[0-9]{10}C{1}[0-9]{1}$/,
  NINE_TO_TEN_DIGIT_PO_NO: /^[0-9]{1,10}$/,
  TEN_DIGIT_PO_NO_WITH_C_SUFFIX: /^[0-9]{10}C$/,
  TEN_DIGIT_PO_NO_WITH_C_AND_DIGIT_SUFFIX: /^[0-9]{10}C[0-9]$/,
  ENGINE_CHASSIS_ALLOWED_SPECIAL_CHARS: new RegExp(
    `^[a-zA-Z0-9*\\-/.#\`~@=,()\\]+'&?:}!<\\[]*$`,
  ),
  RENEWAL_V2_EMAIL:
    /^([A-Za-z0-9])+([A-Za-z0-9-_.]+)*@([A-Za-z-_0-9]+)\.([A-Za-z]{2,3})(.[A-Za-z]{2,3})?$/,
  RENEWAL_V2_MOBILE: /^[6-9]\d{9}$/,
  RENEWAL_V2_LAST_NAME: /^[0-9a-zA-Z.]{1,50}$/,
  RENEWAL_V2_FIRST_NAME: /^[0-9a-zA-Z ]{1,50}$/,
  BATTERY_NUMBER: /^[\S]{1,30}$/,
  MOTOR_GSTIN:
    /^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9A-Za-z]{1}[Z]{1}[0-9a-zA-Z]{1}$/,
  ORGANISATION_NAME:
    /^[a-zA-Z0-9][a-zA-Z0-9-,._()&/]*( [a-zA-Z0-9-,._()&/]+)*$/,
  NAME_WITHOUT_TRAILING_SPACE: /^(?!.*\u00A0|\t)[A-Za-z]+( [A-Za-z]+){1,3}$/,
};

const a = '';

export { REGEX, a };
