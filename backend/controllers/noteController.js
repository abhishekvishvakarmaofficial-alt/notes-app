const Note = require('../models/noteModel');

/**
 * @desc    Get all notes with search & pagination
 * @route   GET /api/notes
 * @access  Public
 */
const getNotes = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 9));
    const search = req.query.search?.trim() || '';
    const skip = (page - 1) * limit;

    // Build query filter
    const filter = search
      ? { $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
        ]}
      : {};

    const [notes, total] = await Promise.all([
      Note.find(filter)
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Note.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: notes,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalNotes: total,
        limit,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single note by ID
 * @route   GET /api/notes/:id
 * @access  Public
 */
const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id).lean();
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    res.status(200).json({ success: true, data: note });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new note
 * @route   POST /api/notes
 * @access  Public
 */
const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const note = await Note.create({ title, content });
    res.status(201).json({ success: true, data: note, message: 'Note created successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a note by ID
 * @route   PUT /api/notes/:id
 * @access  Public
 */
const updateNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    ).lean();

    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    res.status(200).json({ success: true, data: note, message: 'Note updated successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a note by ID
 * @route   DELETE /api/notes/:id
 * @access  Public
 */
const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    res.status(200).json({ success: true, message: 'Note deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getNotes, getNoteById, createNote, updateNote, deleteNote };
