import './style.css'

import * as THREE from 'three'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* =========================================================
   HTML
========================================================= */

document.querySelector('#app').innerHTML = `
  <div class="experience">

    <header class="site-header">

      <div class="container header-content">

        <div class="brand">

          <img
            src="/images/logo-mariba.jpg"
            alt="Maribá Espetinhos"
            style="
              width: 64px;
              height: 64px;
              object-fit: contain;
              display: block;
            "
          >

        </div>

        <nav
          class="desktop-nav"
          aria-label="Navegação principal"
        >
          <a href="#cardapio">
            Cardápio
          </a>

          <a href="#experiencia">
            Experiência
          </a>

          <a href="#localizacao">
            Localização
          </a>
        </nav>

        <a
          href="#pedido"
          class="header-cta"
        >
          Fazer pedido
        </a>

      </div>

    </header>

    <main>

      <section class="hero">

        <canvas
          id="webgl"
          aria-hidden="true"
        ></canvas>

        <div class="hero-glow"></div>

        <!-- FOTO REAL -->

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

              transform-origin:
                55% 50%;

              will-change:
                transform,
                opacity;

              filter:
                saturate(1.06)
                contrast(1.05)
                brightness(0.9);
            "
          >

            <img
              src="/images/espeto-real.jpg"
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

        <!-- TEXTO -->

        <div class="container hero-content">

          <div class="hero-copy">

            <p class="eyebrow">
              ESPETINHOS • CHOPP • BONS MOMENTOS
            </p>

            <h1>
              A noite começa

              <span>
                na brasa.
              </span>
            </h1>

            <p class="hero-description">
              Um conceito digital inspirado na energia,
              na brasa e no clima descontraído do Maribá.
            </p>

            <div class="hero-actions">

              <a
                href="#cardapio"
                class="button button-primary"
              >
                Ver cardápio
              </a>

              <a
                href="#pedido"
                class="button button-secondary"
              >
                Fazer pedido
              </a>

            </div>

          </div>

          <div class="hero-object-label">

            <span>
              01
            </span>

            <p>
              Fotografia real<br>
              atmosfera 3D
            </p>

          </div>

        </div>

        <div class="scroll-indicator">

          <span>
            ROLE PARA EXPLORAR
          </span>

          <div class="scroll-line"></div>

        </div>

        <!-- TRANSIÇÃO SUAVE -->

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

      <section
        class="concept-section"
        id="cardapio"
        style="
          border-top: 0;
          margin-top: -2px;
        "
      >

        <div class="container">

          <p class="eyebrow">
            A BRASA
          </p>

          <h2>
            Do fogo direto

            <span>
              pra mesa.
            </span>
          </h2>

          <p>
            Fotografia real combinada com profundidade,
            movimento, brasas e iluminação para criar
            impacto visual sem transformar a comida
            em uma ilustração artificial.
          </p>

        </div>

      </section>

    </main>

  </div>
`

/* =========================================================
   THREE.JS
========================================================= */

const canvas =
  document.querySelector('#webgl')

canvas.style.zIndex = '4'

const scene =
  new THREE.Scene()

const camera =
  new THREE.PerspectiveCamera(
    35,
    window.innerWidth /
      window.innerHeight,
    0.1,
    100
  )

camera.position.set(
  0,
  0,
  8
)

/* =========================================================
   RENDERER
========================================================= */

const renderer =
  new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  })

renderer.setSize(
  window.innerWidth,
  window.innerHeight
)

renderer.setPixelRatio(
  Math.min(
    window.devicePixelRatio,
    2
  )
)

renderer.outputColorSpace =
  THREE.SRGBColorSpace

renderer.toneMapping =
  THREE.ACESFilmicToneMapping

renderer.toneMappingExposure =
  1.05

/* =========================================================
   TEXTURA DAS BRASAS
========================================================= */

function createEmberTexture() {

  const size = 128

  const emberCanvas =
    document.createElement('canvas')

  emberCanvas.width = size
  emberCanvas.height = size

  const context =
    emberCanvas.getContext('2d')

  const gradient =
    context.createRadialGradient(
      size / 2,
      size / 2,
      0,

      size / 2,
      size / 2,
      size / 2
    )

  gradient.addColorStop(
    0,
    'rgba(255,255,230,1)'
  )

  gradient.addColorStop(
    0.12,
    'rgba(255,185,85,1)'
  )

  gradient.addColorStop(
    0.32,
    'rgba(255,100,20,0.9)'
  )

  gradient.addColorStop(
    0.62,
    'rgba(255,60,10,0.32)'
  )

  gradient.addColorStop(
    1,
    'rgba(255,60,10,0)'
  )

  context.fillStyle =
    gradient

  context.fillRect(
    0,
    0,
    size,
    size
  )

  const texture =
    new THREE.CanvasTexture(
      emberCanvas
    )

  texture.colorSpace =
    THREE.SRGBColorSpace

  return texture
}

const emberTexture =
  createEmberTexture()

/* =========================================================
   CAMPO DE BRASAS
========================================================= */

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

  const positions =
    new Float32Array(
      count * 3
    )

  const speeds =
    new Float32Array(
      count
    )

  for (
    let i = 0;
    i < count;
    i++
  ) {

    positions[
      i * 3
    ] =
      (
        Math.random() -
        0.5
      ) * width

    positions[
      i * 3 + 1
    ] =
      (
        Math.random() -
        0.5
      ) * height

    positions[
      i * 3 + 2
    ] =
      (
        Math.random() -
        0.5
      ) * depth

    speeds[i] =
      speedMin +
      Math.random() *
      (
        speedMax -
        speedMin
      )
  }

  const geometry =
    new THREE.BufferGeometry()

  const positionAttribute =
    new THREE.BufferAttribute(
      positions,
      3
    )

  geometry.setAttribute(
    'position',
    positionAttribute
  )

  const material =
    new THREE.PointsMaterial({

      map:
        emberTexture,

      color:
        0xff7a24,

      size,

      transparent:
        true,

      opacity,

      depthWrite:
        false,

      blending:
        THREE.AdditiveBlending,
    })

  const points =
    new THREE.Points(
      geometry,
      material
    )

  scene.add(
    points
  )

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

/* =========================================================
   CAMADAS
========================================================= */

const farEmbers =
  createEmberField({

    count: 100,

    width: 12,
    height: 9,
    depth: 4,

    size: 0.045,

    opacity: 0.42,

    speedMin: 0.001,
    speedMax: 0.004,
  })

const middleEmbers =
  createEmberField({

    count: 70,

    width: 11,
    height: 8,
    depth: 3,

    size: 0.075,

    opacity: 0.55,

    speedMin: 0.002,
    speedMax: 0.006,
  })

const foregroundEmbers =
  createEmberField({

    count: 32,

    width: 10,
    height: 7,
    depth: 2,

    size: 0.13,

    opacity: 0.32,

    speedMin: 0.003,
    speedMax: 0.008,
  })

/* =========================================================
   MOVIMENTO DAS BRASAS
========================================================= */

function updateEmbers(
  field,
  delta
) {

  const {
    positions,
    speeds,
    count,
    height,
    geometry,
  } = field

  for (
    let i = 0;
    i < count;
    i++
  ) {

    positions[
      i * 3 + 1
    ] +=
      speeds[i] *
      delta *
      60

    if (
      positions[
        i * 3 + 1
      ] >
      height / 2
    ) {

      positions[
        i * 3 + 1
      ] =
        -height / 2

      positions[
        i * 3
      ] +=
        (
          Math.random() -
          0.5
        ) * 0.8
    }
  }

  geometry.attributes
    .position
    .needsUpdate = true
}

/* =========================================================
   ANIMAÇÃO
========================================================= */

const clock =
  new THREE.Clock()

function animate() {

  const delta =
    clock.getDelta()

  const elapsed =
    clock.elapsedTime

  updateEmbers(
    farEmbers,
    delta
  )

  updateEmbers(
    middleEmbers,
    delta
  )

  updateEmbers(
    foregroundEmbers,
    delta
  )

  farEmbers.points.rotation.y =
    Math.sin(
      elapsed * 0.08
    ) * 0.04

  middleEmbers.points.rotation.y =
    Math.sin(
      elapsed * 0.12
    ) * 0.06

  foregroundEmbers.points.rotation.y =
    Math.sin(
      elapsed * 0.16
    ) * 0.08

  renderer.render(
    scene,
    camera
  )

  requestAnimationFrame(
    animate
  )
}

animate()

/* =========================================================
   GSAP
========================================================= */

const motion =
  gsap.matchMedia()

/* =========================================================
   DESKTOP
========================================================= */

motion.add(

  '(min-width: 800px)',

  () => {

    gsap.set(
      '#product-photo',
      {
        rotateZ: 2.2,

        rotateY: -4,

        rotateX: 1,

        scale: 0.97,
      }
    )

    const timeline =
      gsap.timeline({

        scrollTrigger: {

          trigger:
            '.hero',

          start:
            'top top',

          end:
            '+=1450',

          scrub:
            1.15,

          pin:
            true,

          anticipatePin:
            1,
        },
      })

    timeline

      .to(
        '#product-stage',
        {
          right: '3%',

          top: '52%',

          width:
            'min(76vw, 1080px)',

          duration: 1,
        },
        0
      )

      .to(
        '#product-photo',
        {
          rotateZ: -1.5,

          rotateY: 6,

          rotateX: -1,

          scale: 1.13,

          x: -35,

          y: -8,

          duration: 1,
        },
        0
      )

      .to(
        '.hero-copy',
        {
          y: -85,

          opacity: 0.035,

          duration: 0.8,
        },
        0.14
      )

      .to(
        '.hero-object-label',
        {
          opacity: 0,

          duration: 0.3,
        },
        0.1
      )

      .to(
        '.scroll-indicator',
        {
          opacity: 0,

          duration: 0.25,
        },
        0.04
      )

      .to(
        '.hero-glow',
        {
          scale: 2,

          opacity: 1,

          duration: 1,
        },
        0
      )

      .to(
        farEmbers.material,
        {
          opacity: 0.55,

          duration: 1,
        },
        0
      )

      .to(
        middleEmbers.material,
        {
          opacity: 0.72,

          duration: 1,
        },
        0
      )

      .to(
        foregroundEmbers.material,
        {
          opacity: 0.48,

          duration: 1,
        },
        0
      )
  }
)

/* =========================================================
   MOBILE
========================================================= */

motion.add(

  '(max-width: 799px)',

  () => {

    gsap.set(
      '#product-stage',
      {
        width: '108vw',

        right: '-20%',

        top: '73%',
      }
    )

    gsap.set(
      '#product-photo',
      {
        rotateZ: 0,

        rotateY: 0,

        scale: 0.94,
      }
    )

    gsap.to(
      '#product-photo',
      {
        scale: 1.07,

        x: -10,

        y: -18,

        scrollTrigger: {

          trigger:
            '.hero',

          start:
            'top top',

          end:
            'bottom top',

          scrub:
            1,
        },
      }
    )
  }
)

/* =========================================================
   SEGUNDA CENA
========================================================= */

gsap.from(
  '.concept-section .container',
  {
    y: 70,

    opacity: 0,

    scrollTrigger: {

      trigger:
        '.concept-section',

      start:
        'top 84%',

      end:
        'top 48%',

      scrub:
        1,
    },
  }
)

/* =========================================================
   RESPONSIVIDADE
========================================================= */

function handleResize() {

  const width =
    window.innerWidth

  const height =
    window.innerHeight

  camera.aspect =
    width / height

  camera.updateProjectionMatrix()

  renderer.setSize(
    width,
    height
  )

  renderer.setPixelRatio(
    Math.min(
      window.devicePixelRatio,
      2
    )
  )
}

handleResize()

window.addEventListener(
  'resize',
  handleResize
)