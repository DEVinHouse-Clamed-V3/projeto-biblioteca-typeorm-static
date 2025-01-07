import { Router } from 'express';
import { AppDataSource } from '../database/data-source';
import Autor from '../entities/Autor';

const autorRoutes = Router();

autorRoutes.get('/', async (req, res) => {
  try {
    const autorRepository = await AppDataSource.getRepository(Autor).find();
    res.json(autorRepository);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

autorRoutes.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const autorRepository = await AppDataSource.getRepository(Autor).findOne({
      where: { id },
    });
    res.json(autorRepository);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

autorRoutes.post('/', async (req, res) => {
  try {
    const { name, nationality, biography, birth_date } = req.body;

    const autor = new Autor();
    autor.name = name;
    autor.nationality = nationality;
    autor.biography = biography;
    autor.birth_date = birth_date;

    const autorRepository = await AppDataSource.getRepository(Autor).save(
      autor,
    );
    res.json(autorRepository);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

autorRoutes.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const autorRepository = await AppDataSource.getRepository(Autor).delete(id);
    res.json(autorRepository);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

autorRoutes.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { name, nationality, biography, birth_date, active } = req.body;

    const autorRepository = await AppDataSource.getRepository(Autor).update(
      id,
      {
        name,
        nationality,
        biography,
        birth_date,
        active,
      },
    );
    res.json(autorRepository);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default autorRoutes;
