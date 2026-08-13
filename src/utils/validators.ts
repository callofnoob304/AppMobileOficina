function apenasDigitos(valor: string): string {
	return (valor ?? '').replace(/\D/g, '');
}

export function isValidCPF(valor: string): boolean {
	const cpf = apenasDigitos(valor);
	if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

	const calcularDigito = (base: string) => {
		let soma = 0;
		for (let i = 0; i < base.length; i++) {
			soma += Number(base[i]) * (base.length + 1 - i);
		}
		const resto = (soma * 10) % 11;
		return resto === 10 ? 0 : resto;
	};

	const digito1 = calcularDigito(cpf.slice(0, 9));
	const digito2 = calcularDigito(cpf.slice(0, 9) + digito1);

	return cpf.slice(9) === `${digito1}${digito2}`;
}

export function isValidCNPJ(valor: string): boolean {
	const cnpj = apenasDigitos(valor);
	if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

	const calcularDigito = (base: string) => {
		const pesos = base.length === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
		const soma = base.split('').reduce((acc, digito, i) => acc + Number(digito) * pesos[i], 0);
		const resto = soma % 11;
		return resto < 2 ? 0 : 11 - resto;
	};

	const digito1 = calcularDigito(cnpj.slice(0, 12));
	const digito2 = calcularDigito(cnpj.slice(0, 12) + digito1);

	return cnpj.slice(12) === `${digito1}${digito2}`;
}

export function isValidCpfCnpj(valor: string): boolean {
	const digitos = apenasDigitos(valor);
	if (digitos.length === 11) return isValidCPF(digitos);
	if (digitos.length === 14) return isValidCNPJ(digitos);
	return false;
}

export function maskCpfCnpj(valor: string): string {
	const digitos = apenasDigitos(valor).slice(0, 14);

	if (digitos.length <= 11) {
		return digitos
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
	}

	return digitos
		.replace(/(\d{2})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1/$2')
		.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
}

export function maskTelefone(valor: string): string {
	const digitos = apenasDigitos(valor).slice(0, 11);

	if (digitos.length <= 10) {
		return digitos.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d{1,4})$/, '$1-$2');
	}

	return digitos.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d{1,4})$/, '$1-$2');
}

export function isValidTelefone(valor: string): boolean {
	const digitos = apenasDigitos(valor);
	return digitos.length === 10 || digitos.length === 11;
}

export function maskMilhar(valor: string): string {
	const digitos = apenasDigitos(valor).slice(0, 7);
	if (!digitos) return '';
	return Number(digitos).toLocaleString('pt-BR');
}
