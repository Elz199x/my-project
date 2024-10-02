-- AddForeignKey
ALTER TABLE "sms" ADD CONSTRAINT "sms_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;
