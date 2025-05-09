import { Header } from "./components/Header"
import styles from "./App.module.css"
import { Tip } from "./components/tip"
import { Letter } from "./components/letter"
import { Input } from "./components/input"
import { Button } from "./components/button"
import { LettersUsed } from "./components/lettersUsed"

export default function App(){
function handleRestartGame(){
  alert("Reiniciar o jogo!.")
}


  return(
    <div className={styles.container}>
      <main>
      <Header current={5} max={10} onRestart={handleRestartGame} />

      <Tip tip="Uma das linguagens de programação mais utilizadas"/>

      <div className={styles.word}>
      <Letter value= "R"/>
      <Letter value= "E"/>
      <Letter value= "A"/>
      <Letter value= "C"/>
      <Letter value= "T"/>
      </div>

      <h4>Palpite</h4>

      <div className={styles.guess}>
      <Input autoFocus maxLength={1} placeholder="?"/>
      <Button title= "Confirmar" />
      </div>

      <LettersUsed />
      </main>
    </div>
  )
}
