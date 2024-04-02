#Criar Projeto
#1ª
#npm  init -y
#2ª
#Criar pasta src e  server.ts
#3ª Instalar typescript (-D depedência de desenvolvimento)
#npm i typescript @types/node -D
#4ª Criar arquivo tsconfig.json
#npx tsc --init
#5ª Config para tsconfig.json
#Ir no repositorio de tsconfig (https://github.com/tsconfig/bases?tab=readme-ov-file) versao Node20 
#Copiar a config e colar no tsconfig.json 
#7ª 
#npm i tsx -D 
#7ª adicina scrip a package.json
#"scripts": {
#"dev": "tsx watch --env-file .env src/server.ts"
#},
#8ª fastify micro framework para node (criação de rotas)
#npm i fastify
#10ª ORM (prisma)
#npm i prisma -D
#npx prisma init --datasource-provider SQLite
#9ª Rodar o api
#npm run dev
#http://localhost:3333

#API REST
#HTTP methods: GET, POST, PUT, DELETE, PATCH, HERD, OPITIONS ...
#Request body
#Search params our Query params (http://localhost:3333/user?id=235cvf)
#route parameters (resource identification -> PUT:http://localhost:3333/235cvf)
#headers (request context -> information: identification , location, language)
#Relational database (SQLite)
#Prisma (ORM)
