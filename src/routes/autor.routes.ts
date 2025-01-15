import { Router } from 'express';
import { AppDataSource } from '../database/data-source';
import Author from '../entities/Autor';

const authorRoutes = Router();

authorRoutes.get('/', async (req, res) => {
  try {
    const authors = await AppDataSource.getRepository(Author).find();
    res.status(200).json(authors);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error fetching authors', error: error.message });
  }
});

authorRoutes.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const author = await AppDataSource.getRepository(Author).findOne({
      where: { id },
    });

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.status(200).json(author);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error fetching author', error: error.message });
  }
});

authorRoutes.post('/', async (req, res) => {
  try {
    const { name, nationality, biography, birth_date } = req.body;

    if (!name || !nationality || !birth_date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const author = new Author();
    author.name = name;
    author.nationality = nationality;
    author.biography = biography || null;
    author.birth_date = new Date(birth_date);

    const savedAuthor = await AppDataSource.getRepository(Author).save(author);
    res.status(201).json(savedAuthor);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error creating author', error: error.message });
  }
});

authorRoutes.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, nationality, biography, birth_date, active } = req.body;

    const authorRepository = AppDataSource.getRepository(Author);
    const author = await authorRepository.findOne({ where: { id } });

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    author.name = name || author.name;
    author.nationality = nationality || author.nationality;
    author.biography = biography || author.biography;
    author.birth_date = birth_date ? new Date(birth_date) : author.birth_date;
    author.active = active !== undefined ? active : author.active;

    const updatedAuthor = await authorRepository.save(author);
    res.status(200).json(updatedAuthor);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error updating author', error: error.message });
  }
});

authorRoutes.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deleteResult = await AppDataSource.getRepository(Author).delete(id);

    if (deleteResult.affected === 0) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.status(200).json({ message: 'Author deleted successfully' });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error deleting author', error: error.message });
  }
});

export default authorRoutes;
