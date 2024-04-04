import { FastifyInstance } from "fastify"
import { BadRequest } from "./routes/_errors/bad-request"
import { ZodError } from "zod"

type FastifyErrorHanbler = FastifyInstance["errorHandler"]

export const errorHandler: FastifyErrorHanbler = (error, request, reply) => {
  
  if ( error instanceof ZodError) {
    return reply.status(400).send({
      messsage: `Error during validation`,
      errors: error.flatten().fieldErrors,
    })
  }

 if (error instanceof BadRequest) {
   return reply.status(400).send({message: error.message})
 }
  return reply.status(500).send({ message: "Internal server error"})
}