# Prompt para Google AI Studio (copia y pega todo lo de abajo)

---

Necesito que me hagas una página web de **Día de Muertos (2 de noviembre)** como un proyecto web normal (HTML + CSS + JavaScript, o React si lo prefieres), que se vea y funcione **exactamente igual** que el diseño original que te adjunto.

## Lo que te adjunto

- `codigo/pagina-dia-de-muertos-codigo-original.html`: **el código original de la página. Es la referencia principal: copia su estructura, textos, colores, medidas y animaciones tal cual.** Está escrito en un formato de componentes especial:
  - `{{algo}}` son valores que salen de la función `renderVals()` del `<script>` de abajo.
  - `<sc-for>` es un ciclo (repite el bloque por cada elemento de una lista).
  - `<sc-if>` muestra el bloque solo si se cumple la condición.
  - `<helmet><style>` contiene el CSS (animaciones `@keyframes`, hover, etc.).
  - La clase `Component extends DCLogic` maneja el estado (`this.state`, `this.setState`) igual que un componente de React.
  Convierte todo eso a código web normal sin cambiar el resultado visual.
- `fotos/`, `papel-picado/`, `dibujos/` (SVG) y `musica/la-llorona.mp3`: todos los archivos que usa la página, ya con las rutas puestas en el código.
- `guia/guia-figma-dia-de-muertos.html`: guía con todas las medidas, colores, tipografías y animaciones sección por sección (sirve para verificar).

## Estilo

- Tipografías de Google Fonts: **Abril Fatface** (títulos), **Nunito Sans** 400/600/800 (texto), **Caveat** 600 (letra a mano).
- Colores: Cempasúchil `#F5821F`, Amarillo flor `#FFC21A`, Barro `#B8420F`, Papel crema `#FFF1DC`, Tinta `#2A0F14`, Rosa mexicano `#E4007C`, Turquesa `#0E9C9C`, Turquesa profundo `#0B5E5E`, Texto café `#5A2A18`, Barro oscuro `#8F2F08`, Madera `#8E5A22`, Amate `#D9A066`.
- Ancho de diseño 1440 px, pero debe verse bien en celular (las columnas se apilan).

## Secciones (de arriba hacia abajo)

1. **Portada**: foto del panteón de noche de fondo con degradados oscuros, papel picado de colores colgando y meciéndose arriba, menú (Por qué · Tu ofrenda · La fiesta · La Catrina), título "Recordar / es volver / a vivir", dos botones, la Catrina dentro de un nicho en forma de arco con orilla de flores y brillo de vela, sello circular girando, guirnalda de cempasúchil abajo, mariposas monarca volando y pétalos cayendo.
2. **Franja de datos**: 2 días · +3,000 años de historia · 2008 Patrimonio de la Humanidad.
3. **Por qué se celebra**: un códice de 3 páginas tipo acordeón que se "desdobla" al pasar el cursor (Mictlán, la Colonia, UNESCO 2008) y dos hojas de calendario (1 y 2 de noviembre).
4. **Explora la ofrenda (interactivo)**: foto del altar con 8 puntos numerados; al dar clic en un punto o botón se muestra una tarjeta con su explicación y el contador "X / 8 descubiertos" sube. Elementos: Cempasúchil, Velas, Papel picado, Niveles del altar, Pan de muerto, Ollas de barro, Calaveritas de azúcar, Camino de pétalos.
5. **La fiesta**: mariachi animado con notas musicales, botón "Activar música" que reproduce *La Llorona* (con ecualizador animado mientras suena; la música se pausa al salir de la sección), chips de comida y un dato sobre las mariposas monarca.
6. **Galería**: 4 fotos tipo Polaroid colgadas de un cordón con pinzas, que se mecen y se enderezan al pasar el cursor.
7. **Importancia**: frase grande y tres veladoras animadas (Memoria, Familia, Identidad).
8. **Ícono, La Catrina**: carta de lotería con la foto de la Catrina, cronología (1912 · 1947 · Hoy) y un puesto de calaveritas de azúcar con nombres (Diana, Abuela, Pepe, Lupita, Tú).
9. **Pie de página**: fila de velas con flamas que parpadean y "Día de Muertos · Proyecto de Diseño de Interfaces · 2026".

## Reglas

- Usa los textos del código original **palabra por palabra**.
- Respeta todas las animaciones del `<style>` original (papel picado, Ken Burns de las fotos, sello girando, mariposas, pétalos, flamas, mariachi, hover del códice, calendarios, polaroids, lotería y calaveritas).
- Respeta `prefers-reduced-motion` como en el original.
- Entrégame los archivos listos para abrir, usando las mismas carpetas (`fotos/`, `papel-picado/`, `dibujos/`, `musica/`).
