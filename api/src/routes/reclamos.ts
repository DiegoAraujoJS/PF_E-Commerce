import { Request, Response, Router } from "express";
import Reclamo from "../models/Reclamo";
import User from "../models/Usuario";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const reclamos = await Reclamo.findAll();

  let thisRet: object[] = [];
  for (const reclamo of reclamos) {
    thisRet = [
      ...thisRet,
      {
        reclamo: reclamo,
        admin: await User.findByPk(reclamo.admin_email),
        denunciante: await User.findByPk(reclamo.denunciante_email),
        denunciado: await User.findByPk(reclamo.denunciado_email),
      },
    ];
  }

  return res.send(thisRet);
});

router.get("/claim/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const reclamo = {
    id: 1,
    denunciante_email: "edwardburgos@gmail.com",
    denunciado_email: "diegoaraujo@gmail.com",
    reclamo: "Me estafo dinero",
  };

  const denunciante = await User.findByPk(reclamo.denunciante_email);
  const denunciado = await User.findByPk(reclamo.denunciado_email);
  if (Number(id) === reclamo.id)
    return res.send({ reclamo, denunciante, denunciado });
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
