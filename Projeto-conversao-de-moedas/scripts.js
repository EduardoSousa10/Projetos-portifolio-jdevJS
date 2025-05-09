
// cotação de moedas do dia 

const USD = 5.59
const EUR = 6.09
const GBP = 7.12
const YEN = 0.037

//obtendo os elementos do formulário

const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// manipulando o input amount para receber somente números

amount.addEventListener("input", () =>{
    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, "")
})

// capturando o evento de submit (enviar) do formulário

form.onsubmit = (event) =>{
    event.preventDefault()
    
    switch (currency.value){
        case "USD":
            convertCurrency(amount.value, USD, "US$")
            break 
        case "EUR":
            convertCurrency(amount.value, EUR, "€")
            break
        case "GBP":
            convertCurrency(amount.value, GBP, "£")
            break   
        case "YEN":
            convertCurrency(amount.value, YEN, "¥")
            break

    }
}

// função para converter a moeda

function convertCurrency(amount, price, symbol){
    try{
        //exibindo a cotação da moeda selecionada
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

        //calcula o total
        let total = amount * price

        //verifica se o resultado não é um número
        if(isNaN(total)){
            return alert("por favor, digite o valor corretamente para converter")
        }

        //formatar o valor final
        total = formatCurrencyBRL(total).replace("R$", "")
    
        //exibir o resultado total
        result.textContent = `${total} Reais`

        // aplica a classe que exibe o footer para mostrar o resultado.
        footer.classList.add("show-result")
    }
    catch(error){
        //remove a classe do footer da tela.
        footer.classList.remove("show-result")

        console.log(error)
        alert("não foi possivel converter, tente novamente mais tarde.")
    }
}

// a proxima função irá, pegar o valor de value, transformar em número pelo Number(value), para usar .toLocaleString para transforma-lo em uma moeda BRl, como defini na função, ainda utilizo o return para retornar o valor formatado para o try que a chamou.

//formata a moeda em real brasileiro
function formatCurrencyBRL(value){
    //converte em número para utilizar o .toLocaleString para formatar no padrão BRL (R$ 00,00).
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}
