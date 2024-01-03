import Note from '../models/NoteModal.js';
import User from '../models/UserModal.js';
import { Types } from 'mongoose';

const addNote = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }
        const newNote = new Note({
            title,
            content,
        });

        await newNote.save();
        await User.findByIdAndUpdate(userId, { $push: { Usernotes: newNote._id } });
        res.status(201).json(newNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getNote = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const userWithNotes = await User.findById(userId).populate('Usernotes');
        const userNotes = userWithNotes.Usernotes;
        res.status(200).json(userNotes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getNoteById = async (req, res) => {

    try {
        const userId = req.userData.userId;
        const noteId = req.params.noteId;

        const userWithNotes = await User.findById(userId).populate('Usernotes');

        if (!userWithNotes) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userNote = userWithNotes.Usernotes.find(note => note._id.toString() === noteId);

        if (!userNote) {
            return res.status(404).json({ error: 'Note not found for the user' });
        }

        res.status(200).json(userNote);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateNoteById = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.userData.userId;
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }
        const notesId = await User.findById(userId)
        const object = new Types.ObjectId(req.params.id);
        if (Array.isArray(notesId.Usernotes)) {
            const foundNote = notesId.Usernotes.find(note => note.equals(object));

            if (!foundNote) {
                res.status(404).json({ error: "note not found" });
            }
            const note = await Note.findByIdAndUpdate(
                req.params.id,
                {
                    title, content
                },
                { new: true }
            );
            if (!note) {
                return res.status(404).json({ error: 'Note not found' });
            }

            res.status(200).json(note);

        } else {
            res.status(404).json({ error: " usernote not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteNoteById = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const object = new Types.ObjectId(req.params.id);

        if (Array.isArray(user.Usernotes)) {
            const foundNoteIndex = user.Usernotes.findIndex(note => note.equals(object));

            if (foundNoteIndex === -1) {
                return res.status(404).json({ error: 'Note not found' });
            }

            user.Usernotes.splice(foundNoteIndex, 1);

            await user.save();
            const deletedNote = await Note.findByIdAndDelete(req.params.id);

            if (!deletedNote) {
                return res.status(404).json({ error: 'Note not found' });
            }

            res.status(200).json({ message: 'Note deleted successfully' });
        } else {
            res.status(404).json({ error: 'Usernotes not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export { addNote, getNote, getNoteById, updateNoteById, deleteNoteById }

