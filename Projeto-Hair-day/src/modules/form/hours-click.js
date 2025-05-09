export function hoursClick(){
    const hours = document.querySelectorAll(".hour-available")

    hours.forEach((available) =>{
        available.addEventListener("click", (selected) =>{
            hours.forEach((hour) =>{
                // remove a classe selected de todas as li não selecionadas
                 hour.classList.remove("hour-selected")
            })
            // adiciono a classe no li clicado
            selected.target.classList.add("hour-selected")
        })
    })
}