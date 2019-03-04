#!/bin/bash

curl -X POST -d @schema.graphql http://localhost:7474/graphql/idl/
