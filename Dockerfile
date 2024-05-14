# Base image
FROM node:20 AS base

# Configuração do diretório de trabalho
WORKDIR /app

# Instalação de dependências
RUN apt-get update && apt-get install -y ffmpeg postgresql postgresql-contrib

# Instalação de pacotes Node
COPY package.json .
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Configuração de porta
ENV PORT=8080
EXPOSE 8080

# Etapa de desenvolvimento
FROM base AS development
CMD ["npm", "install"]
