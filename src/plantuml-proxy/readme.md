# Plantuml-proxy

Service de proxy vers plantuml, et gestion des diagrammes

## Front

Javascript sans framework

## Api

NestJs + typeorm

## Shared

Données partagées entre front & api

### Dtos

Classes / interfaces typescript décrivant les données transférées entre api & front

Pour les données entrant dans l'api, la validation à la compilation et à l'éxécution au moyen de `class-validator`.

Pour les données sortant de l'api, typescript est considéré comme suffisant: le front fait confiance à l'api.
