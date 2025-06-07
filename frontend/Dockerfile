# Estágio 1: Construir a aplicação
# Usa a imagem do Node.js versão 18
FROM node:18-alpine AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de definição de pacotes e instala as dependências
COPY package*.json ./
RUN npm install

# Copia todo o resto do código do projeto
COPY . .

# Roda o comando de build para gerar os arquivos estáticos de produção
RUN npm run build

# Estágio 2: Servir os arquivos
# Usa uma imagem leve do Nginx para servir os arquivos estáticos
FROM nginx:stable-alpine

# Copia os arquivos de build do estágio anterior para a pasta padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 80 (padrão do Nginx)
EXPOSE 80

# Comando para iniciar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]