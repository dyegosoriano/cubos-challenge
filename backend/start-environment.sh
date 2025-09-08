#!/bin/bash

SRC="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
CURRENT_GROUP=$(id -gn)
CURRENT_USER=$(id -un)

cd $SRC

echo "Criando diretórios para docker..."
sudo rm -rf .docker/data/postgres
sudo mkdir -pv .docker/data/postgres

echo "Aplicando permissões nos diretórios..."
sudo chown -R "$CURRENT_USER:$CURRENT_GROUP" .docker/data
sudo chown -R 1001:1001 .docker/data/postgres
sudo chmod -R 777 .docker/data/postgres

echo "Subindo o Docker com os sistemas necessários..."
if command -v docker-compose &> /dev/null; then
  docker-compose down
  docker-compose up --force-recreate -d
fi

if docker compose version &> /dev/null; then
  docker compose down
  docker compose up --force-recreate -d
fi

echo "Aguardando 30 segundos para estabilização do banco de dados..."
sleep 30

echo "Executando migrations e subindo api para desenvolvimento..."
yarn && yarn build && yarn db:migrate && yarn start:server

echo "Ambiente de desenvolvimento configurado com sucesso!"