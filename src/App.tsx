/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';

interface DefItem {
  id: string;
  nombre: string;
  x: number;
  y: number;
  texto: string;
}

const defs: DefItem[] = [
  { id: 'flor', nombre: 'Cempasúchil', x: 49, y: 23, texto: 'La "flor de veinte pétalos". Su color y su aroma guían a las almas hasta el altar.' },
  { id: 'velas', nombre: 'Velas', x: 32, y: 26, texto: 'Su luz ilumina el camino de regreso a casa. Muchas familias ponen una por cada difunto.' },
  { id: 'papel', nombre: 'Papel picado', x: 81, y: 15, texto: 'Representa el aire y la alegría de la fiesta. Se recorta a mano en papel de china.' },
  { id: 'niveles', nombre: 'Niveles del altar', x: 50, y: 41, texto: 'Cada escalón tiene un sentido. En los altares de tres niveles representan el cielo, la tierra y el inframundo.' },
  { id: 'pan', nombre: 'Pan de muerto', x: 41, y: 50, texto: 'Las tiras de encima representan los huesos y la bolita del centro, el cráneo.' },
  { id: 'barro', nombre: 'Ollas de barro', x: 26, y: 63, texto: 'El barro es un material tradicional de México. Aquí sirve de florero para el cempasúchil.' },
  { id: 'calavera', nombre: 'Calaveritas de azúcar', x: 68, y: 66, texto: 'Recuerdan que la muerte es parte de la vida. A veces llevan escrito el nombre de alguien en la frente.' },
  { id: 'camino', nombre: 'Camino de pétalos', x: 50, y: 92, texto: 'Pétalos de cempasúchil en el piso que marcan la ruta de la entrada hasta el altar.' }
];

const picadoImages = [
  '/papel-picado/papel-picado-rojo.png',
  '/papel-picado/papel-picado-naranja.png',
  '/papel-picado/papel-picado-amarillo.png',
  '/papel-picado/papel-picado-verde.png',
  '/papel-picado/papel-picado-azul.png',
  '/papel-picado/papel-picado-rosa.png'
];

const flags = Array.from({ length: 14 }, (_, i) => ({
  src: picadoImages[i % picadoImages.length],
  delay: -(i * 0.37).toFixed(2)
}));

const petalColors = ['#FFC21A', '#B8420F', '#E4007C', '#FFF1DC'];
const petals = Array.from({ length: 16 }, (_, i) => ({
  x: (i * 6.3 + 3) % 100,
  size: 10 + (i % 3) * 4,
  size2: 14 + (i % 4) * 3,
  color: petalColors[i % petalColors.length],
  dur: 9 + (i % 5) * 2,
  delay: -(i * 1.3)
}));

const garlandColors = [
  ['#F5821F', '#FFA53A', '#B8420F'],
  ['#FFC21A', '#FFD45E', '#E86A0A'],
  ['#E86A0A', '#F5921F', '#8F2F08']
];
const garlandSizes = [64, 52, 72, 58, 48, 68];
const garland = Array.from({ length: 40 }, (_, i) => {
  const c = garlandColors[(i * 2) % 3];
  return {
    c1: c[0],
    c2: c[1],
    c3: c[2],
    size: garlandSizes[i % garlandSizes.length],
    rot: (i * 37) % 60,
    leaf: i % 4 === 1,
    d: (3 + (i % 4) * 0.6).toFixed(1),
    delay: -(i * 0.45).toFixed(2)
  };
});

const comida = [
  { nombre: 'Pan de muerto', bg: '#FFC21A', fg: '#2A0F14' },
  { nombre: 'Mole', bg: '#2A0F14', fg: '#FFF1DC' },
  { nombre: 'Tamales', bg: '#FFF1DC', fg: '#2A0F14' },
  { nombre: 'Calabaza en tacha', bg: '#F5821F', fg: '#2A0F14' },
  { nombre: 'Chocolate caliente', bg: '#E4007C', fg: '#FFF1DC' }
];

const fotos = [
  { titulo: 'Ofrenda familiar', lugar: 'En casa', bg: '#B8420F', tagColor: '#B8420F', rot: -4, drop: 0, delay: 0, img: '/fotos/galeria-ofrenda-familiar.png' },
  { titulo: 'Noche en Janitzio', lugar: 'Michoacán', bg: '#0B5E5E', tagColor: '#0B7A7A', rot: 3, drop: 44, delay: -1.1, img: '/fotos/galeria-noche-janitzio.png' },
  { titulo: 'Desfile de Catrinas', lugar: 'Ciudad de México', bg: '#E4007C', tagColor: '#C20069', rot: -2.5, drop: 44, delay: -2.3, img: '/fotos/galeria-desfile-catrinas.png' },
  { titulo: 'Campos de cempasúchil', lugar: 'Puebla', bg: '#F5821F', tagColor: '#B8420F', rot: 4, drop: 0, delay: -0.6, img: '/fotos/galeria-campos-cempasuchil.png' }
];

const calaveritas = [
  { nombre: 'Diana', c1: '#E4007C', c2: '#0E9C9C' },
  { nombre: 'Abuela', c1: '#F5821F', c2: '#2A0F14' },
  { nombre: 'Pepe', c1: '#0E9C9C', c2: '#E4007C' },
  { nombre: 'Lupita', c1: '#FFC21A', c2: '#B8420F' },
  { nombre: 'Tú', c1: '#B8420F', c2: '#0E9C9C' }
];

const razones = [
  {
    n: 1,
    titulo: 'Memoria',
    wax: '#FFC21A',
    icon: 'M8 6 H48 V42 H8 Z M14 36 L24 24 L32 32 L38 26 L46 36',
    dotX: 40,
    dotY: 15,
    texto: 'Poner la foto, la comida y la bebida favorita de alguien mantiene viva su historia. Se cuentan anécdotas y se aprende de quienes ya no están.'
  },
  {
    n: 2,
    titulo: 'Familia',
    wax: '#F5821F',
    icon: 'M10 44 C10 32 22 32 22 44 M34 44 C34 32 46 32 46 44 M21 44 C21 30 35 30 35 44 M16 22 A6 6 0 1 0 16.1 22 M40 22 A6 6 0 1 0 40.1 22',
    dotX: 28,
    dotY: 14,
    texto: 'Armar el altar, cocinar y visitar el panteón se hace juntos. Abuelos, padres e hijos comparten la tradición y la pasan a la siguiente generación.'
  },
  {
    n: 3,
    titulo: 'Identidad',
    wax: '#0E9C9C',
    icon: 'M28 4 C14 4 8 13 8 22 C8 29 12 33 16 35 V44 H40 V35 C44 33 48 29 48 22 C48 13 42 4 28 4 Z M22 44 V38 M28 44 V38 M34 44 V38',
    dotX: 28,
    dotY: 20,
    texto: 'Mirar la muerte con humor y cariño, con calaveritas literarias y catrinas, es una forma muy mexicana de entender la vida.'
  }
];

const catrinaHist = [
  {
    anio: 'Hacia 1912',
    titulo: 'Nace como "La Calavera Garbancera"',
    color: '#F5821F',
    line: 1,
    texto: 'El grabador José Guadalupe Posada la dibujó para burlarse de quienes se vestían a la europea y negaban sus raíces.'
  },
  {
    anio: '1947',
    titulo: 'Diego Rivera la bautiza',
    color: '#E4007C',
    line: 1,
    texto: 'En su mural Sueño de una tarde dominical en la Alameda Central la pintó con vestido elegante y sombrero de plumas, y la llamó Catrina.'
  },
  {
    anio: 'Hoy',
    titulo: 'Símbolo de todo un país',
    color: '#0E9C9C',
    line: 0,
    texto: 'Miles de personas se maquillan de Catrina para desfiles, concursos y fiestas en todo México.'
  }
];

const candleHeights = [70, 96, 120, 84, 140, 84, 120, 96, 70];
const velas = candleHeights.map((h, i) => ({
  h: h + 28,
  body: h,
  d: (i * 0.23).toFixed(2)
}));

export default function App() {
  const [sel, setSel] = useState<string | null>(null);
  const [seen, setSeen] = useState<Record<string, boolean>>({});
  const [musicOn, setMusicOn] = useState(true);
  const [playing, setPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicOnRef = useRef(true);

  useEffect(() => {
    musicOnRef.current = musicOn;
  }, [musicOn]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.85;

    // Intentar reproducir inmediatamente
    const tryAutoplay = () => {
      if (!audio || !musicOnRef.current) return;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setPlaying(true);
          })
          .catch((err) => {
            console.log('Autoplay requiere interacción del usuario (política del navegador):', err);
          });
      }
    };

    tryAutoplay();

    // Cualquier primer clic o toque en cualquier parte de la pantalla activa el audio
    const unlockOnGesture = () => {
      if (audioRef.current && musicOnRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => setPlaying(true))
          .catch(() => {});
      }
    };

    window.addEventListener('click', unlockOnGesture, { capture: true, passive: true });
    window.addEventListener('touchstart', unlockOnGesture, { capture: true, passive: true });
    window.addEventListener('pointerdown', unlockOnGesture, { capture: true, passive: true });
    window.addEventListener('keydown', unlockOnGesture, { capture: true, passive: true });

    return () => {
      window.removeEventListener('click', unlockOnGesture, { capture: true });
      window.removeEventListener('touchstart', unlockOnGesture, { capture: true });
      window.removeEventListener('pointerdown', unlockOnGesture, { capture: true });
      window.removeEventListener('keydown', unlockOnGesture, { capture: true });
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      setMusicOn(false);
      audio.pause();
      setPlaying(false);
    } else {
      setMusicOn(true);
      audio.volume = 0.85;
      audio
        .play()
        .then(() => setPlaying(true))
        .catch((e) => console.log('Error al reproducir audio:', e));
    }
  };

  const pickItem = (id: string) => {
    setSel(id);
    setSeen((prev) => ({ ...prev, [id]: true }));
  };

  const count = Object.values(seen).filter(Boolean).length;
  const currentDef = defs.find((d) => d.id === sel);
  const currentIdx = defs.findIndex((d) => d.id === sel);

  const infoTag = currentDef ? `Elemento ${currentIdx + 1} de 8` : 'Elige un número';
  const infoTitle = currentDef ? currentDef.nombre : 'Explora la ofrenda';
  const infoText = currentDef
    ? currentDef.texto
    : 'Esta ofrenda tiene ocho elementos marcados. Cada uno tiene un significado para recibir a quienes vienen de visita.';

  let msg = 'Empieza por el número 1.';
  if (count > 0 && count < 8) {
    msg = `Llevas ${count}, te faltan ${8 - count}.`;
  }
  if (count === 8) {
    msg = '¡Descubriste toda la ofrenda!';
  }
  const msgColor = count === 8 ? '#FFC21A' : '#FFE0C2';

  const items = defs.map((d, i) => {
    const was = !!seen[d.id];
    const isSel = sel === d.id;
    return {
      n: i + 1,
      nombre: d.nombre,
      x: d.x,
      y: d.y,
      sel: isSel,
      on: isSel,
      cls: isSel ? 'hotspot pulse' : 'hotspot',
      dot: isSel ? '#FFC21A' : was ? '#FFF1DC' : '#F5821F',
      bg: isSel ? '#FFC21A' : '#8F2F08',
      fg: isSel ? '#2A0F14' : '#FFF1DC',
      border: isSel ? '#FFC21A' : was ? '#FFF1DC' : '#D9672A',
      pick: () => pickItem(d.id)
    };
  });

  return (
    <div style={{ fontFamily: "'Nunito Sans', 'Helvetica Neue', sans-serif", color: '#2A0F14', background: '#F5821F', minHeight: '100%' }}>
      <audio
        ref={audioRef}
        id="dia-de-muertos-audio"
        src="/musica/la-llorona.mp3"
        preload="auto"
        loop
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {/* ================= PORTADA CON FOTO DE FONDO ================= */}
      <div style={{ position: 'relative', overflow: 'hidden', background: '#2A0F14' }}>
        <img
          src="/fotos/1-portada-panteon-noche.jpg"
          alt=""
          aria-hidden="true"
          className="kenburns"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 60%'
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(42,15,20,0.92) 0%, rgba(42,15,20,0.7) 38%, rgba(42,15,20,0.25) 70%, rgba(42,15,20,0.35) 100%)'
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(42,15,20,0.55) 0%, rgba(42,15,20,0) 30%, rgba(42,15,20,0) 70%, #2A0F14 100%)'
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: '#F5821F',
            mixBlendMode: 'soft-light',
            opacity: 0.55
          }}
        />

        {/* ================= PAPEL PICADO ================= */}
        <div aria-hidden="true" style={{ position: 'relative', height: 128, overflow: 'hidden' }}>
          <svg width="1440" height="40" viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
            <path d="M0 14 Q360 30 720 14 T1440 14" stroke="#FFF1DC" strokeWidth="2" fill="none" />
          </svg>
          <div style={{ display: 'flex', gap: 8, padding: '16px 8px 0', width: 'max-content' }}>
            {flags.map((f, i) => (
              <img
                key={i}
                className="flag"
                src={f.src}
                alt=""
                width="132"
                height="100"
                style={{
                  display: 'block',
                  flex: 'none',
                  width: 132,
                  height: 100,
                  animationDelay: `${f.delay}s`,
                  filter: 'drop-shadow(0 6px 6px rgba(0,0,0,0.35))'
                }}
              />
            ))}
          </div>
        </div>

        {/* ================= MENÚ ================= */}
        <header
          className="pad"
          style={{
            position: 'relative',
            zIndex: 3,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            padding: '4px 80px 20px'
          }}
        >
          <a
            href="#inicio"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              fontFamily: "'Abril Fatface', serif",
              fontSize: 28,
              color: '#FFF1DC',
              textDecoration: 'none'
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
              <circle cx="16" cy="10" r="7" fill="#FFC21A" />
              <circle cx="10" cy="17" r="7" fill="#FFC21A" />
              <circle cx="22" cy="17" r="7" fill="#FFC21A" />
              <circle cx="16" cy="23" r="7" fill="#FFC21A" />
              <circle cx="16" cy="16" r="5" fill="#B8420F" />
            </svg>
            Día de Muertos
          </a>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20 }}>
            <nav
              aria-label="Secciones"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 24,
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}
            >
              <a href="#porque" style={{ color: '#FFF1DC', textDecoration: 'none' }}>
                Por qué
              </a>
              <a href="#ofrenda" style={{ color: '#FFF1DC', textDecoration: 'none' }}>
                Tu ofrenda
              </a>
              <a href="#fiesta" style={{ color: '#FFF1DC', textDecoration: 'none' }}>
                La fiesta
              </a>
              <a href="#catrina" style={{ color: '#FFF1DC', textDecoration: 'none' }}>
                La Catrina
              </a>
            </nav>
            <button
              type="button"
              onClick={toggleMusic}
              aria-label={playing ? 'Silenciar música' : 'Activar música'}
              title={playing ? 'Silenciar música' : 'Activar música'}
              className="btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                borderRadius: 999,
                background: playing ? '#FFC21A' : 'rgba(255,241,220,0.18)',
                color: playing ? '#2A0F14' : '#FFF1DC',
                border: '1.5px solid #FFC21A',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 800
              }}
            >
              <svg width="16" height="16" viewBox="0 0 22 22" aria-hidden="true">
                <path d="M8 17 V4 L19 2 V15" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinejoin="round" />
                <circle cx="5.5" cy="17" r="3.5" fill="currentColor" />
                <circle cx="16.5" cy="15" r="3.5" fill="currentColor" />
              </svg>
              <span>{playing ? 'La Llorona' : 'Música en pausa'}</span>
              {playing && (
                <span aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'flex-end', gap: 2, height: 12 }}>
                  <span className="eq" style={{ width: 3, height: 12, background: 'currentColor', borderRadius: 1.5 }} />
                  <span className="eq" style={{ width: 3, height: 12, background: 'currentColor', borderRadius: 1.5, animationDelay: '.2s' }} />
                  <span className="eq" style={{ width: 3, height: 12, background: 'currentColor', borderRadius: 1.5, animationDelay: '.4s' }} />
                </span>
              )}
            </button>
          </div>
        </header>

        {/* ================= HERO ================= */}
        <section
          id="inicio"
          className="pad"
          style={{
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 48,
            padding: '40px 80px 120px'
          }}
        >
          {/* Petals */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {petals.map((p, i) => (
              <div
                key={i}
                className="petal"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: `${p.x}%`,
                  width: p.size,
                  height: p.size2,
                  borderRadius: '60% 40% 60% 40%',
                  background: p.color,
                  animationDuration: `${p.dur}s`,
                  animationDelay: `${p.delay}s`
                }}
              />
            ))}
          </div>

          {/* Butterflies */}
          <div aria-hidden="true" className="flightA hide-sm" style={{ position: 'absolute', top: 110, right: -80 }}>
            <svg width="56" height="44" viewBox="0 0 56 44">
              <g className="wing">
                <path d="M28 22 C20 4 4 0 2 10 C0 20 14 22 28 22 Z M28 22 C18 26 6 34 12 42 C18 46 26 34 28 22 Z" fill="#FFC21A" stroke="#2A0F14" strokeWidth="2.5" />
                <path d="M28 22 C36 4 52 0 54 10 C56 20 42 22 28 22 Z M28 22 C38 26 50 34 44 42 C38 46 30 34 28 22 Z" fill="#FFC21A" stroke="#2A0F14" strokeWidth="2.5" />
              </g>
              <rect x="26.5" y="12" width="3" height="22" rx="1.5" fill="#2A0F14" />
            </svg>
          </div>
          <div aria-hidden="true" className="flightB hide-sm" style={{ position: 'absolute', top: 430, right: -80 }}>
            <svg width="40" height="32" viewBox="0 0 56 44">
              <g className="wing" style={{ animationDuration: '.38s' }}>
                <path d="M28 22 C20 4 4 0 2 10 C0 20 14 22 28 22 Z M28 22 C18 26 6 34 12 42 C18 46 26 34 28 22 Z" fill="#FFC21A" stroke="#2A0F14" strokeWidth="2.5" />
                <path d="M28 22 C36 4 52 0 54 10 C56 20 42 22 28 22 Z M28 22 C38 26 50 34 44 42 C38 46 30 34 28 22 Z" fill="#FFC21A" stroke="#2A0F14" strokeWidth="2.5" />
              </g>
              <rect x="26.5" y="12" width="3" height="22" rx="1.5" fill="#2A0F14" />
            </svg>
          </div>

          {/* Hero Left Content */}
          <div style={{ position: 'relative', zIndex: 2, flex: '999 1 520px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 26 }}>
            <p
              className="rise"
              style={{
                margin: 0,
                display: 'inline-flex',
                alignSelf: 'flex-start',
                padding: '8px 18px',
                background: '#F5821F',
                color: '#2A0F14',
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                borderRadius: 999
              }}
            >
              1 y 2 de noviembre · México
            </p>
            <h1
              className="rise2"
              style={{
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                fontFamily: "'Abril Fatface', serif",
                fontWeight: 400,
                color: '#FFF1DC',
                textShadow: '0 4px 30px rgba(0,0,0,0.45)'
              }}
            >
              <span className="hero-title" style={{ fontSize: 128, lineHeight: 0.9 }}>
                Recordar
              </span>
              <span
                style={{
                  alignSelf: 'flex-start',
                  margin: '4px 0 0 8px',
                  fontFamily: "'Caveat', cursive",
                  fontSize: 64,
                  lineHeight: 1,
                  color: '#FFC21A',
                  transform: 'rotate(-4deg)'
                }}
              >
                es volver
              </span>
              <span className="hero-title" style={{ fontSize: 150, lineHeight: 0.95, color: '#F5821F', textShadow: '6px 6px 0 #E4007C' }}>
                a vivir
              </span>
            </h1>
            <p style={{ margin: 0, maxWidth: 540, fontSize: 20, lineHeight: 1.6, color: '#F3DCC6' }} className="rise3">
              Cada año las familias ponen ofrendas, llenan el camino de cempasúchil y encienden miles de velas para esperar a sus seres queridos. No es una noche de miedo: es una fiesta para recordarlos.
            </p>
            <div className="rise3" style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              <a
                className="btn"
                href="#ofrenda"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  minHeight: 54,
                  padding: '0 30px',
                  background: '#FFC21A',
                  color: '#2A0F14',
                  fontWeight: 800,
                  fontSize: 16,
                  textDecoration: 'none',
                  borderRadius: 14
                }}
              >
                Explora la ofrenda
              </a>
              <a
                className="btn"
                href="#porque"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  minHeight: 54,
                  padding: '0 30px',
                  border: '2px solid #FFF1DC',
                  color: '#FFF1DC',
                  fontWeight: 700,
                  fontSize: 16,
                  textDecoration: 'none',
                  borderRadius: 14
                }}
              >
                ¿Por qué se celebra?
              </a>
              <button
                type="button"
                onClick={toggleMusic}
                className="btn"
                aria-pressed={playing}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  minHeight: 54,
                  padding: '0 26px',
                  background: playing ? '#E4007C' : 'rgba(255, 241, 220, 0.16)',
                  border: '2px solid #FFC21A',
                  color: '#FFF1DC',
                  fontWeight: 800,
                  fontSize: 16,
                  cursor: 'pointer',
                  borderRadius: 14
                }}
              >
                <svg width="20" height="20" viewBox="0 0 22 22" aria-hidden="true">
                  <path d="M8 17 V4 L19 2 V15" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinejoin="round" />
                  <circle cx="5.5" cy="17" r="3.5" fill="currentColor" />
                  <circle cx="16.5" cy="15" r="3.5" fill="currentColor" />
                </svg>
                {playing ? '🔊 Pausar música' : '🎵 Escuchar La Llorona'}
              </button>
            </div>
          </div>

          {/* Hero Right: Catrina dentro de un nicho de cempasúchil */}
          <div style={{ position: 'relative', zIndex: 2, flex: '1 1 380px', display: 'flex', justifyContent: 'center' }}>
            {/* Sello giratorio */}
            <svg
              aria-hidden="true"
              className="spin hide-sm"
              width="150"
              height="150"
              viewBox="0 0 150 150"
              style={{ position: 'absolute', zIndex: 3, top: 10, left: -10, animationDuration: '24s' }}
            >
              <defs>
                <path id="sello" d="M75 75 m-56 0 a56 56 0 1 1 112 0 a56 56 0 1 1 -112 0" />
              </defs>
              <circle cx="75" cy="75" r="72" fill="#E4007C" stroke="#2A0F14" strokeWidth="4" />
              <text fontFamily="'Nunito Sans', sans-serif" fontSize="13" fontWeight="800" letterSpacing="3" fill="#FFF1DC">
                <textPath href="#sello">DÍA DE MUERTOS · MÉXICO · 1 Y 2 NOV ·</textPath>
              </text>
              <circle cx="75" cy="64" r="11" fill="#FFC21A" />
              <circle cx="64" cy="75" r="11" fill="#FFC21A" />
              <circle cx="86" cy="75" r="11" fill="#FFC21A" />
              <circle cx="75" cy="86" r="11" fill="#FFC21A" />
              <circle cx="75" cy="75" r="7" fill="#B8420F" />
            </svg>

            {/* Nicho con Catrina */}
            <div style={{ position: 'relative', width: 440, maxWidth: '100%', aspectRatio: '440 / 580' }}>
              <div
                style={{
                  position: 'absolute',
                  left: '5.45%',
                  right: '5.45%',
                  top: '6.2%',
                  bottom: 0,
                  overflow: 'hidden',
                  borderRadius: '50% 50% 0 0 / 36% 36% 0 0',
                  background: '#2A0F14',
                  boxShadow: '0 0 80px rgba(245,130,31,0.45)'
                }}
              >
                <img
                  className="kenburns"
                  src="/fotos/2-portada-catrina-vela.png"
                  alt="Mujer caracterizada de Catrina, con sombrero de cempasúchil y velo negro, sostiene una vela encendida en un panteón al anochecer"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: '28% 40%'
                  }}
                />
                <div
                  aria-hidden="true"
                  className="candleglow"
                  style={{
                    position: 'absolute',
                    left: '79%',
                    top: '62%',
                    width: 180,
                    height: 180,
                    margin: '-90px 0 0 -90px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,194,26,0.6) 0%, rgba(255,194,26,0) 70%)',
                    mixBlendMode: 'screen'
                  }}
                />
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(42,15,20,0) 62%, rgba(42,15,20,0.75) 100%)'
                  }}
                />
                <p
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 18,
                    margin: 0,
                    textAlign: 'center',
                    fontFamily: "'Caveat', cursive",
                    fontSize: 28,
                    color: '#FFC21A'
                  }}
                >
                  La Catrina espera en el panteón
                </p>
              </div>

              {/* Nicho borde SVG */}
              <svg aria-hidden="true" viewBox="0 0 440 580" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <path d="M24 580 V232 A196 196 0 0 1 416 232 V580" fill="none" stroke="#FFC21A" strokeWidth="26" strokeDasharray="0 30" strokeLinecap="round" />
                <path d="M24 580 V232 A196 196 0 0 1 416 232 V580" fill="none" stroke="#E4007C" strokeWidth="9" strokeDasharray="0 30" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Guirnalda de cempasúchil */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              zIndex: 3,
              left: -20,
              right: -20,
              bottom: -26,
              display: 'flex',
              alignItems: 'flex-end',
              pointerEvents: 'none'
            }}
          >
            {garland.map((g, i) => (
              <div
                key={i}
                className="bob"
                style={{
                  flex: 'none',
                  marginLeft: -16,
                  animationDuration: `${g.d}s`,
                  animationDelay: `${g.delay}s`
                }}
              >
                <svg width={g.size} height={g.size} viewBox="0 0 40 40" style={{ display: 'block', transform: `rotate(${g.rot}deg)` }}>
                  {g.leaf && <path d="M20 22 C26 10 38 8 40 4 C38 16 30 24 20 22 Z" fill="#2E8B3E" />}
                  <circle cx="32" cy="20" r="6.5" fill={g.c1} />
                  <circle cx="28.5" cy="28.5" r="6.5" fill={g.c1} />
                  <circle cx="20" cy="32" r="6.5" fill={g.c1} />
                  <circle cx="11.5" cy="28.5" r="6.5" fill={g.c1} />
                  <circle cx="8" cy="20" r="6.5" fill={g.c1} />
                  <circle cx="11.5" cy="11.5" r="6.5" fill={g.c1} />
                  <circle cx="20" cy="8" r="6.5" fill={g.c1} />
                  <circle cx="28.5" cy="11.5" r="6.5" fill={g.c1} />
                  <circle cx="27" cy="20" r="5" fill={g.c2} />
                  <circle cx="23.5" cy="26.1" r="5" fill={g.c2} />
                  <circle cx="16.5" cy="26.1" r="5" fill={g.c2} />
                  <circle cx="13" cy="20" r="5" fill={g.c2} />
                  <circle cx="16.5" cy="13.9" r="5" fill={g.c2} />
                  <circle cx="23.5" cy="13.9" r="5" fill={g.c2} />
                  <circle cx="20" cy="20" r="4.5" fill={g.c3} />
                </svg>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ================= FRANJA DE DATOS ================= */}
      <div
        className="pad"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 24,
          padding: '8px 80px 40px',
          background: '#2A0F14',
          color: '#FFF1DC'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, paddingTop: 18, borderTop: '2px solid #5A2A18' }}>
          <span style={{ fontFamily: "'Abril Fatface', serif", fontSize: 52, lineHeight: 1, color: '#FFC21A' }}>2</span>
          <span style={{ fontSize: 16, lineHeight: 1.4 }}>
            días para recibir
            <br />a los que se fueron
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, paddingTop: 18, borderTop: '2px solid #5A2A18' }}>
          <span style={{ fontFamily: "'Abril Fatface', serif", fontSize: 52, lineHeight: 1, color: '#F5821F' }}>+3,000</span>
          <span style={{ fontSize: 16, lineHeight: 1.4 }}>
            años de
            <br />historia
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, paddingTop: 18, borderTop: '2px solid #5A2A18' }}>
          <span style={{ fontFamily: "'Abril Fatface', serif", fontSize: 52, lineHeight: 1, color: '#FF5AAE' }}>2008</span>
          <span style={{ fontSize: 16, lineHeight: 1.4 }}>
            Patrimonio Cultural
            <br />de la Humanidad
          </span>
        </div>
      </div>

      {/* ================= POR QUÉ ================= */}
      <section
        id="porque"
        className="pad"
        style={{
          padding: '110px 80px 130px',
          background: '#FFF1DC',
          color: '#2A0F14',
          display: 'flex',
          flexDirection: 'column',
          gap: 56
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 780 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#B8420F' }}>
            Por qué se celebra
          </p>
          <h2 className="sec-title" style={{ margin: 0, fontFamily: "'Abril Fatface', serif", fontWeight: 400, fontSize: 70, lineHeight: 1.02 }}>
            Una tradición con más de 3,000 años
          </h2>
        </div>
        <p style={{ margin: '-36px 0 0', fontFamily: "'Caveat', cursive", fontSize: 28, color: '#B8420F' }}>
          Pasa el cursor para desdoblar el códice
        </p>

        {/* CÓDICE (biombo de 3 páginas) */}
        <div className="codex" style={{ display: 'flex', flexDirection: 'column' }}>
          <svg aria-hidden="true" width="1280" height="34" style={{ display: 'block', width: '100%', height: 34 }}>
            <defs>
              <pattern id="greca1" width="44" height="34" patternUnits="userSpaceOnUse">
                <rect width="44" height="34" fill="#B8420F" />
                <path d="M4 30 V4 H32 V22 H16 V14 H24" stroke="#2A0F14" strokeWidth="5" fill="none" strokeLinecap="square" />
              </pattern>
            </defs>
            <rect width="100%" height="34" fill="url(#greca1)" />
          </svg>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', perspective: 1600 }} className="codex-row">
            {/* Página 1 */}
            <article
              className="fold fold-a"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                padding: '36px 32px 40px',
                background: '#D9A066',
                backgroundImage: 'linear-gradient(90deg, rgba(255,241,220,0.25), rgba(42,15,20,0.12))',
                borderLeft: '4px solid #2A0F14',
                borderRight: '2px dashed #8E5A22'
              }}
            >
              <svg width="220" height="150" viewBox="0 0 220 150" role="img" aria-label="Pirámide del Mictlán con un perro xoloitzcuintle" style={{ maxWidth: '100%' }}>
                <rect x="40" y="110" width="140" height="30" fill="#B8420F" stroke="#2A0F14" strokeWidth="4" />
                <rect x="60" y="80" width="100" height="30" fill="#B8420F" stroke="#2A0F14" strokeWidth="4" />
                <rect x="80" y="54" width="60" height="26" fill="#B8420F" stroke="#2A0F14" strokeWidth="4" />
                <rect x="100" y="80" width="20" height="60" fill="#2A0F14" />
                <circle cx="110" cy="32" r="20" fill="#FFF1DC" stroke="#2A0F14" strokeWidth="4" />
                <circle cx="103" cy="30" r="5" fill="#2A0F14" />
                <circle cx="117" cy="30" r="5" fill="#2A0F14" />
                <path d="M104 44 H116" stroke="#2A0F14" strokeWidth="3" />
                <path d="M8 124 C12 112 26 110 34 116 L40 104 L42 118 C44 126 40 134 32 134 L30 142 M14 132 L12 142" stroke="#2A0F14" strokeWidth="4" fill="#2A0F14" strokeLinejoin="round" />
                <path d="M190 142 C196 136 206 136 214 142" stroke="#0E9C9C" strokeWidth="5" fill="none" strokeLinecap="round" />
              </svg>
              <span style={{ fontFamily: "'Caveat', cursive", fontSize: 26, color: '#5A2A18' }}>Antes de la Conquista</span>
              <h3 style={{ margin: 0, fontFamily: "'Abril Fatface', serif", fontWeight: 400, fontSize: 34, lineHeight: 1.05 }}>
                El viaje al Mictlán
              </h3>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: '#3A160E' }}>
                Mexicas, mayas y purépechas honraban a sus muertos. Los mexicas creían que las almas viajaban al Mictlán, el lugar de los muertos, cuidado por la diosa Mictecacíhuatl.
              </p>
              <p style={{ margin: 0, paddingTop: 12, borderTop: '2px solid #8E5A22', fontSize: 14, lineHeight: 1.5, color: '#3A160E' }}>
                <strong>Dato:</strong> se creía que un perro xoloitzcuintle ayudaba a las almas a cruzar el río del inframundo.
              </p>
            </article>

            {/* Página 2 */}
            <article
              className="fold fold-b"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                padding: '36px 32px 40px',
                background: '#CC8F55',
                backgroundImage: 'linear-gradient(90deg, rgba(42,15,20,0.14), rgba(255,241,220,0.2))',
                borderRight: '2px dashed #8E5A22'
              }}
            >
              <svg width="220" height="150" viewBox="0 0 220 150" role="img" aria-label="Iglesia colonial con campana y una vela" style={{ maxWidth: '100%' }}>
                <rect x="60" y="60" width="100" height="84" fill="#FFF1DC" stroke="#2A0F14" strokeWidth="4" />
                <path d="M54 62 L110 24 L166 62 Z" fill="#E4007C" stroke="#2A0F14" strokeWidth="4" strokeLinejoin="round" />
                <path d="M110 4 V22 M102 12 H118" stroke="#2A0F14" strokeWidth="4" />
                <path d="M96 144 V108 A14 14 0 0 1 124 108 V144 Z" fill="#2A0F14" />
                <path d="M98 74 C98 64 122 64 122 74 L124 90 H96 Z" fill="#FFC21A" stroke="#2A0F14" strokeWidth="3" />
                <rect x="180" y="104" width="14" height="40" fill="#FFF1DC" stroke="#2A0F14" strokeWidth="3" />
                <ellipse cx="187" cy="94" rx="6" ry="10" fill="#F5821F" />
                <circle cx="28" cy="122" r="12" fill="#F5821F" stroke="#2A0F14" strokeWidth="3" />
                <circle cx="28" cy="122" r="5" fill="#B8420F" />
                <path d="M28 134 V146" stroke="#2E8B3E" strokeWidth="4" />
              </svg>
              <span style={{ fontFamily: "'Caveat', cursive", fontSize: 26, color: '#5A2A18' }}>Siglo XVI</span>
              <h3 style={{ margin: 0, fontFamily: "'Abril Fatface', serif", fontWeight: 400, fontSize: 34, lineHeight: 1.05 }}>
                Dos mundos se mezclan
              </h3>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: '#3A160E' }}>
                Con la llegada de los españoles, estos rituales se unieron a las fiestas católicas de Todos los Santos y Fieles Difuntos. Así nació una celebración que solo existe en México.
              </p>
              <p style={{ margin: 0, paddingTop: 12, borderTop: '2px solid #8E5A22', fontSize: 14, lineHeight: 1.5, color: '#3A160E' }}>
                <strong>Dato:</strong> por eso hoy conviven en el altar el copal prehispánico y las velas y cruces católicas.
              </p>
            </article>

            {/* Página 3 */}
            <article
              className="fold fold-a"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                padding: '36px 32px 40px',
                background: '#D9A066',
                backgroundImage: 'linear-gradient(90deg, rgba(255,241,220,0.25), rgba(42,15,20,0.12))',
                borderRight: '4px solid #2A0F14'
              }}
            >
              <svg width="220" height="150" viewBox="0 0 220 150" role="img" aria-label="Sello de Patrimonio de la Humanidad 2008" style={{ maxWidth: '100%' }}>
                <circle cx="110" cy="75" r="66" fill="none" stroke="#0E9C9C" strokeWidth="6" strokeDasharray="10 6" />
                <circle cx="110" cy="75" r="54" fill="#0E9C9C" stroke="#2A0F14" strokeWidth="4" />
                <circle cx="110" cy="58" r="12" fill="#FFC21A" />
                <circle cx="98" cy="68" r="12" fill="#FFC21A" />
                <circle cx="122" cy="68" r="12" fill="#FFC21A" />
                <circle cx="110" cy="76" r="12" fill="#FFC21A" />
                <circle cx="110" cy="67" r="6" fill="#B8420F" />
                <text x="110" y="112" textAnchor="middle" fontFamily="'Abril Fatface', serif" fontSize="20" fill="#FFF1DC">
                  2008
                </text>
              </svg>
              <span style={{ fontFamily: "'Caveat', cursive", fontSize: 26, color: '#5A2A18' }}>2008</span>
              <h3 style={{ margin: 0, fontFamily: "'Abril Fatface', serif", fontWeight: 400, fontSize: 34, lineHeight: 1.05 }}>
                Patrimonio del mundo
              </h3>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: '#3A160E' }}>
                La UNESCO inscribió las fiestas indígenas dedicadas a los muertos en la Lista del Patrimonio Cultural Inmaterial de la Humanidad.
              </p>
              <p style={{ margin: 0, paddingTop: 12, borderTop: '2px solid #8E5A22', fontSize: 14, lineHeight: 1.5, color: '#3A160E' }}>
                <strong>Dato:</strong> fue la primera vez que México entró a esa lista con una tradición viva.
              </p>
            </article>
          </div>
          <svg aria-hidden="true" width="1280" height="34" style={{ display: 'block', width: '100%', height: 34 }}>
            <defs>
              <pattern id="greca2" width="44" height="34" patternUnits="userSpaceOnUse">
                <rect width="44" height="34" fill="#B8420F" />
                <path d="M40 4 V30 H12 V12 H28 V20 H20" stroke="#2A0F14" strokeWidth="5" fill="none" strokeLinecap="square" />
              </pattern>
            </defs>
            <rect width="100%" height="34" fill="url(#greca2)" />
          </svg>
        </div>

        {/* HOJAS DE CALENDARIO */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 48, marginTop: 24 }}>
          <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h3 style={{ margin: 0, fontFamily: "'Abril Fatface', serif", fontWeight: 400, fontSize: 48, lineHeight: 1.02 }}>
              Dos días, dos visitas
            </h3>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: '#5A2A18' }}>
              Las almas no llegan todas juntas. Primero vienen los niños y al día siguiente los adultos.
            </p>
          </div>
          <div style={{ flex: '2 1 560px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 36 }}>
            {/* 1 Nov */}
            <div
              className="cal"
              style={{
                position: 'relative',
                width: 260,
                display: 'flex',
                flexDirection: 'column',
                background: '#FFFFFF',
                borderRadius: 6,
                boxShadow: '0 16px 34px rgba(42,15,20,0.2)',
                transform: 'rotate(-3deg)'
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: -12,
                  left: 'calc(50% - 12px)',
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: '#0E9C9C',
                  border: '3px solid #2A0F14'
                }}
              />
              <div
                style={{
                  padding: '18px 0 12px',
                  background: '#E4007C',
                  color: '#FFF1DC',
                  textAlign: 'center',
                  fontSize: 15,
                  fontWeight: 800,
                  letterSpacing: '0.24em',
                  borderRadius: '6px 6px 0 0'
                }}
              >
                NOVIEMBRE
              </div>
              <div
                style={{
                  padding: '10px 24px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  textAlign: 'center',
                  borderBottom: '3px dotted #E8CDB0'
                }}
              >
                <span style={{ fontFamily: "'Abril Fatface', serif", fontSize: 132, lineHeight: 1, color: '#E4007C' }}>1</span>
                <strong style={{ fontSize: 20 }}>Todos Santos</strong>
                <span style={{ fontSize: 15, lineHeight: 1.5, color: '#5A2A18' }}>
                  Se recuerda a los niños que murieron, llamados "angelitos". Sus ofrendas llevan dulces y juguetes.
                </span>
              </div>
            </div>

            {/* 2 Nov */}
            <div
              className="cal"
              style={{
                position: 'relative',
                width: 260,
                display: 'flex',
                flexDirection: 'column',
                background: '#FFFFFF',
                borderRadius: 6,
                boxShadow: '0 16px 34px rgba(42,15,20,0.2)',
                transform: 'rotate(2.5deg)'
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: -12,
                  left: 'calc(50% - 12px)',
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: '#FFC21A',
                  border: '3px solid #2A0F14'
                }}
              />
              <div
                style={{
                  padding: '18px 0 12px',
                  background: '#2A0F14',
                  color: '#FFC21A',
                  textAlign: 'center',
                  fontSize: 15,
                  fontWeight: 800,
                  letterSpacing: '0.24em',
                  borderRadius: '6px 6px 0 0'
                }}
              >
                NOVIEMBRE
              </div>
              <div
                style={{
                  padding: '10px 24px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  textAlign: 'center',
                  borderBottom: '3px dotted #E8CDB0'
                }}
              >
                <span style={{ fontFamily: "'Abril Fatface', serif", fontSize: 132, lineHeight: 1, color: '#2A0F14' }}>2</span>
                <strong style={{ fontSize: 20 }}>Fieles Difuntos</strong>
                <span style={{ fontSize: 15, lineHeight: 1.5, color: '#5A2A18' }}>
                  Llegan las almas de los adultos. Muchas familias velan toda la noche en el panteón.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ARMA TU OFRENDA ================= */}
      <section
        id="ofrenda"
        className="pad"
        style={{
          padding: '110px 80px',
          background: '#B8420F',
          color: '#FFF1DC',
          display: 'flex',
          flexDirection: 'column',
          gap: 48
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 680 }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#FFC21A' }}>
              Interactivo
            </p>
            <h2 className="sec-title" style={{ margin: 0, fontFamily: "'Abril Fatface', serif", fontWeight: 400, fontSize: 70, lineHeight: 1.02 }}>
              Arma tu ofrenda
            </h2>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: '#FFE0C2' }}>
              Toca los números sobre la foto, o los botones, para descubrir qué significa cada elemento de una ofrenda real.
            </p>
          </div>
          <p
            style={{
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              fontFamily: "'Abril Fatface', serif",
              fontSize: 44,
              lineHeight: 1,
              color: '#FFC21A'
            }}
          >
            {count} / 8
            <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 13, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FFE0C2' }}>
              descubiertos
            </span>
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center' }}>
          {/* Foto con hotspots */}
          <div style={{ flex: '1 1 520px', minWidth: 0, display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 640,
                aspectRatio: '1 / 1',
                border: '8px solid #FFC21A',
                borderRadius: 28,
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(42,15,20,0.45)'
              }}
            >
              <img
                src="/fotos/3-ofrenda-altar.jpg"
                alt="Ofrenda de Día de Muertos de varios niveles con cempasúchil, velas, pan de muerto, calaveritas de azúcar y papel picado"
                style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {items.map((it) => (
                <React.Fragment key={it.n}>
                  <button
                    className={it.cls}
                    type="button"
                    aria-label={it.nombre}
                    aria-pressed={it.on}
                    onClick={it.pick}
                    style={{
                      position: 'absolute',
                      left: `calc(${it.x}% - 20px)`,
                      top: `calc(${it.y}% - 20px)`,
                      width: 40,
                      height: 40,
                      padding: 0,
                      border: '3px solid #2A0F14',
                      borderRadius: '50%',
                      background: it.dot,
                      color: '#2A0F14',
                      fontFamily: "'Nunito Sans', sans-serif",
                      fontSize: 16,
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    {it.n}
                  </button>
                  {it.sel && (
                    <div
                      style={{
                        position: 'absolute',
                        left: `calc(${it.x}% - 90px)`,
                        top: `calc(${it.y}% + 26px)`,
                        width: 180,
                        padding: '8px 10px',
                        borderRadius: 10,
                        background: '#2A0F14',
                        color: '#FFC21A',
                        fontSize: 14,
                        fontWeight: 800,
                        textAlign: 'center',
                        pointerEvents: 'none',
                        zIndex: 10
                      }}
                    >
                      {it.nombre}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Tarjeta explicativa y botones */}
          <div style={{ flex: '1 1 380px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                minHeight: 150,
                padding: '26px 28px',
                background: '#FFF1DC',
                color: '#2A0F14',
                borderRadius: 22
              }}
            >
              <span style={{ fontFamily: "'Caveat', cursive", fontSize: 26, color: '#B8420F' }}>{infoTag}</span>
              <h3 style={{ margin: 0, fontFamily: "'Abril Fatface', serif", fontWeight: 400, fontSize: 34, lineHeight: 1.05 }}>
                {infoTitle}
              </h3>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55, color: '#5A2A18' }}>{infoText}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
              {items.map((it) => (
                <button
                  key={it.n}
                  className="chip"
                  type="button"
                  aria-pressed={it.on}
                  onClick={it.pick}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    minHeight: 52,
                    padding: '8px 14px',
                    border: `2px solid ${it.border}`,
                    borderRadius: 14,
                    background: it.bg,
                    color: it.fg,
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: 15,
                    fontWeight: 800,
                    textAlign: 'left'
                  }}
                >
                  <span
                    style={{
                      flex: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: it.dot,
                      color: '#2A0F14',
                      fontSize: 14
                    }}
                  >
                    {it.n}
                  </span>
                  {it.nombre}
                </button>
              ))}
            </div>
            <p style={{ margin: 0, fontFamily: "'Caveat', cursive", fontSize: 30, color: msgColor }}>{msg}</p>
          </div>
        </div>
      </section>

      {/* ================= LA FIESTA ================= */}
      <section
        id="fiesta"
        className="pad"
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '110px 80px',
          background: '#0B5E5E',
          color: '#FFF1DC',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 56
        }}
      >
        {/* Catrín Mariachi tocando la guitarra */}
        <div style={{ position: 'relative', flex: '1 1 360px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* Notas musicales flotantes */}
          <svg aria-hidden="true" className="note" width="30" height="40" viewBox="0 0 30 40" style={{ position: 'absolute', top: 20, right: '12%', zIndex: 4 }}>
            <path d="M10 32 V6 L26 2 V26" stroke="#FFC21A" strokeWidth="3" fill="none" />
            <ellipse cx="7" cy="32" rx="6" ry="5" fill="#FFC21A" />
            <ellipse cx="23" cy="27" rx="6" ry="5" fill="#FFC21A" />
          </svg>
          <svg aria-hidden="true" className="note" width="22" height="34" viewBox="0 0 22 34" style={{ position: 'absolute', top: 70, right: '4%', zIndex: 4, animationDelay: '1s' }}>
            <path d="M12 28 V2 Q20 6 20 14" stroke="#FF5AAE" strokeWidth="3" fill="none" />
            <ellipse cx="8" cy="28" rx="7" ry="5" fill="#FF5AAE" />
          </svg>
          <svg aria-hidden="true" className="note" width="22" height="34" viewBox="0 0 22 34" style={{ position: 'absolute', top: 50, left: '8%', zIndex: 4, animationDelay: '2s' }}>
            <path d="M12 28 V2 Q20 6 20 14" stroke="#F5821F" strokeWidth="3" fill="none" />
            <ellipse cx="8" cy="28" rx="7" ry="5" fill="#F5821F" />
          </svg>

          {/* Marco del Catrín */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 380,
              aspectRatio: '3 / 4',
              borderRadius: 28,
              border: '6px solid #FFC21A',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,194,26,0.25)',
              overflow: 'hidden',
              background: '#084848'
            }}
          >
            <img
              src="/fotos/catrin-mariachi.jpg"
              alt="Catrín mariachi con traje de charro y maquillaje tradicional tocando la guitarra mexicana"
              className={playing ? 'kenburns' : ''}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 20%',
                display: 'block'
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(11,94,94,0.05) 0%, rgba(8,72,72,0.15) 55%, rgba(42,15,20,0.85) 100%)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 18,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                textAlign: 'center',
                padding: '0 16px'
              }}
            >
              <span style={{ fontFamily: "'Caveat', cursive", fontSize: 28, color: '#FFC21A', textShadow: '0 2px 8px rgba(0,0,0,0.85)' }}>
                Catrín mariachi
              </span>
              <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFF1DC', textShadow: '0 2px 6px rgba(0,0,0,0.85)' }}>
                Tocando para las almas
              </span>
            </div>
          </div>
        </div>

        {/* Contenido derecho de La Fiesta */}
        <div style={{ flex: '999 1 480px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#FFC21A' }}>
            La fiesta
          </p>
          <h2 className="sec-title" style={{ margin: 0, fontFamily: "'Abril Fatface', serif", fontWeight: 400, fontSize: 70, lineHeight: 1.02 }}>
            Música, comida y una noche en el panteón
          </h2>
          <p style={{ margin: 0, maxWidth: 600, fontSize: 18, lineHeight: 1.65, color: '#D5F0EC' }}>
            En lugares como Pátzcuaro y Janitzio, en Michoacán, o Mixquic, en la Ciudad de México, las familias pasan la noche en el panteón. Limpian y adornan las tumbas, encienden velas, comparten comida y a veces llevan mariachi para tocarle sus canciones favoritas a quien ya no está.
          </p>

          {/* Reproductor de música */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, padding: '14px 16px 14px 14px', background: '#084848', borderRadius: 18, maxWidth: 600 }}>
            <button
              className="btn"
              type="button"
              onClick={toggleMusic}
              aria-pressed={playing}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                minHeight: 52,
                padding: '0 22px',
                border: 'none',
                borderRadius: 999,
                background: playing ? '#FFC21A' : '#FFF1DC',
                color: '#2A0F14',
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: 16,
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
                <path d="M8 17 V4 L19 2 V15" stroke="#2A0F14" strokeWidth="2.4" fill="none" strokeLinejoin="round" />
                <circle cx="5.5" cy="17" r="3.5" fill="#2A0F14" />
                <circle cx="16.5" cy="15" r="3.5" fill="#2A0F14" />
              </svg>
              {playing ? 'Pausar música' : 'Reanudar música'}
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
              <span style={{ fontFamily: "'Caveat', cursive", fontSize: 24, lineHeight: 1, color: '#FFC21A' }}>
                La Llorona
              </span>
              <span style={{ fontSize: 13, color: '#D5F0EC' }}>
                {playing
                  ? 'Música ambiental sonando en toda la página.'
                  : 'Música en pausa. Toca para reanudar.'}
              </span>
            </div>
            {playing && (
              <div aria-hidden="true" style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 26 }}>
                <div className="eq" style={{ width: 5, height: 26, background: '#FFC21A', borderRadius: 3 }} />
                <div className="eq" style={{ width: 5, height: 26, background: '#F5821F', borderRadius: 3, animationDelay: '.2s' }} />
                <div className="eq" style={{ width: 5, height: 26, background: '#FF5AAE', borderRadius: 3, animationDelay: '.4s' }} />
                <div className="eq" style={{ width: 5, height: 26, background: '#FFF1DC', borderRadius: 3, animationDelay: '.1s' }} />
              </div>
            )}
          </div>

          {/* Chips de comida */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {comida.map((c, i) => (
              <span
                key={i}
                style={{
                  padding: '10px 18px',
                  borderRadius: 999,
                  background: c.bg,
                  color: c.fg,
                  fontWeight: 800,
                  fontSize: 15
                }}
              >
                {c.nombre}
              </span>
            ))}
          </div>

          {/* Dato mariposas monarca */}
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: 20, border: '2px dashed #FFC21A', borderRadius: 16, maxWidth: 600 }}>
            <svg width="40" height="32" viewBox="0 0 56 44" aria-hidden="true" style={{ flex: 'none' }}>
              <path d="M28 22 C20 4 4 0 2 10 C0 20 14 22 28 22 Z M28 22 C18 26 6 34 12 42 C18 46 26 34 28 22 Z" fill="#F5821F" stroke="#2A0F14" strokeWidth="2" />
              <path d="M28 22 C36 4 52 0 54 10 C56 20 42 22 28 22 Z M28 22 C38 26 50 34 44 42 C38 46 30 34 28 22 Z" fill="#F5821F" stroke="#2A0F14" strokeWidth="2" />
            </svg>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: '#D5F0EC' }}>
              Las mariposas monarca llegan a México justo en estas fechas. En Michoacán se dice que son las almas de los difuntos que regresan a visitar.
            </p>
          </div>
        </div>
      </section>

      {/* ================= GALERÍA ================= */}
      <section
        className="pad"
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '110px 80px 130px',
          background: '#FFF1DC',
          color: '#2A0F14',
          display: 'flex',
          flexDirection: 'column',
          gap: 40
        }}
      >
        {/* Pétalos sueltos de fondo */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: 70, right: '9%', width: 16, height: 22, borderRadius: '60% 40% 60% 40%', background: '#F5821F', transform: 'rotate(30deg)', opacity: 0.6 }} />
          <div style={{ position: 'absolute', top: 150, right: '22%', width: 12, height: 16, borderRadius: '60% 40% 60% 40%', background: '#FFC21A', transform: 'rotate(-20deg)', opacity: 0.7 }} />
          <div style={{ position: 'absolute', bottom: 60, left: '6%', width: 18, height: 24, borderRadius: '60% 40% 60% 40%', background: '#E4007C', transform: 'rotate(60deg)', opacity: 0.35 }} />
          <div style={{ position: 'absolute', bottom: 90, right: '12%', width: 14, height: 20, borderRadius: '60% 40% 60% 40%', background: '#F5821F', transform: 'rotate(-45deg)', opacity: 0.5 }} />
          <div style={{ position: 'absolute', top: '46%', left: '48%', width: 10, height: 14, borderRadius: '60% 40% 60% 40%', background: '#FFC21A', transform: 'rotate(10deg)', opacity: 0.6 }} />
        </div>

        <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 700 }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#B8420F' }}>
              Galería
            </p>
            <h2 className="sec-title" style={{ margin: 0, fontFamily: "'Abril Fatface', serif", fontWeight: 400, fontSize: 70, lineHeight: 1.02 }}>
              Así se vive en México
            </h2>
          </div>
          <p style={{ margin: 0, maxWidth: 340, fontFamily: "'Caveat', cursive", fontSize: 28, lineHeight: 1.2, color: '#B8420F' }}>
            Recuerdos colgados en el tendedero, como en la casa de la abuela.
          </p>
        </div>

        {/* Tendedero */}
        <div style={{ position: 'relative', paddingTop: 24 }}>
          <svg aria-hidden="true" className="hide-sm" width="1280" height="90" viewBox="0 0 1280 90" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: -80, width: 'calc(100% + 160px)', height: 90 }}>
            <path d="M0 10 Q640 110 1280 10" stroke="#8E5A22" strokeWidth="3" fill="none" />
            <path d="M0 10 Q640 110 1280 10" stroke="#C98A3E" strokeWidth="1" fill="none" strokeDasharray="3 5" />
          </svg>
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 36, alignItems: 'start' }}>
            {fotos.map((ph, idx) => (
              <div
                key={idx}
                className="hang"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingTop: ph.drop,
                  animationDelay: `${ph.delay}s`
                }}
              >
                {/* Pinza */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    width: 16,
                    height: 40,
                    marginBottom: -22,
                    background: '#C98A3E',
                    border: '2px solid #8E5A22',
                    borderRadius: 3
                  }}
                >
                  <div style={{ position: 'absolute', top: 14, left: -4, width: 20, height: 5, background: '#8E5A22', borderRadius: 2 }} />
                </div>
                {/* Polaroid */}
                <figure
                  className="polaroid"
                  style={{
                    width: '100%',
                    maxWidth: 290,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    padding: '14px 14px 20px',
                    background: '#FFFFFF',
                    boxShadow: '0 2px 0 rgba(42,15,20,0.06), 0 18px 36px rgba(42,15,20,0.2)',
                    transform: `rotate(${ph.rot}deg)`
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '1 / 1',
                      maxWidth: '100%',
                      overflow: 'hidden',
                      borderRadius: 2,
                      background: ph.bg
                    }}
                  >
                    <img
                      src={ph.img}
                      alt={`${ph.titulo} · ${ph.lugar}`}
                      style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <figcaption style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '4px 4px 0' }}>
                    <span style={{ fontFamily: "'Caveat', cursive", fontSize: 28, lineHeight: 1.05 }}>{ph.titulo}</span>
                    <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: ph.tagColor }}>
                      {ph.lugar}
                    </span>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= IMPORTANCIA ================= */}
      <section
        id="importancia"
        className="pad"
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '120px 80px 130px',
          background: '#E4007C',
          color: '#FFF1DC',
          display: 'flex',
          flexDirection: 'column',
          gap: 72
        }}
      >
        {/* Cita grande */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center' }}>
          <p
            style={{
              margin: 0,
              padding: '8px 18px',
              background: '#2A0F14',
              color: '#FFC21A',
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              borderRadius: 999
            }}
          >
            Por qué es importante para los mexicanos
          </p>
          <div style={{ position: 'relative', maxWidth: 980 }}>
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: -70,
                left: -30,
                fontFamily: "'Abril Fatface', serif",
                fontSize: 220,
                lineHeight: 1,
                color: '#FFC21A',
                opacity: 0.9
              }}
            >
              “
            </span>
            <h2 className="sec-title" style={{ position: 'relative', margin: 0, fontFamily: "'Abril Fatface', serif", fontWeight: 400, fontSize: 76, lineHeight: 1.02 }}>
              Nadie muere del todo mientras <span style={{ color: '#FFC21A' }}>alguien lo recuerde</span>
            </h2>
          </div>
          <p style={{ margin: 0, fontFamily: "'Caveat', cursive", fontSize: 28, color: '#FFE0EF' }}>
            Tres razones, tres veladoras
          </p>
        </div>

        {/* Veladoras */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 40, alignItems: 'start' }}>
          {razones.map((r) => (
            <article key={r.n} className="veladora" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, textAlign: 'center' }}>
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  aria-hidden="true"
                  className="glow"
                  style={{
                    position: 'absolute',
                    top: -10,
                    width: 180,
                    height: 180,
                    borderRadius: '50%',
                    background: '#FFC21A',
                    opacity: 0.35,
                    filter: 'blur(40px)'
                  }}
                />
                <svg aria-hidden="true" width="44" height="64" viewBox="0 0 44 64" style={{ position: 'relative', marginBottom: -6 }}>
                  <path className="flame" d="M22 2 C30 18 40 28 40 42 C40 54 32 62 22 62 C12 62 4 54 4 42 C4 28 14 18 22 2 Z" fill="#FFC21A" />
                  <path className="flame" d="M22 26 C26 34 30 38 30 46 C30 52 26 56 22 56 C18 56 14 52 14 46 C14 38 18 34 22 26 Z" fill="#FFF1DC" style={{ animationDelay: '.2s' }} />
                </svg>
                <div
                  style={{
                    position: 'relative',
                    width: 190,
                    height: 290,
                    border: '4px solid #FFF1DC',
                    borderRadius: '18px 18px 26px 26px',
                    background: 'rgba(255,241,220,0.16)',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '84%', background: r.wax }} />
                  <div style={{ position: 'absolute', top: 10, left: 14, width: 10, height: 250, borderRadius: 6, background: 'rgba(255,255,255,0.35)' }} />
                  <div
                    style={{
                      position: 'absolute',
                      left: 18,
                      right: 18,
                      top: 74,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 8,
                      padding: '18px 10px 16px',
                      background: '#FFF1DC',
                      color: '#2A0F14',
                      border: '3px solid #2A0F14',
                      borderRadius: 10
                    }}
                  >
                    <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8420F' }}>
                      Razón {r.n}
                    </span>
                    <svg width="56" height="48" viewBox="0 0 56 48" aria-hidden="true">
                      <path d={r.icon} fill="none" stroke="#2A0F14" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx={r.dotX} cy={r.dotY} r="5" fill="#E4007C" />
                    </svg>
                    <h3 style={{ margin: 0, fontFamily: "'Abril Fatface', serif", fontWeight: 400, fontSize: 26, lineHeight: 1 }}>
                      {r.titulo}
                    </h3>
                  </div>
                </div>
              </div>
              <p style={{ margin: 0, maxWidth: 320, fontSize: 17, lineHeight: 1.6 }}>{r.texto}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ================= LA CATRINA + calaveritas ================= */}
      <section id="catrina" className="pad" style={{ padding: '120px 80px 0', display: 'flex', flexDirection: 'column', gap: 100 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 72 }}>
          {/* Carta de lotería */}
          <div style={{ flex: '0 1 380px', display: 'flex', justifyContent: 'center', padding: 20 }}>
            <div style={{ position: 'relative', width: 300, maxWidth: '100%' }}>
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  transform: 'rotate(8deg) translate(26px, 10px)',
                  border: '8px solid #2A0F14',
                  borderRadius: 14,
                  background: '#0E9C9C',
                  backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,241,220,0.22) 0 10px, rgba(255,241,220,0) 10px 20px)'
                }}
              />
              <div
                className="loteria"
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  padding: 14,
                  background: '#FFFFFF',
                  border: '8px solid #2A0F14',
                  borderRadius: 14,
                  boxShadow: '0 22px 44px rgba(42,15,20,0.35)',
                  transform: 'rotate(-4deg)'
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '3 / 3.6',
                    maxWidth: '100%',
                    background: '#FFC21A',
                    border: '3px solid #2A0F14',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center'
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      top: 8,
                      left: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 46,
                      height: 46,
                      border: '3px solid #2A0F14',
                      borderRadius: '50%',
                      background: '#FFF1DC',
                      fontFamily: "'Abril Fatface', serif",
                      fontSize: 28,
                      lineHeight: 1,
                      color: '#2A0F14'
                    }}
                  >
                    1
                  </span>
                  <img
                    src="/fotos/4-icono-catrina-plumas.jpg"
                    alt="Catrina con sombrero de plumas naranjas, flores y mariposas monarca, con un sagrado corazón de plata en el pecho"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'block',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: '50% 30%'
                    }}
                  />
                </div>
                <div
                  style={{
                    padding: '6px 0 2px',
                    border: '3px solid #2A0F14',
                    textAlign: 'center',
                    fontFamily: "'Abril Fatface', serif",
                    fontSize: 30,
                    letterSpacing: '0.04em',
                    color: '#2A0F14'
                  }}
                >
                  La Catrina
                </div>
              </div>
            </div>
          </div>

          {/* Texto + cronología */}
          <div style={{ flex: '999 1 460px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#2A0F14' }}>
                Ícono
              </p>
              <h2 className="sec-title" style={{ margin: 0, fontFamily: "'Abril Fatface', serif", fontWeight: 400, fontSize: 76, lineHeight: 1 }}>
                La Catrina
              </h2>
              <p style={{ margin: 0, maxWidth: 600, fontSize: 19, lineHeight: 1.6, color: '#4A1A10' }}>
                Empezó como una burla y terminó como el símbolo más reconocido del Día de Muertos.
              </p>
            </div>
            <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
              {catrinaHist.map((h, i) => (
                <li key={i} style={{ display: 'flex', gap: 22 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 'none' }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: h.color, border: '4px solid #2A0F14' }} />
                    <div style={{ flex: 1, width: 4, minHeight: 30, background: '#2A0F14', opacity: h.line }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingBottom: 28 }}>
                    <span style={{ fontFamily: "'Abril Fatface', serif", fontSize: 30, lineHeight: 1 }}>{h.anio}</span>
                    <strong style={{ fontSize: 18 }}>{h.titulo}</strong>
                    <p style={{ margin: 0, maxWidth: 560, fontSize: 16, lineHeight: 1.6, color: '#4A1A10' }}>{h.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Puesto de calaveritas */}
        <div style={{ display: 'flex', flexDirection: 'column', margin: '0 -80px' }}>
          <svg aria-hidden="true" width="1440" height="80" style={{ display: 'block', width: '100%', height: 80 }}>
            <defs>
              <pattern id="toldo" width="120" height="80" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="60" height="50" fill="#E4007C" />
                <circle cx="30" cy="50" r="30" fill="#E4007C" />
                <rect x="60" y="0" width="60" height="50" fill="#FFF1DC" />
                <circle cx="90" cy="50" r="30" fill="#FFF1DC" />
              </pattern>
            </defs>
            <rect width="100%" height="80" fill="url(#toldo)" />
          </svg>
          <div className="pad" style={{ display: 'flex', flexDirection: 'column', gap: 28, padding: '40px 80px 0', background: '#FFC21A' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
              <h3 style={{ margin: 0, fontFamily: "'Abril Fatface', serif", fontWeight: 400, fontSize: 44 }}>
                Calaveritas de azúcar
              </h3>
              <p style={{ margin: 0, fontFamily: "'Caveat', cursive", fontSize: 26, color: '#B8420F' }}>
                Con tu nombre en la frente · pasa el cursor
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 24, alignItems: 'end' }}>
              {calaveritas.map((k, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <svg className="skull" width="140" height="140" viewBox="0 0 130 130" aria-hidden="true" style={{ cursor: 'pointer' }}>
                    <ellipse cx="65" cy="58" rx="52" ry="50" fill="#FFFFFF" />
                    <rect x="34" y="78" width="62" height="42" rx="18" fill="#FFFFFF" />
                    <rect x="34" y="18" width="62" height="20" rx="10" fill={k.c2} />
                    <text x="65" y="33" textAnchor="middle" fontFamily="'Caveat', cursive" fontSize="17" fontWeight="600" fill="#FFFFFF">
                      {k.nombre}
                    </text>
                    <circle cx="45" cy="60" r="15" fill={k.c1} />
                    <circle cx="85" cy="60" r="15" fill={k.c1} />
                    <circle cx="45" cy="60" r="6" fill={k.c2} />
                    <circle cx="85" cy="60" r="6" fill={k.c2} />
                    <path d="M65 76 L59 88 Q65 92 71 88 Z" fill={k.c2} />
                    <path d="M42 104 Q65 114 88 104" stroke={k.c2} strokeWidth="4" fill="none" strokeDasharray="3 6" strokeLinecap="round" />
                    <circle cx="20" cy="72" r="5" fill={k.c1} />
                    <circle cx="110" cy="72" r="5" fill={k.c1} />
                  </svg>
                </div>
              ))}
            </div>
            <div
              aria-hidden="true"
              style={{
                height: 22,
                margin: '-6px -80px 0',
                background: '#8E5A22',
                borderTop: '6px solid #C98A3E',
                boxShadow: '0 10px 0 #5C3A16'
              }}
            />
          </div>
        </div>
      </section>

      {/* ================= FOOTER con velas ================= */}
      <footer style={{ background: '#2A0F14', color: '#FFF1DC' }}>
        <div aria-hidden="true" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 28, padding: '60px 20px 0', overflow: 'hidden' }}>
          {velas.map((v, i) => (
            <svg key={i} width="34" height={v.h} viewBox={`0 0 34 ${v.h}`} style={{ flex: 'none' }}>
              <ellipse className="flame" cx="17" cy="14" rx="8" ry="13" fill="#F5821F" style={{ animationDelay: `${v.d}s` }} />
              <ellipse cx="17" cy="18" rx="3.5" ry="6" fill="#FFC21A" />
              <rect x="6" y="28" width="22" height={v.body} rx="3" fill="#FFF1DC" />
            </svg>
          ))}
        </div>
        <div
          className="pad"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            padding: '32px 80px',
            borderTop: '6px solid #F5821F',
            fontSize: 14
          }}
        >
          <span style={{ fontFamily: "'Abril Fatface', serif", fontSize: 26, color: '#F5821F' }}>
            Día de Muertos
          </span>
          <span>Proyecto de Diseño de Interfaces · 2026</span>
        </div>
      </footer>
      {/* Floating Music Controller */}
      <div
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleMusic();
          }}
          className="btn"
          aria-label={playing ? 'Silenciar música' : 'Activar música La Llorona'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 22px',
            borderRadius: 999,
            background: playing ? '#2A0F14' : '#E4007C',
            color: playing ? '#FFC21A' : '#FFF1DC',
            border: '3px solid #FFC21A',
            boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
            cursor: 'pointer',
            fontFamily: "'Nunito Sans', sans-serif",
            fontWeight: 800,
            fontSize: 14
          }}
        >
          {playing ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="6" y="4" width="4" height="16" fill="currentColor" />
                <rect x="14" y="4" width="4" height="16" fill="currentColor" />
              </svg>
              <span>La Llorona</span>
              <span aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'flex-end', gap: 3, height: 14 }}>
                <span className="eq" style={{ width: 3, height: 14, background: '#FFC21A', borderRadius: 1.5 }} />
                <span className="eq" style={{ width: 3, height: 14, background: '#F5821F', borderRadius: 1.5, animationDelay: '.2s' }} />
                <span className="eq" style={{ width: 3, height: 14, background: '#FF5AAE', borderRadius: 1.5, animationDelay: '.4s' }} />
              </span>
            </>
          ) : (
            <>
              <span style={{ fontSize: 18 }}>🎵</span>
              <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', lineHeight: 1.2 }}>
                <span>Activar música</span>
                <span style={{ fontSize: 11, opacity: 0.85, fontWeight: 600 }}>Toca para escuchar La Llorona</span>
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
