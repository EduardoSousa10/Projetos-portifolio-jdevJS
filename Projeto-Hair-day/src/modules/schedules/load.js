import {hoursLoad} from "../form/hours-load.js"
import {scheduleFetchByDay} from "../../services/schedule-fetch-by-day.js"
import {schedulesShow} from "../schedules/show.js"

// seleciona o input de data
const selectDate = document.getElementById("date")

export async function schedulesDay(){
    //obtem a data do input
    const date = selectDate.value

    //busca na api os agendamentos
    const daylySchedules =  await scheduleFetchByDay({date})

    // exibe os agendamentos 
    schedulesShow({ daylySchedules })

    // renderiza as horas diponíveis
    hoursLoad({date, daylySchedules})

}