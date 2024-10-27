function formatarCep(input) {
    let valor = input.value;
    valor = valor.replace(/\D/g, '');
    if (valor.length > 2 && valor.length <= 5) {
        valor = valor.replace(/^(\d{2})(\d{1,3})/, "$1.$2");
    } else if (valor.length > 5) {
        valor = valor.replace(/^(\d{2})(\d{3})(\d{1,3})/, "$1.$2-$3");
    }
    input.value = valor;
}

document.getElementById("cep").addEventListener("input", function () {
    if (this.value.length >= 8) {
        const cep = this.value.replace(/\D/g, '');
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (data.erro) {
                        alert("CEP inválido. Por favor, verifique e tente novamente.");
                        return;
                    }
                    document.getElementById("rua").value = data.logradouro;
                    document.getElementById("bairro").value = data.bairro;
                    document.getElementById("cidade").value = data.localidade;
                    document.getElementById("estado").value = data.uf;
                })
                .catch(error => {
                    console.error('Erro ao buscar CEP:', error);
                    alert('Erro ao buscar CEP. Verifique e tente novamente.');
                });
        }
    }
});

