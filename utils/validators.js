const validators = {
  required: (value) => !value,
  lengthRange: (value, range) =>
    value.length < range.min || value.length > range.max,
  type: (value, type) => {
    if (type === 'email') {
      const re =
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      return !re.test(value)
    } else if (type === 'username') {
      const re = /^[a-zA-Z]+(\w|\d)+/

      return !re.test(value)
    }

    return String(typeof value) !== type
  },
}

const addValidationToFieldArray = (object, fieldKey, validationType) => {
  if (object[fieldKey] === undefined) {
    object[fieldKey] = []
  }

  object[fieldKey].push(validationType)
}

const validate = (contract, object) => {
  return Object.entries(contract).reduce((acc, [fieldKey, fieldValue]) => {
    Object.entries(fieldValue).forEach(([validationKey, validationValue]) => {
      switch (validationKey) {
        case 'type':
          if (
            object[fieldKey] &&
            validators.type(object[fieldKey], validationValue)
          )
            addValidationToFieldArray(acc, fieldKey, 'type')
          break
        case 'lengthRange':
          if (
            object[fieldKey] &&
            validators.lengthRange(object[fieldKey], validationValue)
          )
            addValidationToFieldArray(acc, fieldKey, 'lengthRange')
          break
        case 'required':
          if (validators.required(object[fieldKey]))
            addValidationToFieldArray(acc, fieldKey, 'required')
          break
      }
    })

    return acc
  }, {})
}

export default validate
