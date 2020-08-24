const translate = require("@vitalets/google-translate-api");

module.exports = {
  translateMsg: async (text, language) => {
    try {
      let success = await translate(text, {
        to: translate.languages.getCode(language),
      });
      console.log("from lang ", success.from.language.iso);

      console.log(success.text);
      return success.text;
    } catch (e) {
      console.log(e);
    }
  },
};
