import User from "../models/user.model.js";
import Issue from "../models/issue.model.js";

//crear una incidencia
export async function createIssue(req, res) {
  try {
    const userId = req.params.id;
    const { title, description } = req.body;

    // Verificar que el usuario exista
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Crear el Issue
    const newIssue = new Issue({ user: userId, title, description });
    const savedIssue = await newIssue.save();

    // Asociar Reclamo al usuario
    user.issue = savedIssue._id;
    await user.save();

    res.status(201).json({
      message: "Problema creado correctamente",
      data: newIssue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//ver las de un usuario
export async function getIssues(req, res) {
  try {
    const issues = await Issue.find().populate("user", "username");

    // Enviar la respuesta con los datos de los Issues encontrados
    res.status(200).json({
      message: "Lista de todos los problemas",
      data: issues,
    });
  } catch (error) {
    console.error("Error en issue.controller.js -> getIssue(): ", error);
    res.status(500).json({ message: error.message });
  }
}
import mongoose from "mongoose";

// Ver todas las incidencias
export async function getIssueById(req, res) {
  try {
    const { id } = req.params;

    // Validar si el ID es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID inválido",
      });
    }

    // Obtener el Issue por ID
    const issue = await Issue.findById(id).populate("user", "username");

    if (!issue) {
      return res.status(404).json({
        message: "No se encuentra el problema indicado",
      });
    }

    // Enviar la respuesta con los datos del problema
    res.status(200).json({
      message: "Problema encontrado",
      data: issue,
    });
  } catch (error) {
    console.log("Error en getIssueById(): ", error);
    res.status(500).json({ message: error.message });
  }
}

//Eliminar un Issue en especifico
export async function deleteIssue(req, res) {
  try {
    const { id } = req.params;
    // Buscar el Issue por su ID
    const issue = await Issue.findById(id);

    if (!issue) {
      res.status(404).json({
        message: "No se encuentra el problema indicado",
        data: null,
      });
    }

    await Issue.findByIdAndDelete(id);

    res.status(200).json({
      message: "Issue eliminado exitosamente",
      data: issue,
    });
  } catch (error) {
    console.error("Error en issue.controller.js -> deleteIssue(): ", error);
    res.status(500).json({ message: error.message });
  }
}
