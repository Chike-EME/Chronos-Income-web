export function maskFiscalId(value: string): string {
  const onlyDigits = value.replace(/\D/g, '');

  // se tem mais de 9 dígitos, aplica máscara CNPJ
  if (onlyDigits.length > 9) {
    return onlyDigits
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .substring(0, 18);
  }

  // EIN: XX-XXXXXXX — aplica hífen após 2 dígitos
  if (onlyDigits.length <= 9) {
    return onlyDigits.replace(/^(\d{2})(\d)/, '$1-$2').substring(0, 10);
  }

  return value;
}

export function isValidFiscalId(value: string): boolean {
  const cnpj = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
  const ein = /^\d{2}-\d{1,7}$/;
  return cnpj.test(value) || ein.test(value);
}
