const validators = {
  required: (value) => !value,
  lengthRange: (value, range) => value.length < range.min || value.length > range.max,
  type: (value, type) => {
    if (type === 'email') {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      return !re.test(value);
    }

    return typeof value !== type;
  },
};

const validate = (contract, object) => {
  return Object.entries(contract).reduce(
    (acc, [fieldKey, fieldValue]) => {
      Object.entries(fieldValue).forEach(([validationKey, validationValue]) => {
        switch (validationKey) {
          case 'type':
            if (object[fieldKey] && validators.type(object[fieldKey], validationValue)) acc.type.push(fieldKey);
            break;
          case 'lengthRange':
            if (object[fieldKey] && validators.lengthRange(object[fieldKey], validationValue))
              acc.lengthRange.push(fieldKey);
            break;
          case 'required':
            if (validators.required(object[fieldKey])) acc.required.push(fieldKey);
            break;
        }
      });

      return acc;
    },
    { type: [], required: [], lengthRange: [] },
  );
};

module.exports = validate;
