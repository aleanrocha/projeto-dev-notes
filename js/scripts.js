// Seleção de elementos

const noteInput = document.querySelector("#note-content")
const addNoteBtn = document.querySelector("#add-note")
const notesContainer = document.querySelector("#notes-container")
const searchInput = document.querySelector("#search")
const exportBtn = document.querySelector("header > button")
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
  const newIconDelete = document.createElement("i")
  newIconDelete.classList.add(...["bi", "bi-x-lg"])
  newElementDiv.appendChild(newIconDelete)
  newElementDiv.querySelector(".bi-x-lg").addEventListener("click", () => deleteNote(id, newElementDiv))
  const newIconEarmark = document.createElement("i")
  newIconEarmark.classList.add(...["bi", "bi-file-earmark-plus"])
  newElementDiv.appendChild(newIconEarmark)
  newElementDiv.querySelector(".bi-file-earmark-plus").addEventListener("click", () => copyNote(id))
  if(fixed) newElementDiv.classList.add("fixed")
  newElementDiv.querySelector("textarea").addEventListener("keyup", (e) => updateNote(id, e.target.value))

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
// deletar nota
const deleteNote = (id, element) => {
  const notes = getNotes().filter((note) => note.id !== id)
  saveNotesLocal(notes)
  notesContainer.removeChild(element)
} 
// copiar/duplicar bota
const copyNote = (id) => {
  const notes = getNotes()
  const targetNote = notes.filter((note) => note.id === id)[0]
  const noteObject = {
    id: generetedId(),
    content: targetNote.content,
    fixed: false
  }
  const newElementDiv = createNote(noteObject.id, noteObject.content, noteObject.fixed)
  notesContainer.appendChild(newElementDiv)
  notes.push(noteObject)
  saveNotesLocal(notes)
}
const updateNote = (id, newContent) => {
  const notes = getNotes()
  const targetNote = notes.filter((note) => note.id === id)[0]
  targetNote.content = newContent
  saveNotesLocal(notes)
}
const searchNotes = (searchValue) => {
  const searchResults = getNotes().filter((note) => note.content.includes(searchValue.trim()))
  if (searchValue.trim() !== "") {
    cleanNotes()
    searchResults.forEach((note) => {
      const noteContent = createNote(note.id, note.content)
      notesContainer.appendChild(noteContent)
    })
    return
  }
  cleanNotes()
  showNotes()
}
// download das notas em CSV
const exportNote = () => {
  const notes = getNotes()
  // CSV separa o dado por, vírgula e quebra linha \n
  const csvString = [
    ["id", "content", "fixed"],
    ...notes.map((note) => [note.id,note.content,note.fixed])
  ].map((e) => e.join(",")).join("\n")
  const element = document.createElement("a")
  element.href = "data:text/csv;charset-utf-8," + encodeURI(csvString)
  element.target = "_black"
  element.download = "notes.csv"
  element.click()
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
searchInput.addEventListener("keyup", (e) => searchNotes(e.target.value))
noteInput.addEventListener("keydown", (e) => {if(e.key === "Enter") addNotes()})
exportBtn.addEventListener("click", exportNote)

// Inicialização
showNotes()