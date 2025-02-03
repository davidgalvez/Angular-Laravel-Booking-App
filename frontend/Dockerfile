FROM node:18-alpine AS dev
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Exposes port 4200 for development
EXPOSE 4200

# Executes angular for development
CMD ["npm", "run", "start"]