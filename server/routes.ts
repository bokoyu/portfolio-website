import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema, updateProjectSchema } from "@shared/schema";
import { sendContactEmail } from "./email";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Projects API
  app.get("/api/projects", async (_req: Request, res: Response) => {
    const projects = await storage.listProjects();
    res.json({ projects });
  });

  app.get("/api/projects/:id", async (req: Request, res: Response) => {
    const project = await storage.getProject(req.params.id);
    if (!project) return res.status(404).json({ message: "Not found" });
    res.json({ project });
  });

  app.post("/api/projects", async (req: Request, res: Response) => {
    const parsed = insertProjectSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.message });
    }
    const created = await storage.createProject(parsed.data);
    res.status(201).json({ project: created });
  });

  app.patch("/api/projects/:id", async (req: Request, res: Response) => {
    const parsed = updateProjectSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.message });
    }
    const updated = await storage.updateProject(req.params.id, parsed.data);
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json({ project: updated });
  });

  app.delete("/api/projects/:id", async (req: Request, res: Response) => {
    const ok = await storage.deleteProject(req.params.id);
    if (!ok) return res.status(404).json({ message: "Not found" });
    res.status(204).end();
  });

  const contactSchema = z.object({
    name: z.string().min(1).max(200),
    email: z.string().email(),
    subject: z.string().min(1).max(200),
    message: z.string().min(1).max(5000),
  });

  app.post("/api/contact", async (req: Request, res: Response) => {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.message });
    }

    try {
      await sendContactEmail(parsed.data);
      res.status(200).json({ message: "Message sent" });
    } catch (error) {
      console.error("Contact form email error:", error);
      res
        .status(500)
        .json({
          message:
            "Unable to send your message right now. Please try again later.",
        });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
