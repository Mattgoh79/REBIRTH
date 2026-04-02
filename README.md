# REBIRTH



1. npm i
2. npm install @prisma/client@^6.12.0
3. npm install prisma@^6.12.0 --save-dev
4. docker run --name id607001-db-dev -e POSTGRES\_PASSWORD=HelloWorld123 -p 5432:5432 -d postgres
5. create .env file (actually in real development don't give the env file like this bro)

NODE\_ENV=development

PORT=3000

API\_BASE\_URL=http://localhost

DATABASE\_URL=postgresql://postgres:HelloWorld123@localhost:5432/postgres

6\. or maybe npm run env:copy

7\. maybe this npm run prisma:migrate instead of the last one

8\. npm run dev







USE THIS IF INSTITUION NOT WORKING

npx prisma migrate deploy 



(regarding application-setup.sh, when I run it my queries give me errors about running on the wrong port idk)

9. Go to Render, Deploy Build. copy web address, use for postman