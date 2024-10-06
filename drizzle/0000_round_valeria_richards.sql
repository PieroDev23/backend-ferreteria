CREATE SCHEMA "ferreteria";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ferreteria"."categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp DEFAULT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ferreteria"."discounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"percentage" smallint NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp DEFAULT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ferreteria"."inventory" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"quantity" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp DEFAULT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ferreteria"."products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"image" varchar,
	"description" varchar NOT NULL,
	"price" integer NOT NULL,
	"sku" varchar NOT NULL,
	"category_id" uuid,
	"discount_id" uuid,
	"inventory_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp DEFAULT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ferreteria"."products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "ferreteria"."categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ferreteria"."products" ADD CONSTRAINT "products_discount_id_discounts_id_fk" FOREIGN KEY ("discount_id") REFERENCES "ferreteria"."discounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ferreteria"."products" ADD CONSTRAINT "products_inventory_id_inventory_id_fk" FOREIGN KEY ("inventory_id") REFERENCES "ferreteria"."inventory"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
