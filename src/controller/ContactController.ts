import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Contact } from "../entity/Contact";

export class ContactController {
  static saveContact = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const { full_name, email, subject, inquiry } = request.body;
    const contactRepository = AppDataSource.getRepository(Contact);
    const contact = Object.assign(new Contact(), {
      full_name,
      email,
      subject,
      inquiry,
    });

    try {
         let res = await contactRepository.save(contact);
         response.status(201).send(res)
    } catch (error) {
        response.status(400).json({error:error})
    }
   
  };

  static hola = ( _request: Request,
    response: Response) =>{
        response.status(200).json({text:'prueba'})
    }
}
