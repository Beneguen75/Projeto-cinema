# Usa a imagem oficial do Node.js versão 18
FROM node:18

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia os arquivos de definição de pacotes
COPY package*.json ./

# Instala TODAS as dependências (development e production)
RUN npm install

# Copia todo o resto do código do projeto para o diretório de trabalho
COPY . .

# Comando padrão (não será usado pelo docker-compose, mas é bom ter)
CMD ["npm", "run", "start:dev"]