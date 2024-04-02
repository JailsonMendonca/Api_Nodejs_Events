import fastify from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const app = fastify()

const prima = new PrismaClient({
 log: ["query"],
})

//API REST
//HTTP methods: GET, POST, PUT, DELETE, PATCH, HERD, OPITIONS ...
//Request body
//Search params our Query params (http://localhost:3333/user?id=235cvf)
//route parameters (resource identification -> PUT:http://localhost:3333/235cvf)
//headers (request context -> information: identification , location, language)
//Relational database (SQLite)

app.post("/events", async (request, reply) => {
 const createEventsSchema = z.object({
   title: z.string().min(4),
   details: z.string().nullable(),
   maximumAttendees: z.number().int().positive().nullable(),
 });
 
 const data = createEventsSchema.parse(request.body); 
 const event = await prima.event.create({
  data: {
   title: data.title,
   details: data.details,
   maximumAttendees: data.maximumAttendees,
   slug: new Date().toISOString(),
  }
 })

 return reply.status(201).send({eventid: event.id})
})

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP SEVER RONNING")
})