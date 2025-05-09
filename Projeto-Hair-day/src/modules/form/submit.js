import dayjs from "dayjs"

import {scheduleNew} from "../../services/schedule-new.js"
import {schedulesDay} from "../schedules/load.js"

const form = document.querySelector("form")
const clientName = document.getElementById("client")
const selectDate = document.getElementById("date")

// data atual para formatar o input 
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

// carrega a data atual e define a data mínima como sendo a atual
selectDate.value = inputToday
selectDate.min = inputToday

form.onsubmit =  async(event) =>{
    event.preventDefault()

    try{
        // Recuperando o nome do cliente
        const name = clientName.value.trim()

        if(!name){
            return alert("Informe o nome do cliente")
        }

        // recupera o horário selecionado
        const hourSelected = document.querySelector(".hour-selected")

        if(!hourSelected){
            return alert("Selecione a hora")
        }

        // recupera somente a hora 
        const [hour] = hourSelected.innerText.split(":")


        // insere a hora na data
        const when = dayjs(selectDate.value).add(hour,"hour")

        // gera um id
        const id = new Date().getTime()

        // chamo a função(método) que agenda os eventos na api, no caso (server.json)
        await scheduleNew({
            id, name, when
        })

        //recarregar os agendamentos
        await schedulesDay()

        // limpa o input de nome do cliente
        clientName.value = ""
    }catch(error){
        alert("Não foi possível ralizar o agendamento ")
        console.log(error)
    }
}