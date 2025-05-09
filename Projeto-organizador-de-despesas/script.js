// seleciona os elementos do formulário. 1
const form = document.querySelector("form") // 12
const amount = document.getElementById("amount") // 1
const expense = document.getElementById("expense") // 10
const category = document.getElementById("category") // 11

// seleciona os elementos da lista 24
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span") // uso o querySelector para navegar dentro do aside para selecionar a span 44
const expensesTotal = document.querySelector("aside header h2") // para navegar dentro do total 52

//captura o evento de input para formatar o valor 2 
amount.oninput = () => {
    let value = amount.value.replace(/\D+/g, "") // recebo o valor do input e retiro as letras 3

    // transformar o valor em centavos 9
    value = Number(value) / 100

    amount.value = formatCurrencyBRL(value) // retorno só o valor do input sem as letras 4, depois coloquei a função para já retornar o valor formatado na moeda brasileira 8
}

// crio a função para formatar o valor 5
function formatCurrencyBRL(value){

    // formata o valor no padrão BRL 6
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency:"BRL"
    })

    return value // retorno o value formatado 7
}

// captura o evento de submit do formulário para obter os valores 13
form.onsubmit = (event) => { 

    // previne o comportamento padrão de recarregar a página 14
    event.preventDefault()

    // crio um objeto para exibir os detalhes completos da nova dispesa 15
    const newExpense = {
        id: new Date().getTime(), // id da data do lançamento
        expense: expense.value, // nome da dispesa (jantar)
        category_id: category.value, // o option value (food)
        category_name: category.options[category.selectedIndex].text, // a option selecionada (alimentação)
        amount: amount.value, // valor (60,00)
        create_at: new Date() // data do lançamento (data atual)
    }
    // chama a função que irá adicionar o item na lista 17
    expenseAdd(newExpense)
   
}

// função para adicionar uma dispesa na lista de dispesas 16  
function expenseAdd(newExpense){
    try {
        // cria o elemento para adicionar o item (li) na lista (ul) 19
        const expenseItem = document.createElement("li")

        // adiciono a class expense feita no css, para o item ficar igual ao exemplo comentado no HTML 20
        expenseItem.classList.add("expense")

        // cria o ícone da categoria 21
        const expenseIcon = document.createElement("img")
        // define os atributos do item 22
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`) // explicando: entra na pasta img, coloca dinamicamente o valor selecionado pelo usúario no category_id e adiciona o svg, para puxar a img salva.
        expenseIcon.setAttribute("alt", newExpense.category_name)

        // cria a info da despesa 26
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info") // adiciono a class feita no css para a div 27

        // crio o nome da despesa 28
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense // adiciono o conteúdo de texto do strong pelo objeto pela parte do nome da despesa (.expense) do objeto que criamos (newExpense) 29

        // cria a categoria da despesa 30
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name // adiciono o conteúdo do texto da span pela categoria selecionada pelo usúario do objeto criado. 31

        // adiciona nome e categoria na div das informações da despesa (expenseInfo) 32
        expenseInfo.append(expenseName, expenseCategory)

        //cria o valor da despesa 34
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount") // adicionei a class expense-amount no span que criamos 35
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}` // coloco um small com o R$, pego o valor da nova despesa(newExpense), coloco tudo em maiúsculo (toUpperCase) e substituo o R$ por nada, pois o amount ja esta com o value formatado com o R$ 36

        //cria o ícone de remover 38
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon") // adiciona a class feita no css 39
        removeIcon.setAttribute("src", "img/remove.svg") // adiciono o atributo src 40
        removeIcon.setAttribute("alt", "remover") // adiciono o alt 41

        // adiciona as informações no item 23
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon) // add o expenseInfo 33 / add o expenseAmount 37 / add o removeIcon 42

        // adiciona o item na lista 25
        expenseList.append(expenseItem)

        // limpa o formulário para adicionar novos itens 63
        formClear() // chamei a função 

        // atualiza os totais 44
        updateTotals() // depois de montar e adicionar o item na lista, fazemos a atualização dos totais chamando a função.

        // coloco a msg para ser exibida ao usuário caso ocorra algum erro 18
    } catch (error) {
        alert("não foi possível atualizar a lista de despesas")
        console.log(error)
    }
}

// atualiza os totais 42
function updateTotals(){
    try {
        // recupera todos os itens (li) da lista (ul) 43
        const items = expenseList.children // pego a lista e verifico quantos itens(children) tem dentro dela 
        
        // atualiza a quantidade de itens da lista 45
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}` // - pego o span que selecionei (expensesQuantity) adicionando um texto(textContent): faço o interpolação(texto) usando o items.length para verificar a quantidade de itens na lista e exibir, depois pego o items.length novamente e uso o tratamento condicional ternário, para definir plural quando for mais de um item e singular quando for menos de um.

        // variável para incrementar o total 46
        let total = 0

        //percorre cada item (li) da lista (ul) 47
        for(let item = 0; item < items.length; item++){
            const itemAmount = items[item].querySelector(".expense-amount")

            // remover os caracteres não númericos e substitui a virgula pelo ponto 48
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",",".")

            // converte o valor para float 49
            value = parseFloat(value) // deixa ele em um número com . ex= 12.5

            // confirmo se é realmente um número 50
            if(isNaN(value)){
                return alert("por favor, digite um número")
            }

            //incrementa o valor total 51
            total += Number(value)  // explica = value + total

        }

        // exibir o total 53
        /* expensesTotal.textContent = total */

        // cria a span para adicionar o R$ do total formatado 53
        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"

        // formata o valor e remove o R$, pois ele será exibido pela small estilizada pelo css 54
        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

        // limpa o conteúdo do elemento 55
        expensesTotal.innerHTML = ""

        // adiciono no expensesTotal o SymbolBRl(o elemento de small criado(simbolo da moeda)) e o total(o resultado da soma dos valores das despesas) 56
        expensesTotal.append(symbolBRL, total)

    } catch (error) {
        console.log(error)
        alert("não foi possivel atualizar os totais")
    }
}

// evento que captura o clique nos itens da lista 57
expenseList.addEventListener("click", function(event){

    // verifico se o elemento clicado é o item de remover 58
    if(event.target.classList.contains("remove-icon")){ //  se evento que observa o click(event) => elemento clicado(.target) => verifica se existe a class pelo (.classList) =>  e se contem (.contains) a class remove-icon.
        console.log(event)

        // obtem a (li) pai do elemento clicado 59
        const item = event.target.closest(".expense") // veririco quando exixte o clique no local onde existe a class remove-icon (que é a class do icon de X) e com o .closest seleciono o elemento pai dela, no caso a class . expense que é a class do (li)

        // removo o item da lista 60
        item.remove()
    }
// depois que removi um itens atualizo o total chamando ele 61
    updateTotals() 
})

// função para limpar os campos depois de atualizar com uma nova despesa 62
function formClear(){
    expense.valeu = ""
    category.value = ""
    amount.value = ""

    // para deixar o input de amount focado depois que completei uma despesa e vou fazer outra 64 
    expense.focus()
}