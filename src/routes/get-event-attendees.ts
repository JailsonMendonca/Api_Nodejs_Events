import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";
import { checkIn } from "./check-in";



export async function getEventAttendees(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/events/:eventId/attendees",
    {
      schema: {
        summary: "Get event attendee",
        tags: ["Attendees"],
        params: z.object({
          eventId: z.string().uuid(),
        }),
        querystring: z.object({
          query: z.string().nullish(),
          pageIndex: z.string().nullish().default("0").transform(Number),
        }),
        response: {
          200: z.object({
            attendees: z.array(
              z.object({
                code: z.string(),
                name: z.string(),
                email: z.string().email(),
                createAt: z.date(),
                checkInAt: z.date().nullable(),
              })
            ),
               total: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { eventId } = request.params;
      const { pageIndex, query } = request.query;

       const [attendees, total] = await Promise.all([
         prisma.attendee.findMany({
           select: {
             code: true,
             name: true,
             email: true,
             createAt: true,
             checkIn: {
               select: {
                 createAt: true,
               },
             },
           },
           where: query
             ? {
                 eventId,
                 name: {
                   contains: query,
                 },
               }
             : {
                 eventId,
               },
           take: 10,
           skip: pageIndex * 10,
           orderBy: {
             createAt: "desc",
           },
         }),
         prisma.attendee.count({
           where: query
             ? {
                 eventId,
                 name: {
                   contains: query,
                 },
               }
             : {
                 eventId,
               },
         }),
       ]);


      return reply.status(201).send({
        attendees: attendees.map((attendee) => {
          return {
            code: attendee.code,
            name: attendee.name,
            email: attendee.email,
            createAt: attendee.createAt,
            checkInAt: attendee.checkIn?.createAt ?? null,
          };
        }),
        total,
      });
    }
  );
}
