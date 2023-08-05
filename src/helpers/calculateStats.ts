import { Note } from "../repositories/notesRepository"

export function calculateStats(notes: Note[]) {
  return {
    totalNotes: notes.length,
    totalArchived: notes.filter((note) => note.archived).length,
    totalActive: notes.filter((note) => !note.archived).length,
  };
};
