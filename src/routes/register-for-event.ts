import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from '../lib/prisma';
import { FastifyInstance } from "fastify";
import { BadRequest } from "./_errors/bad-request";
//import { nanoid } from "nanoid";

export async function registerForEvent(app: FastifyInstance) {
  const nanoid = await import("nanoid");
 app.withTypeProvider<ZodTypeProvider>().post(
   "/event/:eventId/attendees",
   {
     schema: {
       summary: "Register an attendee",
       tags: ["Attendees"],
       body: z.object({
         name: z.string().min(4),
         email: z.string().email(),
       }),
       params: z.object({
         eventId: z.string().uuid(),
       }),
       response: {
         201: z.object({
           attendeeCode: z.string(),
         }),
       },
     },
   },
   async (request, reply) => {
     const { eventId } = request.params;
     const { name, email } = request.body;

     const attendeeFromEmail = await prisma.attendee.findUnique({
       where: {
         eventId_email: {
           email,
           eventId,
         },
       },
     });

     if (attendeeFromEmail !== null) {
       throw new BadRequest("This e-mail already registered for this event.");
     }

     const [event, amoutOfAttendeesForEvent] = await Promise.all([
       prisma.event.findUnique({
         where: {
           id: eventId,
         },
       }),
       prisma.attendee.count({
         where: {
           eventId,
         },
       }),
     ]);

     if (
       event?.maximumAttendees &&
       amoutOfAttendeesForEvent >= event?.maximumAttendees
     ) {
       throw new BadRequest(
         "The maximumnumber of attindees for this event has been reached"
       );
     }
     console.log(nanoid.nanoid());

     const attendee = await prisma.attendee.create({
       data: {
         name,
         code: nanoid.nanoid(),
         email,
         eventId,
       },
     });

     return reply.status(201).send({ attendeeCode: attendee.code });
   }
 );
}