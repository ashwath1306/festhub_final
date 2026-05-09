import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { z } from 'zod';

const eventSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  rules: z.string().optional(),
  venue: z.string(),
  date: z.string().transform((str) => new Date(str)),
  time: z.string(),
  teamSizeLimit: z.number().int().min(1).default(1),
  registrationFee: z.number().min(0).default(0),
  prizeDetails: z.string().optional(),
  lastRegistrationDate: z.string().transform((str) => new Date(str)),
  bannerUrl: z.string().url().optional(),
  isTeamEvent: z.boolean().default(false),
});

export const createEvent = async (req: Request, res: Response) => {
  try {
    const data = eventSchema.parse(req.body);
    const userId = (req as any).user.id;

    const event = await prisma.event.create({
      data: {
        ...data,
        coordinatorId: userId,
      },
    });

    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid data', errors: error.issues });
    }
    console.error('Create Event Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' },
    });
    res.json(events);
  } catch (error) {
    console.error('Get All Events Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const event = await prisma.event.findUnique({
      where: { id },
      include: { coordinator: { select: { name: true, email: true } } },
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error('Get Event Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data = eventSchema.partial().parse(req.body);

    const event = await prisma.event.update({
      where: { id },
      data,
    });

    res.json({ message: 'Event updated successfully', event });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid data', errors: error.issues });
    }
    console.error('Update Event Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await prisma.event.delete({
      where: { id },
    });
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete Event Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
