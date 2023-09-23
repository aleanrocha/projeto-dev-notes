// Seleção de elementos

const noteInput = document.querySelector("#note-content")
const addNoteBtn = document.querySelector("#add-note")
const notesContainer = document.querySelector("#notes-container")
let contador = 0

// Funções

// adiciona as notas no container
const addNotes = () => {
  const noteObject = {
    id: generetedId(),
    content: noteInput.value,
    fixed: false
  }
  const noteElement = createNote(noteObject.id, noteObject.content)
  notesContainer.appendChild(noteElement)
  console.log(noteObject)
}
// gera um id em ordem crescente
const generetedId = () => {return contador++}
// cria os elementod de notas
const createNote = (id, content, fixed) => {
  const newElementDiv = document.createElement("div")
  const newElementTextarea =  document.createElement("textarea")
  newElementDiv.classList.add("note")
  newElementTextarea.placeholder = ("Digite algum texto")
  newElementTextarea.value = content
  newElementDiv.appendChild(newElementTextarea)
  return newElementDiv
}

// Eventos

addNoteBtn.addEventListener("click", addNotes)