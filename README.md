# Multichannel Light Scheduler (HACS + Lovelace Card)

Integracion personalizada para Home Assistant que permite controlar de 1 a 10 canales de luz (`light.*`) con una curva de fotoperiodo de 24h estilo reef.

## Caracteristicas

- 1 a 10 canales configurables con:
  - `entity_id`
  - nombre de canal
  - color HEX
- Editor visual interactivo (SVG) con nodos:
  - click para crear
  - arrastrar para mover
  - seleccion para edicion precisa
- Inspector de precision por nodo:
  - hora `HH:MM:SS`
  - sliders y campos numericos `0..100` por canal
- Persistencia nativa en `.storage/multichannel_scheduler_data.json` mediante `Store`
- API WebSocket nativa de HA:
  - `multichannel_scheduler/get_config`
  - `multichannel_scheduler/save_schedule`
- Motor backend de interpolacion lineal por tramos con aplicacion periodica de `light.turn_on` y `transition`

## Estructura

- `custom_components/multichannel_scheduler/`
- `src/` (TypeScript + Lit)
- `custom_components/multichannel_scheduler/www/multichannel-scheduler-card.js`

## Instalacion en HACS (modo custom repository)

1. Publica este proyecto en un repositorio Git.
2. En Home Assistant, abre HACS.
3. Agrega repositorio custom (categoria Integration) apuntando al repo.
4. Instala **Multichannel Light Scheduler**.
5. Reinicia Home Assistant.
6. Ve a Settings -> Devices & Services -> Add Integration.
7. Busca `Multichannel Light Scheduler` y completa el config flow.

## Build Frontend

Desde la carpeta raiz del proyecto:

```powershell
npm install
npm run build
```

Esto genera `custom_components/multichannel_scheduler/www/multichannel-scheduler-card.js`.

## Uso en Lovelace

1. Crea una tarjeta manual:

```yaml
type: custom:multichannel-scheduler-card
title: Reef Light Scheduler
channels:
  - id: 1
    entity_id: light.reef_royal_blue
    name: Royal Blue
    color: "#0000FF"
  - id: 2
    entity_id: light.reef_uv_violet
    name: UV / Violet
    color: "#8A2BE2"
  - id: 3
    entity_id: light.reef_cool_white
    name: Cool White
    color: "#FFD700"
active_channel_id: 1
```

2. Alternativamente, usa el editor visual de tarjeta para mapear canales.

## Notas de operacion

- Si HA reinicia, el motor calcula inmediatamente la intensidad actual y la aplica en la siguiente iteracion.
- Si una entidad esta `unavailable`/`unknown`, se omite temporalmente sin romper el ciclo.
- El payload se valida en backend antes de guardar.

## Desarrollo local rapido

- Backend: copia `custom_components/multichannel_scheduler` dentro de tu `/config/custom_components/`.
- Frontend: compila con `npm run build` y asegurate de que `custom_components/multichannel_scheduler/www/multichannel-scheduler-card.js` exista.

## Revision de calidad

- Checklist de revision HACS: `HACS_REVIEW_CHECKLIST.md`
