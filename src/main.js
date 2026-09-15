import './style.css'

import * as THREE from 'three'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* =========================================================
   HTML
========================================================= */

document.querySelector('#app').innerHTML = `
  <style>

    /* ======================================================
       SEGUNDA CENA — INTERAÇÃO
    ====================================================== */

    .menu-experience {
      margin-top: 56px;
      display: grid;
      gap: 42px;
    }

    .menu-controls {
      display: flex;
      flex-direction: column;
      gap: 0;
      border-top: 1px solid rgba(246, 235, 221, 0.14);
    }

    .menu-option {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      padding: 22px 0;
      border: 0;
      border-bottom: 1px solid rgba(246, 235, 221, 0.14);
      background: transparent;
      color: rgba(246, 235, 221, 0.42);
      cursor: pointer;
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(2rem, 6vw, 3.8rem);
      text-align: left;
      transition: color 0.3s ease, padding-left 0.3s ease;
    }

    .menu-option span:first-child {
      transition: transform 0.3s ease;
    }

    .menu-option-number {
      font-family: 'Inter', sans-serif;
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.18em;
      color: rgba(246, 235, 221, 0.28);
    }

    .menu-option:hover,
    .menu-option.is-active {
      color: var(--orange);
    }

    .menu-option:hover span:first-child,
    .menu-option.is-active span:first-child {
      transform: translateX(10px);
    }

    .menu-option.is-active {
      padding-left: 4px;
    }

    .menu-showcase {
      position: relative;
      min-height: 470px;
      overflow: hidden;
      border-radius: 14px;
      background: #120c09;
    }

    .menu-showcase::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: linear-gradient(
        to top,
        rgba(15, 11, 9, 0.88) 0%,
        rgba(15, 11, 9, 0.16) 46%,
        transparent 72%
      );
    }

    .menu-showcase img {
      width: 100%;
      height: 100%;
      position: absolute;
      inset: 0;
      display: block;
      object-fit: cover;
      transform: scale(1.04);
      will-change: transform, opacity;
    }

    .menu-showcase-content {
      position: absolute;
      z-index: 2;
      left: 28px;
      right: 28px;
      bottom: 28px;
    }

    .menu-showcase-kicker {
      margin-bottom: 10px;
      color: var(--orange);
      font-size: 0.66rem;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    .menu-showcase-title {
      margin-bottom: 10px;
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(2.8rem, 7vw, 4.8rem);
      line-height: 0.9;
      color: var(--cream);
      text-transform: uppercase;
    }

    .menu-showcase-description {
      max-width: 490px;
      color: rgba(246, 235, 221, 0.72);
      font-size: 0.9rem;
      line-height: 1.65;
    }

    .menu-status {
      margin-top: 18px;
      color: rgba(246, 235, 221, 0.38);
      font-size: 0.68rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    /* ======================================================
       TERCEIRA CENA — AMBIENTE
    ====================================================== */

    .atmosphere-section {
      position: relative;
      padding: 110px 0 130px;
      overflow: hidden;
      background:
        radial-gradient(circle at 20% 20%, rgba(255, 106, 26, 0.08), transparent 34%),
        linear-gradient(180deg, #1c120e 0%, #120b08 100%);
      border-top: 1px solid rgba(246, 235, 221, 0.08);
    }

    .atmosphere-section::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      background:
        linear-gradient(
          to right,
          rgba(255, 255, 255, 0.015) 1px,
          transparent 1px
        );
      background-size: 120px 120px;
      opacity: 0.14;
    }

    .atmosphere-grid {
      position: relative;
      z-index: 2;
      display: grid;
      gap: 50px;
      align-items: center;
    }

    .atmosphere-copy h2 {
      max-width: 780px;
      margin-bottom: 22px;
    }

    .atmosphere-copy p.atmosphere-lead {
      max-width: 640px;
      color: rgba(246, 235, 221, 0.74);
      font-size: 1rem;
      line-height: 1.8;
      margin-bottom: 34px;
    }

    .atmosphere-points {
      display: grid;
      gap: 18px;
      margin-bottom: 32px;
    }

    .atmosphere-point {
      display: grid;
      grid-template-columns: 42px 1fr;
      gap: 16px;
      align-items: start;
      padding-bottom: 18px;
      border-bottom: 1px solid rgba(246, 235, 221, 0.12);
    }

    .atmosphere-point-number {
      color: var(--orange);
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      padding-top: 6px;
    }

    .atmosphere-point h3 {
      margin: 0 0 6px;
      color: var(--cream);
      font-size: 1rem;
      font-weight: 700;
    }

    .atmosphere-point p {
      margin: 0;
      color: rgba(246, 235, 221, 0.68);
      font-size: 0.94rem;
      line-height: 1.7;
    }

    .atmosphere-location {
      display: inline-flex;
      flex-direction: column;
      gap: 6px;
      padding: 18px 20px;
      border: 1px solid rgba(246, 235, 221, 0.12);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.02);
      backdrop-filter: blur(8px);
    }

    .atmosphere-location-label {
      color: var(--orange);
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    .atmosphere-location-text {
      color: var(--cream);
      font-size: 0.96rem;
      line-height: 1.6;
    }

    .atmosphere-media {
      position: relative;
      min-height: 560px;
      overflow: hidden;
      border-radius: 20px;
      border: 1px solid rgba(246, 235, 221, 0.08);
      background: #120c09;
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
    }

    .atmosphere-media::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      background:
        linear-gradient(
          to top,
          rgba(18, 11, 8, 0.95) 0%,
          rgba(18, 11, 8, 0.36) 26%,
          rgba(18, 11, 8, 0.12) 54%,
          rgba(18, 11, 8, 0.12) 100%
        );
    }

    .atmosphere-media img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      object-position: center;
      filter: saturate(1.06) contrast(1.03) brightness(0.94);
    }

    .atmosphere-badge {
      position: absolute;
      z-index: 2;
      left: 26px;
      bottom: 26px;
      display: inline-flex;
      flex-direction: column;
      gap: 6px;
      padding: 16px 18px;
      border-radius: 14px;
      background: rgba(15, 11, 9, 0.48);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(246, 235, 221, 0.12);
    }

    .atmosphere-badge small {
      color: var(--orange);
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    .atmosphere-badge strong {
      color: var(--cream);
      font-family: 'Bebas Neue', sans-serif;
      font-size: 2rem;
      line-height: 0.95;
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }

    @media (min-width: 900px) {
      .menu-experience {
        grid-template-columns: 0.8fr 1.2fr;
        align-items: stretch;
        gap: 72px;
      }

      .menu-showcase {
        min-height: 600px;
      }

      .menu-showcase-content {
        left: 38px;
        right: 38px;
        bottom: 36px;
      }

      .atmosphere-grid {
        grid-template-columns: 0.95fr 1.05fr;
        gap: 72px;
      }
    }

    @media (max-width: 799px) {
      .menu-showcase {
        min-height: 440px;
      }

      .menu-option {
        font-size: clamp(2.4rem, 12vw, 4rem);
      }

      .atmosphere-section {
        padding: 84px 0 100px;
      }

      .atmosphere-media {
        min-height: 420px;
      }

      .atmosphere-badge {
        left: 18px;
        right: 18px;
        bottom: 18px;
      }
    }

  </style>

  <div class="experience">

    <header class="site-header">
      <div class="container header-content">
        <div class="brand">
          <img
            src="./images/logo-mariba.jpg"
            alt="Maribá Espetinhos"
            style="
              width: 64px;
              height: 64px;
              object-fit: contain;
              display: block;
            "
          >
        </div>

        <nav class="desktop-nav" aria-label="Navegação principal">
          <a href="#cardapio">Cardápio</a>
          <a href="#experiencia">Experiência</a>
          <a href="#localizacao">Localização</a>
        </nav>

        <a href="#pedido" class="header-cta">
          Fazer pedido
        </a>
      </div>
    </header>

    <main>

      <!-- =================================================
           HERO
      ================================================== -->

      <section class="hero">

        <canvas id="webgl" aria-hidden="true"></canvas>

        <div class="hero-glow"></div>

        <div
          id="product-stage"
          style="
            position: absolute;
            z-index: 2;
            right: -4%;
            top: 50%;
            width: min(58vw, 820px);
            transform: translateY(-50%);
            pointer-events: none;
            perspective: 1400px;
            -webkit-mask-image:
              linear-gradient(
                to right,
                transparent 0%,
                rgba(0,0,0,0.1) 7%,
                black 25%,
                black 94%,
                transparent 100%
              );
            mask-image:
              linear-gradient(
                to right,
                transparent 0%,
                rgba(0,0,0,0.1) 7%,
                black 25%,
                black 94%,
                transparent 100%
              );
          "
        >
          <div
            id="product-photo"
            style="
              position: relative;
              transform-origin: 55% 50%;
              will-change: transform, opacity;
              filter:
                saturate(1.06)
                contrast(1.05)
                brightness(0.9);
            "
          >
            <img
              src="./images/espeto-real.jpg"
              alt="Espetos de carne assados na brasa"
              style="
                width: 100%;
                height: auto;
                display: block;
                object-fit: cover;
              "
            >

            <div
              style="
                position: absolute;
                inset: 0;
                background:
                  radial-gradient(
                    circle at 60% 65%,
                    rgba(255, 106, 26, 0.13),
                    transparent 46%
                  ),
                  linear-gradient(
                    90deg,
                    rgba(15, 11, 9, 1) 0%,
                    rgba(15, 11, 9, 0.68) 12%,
                    rgba(15, 11, 9, 0.12) 31%,
                    transparent 46%
                  );
                pointer-events: none;
              "
            ></div>
          </div>
        </div>

        <div class="container hero-content">
          <div class="hero-copy">
            <p class="eyebrow">
              ESPETINHOS • CHOPP • BONS MOMENTOS
            </p>

            <h1>
              A noite começa
              <span>na brasa.</span>
            </h1>

            <p class="hero-description">
              Um conceito digital inspirado na energia,
              na brasa e no clima descontraído do Maribá.
            </p>

            <div class="hero-actions">
              <a href="#cardapio" class="button button-primary">
                Ver cardápio
              </a>

              <a href="#pedido" class="button button-secondary">
                Fazer pedido
              </a>
            </div>
          </div>

          <div class="hero-object-label">
            <span>01</span>
            <p>
              Fotografia real<br>
              atmosfera 3D
            </p>
          </div>
        </div>

        <div class="scroll-indicator">
          <span>ROLE PARA EXPLORAR</span>
          <div class="scroll-line"></div>
        </div>

        <div
          id="scene-transition"
          style="
            position: absolute;
            z-index: 4;
            left: 0;
            right: 0;
            bottom: -2px;
            height: 34%;
            pointer-events: none;
            background:
              linear-gradient(
                to bottom,
                transparent 0%,
                rgba(20, 13, 10, 0.08) 18%,
                rgba(24, 15, 11, 0.42) 50%,
                rgba(28, 18, 14, 0.82) 78%,
                #1c120e 100%
              );
          "
        ></div>

      </section>


      <!-- =================================================
           SEGUNDA CENA
      ================================================== -->

      <section
        class="concept-section"
        id="cardapio"
        style="
          border-top: 0;
          margin-top: -2px;
        "
      >
        <div class="container">
          <p class="eyebrow">A BRASA</p>

          <h2>
            Do fogo direto
            <span>pra mesa.</span>
          </h2>

          <p>
            Escolha o clima da sua noite.
            A experiência muda sem sair da página.
          </p>

          <div class="menu-experience" id="experiencia">

            <div>
              <div
                class="menu-controls"
                role="group"
                aria-label="Categorias em destaque"
              >
                <button
                  class="menu-option is-active"
                  type="button"
                  data-category="espeto"
                  aria-pressed="true"
                >
                  <span>Espetinhos</span>
                  <span class="menu-option-number">01</span>
                </button>

                <button
                  class="menu-option"
                  type="button"
                  data-category="chopp"
                  aria-pressed="false"
                >
                  <span>Chopp</span>
                  <span class="menu-option-number">02</span>
                </button>
              </div>

              <p class="menu-status">
                Toque ou clique para mudar a cena
              </p>
            </div>

            <div class="menu-showcase" id="menu-showcase">
              <img
                id="menu-image"
                src="./images/espeto-real.jpg"
                alt="Espetos assados na brasa"
              >

              <div class="menu-showcase-content" id="menu-copy">
                <p class="menu-showcase-kicker" id="menu-kicker">
                  NA BRASA
                </p>

                <h3 class="menu-showcase-title" id="menu-title">
                  Espetinhos
                </h3>

                <p
                  class="menu-showcase-description"
                  id="menu-description"
                >
                  O fogo continua como protagonista:
                  uma apresentação visual para destacar
                  os espetinhos de forma direta e apetitosa.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      <!-- =================================================
           TERCEIRA CENA
      ================================================== -->

      <section class="atmosphere-section" id="localizacao">
        <div class="container atmosphere-grid">

          <div class="atmosphere-copy">
            <p class="eyebrow">NOITE MARIBÁ</p>

            <h2>
              O ponto de encontro
              <span>da cidade.</span>
            </h2>

            <p class="atmosphere-lead">
              Mais do que pedir espetinho: o Maribá
              entrega clima, movimento e encontro.
              A calçada cheia e as mesas ao ar livre
              ajudam a transformar a noite em experiência.
            </p>

            <div class="atmosphere-points">

              <div class="atmosphere-point">
                <div class="atmosphere-point-number">01</div>
                <div>
                  <h3>Clima descontraído</h3>
                  <p>
                    Um ambiente informal e convidativo,
                    ideal para quem quer comer bem e ficar à vontade.
                  </p>
                </div>
              </div>

              <div class="atmosphere-point">
                <div class="atmosphere-point-number">02</div>
                <div>
                  <h3>Mesas ao ar livre</h3>
                  <p>
                    A experiência acontece na rua, com movimento,
                    conversa e sensação de lugar sempre vivo.
                  </p>
                </div>
              </div>

              <div class="atmosphere-point">
                <div class="atmosphere-point-number">03</div>
                <div>
                  <h3>Perfeito para reunir amigos</h3>
                  <p>
                    Chopp gelado, espetinhos e um espaço que
                    convida a permanecer mais tempo.
                  </p>
                </div>
              </div>

            </div>

            <div class="atmosphere-location">
              <span class="atmosphere-location-label">Endereço</span>
              <span class="atmosphere-location-text">
                Rua Vallins, 417 · Centro · Aguaí
              </span>
            </div>
          </div>

          <div class="atmosphere-media">
            <img
              src="./images/ambiente-mariba.png"
              alt="Clientes sentados nas mesas ao ar livre no Maribá"
            >

            <div class="atmosphere-badge">
              <small>Experiência real</small>
              <strong>Noite cheia</strong>
            </div>
          </div>

        </div>
      </section>

    </main>
  </div>
`

/* =========================================================
   THREE.JS — BRASAS DISCRETAS
========================================================= */

const canvas = document.querySelector('#webgl')
canvas.style.zIndex = '4'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  100
)

camera.position.set(0, 0, 8)

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.05

/* =========================================================
   TEXTURA DE BRASA
========================================================= */

function createEmberTexture() {
  const size = 128
  const emberCanvas = document.createElement('canvas')

  emberCanvas.width = size
  emberCanvas.height = size

  const context = emberCanvas.getContext('2d')

  const gradient = context.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  )

  gradient.addColorStop(0, 'rgba(255,255,230,1)')
  gradient.addColorStop(0.12, 'rgba(255,185,85,1)')
  gradient.addColorStop(0.32, 'rgba(255,100,20,0.9)')
  gradient.addColorStop(0.62, 'rgba(255,60,10,0.32)')
  gradient.addColorStop(1, 'rgba(255,60,10,0)')

  context.fillStyle = gradient
  context.fillRect(0, 0, size, size)

  const texture = new THREE.CanvasTexture(emberCanvas)
  texture.colorSpace = THREE.SRGBColorSpace

  return texture
}

const emberTexture = createEmberTexture()

function createEmberField({
  count,
  width,
  height,
  depth,
  size,
  opacity,
  speedMin,
  speedMax,
}) {
  const positions = new Float32Array(count * 3)
  const speeds = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * width
    positions[i * 3 + 1] = (Math.random() - 0.5) * height
    positions[i * 3 + 2] = (Math.random() - 0.5) * depth

    speeds[i] = speedMin + Math.random() * (speedMax - speedMin)
  }

  const geometry = new THREE.BufferGeometry()

  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
  )

  const material = new THREE.PointsMaterial({
    map: emberTexture,
    color: 0xff7a24,
    size,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  const points = new THREE.Points(geometry, material)
  scene.add(points)

  return {
    points,
    geometry,
    material,
    positions,
    speeds,
    count,
    height,
  }
}

const farEmbers = createEmberField({
  count: 100,
  width: 12,
  height: 9,
  depth: 4,
  size: 0.045,
  opacity: 0.42,
  speedMin: 0.001,
  speedMax: 0.004,
})

const middleEmbers = createEmberField({
  count: 70,
  width: 11,
  height: 8,
  depth: 3,
  size: 0.075,
  opacity: 0.55,
  speedMin: 0.002,
  speedMax: 0.006,
})

const foregroundEmbers = createEmberField({
  count: 32,
  width: 10,
  height: 7,
  depth: 2,
  size: 0.13,
  opacity: 0.32,
  speedMin: 0.003,
  speedMax: 0.008,
})

function updateEmbers(field, delta) {
  const {
    positions,
    speeds,
    count,
    height,
    geometry,
  } = field

  for (let i = 0; i < count; i++) {
    positions[i * 3 + 1] += speeds[i] * delta * 60

    if (positions[i * 3 + 1] > height / 2) {
      positions[i * 3 + 1] = -height / 2
    }
  }

  geometry.attributes.position.needsUpdate = true
}

const clock = new THREE.Clock()

function animate() {
  const delta = clock.getDelta()
  const elapsed = clock.elapsedTime

  updateEmbers(farEmbers, delta)
  updateEmbers(middleEmbers, delta)
  updateEmbers(foregroundEmbers, delta)

  farEmbers.points.rotation.y = Math.sin(elapsed * 0.08) * 0.04
  middleEmbers.points.rotation.y = Math.sin(elapsed * 0.12) * 0.06
  foregroundEmbers.points.rotation.y = Math.sin(elapsed * 0.16) * 0.08

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()

/* =========================================================
   HERO / SCROLL
========================================================= */

const motion = gsap.matchMedia()

motion.add('(min-width: 800px)', () => {
  gsap.set('#product-photo', {
    rotateZ: 2.2,
    rotateY: -4,
    rotateX: 1,
    scale: 0.97,
  })

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: '+=1450',
      scrub: 1.15,
      pin: true,
      anticipatePin: 1,
    },
  })

  timeline
    .to('#product-stage', {
      right: '3%',
      top: '52%',
      width: 'min(76vw, 1080px)',
      duration: 1,
    }, 0)

    .to('#product-photo', {
      rotateZ: -1.5,
      rotateY: 6,
      rotateX: -1,
      scale: 1.13,
      x: -35,
      y: -8,
      duration: 1,
    }, 0)

    .to('.hero-copy', {
      y: -85,
      opacity: 0.035,
      duration: 0.8,
    }, 0.14)

    .to('.hero-object-label', {
      opacity: 0,
      duration: 0.3,
    }, 0.1)

    .to('.scroll-indicator', {
      opacity: 0,
      duration: 0.25,
    }, 0.04)

    .to('.hero-glow', {
      scale: 2,
      opacity: 1,
      duration: 1,
    }, 0)

    .to(farEmbers.material, {
      opacity: 0.55,
      duration: 1,
    }, 0)

    .to(middleEmbers.material, {
      opacity: 0.72,
      duration: 1,
    }, 0)

    .to(foregroundEmbers.material, {
      opacity: 0.48,
      duration: 1,
    }, 0)
})

motion.add('(max-width: 799px)', () => {
  gsap.set('#product-stage', {
    width: '108vw',
    right: '-20%',
    top: '73%',
  })

  gsap.set('#product-photo', {
    rotateZ: 0,
    rotateY: 0,
    scale: 0.94,
  })

  gsap.to('#product-photo', {
    scale: 1.07,
    x: -10,
    y: -18,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  })
})

/* =========================================================
   ENTRADAS DAS CENAS
========================================================= */

gsap.from('.concept-section .container', {
  y: 70,
  opacity: 0,
  scrollTrigger: {
    trigger: '.concept-section',
    start: 'top 84%',
    end: 'top 48%',
    scrub: 1,
  },
})

gsap.from('.atmosphere-copy', {
  y: 60,
  opacity: 0,
  duration: 1,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.atmosphere-section',
    start: 'top 78%',
  },
})

gsap.from('.atmosphere-media', {
  y: 60,
  opacity: 0,
  duration: 1,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.atmosphere-section',
    start: 'top 72%',
  },
})

/* =========================================================
   DADOS DA INTERAÇÃO
========================================================= */

const menuData = {
  espeto: {
    image: './images/espeto-real.jpg',
    alt: 'Espetos assados na brasa',
    kicker: 'NA BRASA',
    title: 'Espetinhos',
    description: 'O fogo continua como protagonista: uma apresentação visual para destacar os espetinhos de forma direta e apetitosa.',
  },

  chopp: {
    image: './images/chopp-real.jpg',
    alt: 'Copo de chopp gelado',
    kicker: 'BEM GELADO',
    title: 'Chopp',
    description: 'O contraste da noite: depois do calor da brasa, a cena muda para destacar o chopp e a experiência de sentar e aproveitar.',
  },
}

/* =========================================================
   ELEMENTOS DA INTERAÇÃO
========================================================= */

const menuButtons = document.querySelectorAll('.menu-option')
const menuImage = document.querySelector('#menu-image')
const menuKicker = document.querySelector('#menu-kicker')
const menuTitle = document.querySelector('#menu-title')
const menuDescription = document.querySelector('#menu-description')

let activeCategory = 'espeto'
let changingCategory = false

/* =========================================================
   TROCA DE CENA
========================================================= */

function changeMenuScene(category) {
  if (category === activeCategory || changingCategory) {
    return
  }

  const data = menuData[category]

  if (!data) {
    return
  }

  changingCategory = true

  menuButtons.forEach((button) => {
    const isActive = button.dataset.category === category

    button.classList.toggle('is-active', isActive)
    button.setAttribute('aria-pressed', String(isActive))
  })

  const timeline = gsap.timeline({
    onComplete: () => {
      activeCategory = category
      changingCategory = false
    },
  })

  timeline
    .to(menuImage, {
      opacity: 0,
      scale: 1.08,
      duration: 0.28,
      ease: 'power2.in',
    })

    .to('#menu-copy', {
      opacity: 0,
      y: 14,
      duration: 0.2,
      ease: 'power2.in',
    }, '<')

    .call(() => {
      menuImage.src = data.image
      menuImage.alt = data.alt
      menuKicker.textContent = data.kicker
      menuTitle.textContent = data.title
      menuDescription.textContent = data.description
    })

    .fromTo(menuImage, {
      opacity: 0,
      scale: 1.1,
    }, {
      opacity: 1,
      scale: 1.04,
      duration: 0.55,
      ease: 'power2.out',
    })

    .to('#menu-copy', {
      opacity: 1,
      y: 0,
      duration: 0.42,
      ease: 'power2.out',
    }, '<0.08')
}

/* =========================================================
   CLIQUES / TOQUES
========================================================= */

menuButtons.forEach((button) => {
  button.addEventListener('click', () => {
    changeMenuScene(button.dataset.category)
  })
})

/* =========================================================
   RESIZE
========================================================= */

function handleResize() {
  const width = window.innerWidth
  const height = window.innerHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()

  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

handleResize()

window.addEventListener('resize', handleResize)
/* =========================================================
   QUARTA CENA — CONVERSÃO / FECHAMENTO
========================================================= */

const finalSceneStyleTag =
  document.createElement('style')

finalSceneStyleTag.textContent = `
  .final-scene {
    position: relative;

    min-height: 96svh;

    display: flex;
    align-items: center;

    overflow: hidden;

    margin-top: -1px;

    padding:
      120px
      0
      70px;

    background:
      radial-gradient(
        circle at 70% 40%,
        rgba(242, 138, 30, 0.12),
        transparent 34%
      ),
      linear-gradient(
        180deg,
        #1c120e 0%,
        #140d0a 38%,
        #0f0b09 100%
      );
  }

  .final-scene::before {
    content: '';

    position: absolute;

    inset: 0;

    pointer-events: none;

    background:
      radial-gradient(
        circle at 50% 120%,
        rgba(255, 106, 26, 0.12),
        transparent 42%
      );
  }

  .final-scene-inner {
    position: relative;

    z-index: 3;

    width: min(92%, 1320px);
    max-width: 1320px;
  }

  .final-scene-copy {
    position: relative;

    z-index: 4;

    max-width: 920px;
  }

  .final-scene h2 {
    margin:
      14px
      0
      30px;

    max-width: 900px;

    font-family:
      'Bebas Neue',
      sans-serif;

    font-size:
      clamp(
        5.6rem,
        11vw,
        11rem
      );

    font-weight: 400;

    line-height: 0.8;

    letter-spacing: -0.02em;

    text-transform: uppercase;

    color: var(--cream);
  }

  .final-scene h2 span {
    display: block;

    color: var(--orange);
  }

  .final-scene-description {
    max-width: 590px;

    margin-bottom: 38px;

    color:
      rgba(246, 235, 221, 0.7);

    font-size:
      clamp(
        0.95rem,
        1.4vw,
        1.08rem
      );

    line-height: 1.8;
  }

  .final-scene-actions {
    display: flex;
    flex-wrap: wrap;

    gap: 14px;

    margin-bottom: 52px;
  }

  .final-scene-actions .button {
    min-width: 180px;

    justify-content: center;
  }

  .final-scene-info {
    width: min(
      100%,
      740px
    );

    display: grid;

    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );

    border-top:
      1px solid
      rgba(246, 235, 221, 0.12);

    border-bottom:
      1px solid
      rgba(246, 235, 221, 0.12);
  }

  .final-info-item {
    padding:
      22px
      24px
      22px
      0;
  }

  .final-info-item +
  .final-info-item {
    padding-left: 28px;

    border-left:
      1px solid
      rgba(246, 235, 221, 0.12);
  }

  .final-info-label {
    display: block;

    margin-bottom: 8px;

    color: var(--orange);

    font-size: 0.65rem;

    font-weight: 700;

    letter-spacing: 0.18em;

    text-transform: uppercase;
  }

  .final-info-value {
    color: var(--cream);

    font-size: 0.92rem;

    line-height: 1.6;
  }

  .final-scene-word {
    position: absolute;

    z-index: 1;

    right: -2vw;
    bottom: -3vw;

    pointer-events: none;

    user-select: none;

    font-family:
      'Bebas Neue',
      sans-serif;

    font-size:
      clamp(
        13rem,
        29vw,
        34rem
      );

    line-height: 0.7;

    color: transparent;

    -webkit-text-stroke:
      1px
      rgba(246, 235, 221, 0.045);

    white-space: nowrap;
  }

  .final-orange-glow {
    position: absolute;

    z-index: 1;

    width: 480px;
    height: 480px;

    right: 4%;
    top: 20%;

    border-radius: 50%;

    pointer-events: none;

    background:
      rgba(242, 138, 30, 0.08);

    filter:
      blur(110px);
  }

  .final-footer {
    position: absolute;

    z-index: 4;

    left: 4%;
    right: 4%;
    bottom: 24px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 20px;

    color:
      rgba(246, 235, 221, 0.3);

    font-size: 0.62rem;

    letter-spacing: 0.12em;

    text-transform: uppercase;
  }
  /* ======================================================
     MARCA E INSTAGRAM — CENA FINAL
  ====================================================== */

  .final-brand {
    display: flex;
    align-items: center;
    gap: 16px;

    margin-bottom: 22px;
  }

  .final-brand-logo {
    width: 64px;
    height: 64px;

    object-fit: cover;

    border-radius: 14px;

    box-shadow:
      0 10px 30px rgba(0, 0, 0, 0.22);
  }

  .final-brand-meta {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .final-brand-hint {
    color: rgba(246, 235, 221, 0.5);

    font-size: 0.72rem;

    letter-spacing: 0.12em;

    text-transform: uppercase;
  }

  .final-social-inline {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .final-social-icon {
    width: 16px;
    height: 16px;

    color: var(--orange);

    flex-shrink: 0;
  }

  .final-info-value a {
    color: inherit;
    text-decoration: none;

    transition: color 0.25s ease;
  }

  .final-info-value a:hover {
    color: var(--orange);
  }

  @media (max-width: 799px) {

    .final-scene {
      min-height: 90svh;

      padding:
        90px
        0
        100px;
    }

    .final-scene h2 {
      font-size:
        clamp(
          4.6rem,
          20vw,
          7rem
        );
    }

    .final-scene-info {
      grid-template-columns: 1fr;
    }

    .final-info-item {
      padding:
        20px
        0;
    }

    .final-info-item +
    .final-info-item {
      padding-left: 0;

      border-left: 0;

      border-top:
        1px solid
        rgba(246, 235, 221, 0.12);
    }

    .final-scene-actions {
      flex-direction: column;

      align-items: stretch;
    }

    .final-scene-actions .button {
      width: 100%;
    }

    .final-scene-word {
      right: -15vw;
      bottom: 4%;
    }

    .final-footer {
      left: 5%;
      right: 5%;

      flex-direction: column;
      align-items: flex-start;

      gap: 6px;
    }
  }
`

document.head.appendChild(
  finalSceneStyleTag
)

const mainElement =
  document.querySelector('main')

mainElement.insertAdjacentHTML(
  'beforeend',
  `
    <section
      class="final-scene"
      id="pedido"
    >

      <div class="final-orange-glow"></div>

      <div class="container final-scene-inner">

        <div class="final-scene-copy">

         <div class="final-brand">

  <img
    class="final-brand-logo"
    src="./images/logo-mariba.jpg"
    alt="Logo Maribá Espetinhos"
  >

  <div class="final-brand-meta">

    <span class="eyebrow">
      MARIBÁ ESPETINHOS
    </span>

    <span class="final-brand-hint">
      Brasa · Chopp · Bons momentos
    </span>

  </div>

</div>

          <h2>
            A noite começa

            <span>
              aqui.
            </span>
          </h2>

          <p class="final-scene-description">
            Espetinhos na brasa, chopp gelado
            e bons momentos no centro de Aguaí.
            Conheça o Maribá e acompanhe as novidades
            pelo Instagram.
          </p>

          <div class="final-scene-actions">

            <a
              class="button button-primary"
              href="https://www.instagram.com/maribaespetinhos/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir Instagram
            </a>

            <a
              class="button button-secondary"
              href="https://www.google.com/maps/search/?api=1&query=Rua%20Vallins%2C%20417%20Centro%20Agua%C3%AD%20SP"
              target="_blank"
              rel="noopener noreferrer"
            >
              Como chegar
            </a>

          </div>

          <div class="final-scene-info">

            <div class="final-info-item">

              <span class="final-info-label">
                Endereço
              </span>

              <span class="final-info-value">
                Rua Vallins, 417 · Centro · Aguaí
              </span>

            </div>

            <div class="final-info-item">

              <span class="final-info-label">
                Instagram
              </span>

              <span class="final-info-value final-social-inline">

  <svg
    class="final-social-icon"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect
      x="3.25"
      y="3.25"
      width="17.5"
      height="17.5"
      rx="5"
      stroke="currentColor"
      stroke-width="1.8"
    />

    <circle
      cx="12"
      cy="12"
      r="4.2"
      stroke="currentColor"
      stroke-width="1.8"
    />

    <circle
      cx="17.4"
      cy="6.8"
      r="1.1"
      fill="currentColor"
    />
  </svg>

  <a
    href="https://www.instagram.com/maribaespetinhos/"
    target="_blank"
    rel="noopener noreferrer"
  >
    @maribaespetinhos
  </a>

</span>


            </div>

          </div>

        </div>

      </div>

      <div
        class="final-scene-word"
        aria-hidden="true"
      >
        MARIBÁ
      </div>

      <div class="final-footer">

        <span>
          Maribá Espetinhos · Aguaí — SP
        </span>

        <span>
          Brasa · Chopp · Bons momentos
        </span>

      </div>

    </section>
  `
)

/* =========================================================
   ANIMAÇÃO DA CENA FINAL
========================================================= */

gsap.from(
  '.final-scene-copy',
  {
    y: 80,
    opacity: 0,

    scrollTrigger: {
      trigger:
        '.final-scene',

      start:
        'top 78%',

      end:
        'top 42%',

      scrub:
        1,
    },
  }
)

gsap.fromTo(
  '.final-scene-word',
  {
    xPercent: 5,
  },
  {
    xPercent: -5,

    scrollTrigger: {
      trigger:
        '.final-scene',

      start:
        'top bottom',

      end:
        'bottom top',

      scrub:
        1.4,
    },
  }
)

/* =========================================================
   CHATBOT MARIBÁ — PRIMEIRA VERSÃO
   Interface + respostas locais + voz do navegador.
   Depois este bloco pode ser conectado à API da IA.
========================================================= */

const chatMarkup = `
  <button
    class="mariba-chat-launcher"
    id="mariba-chat-launcher"
    type="button"
    aria-label="Abrir assistente do Maribá"
    aria-expanded="false"
  >
    <img
      src="./images/logo-mariba.jpg"
      alt=""
      aria-hidden="true"
    >
  </button>

  <section
    class="mariba-chat-panel"
    id="mariba-chat-panel"
    aria-label="Assistente virtual do Maribá"
    aria-hidden="true"
  >
    <header class="mariba-chat-header">
      <img
        class="mariba-chat-header-logo"
        src="./images/logo-mariba.jpg"
        alt="Maribá Espetinhos"
      >

      <div class="mariba-chat-header-copy">
        <strong>Maribá Assistant</strong>
        <small>
          <span class="mariba-chat-status-dot"></span>
          Atendimento digital
        </small>
      </div>

      <button
        class="mariba-chat-close"
        id="mariba-chat-close"
        type="button"
        aria-label="Fechar assistente"
      >
        ×
      </button>
    </header>

    <div
      class="mariba-chat-body"
      id="mariba-chat-body"
      aria-live="polite"
    >
      <div class="mariba-chat-message is-bot">
        <div class="mariba-chat-bubble">
          Olá! 👋 Eu sou o assistente do Maribá. Posso ajudar com cardápio, sugestões e pedidos. Você também pode falar comigo pelo microfone.
        </div>
      </div>

      <div class="mariba-chat-quick-actions">
        <button class="mariba-chat-chip" type="button" data-chat-prompt="Quero ver o cardápio">
          🍢 Ver cardápio
        </button>

        <button class="mariba-chat-chip" type="button" data-chat-prompt="Me recomende algo">
          ✨ Me recomende algo
        </button>

        <button class="mariba-chat-chip" type="button" data-chat-prompt="Quero fazer um pedido">
          🛒 Fazer pedido
        </button>
      </div>
    </div>

    <form
      class="mariba-chat-composer"
      id="mariba-chat-form"
    >
      <div class="mariba-chat-input-wrap">
        <input
          class="mariba-chat-input"
          id="mariba-chat-input"
          type="text"
          placeholder="Digite sua mensagem..."
          autocomplete="off"
          aria-label="Mensagem para o assistente"
        >

        <button
          class="mariba-chat-icon-button mariba-chat-voice"
          id="mariba-chat-voice"
          type="button"
          aria-label="Falar com o assistente"
          title="Falar"
        >
          🎙️
        </button>

        <button
          class="mariba-chat-icon-button mariba-chat-send"
          type="submit"
          aria-label="Enviar mensagem"
          title="Enviar"
        >
          ➜
        </button>
      </div>

      <div class="mariba-chat-footer-row">
        <span>Modo demonstração • dados fictícios</span>

        <button
          class="mariba-chat-sound-toggle is-active"
          id="mariba-chat-sound-toggle"
          type="button"
          aria-pressed="true"
        >
          🔊 voz ativa
        </button>
      </div>
    </form>
  </section>
`

document.body.insertAdjacentHTML('beforeend', chatMarkup)

const chatLauncher = document.querySelector('#mariba-chat-launcher')
const chatPanel = document.querySelector('#mariba-chat-panel')
const chatClose = document.querySelector('#mariba-chat-close')
const chatBody = document.querySelector('#mariba-chat-body')
const chatForm = document.querySelector('#mariba-chat-form')
const chatInput = document.querySelector('#mariba-chat-input')
const chatVoice = document.querySelector('#mariba-chat-voice')
const chatSoundToggle = document.querySelector('#mariba-chat-sound-toggle')
const chatChips = document.querySelectorAll('[data-chat-prompt]')

let chatIsOpen = false
let chatSoundEnabled = true
let chatRecognition = null
let chatIsListening = false
let chatPreviousResponseId = null

function setChatOpen(nextState) {
  chatIsOpen = nextState

  chatPanel.classList.toggle('is-open', chatIsOpen)
  chatLauncher.classList.toggle('is-open', chatIsOpen)

  chatLauncher.setAttribute('aria-expanded', String(chatIsOpen))
  chatPanel.setAttribute('aria-hidden', String(!chatIsOpen))

  if (chatIsOpen) {
    setTimeout(() => chatInput.focus(), 120)
  }
}

chatLauncher.addEventListener('click', () => {
  setChatOpen(!chatIsOpen)
})

chatClose.addEventListener('click', () => {
  setChatOpen(false)
})

function scrollChatToBottom() {
  chatBody.scrollTop = chatBody.scrollHeight
}

function appendChatMessage(text, sender = 'bot') {
  const wrapper = document.createElement('div')
  wrapper.className = `mariba-chat-message ${sender === 'user' ? 'is-user' : 'is-bot'}`

  const bubble = document.createElement('div')
  bubble.className = 'mariba-chat-bubble'
  bubble.textContent = text

  wrapper.appendChild(bubble)
  chatBody.appendChild(wrapper)

  scrollChatToBottom()

  if (sender === 'bot' && chatSoundEnabled) {
    speakChatResponse(text)
  }
}

function detectChatLanguage(text) {
  const value = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  // Português do Brasil é sempre o idioma principal.
  // Só trocamos de idioma quando houver sinais claros
  // de inglês ou espanhol na mensagem do usuário.

  const spanishHints = [
    'hola',
    'quiero',
    'quisiera',
    'gracias',
    'por favor',
    'recomienda',
    'recomiendame',
    'donde',
    'cuanto',
    'bebida',
    'comida',
    'hacer un pedido',
    'quiero pedir'
  ]

  const englishHints = [
    'hello',
    'hi',
    'hey',
    'i want',
    'i would like',
    'please',
    'thank you',
    'thanks',
    'recommend',
    'where',
    'how much',
    'food',
    'drink',
    'place an order',
    'make an order'
  ]

  const portugueseHints = [
    'ola',
    'oi',
    'quero',
    'gostaria',
    'obrigado',
    'obrigada',
    'por favor',
    'recomenda',
    'recomende',
    'onde',
    'quanto',
    'cardapio',
    'pedido',
    'pedir',
    'comida',
    'bebida'
  ]

  const ptScore = portugueseHints.filter((word) => value.includes(word)).length
  const esScore = spanishHints.filter((word) => value.includes(word)).length
  const enScore = englishHints.filter((word) => value.includes(word)).length

  if (enScore >= 1 && enScore > ptScore && enScore > esScore) {
    return 'en'
  }

  if (esScore >= 1 && esScore > ptScore && esScore > enScore) {
    return 'es'
  }

  return 'pt'
}
const demoCatalog = [
  { id: 'carne', name: 'Espetinho de carne', price: 14.9, aliases: ['carne', 'espetinho de carne'] },
  { id: 'frango', name: 'Espetinho de frango', price: 12.9, aliases: ['frango', 'espetinho de frango'] },
  { id: 'linguica', name: 'Espetinho de linguiça', price: 11.9, aliases: ['linguica', 'espetinho de linguica'] },
  { id: 'coracao', name: 'Espetinho de coração', price: 13.9, aliases: ['coracao', 'espetinho de coracao'] },
  { id: 'kafta', name: 'Kafta', price: 14.9, aliases: ['kafta'] },
  { id: 'queijo', name: 'Queijo coalho', price: 13.9, aliases: ['queijo coalho', 'queijo'] },
  { id: 'pao-alho', name: 'Pão de alho', price: 9.9, aliases: ['pao de alho'] },
  { id: 'mandioca', name: 'Mandioca', price: 12, aliases: ['mandioca'] },
  { id: 'vinagrete', name: 'Vinagrete', price: 6, aliases: ['vinagrete'] },
  { id: 'farofa', name: 'Farofa', price: 5, aliases: ['farofa'] },
  { id: 'chopp-300', name: 'Chopp 300 ml', price: 8.9, aliases: ['chopp de 300 ml', 'chopp 300 ml', 'chopp de 300', 'chopp 300', 'chopp pequeno'] },
  { id: 'chopp-500', name: 'Chopp 500 ml', price: 12.9, aliases: ['chopp de 500 ml', 'chopp 500 ml', 'chopp de 500', 'chopp 500', 'chopp grande'] },
  { id: 'refrigerante', name: 'Refrigerante lata', price: 6, aliases: ['refrigerante', 'refri'] },
  { id: 'agua', name: 'Água 500 ml', price: 4, aliases: ['agua', 'agua 500', 'agua 500 ml'] },
]

const demoOrder = {
  active: false,
  finalized: false,
  items: {},
  service: null,
  checkoutStep: null,
  customer: {
    name: '',
    address: '',
    payment: '',
  },
}

function normalizeChatText(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function formatBRL(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

function getOrderSubtotal() {
  return Object.values(demoOrder.items).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
}

function getDeliveryFee() {
  if (demoOrder.service !== 'delivery') return 0
  return getOrderSubtotal() >= 80 ? 0 : 6
}

function getOrderTotal() {
  return getOrderSubtotal() + getDeliveryFee()
}

function resetDemoOrder() {
  demoOrder.active = false
  demoOrder.finalized = false
  demoOrder.items = {}
  demoOrder.service = null
  demoOrder.checkoutStep = null
  demoOrder.customer = {
    name: '',
    address: '',
    payment: '',
  }
}

function addDemoOrderItem(product, quantity) {
  if (!Number.isFinite(quantity) || quantity <= 0) return

  demoOrder.finalized = false

  if (!demoOrder.items[product.id]) {
    demoOrder.items[product.id] = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 0,
    }
  }

  demoOrder.items[product.id].quantity += quantity
}

function removeDemoOrderItem(product, quantity = null) {
  demoOrder.finalized = false

  const current = demoOrder.items[product.id]
  if (!current) return false

  if (quantity === null || quantity >= current.quantity) {
    delete demoOrder.items[product.id]
    return true
  }

  current.quantity -= quantity
  return true
}

function setDemoOrderItemQuantity(product, quantity) {
  if (!Number.isFinite(quantity) || quantity < 0) return false

  demoOrder.finalized = false

  if (quantity === 0) {
    delete demoOrder.items[product.id]
    return true
  }

  demoOrder.items[product.id] = {
    id: product.id,
    name: product.name,
    price: product.price,
    quantity,
  }

  return true
}

function findProductInMessage(message) {
  const text = normalizeChatText(message)

  for (const product of demoCatalog) {
    const sortedAliases = [...product.aliases].sort((a, b) => b.length - a.length)
    const alias = sortedAliases.find((candidate) => text.includes(candidate))

    if (alias) {
      return { product, alias }
    }
  }

  return null
}

function getRequestedNewQuantity(message, alias) {
  const text = normalizeChatText(message)
  const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  const patterns = [
    new RegExp(`(?:alterar|mudar|ajustar|trocar)\\s+(?:a\\s+quantidade\\s+(?:de\\s+)?)?${escaped}\\s+(?:para|pra|por)\\s+(\\d+)`),
    new RegExp(`(?:alterar|mudar|ajustar|trocar)\\s+(?:a\\s+quantidade\\s+)?(?:para|pra)\\s+(\\d+)\\s+(?:de\\s+)?${escaped}`),
    new RegExp(`(?:deixa|deixar|deixe)\\s+(?:o\\s+pedido\\s+com\\s+)?(\\d+)\\s+(?:x\\s+)?${escaped}`),
    new RegExp(`(?:ficar|fica|fique)\\s+com\\s+(\\d+)\\s+(?:x\\s+)?${escaped}`),
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match) return Number(match[1])
  }

  return null
}

function findQuantityForAlias(text, alias) {
  const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const before = new RegExp(`(\\d+)\\s*(?:x|unidades?|unidade|de)?\\s*${escaped}(?!\\w)`)
  const after = new RegExp(`${escaped}(?!\\w)\\s*(?:x|unidades?|unidade)?\\s*(\\d+)`)
  const beforeMatch = text.match(before)
  const afterMatch = text.match(after)

  if (beforeMatch) return Number(beforeMatch[1])
  if (afterMatch) return Number(afterMatch[1])
  return 1
}

function extractDemoItems(message) {
  const text = normalizeChatText(message)
  const matches = []

  for (const product of demoCatalog) {
    const sortedAliases = [...product.aliases].sort((a, b) => b.length - a.length)
    const alias = sortedAliases.find((candidate) => text.includes(candidate))

    if (!alias) continue

    matches.push({
      product,
      quantity: findQuantityForAlias(text, alias),
    })
  }

  return matches
}

function buildOrderSummary({ includeService = true } = {}) {
  const items = Object.values(demoOrder.items)

  if (!items.length) {
    return 'Seu pedido demonstrativo ainda está vazio.'
  }

  const lines = items.map((item) => {
    const subtotal = item.price * item.quantity
    return `${item.quantity}x ${item.name} — ${formatBRL(subtotal)}`
  })

  const subtotal = getOrderSubtotal()
  const details = [`Pedido demonstrativo:\n\n${lines.join('\n')}`, `\nSubtotal: ${formatBRL(subtotal)}`]

  if (includeService && demoOrder.service === 'delivery') {
    const fee = getDeliveryFee()
    details.push(fee === 0 ? '\nEntrega: grátis' : `\nEntrega: ${formatBRL(fee)}`)
    details.push(`\nTotal: ${formatBRL(getOrderTotal())}`)
  } else if (includeService && demoOrder.service === 'pickup') {
    details.push('\nRetirada no local')
    details.push(`\nTotal: ${formatBRL(getOrderTotal())}`)
  } else {
    details.push(`\nTotal dos itens: ${formatBRL(subtotal)}`)
  }

  return details.join('')
}

function shouldHandleLocally(message) {
  const text = normalizeChatText(message)
  const hasCatalogItem = demoCatalog.some((product) =>
    product.aliases.some((alias) => text.includes(alias))
  )

  return (
    demoOrder.active ||
    hasCatalogItem ||
    text.includes('pedido') ||
    text.includes('pedir') ||
    text.includes('carrinho') ||
    text.includes('quanto fica') ||
    text.includes('quanto da') ||
    text.includes('total') ||
    text.includes('calcula') ||
    text.includes('calcule') ||
    text.includes('retirada') ||
    text.includes('retirar') ||
    text.includes('delivery') ||
    text.includes('entrega') ||
    text.includes('remover') ||
    text.includes('tirar') ||
    text.includes('cancelar pedido') ||
    text.includes('limpar pedido') ||
    text.includes('alterar') ||
    text.includes('mudar') ||
    text.includes('ajustar') ||
    text.includes('trocar') ||
    text.includes('finalizar') ||
    text.includes('concluir pedido') ||
    text.includes('fechar pedido')
  )
}

function getPaymentLabel(text) {
  if (text.includes('pix')) return 'Pix'
  if (text.includes('dinheiro')) return 'Dinheiro'
  if (text.includes('debito') || text.includes('cartao de debito')) return 'Cartão de débito'
  if (text.includes('credito') || text.includes('cartao de credito')) return 'Cartão de crédito'
  return null
}

function buildCheckoutSummary() {
  const serviceLabel = demoOrder.service === 'delivery' ? 'Entrega' : 'Retirada no local'
  const customerLines = [
    `Nome: ${demoOrder.customer.name || 'não informado'}`,
    `Atendimento: ${serviceLabel}`,
  ]

  if (demoOrder.service === 'delivery') {
    customerLines.push(`Endereço: ${demoOrder.customer.address || 'não informado'}`)
  }

  customerLines.push(`Pagamento: ${demoOrder.customer.payment || 'não informado'}`)

  return `${buildOrderSummary()}\n\n${customerLines.join('\n')}`
}

function beginDemoCheckout() {
  demoOrder.active = true
  demoOrder.finalized = false
  demoOrder.checkoutStep = 'name'
  demoOrder.customer.name = ''
  demoOrder.customer.address = ''
  demoOrder.customer.payment = ''

  return `${buildOrderSummary()}\n\nPerfeito! Vamos concluir a simulação. Qual é o seu nome?`
}

function handleDemoOrderConversation(message) {
  const text = normalizeChatText(message)
  const cleanMessage = String(message || '').trim()

  if (
    text.includes('cancelar pedido') ||
    text.includes('limpar pedido') ||
    text.includes('zerar pedido') ||
    text.includes('recomecar pedido') ||
    text.includes('recomecar o pedido')
  ) {
    resetDemoOrder()
    return 'Pedido demonstrativo limpo. Quando quiser começar de novo, é só dizer “quero fazer um pedido”.'
  }

  // =========================================================
  // CHECKOUT CONVERSACIONAL
  // =========================================================

  if (demoOrder.checkoutStep === 'name') {
    if (cleanMessage.length < 2) {
      return 'Não consegui identificar o nome. Pode me dizer seu nome, por favor?'
    }

    demoOrder.customer.name = cleanMessage

    if (demoOrder.service === 'delivery') {
      demoOrder.checkoutStep = 'address'
      return `Prazer, ${demoOrder.customer.name} 😊 Qual é o endereço para a entrega?\n\nComo estamos em modo demonstração, use um endereço fictício para este teste.`
    }

    demoOrder.checkoutStep = 'payment'
    return `Prazer, ${demoOrder.customer.name} 😊 Como deseja pagar?\n\nPode escolher: Pix, dinheiro, cartão de débito ou cartão de crédito.`
  }

  if (demoOrder.checkoutStep === 'address') {
    if (cleanMessage.length < 5) {
      return 'Preciso de um endereço um pouco mais completo para a simulação. Por exemplo: “Rua Exemplo, 123”.'
    }

    demoOrder.customer.address = cleanMessage
    demoOrder.checkoutStep = 'payment'

    return 'Endereço anotado. Como deseja pagar?\n\nPode escolher: Pix, dinheiro, cartão de débito ou cartão de crédito.'
  }

  if (demoOrder.checkoutStep === 'payment') {
    const payment = getPaymentLabel(text)

    if (!payment) {
      return 'Para esta demonstração, escolha uma destas formas de pagamento: Pix, dinheiro, cartão de débito ou cartão de crédito.'
    }

    demoOrder.customer.payment = payment
    demoOrder.checkoutStep = 'confirm'

    return `Confira a simulação antes de concluir:\n\n${buildCheckoutSummary()}\n\nSe estiver tudo certo, diga “confirmar”. Se quiser voltar ao carrinho, diga “alterar pedido”.\n\nNenhum pedido real será enviado.`
  }

  if (demoOrder.checkoutStep === 'confirm') {
    if (
      text.includes('alterar pedido') ||
      text.includes('voltar ao carrinho') ||
      text.includes('mudar pedido')
    ) {
      demoOrder.checkoutStep = null
      demoOrder.active = true
      return `${buildOrderSummary()}\n\nVoltamos ao carrinho. Você pode adicionar, remover ou alterar itens. Quando terminar, diga “finalizar pedido”.`
    }

    if (
      text === 'confirmar' ||
      text.includes('confirmar pedido') ||
      text.includes('confirmo') ||
      text.includes('pode confirmar')
    ) {
      demoOrder.checkoutStep = null
      demoOrder.active = false
      demoOrder.finalized = true

      return `${buildCheckoutSummary()}\n\n✅ Simulação finalizada. Nenhum pedido foi enviado, pago ou confirmado de verdade.\n\nPara começar outra simulação, diga “quero fazer um pedido”.`
    }

    return 'Para concluir esta simulação, diga “confirmar”. Se quiser mexer nos itens, diga “alterar pedido”.'
  }

  if (
    text.includes('quero fazer um pedido') ||
    text === 'fazer pedido' ||
    text === 'pedido'
  ) {
    if (demoOrder.finalized) {
      resetDemoOrder()
    }

    demoOrder.active = true

    if (Object.keys(demoOrder.items).length) {
      return `${buildOrderSummary({ includeService: false })}\n\nSeu carrinho já tem esses itens. Você pode adicionar mais, remover algum item, alterar quantidades ou escolher entrega/retirada.`
    }

    return 'Claro! 🛒 Vamos montar uma simulação. Me diga os itens e as quantidades. Exemplo: “2 carne e 2 frango”.'
  }

  const wantsQuantityChange =
    text.includes('alterar') ||
    text.includes('mudar') ||
    text.includes('ajustar') ||
    text.includes('trocar') ||
    text.includes('deixa ') ||
    text.includes('deixar ') ||
    text.includes('deixe ') ||
    text.includes('ficar com') ||
    text.includes('fica com')

  if (wantsQuantityChange) {
    const found = findProductInMessage(message)

    if (!found) {
      return 'Diga qual item você quer alterar. Exemplo: “mudar frango para 3”.'
    }

    const { product, alias } = found
    const newQuantity = getRequestedNewQuantity(message, alias)

    if (newQuantity === null) {
      return `Entendi que você quer alterar ${product.name}. Diga a nova quantidade, por exemplo: “mudar ${alias} para 3”.`
    }

    demoOrder.checkoutStep = null

    if (!demoOrder.items[product.id] && newQuantity > 0) {
      setDemoOrderItemQuantity(product, newQuantity)
      demoOrder.active = true

      return `Certo. Adicionei ${newQuantity}x ${product.name} ao pedido.\n\n${buildOrderSummary({ includeService: false })}\n\nQuer alterar mais alguma coisa ou escolher entrega/retirada?`
    }

    setDemoOrderItemQuantity(product, newQuantity)
    demoOrder.active = true

    if (newQuantity === 0) {
      if (!Object.keys(demoOrder.items).length) {
        return `Removi ${product.name}. Seu pedido demonstrativo ficou vazio.`
      }

      return `Removi ${product.name}.\n\n${buildOrderSummary({ includeService: false })}\n\nQuer ajustar mais alguma coisa?`
    }

    return `Quantidade atualizada: ${newQuantity}x ${product.name}.\n\n${buildOrderSummary({ includeService: false })}\n\nQuer ajustar mais alguma coisa ou escolher entrega/retirada?`
  }

  const extractedItems = extractDemoItems(message)
  const isRemoval = text.includes('remov') || text.includes('tira') || text.includes('retira do pedido')

  if (extractedItems.length) {
    demoOrder.active = true
    demoOrder.finalized = false
    demoOrder.checkoutStep = null

    if (isRemoval) {
      const removed = []

      for (const { product, quantity } of extractedItems) {
        if (removeDemoOrderItem(product, quantity)) {
          removed.push(product.name)
        }
      }

      if (!removed.length) {
        return 'Não encontrei esse item no seu pedido demonstrativo.'
      }

      if (!Object.keys(demoOrder.items).length) {
        return `Removi ${removed.join(', ')}. Seu pedido demonstrativo ficou vazio.`
      }

      return `Pronto, ajustei o pedido.\n\n${buildOrderSummary({ includeService: false })}\n\nQuer adicionar mais alguma coisa, alterar quantidades ou escolher entrega/retirada?`
    }

    for (const { product, quantity } of extractedItems) {
      addDemoOrderItem(product, quantity)
    }

    return `${buildOrderSummary({ includeService: false })}\n\nQuer adicionar mais alguma coisa? Você também pode dizer “mudar carne para 3”. Se estiver tudo certo, diga “entrega” ou “retirada”.`
  }

  if (text.includes('entrega') || text.includes('delivery')) {
    demoOrder.active = true
    demoOrder.finalized = false
    demoOrder.checkoutStep = null

    if (!Object.keys(demoOrder.items).length) {
      return 'Fazemos entrega no modo demonstração, mas seu pedido ainda está vazio. Me diga primeiro o que você quer pedir.'
    }

    demoOrder.service = 'delivery'
    const fee = getDeliveryFee()

    return `${buildOrderSummary()}\n\n${fee === 0 ? 'Como o subtotal passou de R$ 80,00, a entrega ficou grátis.' : 'A taxa demonstrativa de entrega é R$ 6,00.'}\nPrazo fictício: 35 a 55 minutos. Se estiver tudo certo, diga “finalizar pedido”.`
  }

  if (
    text.includes('retirada') ||
    text.includes('retirar') ||
    text.includes('buscar') ||
    text.includes('balcao')
  ) {
    demoOrder.active = true
    demoOrder.finalized = false
    demoOrder.checkoutStep = null

    if (!Object.keys(demoOrder.items).length) {
      return 'A retirada no local está disponível no modo demonstração, mas seu pedido ainda está vazio. Me diga primeiro o que você quer pedir.'
    }

    demoOrder.service = 'pickup'
    return `${buildOrderSummary()}\n\nPrazo fictício para retirada: 20 a 30 minutos. Se estiver tudo certo, diga “finalizar pedido”.`
  }

  if (
    text.includes('finalizar pedido') ||
    text.includes('finaliza pedido') ||
    text.includes('concluir pedido') ||
    text.includes('fechar pedido') ||
    text === 'finalizar'
  ) {
    if (!Object.keys(demoOrder.items).length) {
      return 'Seu pedido demonstrativo está vazio. Adicione alguns itens antes de finalizar.'
    }

    if (!demoOrder.service) {
      demoOrder.active = true
      return `${buildOrderSummary({ includeService: false })}\n\nAntes de continuar, escolha “entrega” ou “retirada”.`
    }

    return beginDemoCheckout()
  }

  if (
    text.includes('total') ||
    text.includes('quanto fica') ||
    text.includes('quanto da') ||
    text.includes('calcula') ||
    text.includes('calcule') ||
    text.includes('resumo') ||
    text.includes('carrinho') ||
    text.includes('ver pedido')
  ) {
    return `${buildOrderSummary()}\n\nOs valores são fictícios e usados apenas no modo demonstração.`
  }

  if (demoOrder.active) {
    return 'Seu pedido demonstrativo continua aberto. Você pode adicionar itens, dizer “remover 1 frango”, “mudar carne para 3”, “ver carrinho”, “entrega”, “retirada”, “finalizar pedido” ou “limpar pedido”.'
  }

  if (demoOrder.finalized) {
    return 'A última simulação já foi finalizada. Nenhum pedido real foi enviado. Para montar outro pedido, diga “quero fazer um pedido”.'
  }

  return null
}

function createLocalChatResponse(message) {
  const text = normalizeChatText(message)
  const language = detectChatLanguage(message)

  if (language === 'en') {
    if (text.includes('menu')) {
      return 'Sure! In demo mode we have beef, chicken, sausage, chicken heart, kafta and grilled cheese skewers, plus sides, soft drinks and draft beer. These are fictional demonstration data.'
    }
    if (text.includes('recommend')) {
      return 'For two people, I’d suggest our demo Couple Combo: 4 skewers of your choice, cassava and two 300 ml draft beers for R$ 69.90. The price and items are fictional demo data.'
    }
    if (text.includes('hour') || text.includes('open')) {
      return 'Demo opening hours: Tuesday to Thursday from 6 PM to 11 PM, Friday and Saturday from 6 PM to midnight, Sunday from 6 PM to 11 PM, and Monday closed.'
    }
    return 'Sure! I can help with our demo menu, prices, opening hours, delivery, payment methods and recommendations.'
  }

  if (language === 'es') {
    if (text.includes('menu')) {
      return '¡Claro! En el modo demostración tenemos espetinhos de carne, pollo, linguiça, corazón, kafta y queso coalho, además de acompañamientos, bebidas y chopp. Los datos son ficticios.'
    }
    if (text.includes('recom')) {
      return 'Para dos personas, te recomendaría el Combo Casal de demostración: 4 espetinhos a elección, mandioca y 2 chopps de 300 ml por R$ 69,90. Son datos ficticios.'
    }
    return '¡Claro! Puedo ayudarte con el menú de demostración, precios, horarios, entrega, formas de pago y recomendaciones.'
  }

  const orderResponse = handleDemoOrderConversation(message)
  if (orderResponse) return orderResponse

  if (
    text === 'oi' ||
    text === 'ola' ||
    text.includes('bom dia') ||
    text.includes('boa tarde') ||
    text.includes('boa noite')
  ) {
    return 'Oi! 😊 Seja bem-vindo ao Maribá. Estou funcionando em modo demonstração com dados fictícios. Posso te mostrar o cardápio, recomendar algo, informar horários ou ajudar a montar um pedido.'
  }

  if (
    text.includes('oficial') ||
    text.includes('dados reais') ||
    text.includes('informacoes reais') ||
    text.includes('preco real') ||
    text.includes('precos reais')
  ) {
    return 'Neste momento estou em modo demonstração. Cardápio, preços, horários, entrega e demais informações usadas no atendimento são fictícios e servem apenas para testar o projeto.'
  }

  if (
    text.includes('duas pessoas') ||
    text.includes('2 pessoas') ||
    text.includes('casal') ||
    ((text.includes('recom') || text.includes('sugest')) && text.includes('dois'))
  ) {
    return 'Para duas pessoas, eu iria de Combo Casal 😊 Ele vem com 4 espetinhos à escolha, mandioca e 2 chopps de 300 ml por R$ 69,90. É uma combinação fictícia criada para a demonstração.'
  }

  if (
    text.includes('recom') ||
    text.includes('sugest') ||
    text.includes('o que comer') ||
    text.includes('o que pedir')
  ) {
    return 'Se quiser uma sugestão bem completa, temos o Combo Casal por R$ 69,90 e o Combo Amigos por R$ 109,90. Se me disser quantas pessoas vão comer e do que vocês gostam, eu consigo sugerir melhor.'
  }

  if (text.includes('combo')) {
    return 'Temos dois combos fictícios no modo demonstração:\n\n• Combo Casal — R$ 69,90: 4 espetinhos à escolha + mandioca + 2 chopps de 300 ml.\n• Combo Amigos — R$ 109,90: 8 espetinhos + mandioca + farofa + vinagrete.'
  }

  if (
    text.includes('horario') ||
    text.includes('abre') ||
    text.includes('aberto') ||
    text.includes('fecha') ||
    text.includes('funcionamento')
  ) {
    return 'No modo demonstração, o horário é:\n\n• Segunda: fechado\n• Terça a quinta: 18h às 23h\n• Sexta e sábado: 18h à meia-noite\n• Domingo: 18h às 23h\n\nEsses horários são fictícios para teste.'
  }

  if (
    text.includes('pagamento') ||
    text.includes('pagar') ||
    text.includes('pix') ||
    text.includes('cartao') ||
    text.includes('dinheiro')
  ) {
    return 'No modo demonstração aceitamos Pix, dinheiro, cartão de débito e cartão de crédito.'
  }

  if (
    text.includes('endereco') ||
    text.includes('onde fica') ||
    text.includes('localizacao')
  ) {
    return 'O endereço usado nesta demonstração é Rua Vallins, 417, Centro, Aguaí. Antes da publicação definitiva, confirmaremos os dados oficiais do estabelecimento.'
  }

  if (
    text.includes('alerg') ||
    text.includes('gluten') ||
    text.includes('lactose') ||
    text.includes('leite')
  ) {
    return 'No cadastro demonstrativo, queijo coalho contém leite; pão de alho contém glúten e leite; e o chopp está marcado com glúten. Para qualquer alergia ou restrição alimentar, a confirmação direta com o estabelecimento continua sendo recomendada.'
  }

  if (
    text.includes('cardapio') ||
    text.includes('menu') ||
    text.includes('espetinho') ||
    text.includes('espetinhos')
  ) {
    return 'No cardápio demonstrativo temos:\n\n🥩 Carne — R$ 14,90\n🍗 Frango — R$ 12,90\n🌭 Linguiça — R$ 11,90\n❤️ Coração — R$ 13,90\n🔥 Kafta — R$ 14,90\n🧀 Queijo coalho — R$ 13,90\n🥖 Pão de alho — R$ 9,90\n\nTambém temos acompanhamentos, bebidas e combos. Todos os preços são fictícios para demonstração.'
  }

  if (
    text.includes('chopp') ||
    text.includes('bebida') ||
    text.includes('refrigerante') ||
    text.includes('agua')
  ) {
    return 'Nas bebidas do modo demonstração temos chopp de 300 ml por R$ 8,90, chopp de 500 ml por R$ 12,90, refrigerante em lata por R$ 6,00 e água de 500 ml por R$ 4,00.'
  }

  if (
    text.includes('mandioca') ||
    text.includes('farofa') ||
    text.includes('vinagrete') ||
    text.includes('acompanhamento')
  ) {
    return 'Os acompanhamentos demonstrativos são: mandioca por R$ 12,00, vinagrete por R$ 6,00 e farofa por R$ 5,00.'
  }

  return 'Posso te ajudar com o cardápio, preços, combos, horários, entrega, pagamento, endereço ou montar uma simulação de pedido. 😊 O que você gostaria de saber?'
}

function getBestChatVoice(language = 'pt') {
  if (!('speechSynthesis' in window)) {
    return null
  }

  const voices = window.speechSynthesis.getVoices()

  if (!voices.length) {
    return null
  }

  const preferredLanguages =
    language === 'en'
      ? ['en-US', 'en-GB']
      : language === 'es'
        ? ['es-ES', 'es-MX', 'es-US']
        : ['pt-BR', 'pt-PT']

  const preferredNames =
    language === 'pt'
      ? ['francisca', 'antônio', 'antonio', 'luciana', 'felipe', 'google português', 'microsoft']
      : language === 'es'
        ? ['helena', 'elvira', 'jorge', 'google español', 'microsoft']
        : ['aria', 'jenny', 'guy', 'google us english', 'microsoft']

  const languageMatches = voices.filter((voice) =>
    preferredLanguages.some((lang) =>
      voice.lang.toLowerCase().startsWith(lang.toLowerCase())
    )
  )

  const namedVoice = languageMatches.find((voice) =>
    preferredNames.some((name) =>
      voice.name.toLowerCase().includes(name)
    )
  )

  return namedVoice || languageMatches[0] || voices[0]
}

function speakChatResponse(text) {
  if (!('speechSynthesis' in window)) {
    return
  }

  const language = detectChatLanguage(text)
  const utterance = new SpeechSynthesisUtterance(text)

  utterance.lang =
    language === 'en'
      ? 'en-US'
      : language === 'es'
        ? 'es-ES'
        : 'pt-BR'

  const selectedVoice = getBestChatVoice(language)

  if (selectedVoice) {
    utterance.voice = selectedVoice
  }

  // Um pouco mais lento e menos agudo deixa a fala menos "sintética".
  utterance.rate =
    language === 'pt'
      ? 0.94
      : 0.96

  utterance.pitch = 0.98
  utterance.volume = 1

  window.speechSynthesis.cancel()

  window.setTimeout(() => {
    window.speechSynthesis.speak(utterance)
  }, 80)
}

function showChatTyping() {
  const wrapper = document.createElement('div')
  wrapper.className = 'mariba-chat-message is-bot'
  wrapper.dataset.typing = 'true'

  const bubble = document.createElement('div')
  bubble.className = 'mariba-chat-bubble'
  bubble.textContent = 'Só um instante…'

  wrapper.appendChild(bubble)
  chatBody.appendChild(wrapper)
  scrollChatToBottom()

  return wrapper
}

async function getAIChatResponse(message) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      previousResponseId: chatPreviousResponseId,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Não foi possível consultar a IA.')
  }

  if (data.responseId) {
    chatPreviousResponseId = data.responseId
  }

  return data.message
}

async function sendChatMessage(message) {
  const cleanMessage = message.trim()

  if (!cleanMessage) {
    return
  }

  appendChatMessage(cleanMessage, 'user')
  chatInput.value = ''

  const typingMessage = showChatTyping()

  // Pedidos, carrinho, totais e entrega ficam sob controle do próprio site.
  // Assim, preços e cálculos não dependem da IA e continuam corretos
  // mesmo quando a API estiver disponível novamente.
  if (shouldHandleLocally(cleanMessage)) {
    window.setTimeout(() => {
      typingMessage.remove()
      appendChatMessage(createLocalChatResponse(cleanMessage), 'bot')
    }, 350)
    return
  }

  try {
    const responseText = await getAIChatResponse(cleanMessage)
    typingMessage.remove()
    appendChatMessage(responseText, 'bot')
  } catch (error) {
    console.warn('IA indisponível; usando resposta local de segurança.', error)

    window.setTimeout(() => {
      typingMessage.remove()
      appendChatMessage(createLocalChatResponse(cleanMessage), 'bot')
    }, 500)
  }
}

chatForm.addEventListener('submit', (event) => {
  event.preventDefault()
  sendChatMessage(chatInput.value)
})

chatChips.forEach((chip) => {
  chip.addEventListener('click', () => {
    setChatOpen(true)
    sendChatMessage(chip.dataset.chatPrompt)
  })
})

chatSoundToggle.addEventListener('click', () => {
  chatSoundEnabled = !chatSoundEnabled

  chatSoundToggle.classList.toggle('is-active', chatSoundEnabled)
  chatSoundToggle.setAttribute('aria-pressed', String(chatSoundEnabled))
  chatSoundToggle.textContent =
    chatSoundEnabled
      ? '🔊 voz ativa'
      : '🔇 voz desativada'

  if (!chatSoundEnabled && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
})

const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition

if (SpeechRecognition) {
  chatRecognition = new SpeechRecognition()

  chatRecognition.continuous = false
  chatRecognition.interimResults = false
  chatRecognition.lang = 'pt-BR'

  chatRecognition.addEventListener('start', () => {
    chatIsListening = true
    chatVoice.classList.add('is-listening')
    chatVoice.textContent = '●'
    chatVoice.setAttribute('aria-label', 'Ouvindo...')
  })

  chatRecognition.addEventListener('result', (event) => {
    const transcript = event.results[0][0].transcript
    chatInput.value = transcript
    sendChatMessage(transcript)
  })

  chatRecognition.addEventListener('end', () => {
    chatIsListening = false
    chatVoice.classList.remove('is-listening')
    chatVoice.textContent = '🎙️'
    chatVoice.setAttribute('aria-label', 'Falar com o assistente')
  })

  chatRecognition.addEventListener('error', () => {
    chatIsListening = false
    chatVoice.classList.remove('is-listening')
    chatVoice.textContent = '🎙️'

    appendChatMessage(
      'Não consegui acessar o microfone. Verifique a permissão do navegador e tente novamente.',
      'bot'
    )
  })
} else {
  chatVoice.title = 'Reconhecimento de voz não disponível neste navegador'
}

chatVoice.addEventListener('click', () => {
  if (!chatRecognition) {
    appendChatMessage(
      'O reconhecimento de voz não está disponível neste navegador. Você ainda pode digitar normalmente.',
      'bot'
    )

    return
  }

  if (chatIsListening) {
    chatRecognition.stop()
    return
  }

  chatRecognition.start()
})
