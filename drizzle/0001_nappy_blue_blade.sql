ALTER TABLE "ferreteria"."orders_details" ALTER COLUMN "user_id" SET DEFAULT NULL;--> statement-breakpoint
ALTER TABLE "ferreteria"."orders_details" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "ferreteria"."orders_details" ALTER COLUMN "address_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "ferreteria"."payments_details" ALTER COLUMN "provider" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "ferreteria"."orders_details" ADD COLUMN "guest_address" varchar DEFAULT  NULL;