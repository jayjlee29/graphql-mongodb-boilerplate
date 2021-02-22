FROM node

WORKDIR /app

COPY ./ ./

ENV PORT 8000
RUN npm i && npm run build

CMD ["npm", "run", "start"]

EXPOSE $PORT