FROM node:18.15.0
WORKDIR /app
ENV PORT=3000
COPY . .
RUN npm install
RUN npm install -g npm@9.6.3
EXPOSE 3000
CMD ["npm", "start"]