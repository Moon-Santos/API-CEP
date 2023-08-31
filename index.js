const buttonSubmit = document.getElementById('buttonSubmit');
const inputCep = document.getElementById('inputCep');
const paragrafo = document.getElementById('paragrafo');

async function submit() {
	paragrafo.style.display = 'flex';
	if (inputCep.value.length == 8) {
		try {
			const cep = await fetch(
				`https://viacep.com.br/ws/${inputCep.value}/json/`
			).then((response) => {
				return response.json();
			});

			if (!cep.cep) {
				return (paragrafo.innerHTML = `CEP NÃO ENCONTRADO!`);
			}
			paragrafo.innerHTML = `
				<p>CEP: ${cep.cep}</p>
				<p>Logradouro: ${cep.logradouro ? cep.logradouro : 'Não possui'}</p>
				<p>Bairro: ${cep.bairro ? cep.bairro : 'Não possui'}</p>
				<p>Complemento: ${cep.complemento ? cep.complemento : 'Não possui'}</p>
				<p>DDD: ${cep.ddd ? cep.ddd : 'Não possui'}</p>
				<p>GIA: ${cep.gia ? cep.gia : 'Não possui'}</p>
				<p>IBGE: ${cep.ibge ? cep.ibge : 'Não possui'}</p>
				<p>Localidade: ${cep.localidade ? cep.localidade : 'Não possui'}</p>
				<p>SIAFI: ${cep.siafi ? cep.siafi : 'Não possui'}</p>
				<p>UF: ${cep.uf ? cep.uf : 'Não possui'}</p>
			`;
		} catch (error) {
			return (paragrafo.innerHTML = `ERRO NA API!`);
		}
	} else {
		return (paragrafo.innerHTML = `CEP INVÁLIDO! Digite 8 caracteres!`);
	}
}

buttonSubmit.addEventListener('click', submit);
