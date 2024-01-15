#!/bin/bash

cat .env.prod | while read line
do
    if [ -n "$line" ]
    then
        flyctl secrets set $line
    fi
done
