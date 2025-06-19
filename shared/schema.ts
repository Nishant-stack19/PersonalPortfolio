import { pgTable, text, integer, timestamp, serial, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  fullName: text('full_name').notNull(),
  bio: text('bio'),
  location: text('location'),
  website: text('website'),
  githubUrl: text('github_url'),
  linkedinUrl: text('linkedin_url'),
  twitterUrl: text('twitter_url'),
  instagramUrl: text('instagram_url'),
  profileImage: text('profile_image'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Skills table
export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  name: text('name').notNull(),
  category: text('category').notNull(), // frontend, backend, tools
  percentage: integer('percentage').notNull(),
  isVisible: boolean('is_visible').default(true),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow()
});

// Projects table
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  title: text('title').notNull(),
  description: text('description').notNull(),
  longDescription: text('long_description'),
  imageUrl: text('image_url'),
  liveUrl: text('live_url'),
  githubUrl: text('github_url'),
  technologies: text('technologies'), // JSON string of tech stack
  isFeatured: boolean('is_featured').default(false),
  isVisible: boolean('is_visible').default(true),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Contact messages table
export const contactMessages = pgTable('contact_messages', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  subject: text('subject'),
  message: text('message').notNull(),
  isRead: boolean('is_read').default(false),
  isReplied: boolean('is_replied').default(false),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow()
});

// Experience table
export const experience = pgTable('experience', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  company: text('company').notNull(),
  position: text('position').notNull(),
  description: text('description'),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'), // null for current job
  location: text('location'),
  isVisible: boolean('is_visible').default(true),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow()
});

// Education table
export const education = pgTable('education', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  institution: text('institution').notNull(),
  degree: text('degree').notNull(),
  field: text('field'),
  description: text('description'),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),
  grade: text('grade'),
  isVisible: boolean('is_visible').default(true),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow()
});

// Portfolio stats table
export const portfolioStats = pgTable('portfolio_stats', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  totalProjects: integer('total_projects').default(0),
  yearsExperience: integer('years_experience').default(0),
  clientSatisfaction: integer('client_satisfaction').default(100),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Relations
export const usersRelations = relations(users, ({ many, one }) => ({
  skills: many(skills),
  projects: many(projects),
  experience: many(experience),
  education: many(education),
  stats: one(portfolioStats)
}));

export const skillsRelations = relations(skills, ({ one }) => ({
  user: one(users, {
    fields: [skills.userId],
    references: [users.id]
  })
}));

export const projectsRelations = relations(projects, ({ one }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id]
  })
}));

export const experienceRelations = relations(experience, ({ one }) => ({
  user: one(users, {
    fields: [experience.userId],
    references: [users.id]
  })
}));

export const educationRelations = relations(education, ({ one }) => ({
  user: one(users, {
    fields: [education.userId],
    references: [users.id]
  })
}));

export const portfolioStatsRelations = relations(portfolioStats, ({ one }) => ({
  user: one(users, {
    fields: [portfolioStats.userId],
    references: [users.id]
  })
}));

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Skill = typeof skills.$inferSelect;
export type InsertSkill = typeof skills.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = typeof contactMessages.$inferInsert;
export type Experience = typeof experience.$inferSelect;
export type InsertExperience = typeof experience.$inferInsert;
export type Education = typeof education.$inferSelect;
export type InsertEducation = typeof education.$inferInsert;
export type PortfolioStats = typeof portfolioStats.$inferSelect;
export type InsertPortfolioStats = typeof portfolioStats.$inferInsert;