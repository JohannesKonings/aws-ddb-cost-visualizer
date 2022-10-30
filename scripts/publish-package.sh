#!/bin/bash

cd ./packages/dynamodb-cost-metrics

yarn install

yarn build

yarn publish
