import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";
import { title } from "process";
import { BadRequest } from "./_errors/bad-request";

export async function getAttendeeBadge(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/atteendees/:atteendeeCode/badge",
    {
      schema: {
        summary: "Get event attendee badge",
        tags: ["Attendees"],
        params: z.object({
          atteendeeCode: z.string(),
        }),
        response: {
          200: z.object({
            badge: z.object({
              name: z.string(),
              email: z.string().email(),
              titleEvent: z.string(),
              chekInURL: z.string().url(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { atteendeeCode } = request.params;

      const atteendee = await prisma.attendee.findUnique({
        select: {
          name: true,
          email: true,
          event: {
            select: {
              title: true,
            },
          },
        },
        where: {
          code: atteendeeCode,
        },
      });

      if (atteendee === null) {
        throw new BadRequest("Atteendee not found");
      }

      const baseURL = `${request.protocol}://${request.hostname}`;
      //console.log(baseURL)

      const chekInURL = new URL(
        `/attendees/${atteendeeCode}/check-in`,
        baseURL
      );

      return reply.status(201).send({
        badge: {
          name: atteendee.name,
          email: atteendee.email,
          titleEvent: atteendee.event.title,
          chekInURL: chekInURL.toString(),
        },
      });
    }
  );
}
