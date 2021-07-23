import { Request, Response, Router } from "express";
import Reclamo from "../models/Reclamo";
import User from "../models/Usuario";
import Clase from "../models/Clase";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const reclamos = await Reclamo.findAll({
      attributes: ["id", "name", "reclamo"],
      order: [["createdAt", "ASC"]],
      // include: [
      //   {
      //     model: User,
      //     as: "denunciado",
      //     attributes: ["name", "mail", "lastName"],
      //   },
      //   {
      //     model: User,
      //     as: "denunciante",
      //     attributes: ["name", "mail", "lastName"],
      //   },
      //   {
      //     model: User,
      //     as: "admin",
      //     attributes: ["name", "mail", "lastName"],
      //   },
      //   {
      //     model: Clase,
      //     attributes: ["id", "nombre"],
      //   }
      // ],
    });

    return res.send(reclamos);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const reclamo = await Reclamo.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "name", "reclamo"],
      include: [
        {
          model: User,
          as: "denunciado",
          attributes: ["name", "mail", "lastName"],
        },
        {
          model: User,
          as: "denunciante",
          attributes: ["name", "mail", "lastName"],
        },
        {
          model: User,
          as: "admin",
          attributes: ["name", "mail", "lastName"],
        },
        {
          model: Clase,
          attributes: ["id", "nombre"],
        },
      ],
    });

    return res.send(reclamo);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const reclamo = await Reclamo.create({
      nombre: req.body.nombre,
      reclamo: req.body.reclamo,
    });
    const denunciante = await User.findByPk(req.body.denunciante);
    await denunciante.$add("denuncias_hechas", [reclamo]);

    const denunciado = await User.findByPk(req.body.denunciado);
    await denunciado.$add("denuncias_recibidas", [reclamo]);

    const admin = await User.findByPk(req.body.admin);
    await admin.$add("denuncias_administradas", [reclamo]);

    const clase = await Clase.findByPk(req.body.clase);
    await clase.$add("clase", [reclamo]);

    return res.send("se agregó correctatmente");
  } catch (error) {
    console.log(error);
    return res.status(400).send(
      "Error al agregar el reclamo. Verifique los datos ingresados."
    );
  }
});

router.get("/suspender/:user", async (req: Request, res: Response) => {
  const { user } = req.params;

  try {
    const usuario = await User.findByPk(user);
    usuario.set({ ...usuario, suspendido: true });
    const result = await usuario.save();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

router.get("/permitir/:user", async (req: Request, res: Response) => {
  const { user } = req.params;

  try {
    const usuario = await User.findByPk(user);
    usuario.set({ ...usuario, suspendido: false });
    const result = await usuario.save();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

export default router;
