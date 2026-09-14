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