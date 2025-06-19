import { users, skills, projects, contactMessages, experience, education, portfolioStats } from "../shared/schema";
import type { User, InsertUser, Skill, InsertSkill, Project, InsertProject, ContactMessage, InsertContactMessage, Experience, InsertExperience, Education, InsertEducation, PortfolioStats, InsertPortfolioStats } from "../shared/schema";
import { db } from "./db";
import { eq, desc, asc } from "drizzle-orm";

// Storage interface
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined>;

  // Skills operations
  getUserSkills(userId: number): Promise<Skill[]>;
  createSkill(insertSkill: InsertSkill): Promise<Skill>;
  updateSkill(id: number, updates: Partial<InsertSkill>): Promise<Skill | undefined>;
  deleteSkill(id: number): Promise<boolean>;

  // Projects operations
  getUserProjects(userId: number): Promise<Project[]>;
  getFeaturedProjects(userId: number): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(insertProject: InsertProject): Promise<Project>;
  updateProject(id: number, updates: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;

  // Contact messages operations
  getContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage>;
  markMessageAsRead(id: number): Promise<boolean>;
  markMessageAsReplied(id: number): Promise<boolean>;

  // Experience operations
  getUserExperience(userId: number): Promise<Experience[]>;
  createExperience(insertExperience: InsertExperience): Promise<Experience>;
  updateExperience(id: number, updates: Partial<InsertExperience>): Promise<Experience | undefined>;
  deleteExperience(id: number): Promise<boolean>;

  // Education operations
  getUserEducation(userId: number): Promise<Education[]>;
  createEducation(insertEducation: InsertEducation): Promise<Education>;
  updateEducation(id: number, updates: Partial<InsertEducation>): Promise<Education | undefined>;
  deleteEducation(id: number): Promise<boolean>;

  // Portfolio stats operations
  getPortfolioStats(userId: number): Promise<PortfolioStats | undefined>;
  updatePortfolioStats(userId: number, updates: Partial<InsertPortfolioStats>): Promise<PortfolioStats>;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  // Skills operations
  async getUserSkills(userId: number): Promise<Skill[]> {
    return await db
      .select()
      .from(skills)
      .where(eq(skills.userId, userId))
      .orderBy(asc(skills.sortOrder), asc(skills.name));
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const [skill] = await db
      .insert(skills)
      .values(insertSkill)
      .returning();
    return skill;
  }

  async updateSkill(id: number, updates: Partial<InsertSkill>): Promise<Skill | undefined> {
    const [skill] = await db
      .update(skills)
      .set(updates)
      .where(eq(skills.id, id))
      .returning();
    return skill || undefined;
  }

  async deleteSkill(id: number): Promise<boolean> {
    const result = await db.delete(skills).where(eq(skills.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Projects operations
  async getUserProjects(userId: number): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.userId, userId))
      .orderBy(desc(projects.isFeatured), asc(projects.sortOrder), desc(projects.createdAt));
  }

  async getFeaturedProjects(userId: number): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.userId, userId))
      .orderBy(asc(projects.sortOrder), desc(projects.createdAt))
      .limit(6);
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || undefined;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(insertProject)
      .returning();
    return project;
  }

  async updateProject(id: number, updates: Partial<InsertProject>): Promise<Project | undefined> {
    const [project] = await db
      .update(projects)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return project || undefined;
  }

  async deleteProject(id: number): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Contact messages operations
  async getContactMessages(): Promise<ContactMessage[]> {
    return await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt));
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db
      .insert(contactMessages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async markMessageAsRead(id: number): Promise<boolean> {
    const result = await db
      .update(contactMessages)
      .set({ isRead: true })
      .where(eq(contactMessages.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async markMessageAsReplied(id: number): Promise<boolean> {
    const result = await db
      .update(contactMessages)
      .set({ isReplied: true })
      .where(eq(contactMessages.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Experience operations
  async getUserExperience(userId: number): Promise<Experience[]> {
    return await db
      .select()
      .from(experience)
      .where(eq(experience.userId, userId))
      .orderBy(desc(experience.endDate), desc(experience.startDate));
  }

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const [exp] = await db
      .insert(experience)
      .values(insertExperience)
      .returning();
    return exp;
  }

  async updateExperience(id: number, updates: Partial<InsertExperience>): Promise<Experience | undefined> {
    const [exp] = await db
      .update(experience)
      .set(updates)
      .where(eq(experience.id, id))
      .returning();
    return exp || undefined;
  }

  async deleteExperience(id: number): Promise<boolean> {
    const result = await db.delete(experience).where(eq(experience.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Education operations
  async getUserEducation(userId: number): Promise<Education[]> {
    return await db
      .select()
      .from(education)
      .where(eq(education.userId, userId))
      .orderBy(desc(education.endDate), desc(education.startDate));
  }

  async createEducation(insertEducation: InsertEducation): Promise<Education> {
    const [edu] = await db
      .insert(education)
      .values(insertEducation)
      .returning();
    return edu;
  }

  async updateEducation(id: number, updates: Partial<InsertEducation>): Promise<Education | undefined> {
    const [edu] = await db
      .update(education)
      .set(updates)
      .where(eq(education.id, id))
      .returning();
    return edu || undefined;
  }

  async deleteEducation(id: number): Promise<boolean> {
    const result = await db.delete(education).where(eq(education.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Portfolio stats operations
  async getPortfolioStats(userId: number): Promise<PortfolioStats | undefined> {
    const [stats] = await db.select().from(portfolioStats).where(eq(portfolioStats.userId, userId));
    return stats || undefined;
  }

  async updatePortfolioStats(userId: number, updates: Partial<InsertPortfolioStats>): Promise<PortfolioStats> {
    const existingStats = await this.getPortfolioStats(userId);
    
    if (existingStats) {
      const [stats] = await db
        .update(portfolioStats)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(portfolioStats.userId, userId))
        .returning();
      return stats;
    } else {
      const [stats] = await db
        .insert(portfolioStats)
        .values({ userId, ...updates })
        .returning();
      return stats;
    }
  }
}

export const storage = new DatabaseStorage();