import { Note } from '../repositories/notesRepository';
import { initialNotes } from '../repositories/notesRepository';
import { getNewNoteId } from '../helpers/getNewNoteId';
import * as yup from 'yup';

let notes = [...initialNotes];

const createNoteSchema = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  created: yup.string().required(),
  category: yup.string().required(),
  content: yup.string().required(),
});

const updateNoteSchema = yup.object().shape({
  id: yup.string(),
  name: yup.string(),
  created: yup.string(),
  category: yup.string(),
  content: yup.string(),
});


export function createNote(newNote: Note): Note {
  const id = getNewNoteId();

  newNote = { ...newNote, id };
  createNoteSchema.validateSync(newNote);
  notes.push(newNote);
  return newNote;
}

export function deleteNote(id: string): void {
  notes = notes.filter((note) => note.id !== id);
}

export function updateNote(id: string, updatedNote: Partial<Note>): Note | undefined {
  updateNoteSchema.validateSync(updatedNote);
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes[index] = { ...notes[index], ...updatedNote };
    return notes[index];
  }
  return undefined;
}

export function getNote(id: string): Note | undefined {
  return notes.find((note) => note.id === id);
}

export function getAllNotes(): Note[] {
  return notes;
}

export function getNoteStats() {
  return {
    totalNotes: notes.length,
    totalArchived: notes.filter((note) => note.archived).length,
    totalActive: notes.filter((note) => !note.archived).length,
  };
}
