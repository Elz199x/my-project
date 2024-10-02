-- DropForeignKey
ALTER TABLE "sms" DROP CONSTRAINT "sms_username_fkey";

-- DropIndex
DROP INDEX "sms_username_key";
