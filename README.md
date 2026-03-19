# REBIRTH



1. npm i
2. npm install @prisma/client@^6.12.0
3. npm install prisma@^6.12.0 --save-dev
4. docker run --name id607001-db-dev -e POSTGRES\_PASSWORD=HelloWorld123 -p 5432:5432 -d postgres
5. create .env file 

NODE\_ENV=development

PORT=3000

API\_BASE\_URL=http://localhost

DATABASE\_URL=postgresql://postgres:HelloWorld123@localhost:5432/postgres

6\. or maybe npm run env:copy

7\. maybe this npm run prisma:migrate instead of the last one

8\. npm run dev







USE THIS IF INSTITUION NOT WORKING

npx prisma migrate deploy (THIS RUNS THE MIGRATIONS HOW DID I NEED COPILOT TO TELL ME THIS AHAHDHGH



