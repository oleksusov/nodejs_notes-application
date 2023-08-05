import express, { Request, Response } from 'express';
import { Note } from '../repositories/notesRepository';
import { createNote, updateNote, deleteNote, getAllNotes, getNote, getNoteStats } from '../services/notesService';

const router = express.Router();

router.post('/notes', (req: Request, res: Response) => {
  try {
    const newNote: Note = req.body;
    const note = createNote(newNote);

    res.status(201).json(note);
  } catch {
    res.status(400).json({ message: 'Error!' });
  }
});

router.delete('/notes/:id', (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    deleteNote(id);
    res.sendStatus(204);
  } catch {
    res.status(400).json({ message: 'Error!' });
  }
});

router.patch('/notes/:id', (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedNote = req.body;
    const note = updateNote(id, updatedNote);
    
    if (note) {
      res.status(200).json(note);
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch {
    res.status(400).json({ message: 'Error!' });
  }
});

router.get('/notes/:id', (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const note = getNote(id);

    if (note) {
      res.status(200).json(note);
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch {
    res.status(400).json({ message: 'Error!' });
  }
});

router.get('/notes', (req: Request, res: Response) => {
  try {
    const notes = getAllNotes();
    res.status(200).json(notes);
  } catch {
    res.status(400).json({ message: 'Error!' });
  }
});

router.post('/notes/stats', (req: Request, res: Response) => {
  try {
    const stats = getNoteStats();
    res.status(200).json(stats);
  } catch {
    res.status(400).json({ message: 'Error!' });
  }
});

export default router;
