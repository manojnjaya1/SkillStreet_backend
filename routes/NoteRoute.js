import express from 'express'
import authMiddleware from '../middleware/Auth.js'
import {addNote,getNote,getNoteById,updateNoteById,deleteNoteById} from '../controller/NoteController.js'
const router = express.Router();

router.use(authMiddleware)

router.post('/add-notes',addNote);
router.get('/get-notes',getNote);
router.get('/get-notes/:id',getNoteById);
router.put('/update-notes/:id',updateNoteById);
router.delete('/delete-notes/:id',deleteNoteById);


export default router