export const required = value => {
  if(value!=undefined) {
    if (value.trim() === '') {
      return `Campo Obrigatório`;
    }
  }
  return null;
}

export const minCharNormal = (value) => {
  return minChar(value,3)
}
export const minCharPassword = (value) => {
  return minChar(value,6)
}

const minChar = (value, num) => {
  if (value!=undefined && value.trim().length < num) {
    return `Campo deve ter pelo menos ${num} caracteres`;
  }
}

export const isEmail = value => {
    if(value!=undefined && !value.match( /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
      return ("Por favor digite um email válido!");
    }
}

export const requiredArray = value => value && value.length > 0 ? undefined : 'Required';

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export const mustBeNumber = value => (isNaN(value) ? "Deve ser um número" : undefined);
export const mustBeNumberPhone = value => (isNaN(value) ? "Complete todos os numeros do telefone" : undefined);
export const minValue = min => value => isNaN(value) || value >= min ? undefined : `Deve ser maior que ${min}`;