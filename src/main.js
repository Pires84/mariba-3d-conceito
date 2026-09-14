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

      border-top:
        1px solid
        rgba(246, 235, 221, 0.14);
    }

    .menu-option {
      width: 100%;

      display: flex;

      align-items: center;
      justify-content: space-between;

      gap: 20px;

      padding: 22px 0;

      border: 0;

      border-bottom:
        1px solid
        rgba(246, 235, 221, 0.14);

      background: transparent;

      color:
        rgba(246, 235, 221, 0.42);

      cursor: pointer;

      font-family:
        'Bebas Neue',
        sans-serif;

      font-size:
        clamp(
          2rem,
          6vw,
          3.8rem
        );

      text-align: left;

      transition:
        color 0.3s ease,
        padding-left 0.3s ease;
    }

    .menu-option span:first-child {
      transition:
        transform 0.3s ease;
    }

    .menu-option-number {
      font-family:
        'Inter',
        sans-serif;

      font-size:
        0.68rem;

      font-weight: 700;

      letter-spacing:
        0.18em;

      color:
        rgba(246, 235, 221, 0.28);
    }

    .menu-option:hover,
    .menu-option.is-active {
      color:
        var(--orange);
    }

    .menu-option:hover span:first-child,
    .menu-option.is-active span:first-child {
      transform:
        translateX(10px);
    }

    .menu-option.is-active {
      padding-left: 4px;
    }

    .menu-showcase {
      position: relative;

      min-height: 470px;

      overflow: hidden;

      border-radius: 14px;

      background:
        #120c09;
    }

    .menu-showcase::after {
      content: '';

      position: absolute;

      inset: 0;

      pointer-events: none;

      background:
        linear-gradient(
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

      transform:
        scale(1.04);

      will-change:
        transform,
        opacity;
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

      color:
        var(--orange);

      font-size:
        0.66rem;

      font-weight: 700;

      letter-spacing:
        0.18em;

      text-transform:
        uppercase;
    }

    .menu-showcase-title {
      margin-bottom: 10px;

      font-family:
        'Bebas Neue',
        sans-serif;

      font-size:
        clamp(
          2.8rem,
          7vw,
          4.8rem
        );

      line-height:
        0.9;

      color:
        var(--cream);

      text-transform:
        uppercase;
    }

    .menu-showcase-description {
      max-width: 490px;

      color:
        rgba(246, 235, 221, 0.72);

      font-size:
        0.9rem;

      line-height:
        1.65;
    }

    .menu-status {
      margin-top: 18px;

      color:
        rgba(246, 235, 221, 0.38);

      font-size:
        0.68rem;

      letter-spacing:
        0.12em;

      text-transform:
        uppercase;
    }

    @media (min-width: 900px) {

      .menu-experience {
        grid-template-columns:
          0.8fr 1.2fr;

        align-items:
          stretch;

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
    }

    @media (max-width: 799px) {

      .menu-showcase {
        min-height: 440px;
      }

      .menu-option {
        font-size:
          clamp(
            2.4rem,
            12vw,
            4rem
          );
      }
    }

  </style>

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

      <!-- =================================================
           HERO
      ================================================== -->

      <section class="hero">

        <canvas
          id="webgl"
          aria-hidden="true"
        ></canvas>

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
            Escolha o clima da sua noite.
            A experiência muda sem sair da página.
          </p>

          <div
            class="menu-experience"
            id="experiencia"
          >

            <!-- OPÇÕES -->

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

                  <span>
                    Espetinhos
                  </span>

                  <span
                    class="menu-option-number"
                  >
                    01
                  </span>

                </button>

                <button
                  class="menu-option"
                  type="button"
                  data-category="chopp"
                  aria-pressed="false"
                >

                  <span>
                    Chopp
                  </span>

                  <span
                    class="menu-option-number"
                  >
                    02
                  </span>

                </button>

              </div>

              <p class="menu-status">
                Toque ou clique para mudar a cena
              </p>

            </div>


            <!-- IMAGEM -->

            <div
              class="menu-showcase"
              id="menu-showcase"
            >

              <img
                id="menu-image"
                src="/images/espeto-real.jpg"
                alt="Espetos assados na brasa"
              >

              <div
                class="menu-showcase-content"
                id="menu-copy"
              >

                <p
                  class="menu-showcase-kicker"
                  id="menu-kicker"
                >
                  NA BRASA
                </p>

                <h3
                  class="menu-showcase-title"
                  id="menu-title"
                >
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

    </main>

  </div>
`

/* =========================================================
   THREE.JS — BRASAS DISCRETAS
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
   TEXTURA DE BRASA
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

    positions[i * 3] =
      (
        Math.random() -
        0.5
      ) * width

    positions[i * 3 + 1] =
      (
        Math.random() -
        0.5
      ) * height

    positions[i * 3 + 2] =
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

  geometry.setAttribute(
    'position',

    new THREE.BufferAttribute(
      positions,
      3
    )
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
    }
  }

  geometry
    .attributes
    .position
    .needsUpdate = true
}

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
   HERO / SCROLL
========================================================= */

const motion =
  gsap.matchMedia()

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
   ENTRADA DA SEGUNDA CENA
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
   DADOS DA INTERAÇÃO
========================================================= */

const menuData = {

  espeto: {

    image:
      '/images/espeto-real.jpg',

    alt:
      'Espetos assados na brasa',

    kicker:
      'NA BRASA',

    title:
      'Espetinhos',

    description:
      'O fogo continua como protagonista: uma apresentação visual para destacar os espetinhos de forma direta e apetitosa.',
  },

  chopp: {

    image:
      '/images/chopp-real.jpg',

    alt:
      'Copo de chopp gelado',

    kicker:
      'BEM GELADO',

    title:
      'Chopp',

    description:
      'O contraste da noite: depois do calor da brasa, a cena muda para destacar o chopp e a experiência de sentar e aproveitar.',
  },
}

/* =========================================================
   ELEMENTOS DA INTERAÇÃO
========================================================= */

const menuButtons =
  document.querySelectorAll(
    '.menu-option'
  )

const menuImage =
  document.querySelector(
    '#menu-image'
  )

const menuKicker =
  document.querySelector(
    '#menu-kicker'
  )

const menuTitle =
  document.querySelector(
    '#menu-title'
  )

const menuDescription =
  document.querySelector(
    '#menu-description'
  )

let activeCategory =
  'espeto'

let changingCategory =
  false

/* =========================================================
   TROCA DE CENA
========================================================= */

function changeMenuScene(
  category
) {

  if (
    category === activeCategory ||
    changingCategory
  ) {
    return
  }

  const data =
    menuData[category]

  if (!data) {
    return
  }

  changingCategory =
    true

  menuButtons.forEach(
    button => {

      const isActive =
        button.dataset.category ===
        category

      button.classList.toggle(
        'is-active',
        isActive
      )

      button.setAttribute(
        'aria-pressed',
        String(isActive)
      )
    }
  )

  const timeline =
    gsap.timeline({
      onComplete: () => {

        activeCategory =
          category

        changingCategory =
          false
      },
    })

  timeline

    /*
      Foto sai levemente.
    */

    .to(
      menuImage,
      {
        opacity: 0,
        scale: 1.08,
        duration: 0.28,
        ease: 'power2.in',
      }
    )

    /*
      Texto sai.
    */

    .to(
      '#menu-copy',
      {
        opacity: 0,
        y: 14,
        duration: 0.2,
        ease: 'power2.in',
      },
      '<'
    )

    /*
      Troca real do conteúdo.
    */

    .call(
      () => {

        menuImage.src =
          data.image

        menuImage.alt =
          data.alt

        menuKicker.textContent =
          data.kicker

        menuTitle.textContent =
          data.title

        menuDescription.textContent =
          data.description
      }
    )

    /*
      Foto entra.
    */

    .fromTo(
      menuImage,
      {
        opacity: 0,
        scale: 1.1,
      },
      {
        opacity: 1,
        scale: 1.04,
        duration: 0.55,
        ease: 'power2.out',
      }
    )

    /*
      Texto reaparece.
    */

    .to(
      '#menu-copy',
      {
        opacity: 1,
        y: 0,
        duration: 0.42,
        ease: 'power2.out',
      },
      '<0.08'
    )
}

/* =========================================================
   CLIQUES / TOQUES
========================================================= */

menuButtons.forEach(
  button => {

    button.addEventListener(
      'click',
      () => {

        changeMenuScene(
          button.dataset.category
        )
      }
    )
  }
)

/* =========================================================
   RESIZE
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