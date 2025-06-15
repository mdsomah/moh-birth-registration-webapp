const Yup = require("yup");

//? User Image upload formats
const SUPPORTED_FORMATS = ["image/jpeg, image/jpg, image/png, image/jif"];

//? User Image upload size
const FILE_SIZE = 1024 * 1024 * 25;

//? Validate User Photo Schema
const validateUserPhotoSchema = Yup.object()
  .shape({
    photo: Yup.mixed()
      .notRequired()
      .test(
        "fileFormat",
        "File type not supported! Supported types: (.jpeg, .jpg, .png or .jif)",
        (value) =>
          !value || ((value) => value && SUPPORTED_FORMATS.includes(value.type))
      )
      .test(
        "fileSize",
        "File is too large! Supported size: (2MB)",
        (value) => !value || (value && value.size <= FILE_SIZE)
      ),
  })
  .required();

module.exports = { validateUserPhotoSchema };
