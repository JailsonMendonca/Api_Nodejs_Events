import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from '../lib/prisma';
import { FastifyInstance } from "fastify";
import { BadRequest } from "./_errors/bad-request";

export async function checkIn(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/attendees/:attendeeCode/check-in",
    {
      schema: {
        summary: "Check-in an attendee",
        tags: ["Check-ins"],
        params: z.object({
          attendeeCode: z.string(),
        }),

        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { attendeeCode } = request.params;

      const attendeeCheckIn = await prisma.checkIn.findUnique({
        where: {
          attendeeCode,
        },
      });

      if (attendeeCheckIn !== null) {
        throw new BadRequest("Attendee already checked in");
      }

      await prisma.checkIn.create({
        data: {
          attendeeCode,
        },
      });

      return reply.status(201).send();
    }
  );
}
