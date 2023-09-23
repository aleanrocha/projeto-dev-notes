// Seleção de elementos

const noteInput = document.querySelector("#note-content")
const addNoteBtn = document.querySelector("#add-note")
const notesContainer = document.querySelector("#notes-container")
let contador = 0

// Funções

// exibir notas ao inicializar
const showNotes = () => {
  cleanNotes()
  getNotes().forEach((note) => {
    const newElementDiv = createNote(note.id, note.content, note.fixed)
    notesContainer.appendChild(newElementDiv)
  })
}
// limpar notas
const cleanNotes = () => notesContainer.replaceChildren([])
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
  const newIconFixed = document.createElement("i")
  newIconFixed.classList.add(...["bi", "bi-pin"])
  newElementDiv.appendChild(newIconFixed)
  newElementDiv.querySelector(".bi-pin").addEventListener("click", () => fixedNote(id))
  if(fixed) newElementDiv.classList.add("fixed")
  return newElementDiv
}
// fixar notas
const fixedNote = (id) => {
  const notes = getNotes()
  const targetNote = notes.filter((note) => note.id === id)[0]
  targetNote.fixed = !targetNote.fixed
  saveNotesLocal(notes)
  showNotes()
}
// LocalStorage

// obtém as notas do localStorage
const getNotes = () => {
  const notes = JSON.parse(localStorage.getItem("notes") || "[]")
  const orderedNotes = notes.sort((a, b) => a.fixed > b.fixed ? -1 : 1)
  return orderedNotes
}
// salva as notas no localStorage
const saveNotesLocal = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes))
}

// Eventos

addNoteBtn.addEventListener("click", addNotes)

// Inicialização
showNotes()