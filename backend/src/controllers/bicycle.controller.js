import User from "../models/user.model";
import Bicycle from "../models/bicycle.model";

export async function createBicycle(request, response) {
  try {
    const userId = request.userId;
    const { brand, color, model } = request.body;

    // Verificar si el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar que todos los campos de la bicicleta esten presentes
    if (!brand || !color || !model) {
      return response
        .status(400)
        .json({ message: "Todos los campos son requeridos" });
    }

    //Verificar si el usuario ya tiene una bicicleta registrada
    if (user.bicycle) {
      return response
        .status(400)
        .json({ message: "El usuario ya tiene una bicicleta registrada" });
    }

    // Crear la bicicleta
    const newBicycle = new Bicycle({ user: userId, brand, color, model });
    // Guardar la bicicleta
    const savedBicycle = await newBicycle.save();

    // Asignar la bicicleta al usuario
    user.bicycle = savedBicycle._id;
    await user.save();

    // Formatear la respuesta
    const bicycleMap = {
      Bicicleta_ID: newBicycle._id,
      Marca: newBicycle.brand,
      Color: newBicycle.color,
      Modelo: newBicycle.model,
      Propietario: {
        Usuario_ID: user._id,
        Nombre: user.username,
      },
    };

    response.status(201).json({
      message: "Bicicleta creada exitosamente y registrada al usuario",
      data: bicycleMap,
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}

export async function getBicycles(request, response) {
  try {
    const bicycles = await Bicycle.find().populate("user", "username");

    // Verificar si no hay bicicletas registradas
    if (bicycles.length === 0) {
      return response
        .status(404)
        .json({ message: "No hay bicicletas registradas" });
    }

    const bicyclesMap = bicycles.map((bicycle) => ({
      Bicicleta_ID: bicycle._id,
      Marca: bicycle.brand,
      Color: bicycle.color,
      Modelo: bicycle.model,
      Propietario: {
        Usuario_ID: bicycle.user._id,
        Nombre: bicycle.user.username,
      },
    }));
    response
      .status(200)
      .json({ message: "Listado de Bicicletas", data: bicyclesMap });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}

export async function getBicycleByQuery(request, response) {
  try {
    const { brand, color, model } = request.query;

    // Construir el url de consulta dinamico
    let query = {};
    if (brand) query.brand = brand;
    if (color) query.color = color;
    if (model) query.model = model;

    // Buscar la bicicleta por los parametros de consulta
    const bicycles = await Bicycle.find(query).populate("user", "username");

    // Verificar si no hay bicicletas registradas
    if (bicycles.length === 0) {
      return response
        .status(404)
        .json({ message: "No hay bicicletas registradas" });
    }

    const bicyclesMap = bicycles.map((bicycle) => ({
      Bicicleta_ID: bicycle._id,
      Marca: bicycle.brand,
      Color: bicycle.color,
      Modelo: bicycle.model,
      Propietario: {
        Usuario_ID: bicycle.user._id,
        Nombre: bicycle.user.username,
      },
    }));
    response
      .status(200)
      .json({ message: "Listado de Bicicletas", data: bicyclesMap });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}
