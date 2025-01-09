import { Router } from "express";
import { AppDataSource } from "../database/data-source";
import Livro from "../entities/Livro";

const livroRoutes = Router();

// Buscar todos os livros
livroRoutes.get("/", async (req, res) => {
  try {
    const bookRepository = await AppDataSource.getRepository(Livro).find();
    res.json(bookRepository);
  } catch (error: any) {
    res
      .status(400)
      .json({ error: "Erro ao buscar livros", details: error.message });
  }
});

// Buscar um livro específico por ID
livroRoutes.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const bookRepository = await AppDataSource.getRepository(Livro).findOne({
      where: { id },
    });
    res.json(bookRepository);
  } catch (error: any) {
    res
      .status(400)
      .json({ error: "Erro ao buscar ID do livro", details: error.message });
  }
});

// Criar um novo livro
livroRoutes.post("/", async (req, res) => {
  try {
    const { title, description, publication_date, isbn, page_count, language } =
      req.body;

    // Criação manual da entidade usando `new Book`
    const livro = new Livro();
    livro.title = title;
    livro.description = description;
    livro.publication_date = new Date(publication_date);
    livro.isbn = isbn;
    livro.page_count = page_count;
    livro.language = language;

    // Salva a entidade no banco de dados
    const booksRepository = AppDataSource.getRepository(Livro);
    const savedBook = await booksRepository.save(livro);

    // Retorna o livro salvo
    return res.status(201).json(savedBook);
  } catch (error: any) {
    return res
      .status(400)
      .json({ error: "Erro ao criar o livro", details: error.message });
  }
});

// Atualizar as informações de um livro
livroRoutes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, publication_date, isbn, page_count, language } =
    req.body;

  try {
    const booksRepository = AppDataSource.getRepository(Livro);
    const book = await booksRepository.findOne({
      where: { id: parseInt(id, 10) },
    });

    if (!book) {
      return res.status(404).json({ error: "Livro não encontrado" });
    }

    book.title = title;
    book.description = description;
    book.publication_date = publication_date;
    book.isbn = isbn;
    book.page_count = page_count;
    book.language = language;

    const updatedBook = await booksRepository.save(book);
    return res.json(updatedBook);
  } catch (error: any) {
    res
      .status(400)
      .json({ error: "Erro ao atualizar o livro", details: error.message });
  }
});

// Deletar um livro
livroRoutes.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const autorRepository = await AppDataSource.getRepository(Livro).delete(id);
    res.json(autorRepository);
  } catch (error: any) {
    res
      .status(400)
      .json({ error: "Erro ao deletar o livro", details: error.message });
  }
});

export default livroRoutes;