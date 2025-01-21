import { Router } from "express";
import { AppDataSource } from "../database/data-source";
import Leitor from "../entities/Leitor";

const leitorRoutes = Router();

// Buscar todos os leitores
leitorRoutes.get("/", async (req, res) => {
  try {
    const leitorRepository = await AppDataSource.getRepository(Leitor).find();
    res.json(leitorRepository);
  } catch (error: any) {
    res
      .status(400)
      .json({ error: "Erro ao buscar leitores", details: error.message });
  }
});

// Buscar um leitor específico por ID
leitorRoutes.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const leitorRepository = await AppDataSource.getRepository(Leitor).findOne({
      where: { id },
    });
    if (!leitorRepository) {
      return res.status(404).json({ error: "Leitor não encontrado" });
    }
    res.json(leitorRepository);
  } catch (error: any) {
    res
      .status(400)
      .json({ error: "Erro ao buscar ID do leitor", details: error.message });
  }
});

// Criar um novo leitor
leitorRoutes.post("/", async (req, res) => {
  try {
    const { name, email, phone_number, birthdate, address, active } = req.body;

    // Criação manual da entidade Leitor
    const leitor = new Leitor();
    leitor.name = name;
    leitor.email = email;
    leitor.phone_number = phone_number;
    leitor.birth_date = new Date(birthdate);
    leitor.address = address;
    leitor.active = active;

    // Salva o leitor no banco de dados
    const leitorRepository = AppDataSource.getRepository(Leitor);
    const savedLeitor = await leitorRepository.save(leitor);

    // Retorna o leitor salvo
    return res.status(201).json(savedLeitor);
  } catch (error: any) {
    return res
      .status(400)
      .json({ error: "Erro ao criar o leitor", details: error.message });
  }
});

// Atualizar as informações de um leitor
leitorRoutes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, phone_number, birthdate, address, active } = req.body;

  try {
    const leitorRepository = AppDataSource.getRepository(Leitor);
    const leitor = await leitorRepository.findOne({
      where: { id: parseInt(id, 10) },
    });

    if (!leitor) {
      return res.status(404).json({ error: "Leitor não encontrado" });
    }

    leitor.name = name;
    leitor.email = email;
    leitor.phone_number = phone_number;
    leitor.birth_date = birthdate;
    leitor.address = address;
    leitor.active = active;

    const updatedLeitor = await leitorRepository.save(leitor);
    return res.json(updatedLeitor);
  } catch (error: any) {
    res
      .status(400)
      .json({ error: "Erro ao atualizar o leitor", details: error.message });
  }
});

// Deletar um leitor
leitorRoutes.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const leitorRepository = await AppDataSource.getRepository(Leitor).delete(id);
    res.json(leitorRepository);
  } catch (error: any) {
    res
      .status(400)
      .json({ error: "Erro ao deletar o leitor", details: error.message });
  }
});

export default leitorRoutes;
