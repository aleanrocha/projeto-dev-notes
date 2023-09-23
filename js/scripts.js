// Seleção de elementos

const noteInput = document.querySelector("#note-content")
const addNoteBtn = document.querySelector("#add-note")
const notesContainer = document.querySelector("#notes-container")
let contador = 0

// Funções

// exibir notas ao inicializar
const showNotes = () => {
  getNotes().forEach((note) => {
    const newElementDiv = createNote(note.id, note.content, note.fixed)
    notesContainer.appendChild(newElementDiv)
  })
}
// adiciona as notas no container
const addNotes = () => {
  const notes = getNotes()
  const noteObject = {
    id: generetedId(),
    content: noteInput.value,
    fixed: false
  }
  if(noteInput.value.trim() === "") return
  const noteElement = createNote(noteObject.id, noteObject.content)
  notesContainer.appendChild(noteElement)
  notes.push(noteObject)
  saveNotesLocal(notes)
  noteInput.value = ""
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

// LocalStorage

// obtém as notas do localStorage
const getNotes = () => {
  const notes = JSON.parse(localStorage.getItem("notes") || "[]")
  return notes
}

// salva as notas no localStorage
const saveNotesLocal = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes))
}

// Eventos

addNoteBtn.addEventListener("click", addNotes)

// Inicialização
showNotes()