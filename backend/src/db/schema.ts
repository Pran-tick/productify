//this is where we will define our database schema
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { Many, relations } from "drizzle-orm";
import { real } from "drizzle-orm/gel-core";

//Key is what the code will show and the value is how it is stored in the db
export const users = pgTable("users", {
    id: text("id").primaryKey(), //we are using text here because Clerk provides string IDs
    email: text("email").notNull().unique(),
    name: text("name"),
    imageUrl: text("image_url"),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow()
})

export const products = pgTable("products", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    imageUrl: text("image_url").notNull(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow()
})

export const comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  content: text("content").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

//one user can have many products and comments 
export const userRelations = relations(users, ({ many }) => ({
  products: many(products), 
  comments: many(comments)
}))
//this is the basic relation code for general purpose refer this
export const productRelations = relations(products, ({ one, many }) => ({
  //fields = the foreign key in this table {products.userid}
  //references = the primary key in the related table(user.id)
  user: one(users, {fields:[products.userId], references: [users.id]}), //one product belongs to one user
  comments: many(comments) //one product can have many comments
}))


export const commentsRelations = relations(comments, ({ one }) => ({
  // `comments.userId` is the foreign key,  `users.id` is the primary key
  user: one(users, { fields: [comments.userId], references: [users.id] }), // One comment → one user
  // `comments.productId` is the foreign key,  `products.id` is the primary key
  product: one(products, { fields: [comments.productId], references: [products.id] }), // One comment → one product
}));


export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;