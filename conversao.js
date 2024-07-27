let currencyOrigin
let currencyDestination

async function convertion() {
    /* 
        - event.preventDefault() Previne que pagina seja recarregada, poís esse é o comportamento padrão do botão. 
        - Assim a função é executada sem interrupções e a conversão pode ser realizada
    */
    event.preventDefault()


    // Obtém o valor da moeda inserido pelo usuário e converte para número
     currencyValue = Number(document.getElementById('currencyValue').value);

    // Obtém o código da moeda de origem selecionada pelo usuário
    currencyOrigin = document.getElementById('currencyOrigin').value;

    // Obtém o código da moeda de destino selecionada pelo usuário
    let currencyDestination = document.getElementById('currencyDestination').value;

    // Verifica se o valor inserido é válido (número positivo)
    if (isNaN(currencyValue) || currencyValue <= 0) {
        alert('Digite um valor válido!');
        return; // Encerra a função se o valor for inválido
    }

    currencyDestination = document.getElementById("currencyDestination").value


    // Chave da API para acessar os dados de câmbio
    const apiKey = `cd55b85e8ab95af19ccc26b9`;

    // URL da API com o endpoint para obter o valor mais atualizado da moeda de origem
    const path = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currencyOrigin}`;

    document.getElementById('valueConverted').textContent = "Convertendo..."

    if (currencyDestination === currencyOrigin){
        alert("As moedas precisam ser diferentes!")
    }

    try {
        // Faz a solicitação à API e aguarda uma resposta
        //Fetch é uma função que realiza solicitações HTTP (como GET, POST, etc.) e retorna uma Promise.
        const answer = await fetch(path);

        // Converte a resposta da API para formato JSON
        const data = await answer.json();

        // Verifica se a resposta da API contém algum erro
        if (data.result === "error") {
            alert("Erro ao obter dados de câmbio, tente novamente mais tarde!");
            return; // Encerra a função se houver erro
        }

        // Obtém a taxa de conversão para a moeda de destino selecionada
        const conversionRate = data.conversion_rates[currencyDestination];
        
        // Calcula o valor convertido e arredonda para 2 casas decimais
        const valueConverted = (conversionRate * currencyValue).toFixed(2);

        // Exibe o valor convertido na página

        setTimeout(()=>{
            document.getElementById('valueConverted').textContent = `${valueConverted} ${currencyDestination}`;
        }, 2000)
        
    } catch (error) {
        // Informa ao usuário em caso de erro na conexão com a API
        alert('Erro ao conectar com a API. Tente novamente mais tarde.');
    }
}

/*
    - A função invertion, inverte o valor das moedas de origem e destino e recalcula a conversão automáticamente;
    - Ela também atualiza os valores de exíbição nos respectivos select.
*/

function invertion(){
     /* 
        - event.preventDefault() Previne que pagina seja recarregada, poís esse é o comportamento padrão. 
        - Assim a função é executada sem interrupções e a conversão pode ser realizada.
    */
    event.preventDefault()

    //salva o valor de currencyOrigin para troca de valores
    currencySave = document.getElementById('currencyOrigin').value;

    //Atribui o valor de currencyDestination a currencyOrigin
    currencyOrigin = document.getElementById('currencyDestination').value;

    //Atribui o valor salvo, anteriormente de currencyOrigin a currencyDestination, efetivando a troca de valores.
    currencyDestination = currencySave

    //Atualiza exíbição do select
    document.getElementById('currencyOrigin').value = currencyOrigin

    //Atualiza exíbição no select.
    document.getElementById('currencyDestination').value = currencyDestination
    
    //Chama a função de converção para atualizar o valor convertido
    convertion()
}