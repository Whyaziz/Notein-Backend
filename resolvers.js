const resolvers = {
  getAllNotes: async (_, { models }) => {
    return await models.Note.findAll();
  },
  getNoteById: async ({ id }, { models }) => {
    const note = await models.Note.findByPk(id);
    if (!note) throw new Error("Note not found");
    return note;
  },
  createNote: async ({ title, body }, { models }) => {
    return await models.Note.create({
      title,
      body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },
  updateNote: async ({ id, title, body }, { models }) => {
    const note = await models.Note.findByPk(id);
    if (!note) throw new Error("Note not found");

    if (title !== undefined) note.title = title;
    if (body !== undefined) note.body = body;
    note.updatedAt = new Date();

    await note.save();
    return note;
  },
  deleteNote: async ({ id }, { models }) => {
    const note = await models.Note.findByPk(id);
    if (!note) throw new Error("Note not found");

    await note.destroy();
    return true;
  },
  deleteNotes: async ({ ids }, { models }) => {
    const notes = await models.Note.findAll({
      where: { id: ids },
    });

    if (notes.length !== ids.length) throw new Error("Some notes not found");

    await models.Note.destroy({
      where: { id: ids },
    });

    return true;
  },
};

module.exports = resolvers;
