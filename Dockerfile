FROM node

WORKDIR /app

COPY ./ ./

RUN npm i && npm run build
EXPOSE 8000

CMD ["npm", "run", "start"]