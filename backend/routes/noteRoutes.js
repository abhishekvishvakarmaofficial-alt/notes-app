const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');

const {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require('../controllers/noteController');
const { validate } = require('../middleware/validationMiddleware');

// ── Validation Rules ───────────────────────────────────────────────────────────
const noteBodyRules = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters'),
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required')
    .isLength({ max: 10000 }).withMessage('Content cannot exceed 10,000 characters'),
];

const idRule = [
  param('id').isMongoId().withMessage('Invalid note ID'),
];

// ── Routes ────────────────────────────────────────────────────────────────────
router.get('/', getNotes);
router.get('/:id', idRule, validate, getNoteById);
router.post('/', noteBodyRules, validate, createNote);
router.put('/:id', [...idRule, ...noteBodyRules], validate, updateNote);
router.delete('/:id', idRule, validate, deleteNote);

module.exports = router;
