import './style.css'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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

      <section class="hero">

        <canvas
          id="webgl"
          aria-hidden="true"
        ></canvas>

        <div class="hero-glow"></div>

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
              Protótipo 3D<br>
              em desenvolvimento
            </p>
          </div>

        </div>

        <div class="scroll-indicator">
          <span>ROLE PARA EXPLORAR</span>
          <div class="scroll-line"></div>
        </div>

      </section>

      <section class="concept-section" id="cardapio">

        <div class="container">

          <p class="eyebrow">
            A BRASA
          </p>

          <h2>
            Do fogo direto
            <span>pra mesa.</span>
          </h2>

          <p>
            Conforme o visitante avança pela experiência,
            o objeto 3D acompanha a narrativa e conduz
            a passagem entre as cenas.
          </p>

        </div>

      </section>

    </main>

  </div>
`

/* =========================================================
   THREE.JS
========================================================= */

const canvas = document.querySelector('#webgl')

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

renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 2)
)

renderer.setSize(
  window.innerWidth,
  window.innerHeight
)

renderer.outputColorSpace =
  THREE.SRGBColorSpace

/* =========================================================
   ESTRUTURA DO OBJETO

   skewerRig:
   controlado pelo scroll.

   skewer:
   recebe o movimento suave de flutuação.
========================================================= */

const skewerRig = new THREE.Group()
const skewer = new THREE.Group()

skewerRig.add(skewer)
scene.add(skewerRig)

/* =========================================================
   MATERIAIS
========================================================= */

const rodMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x8c8178,
    metalness: 0.9,
    roughness: 0.25,
  })

const foodMaterial =
  new THREE.MeshStandardMaterial({
    color: 0xd65a20,
    roughness: 0.55,
    metalness: 0.05,
  })

const handleMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x5b2c18,
    roughness: 0.75,
  })

/* =========================================================
   HASTE
========================================================= */

const rodGeometry =
  new THREE.CylinderGeometry(
    0.035,
    0.035,
    5.4,
    16
  )

const rod = new THREE.Mesh(
  rodGeometry,
  rodMaterial
)

skewer.add(rod)

/* =========================================================
   PEDAÇOS PROVISÓRIOS DO ESPETO
========================================================= */

const foodPositions = [
  1.25,
  0.55,
  -0.15,
  -0.85,
]

foodPositions.forEach(
  (position, index) => {

    const geometry =
      new THREE.BoxGeometry(
        0.78,
        0.55,
        0.72
      )

    const piece =
      new THREE.Mesh(
        geometry,
        foodMaterial
      )

    piece.position.y = position

    piece.rotation.y =
      index * 0.35

    piece.rotation.z =
      index * 0.12

    skewer.add(piece)
  }
)

/* =========================================================
   CABO
========================================================= */

const handleGeometry =
  new THREE.CylinderGeometry(
    0.16,
    0.2,
    1.4,
    24
  )

const handle =
  new THREE.Mesh(
    handleGeometry,
    handleMaterial
  )

handle.position.y = -3

skewer.add(handle)

/* =========================================================
   POSIÇÃO INICIAL
========================================================= */

skewer.rotation.z = -0.55
skewer.rotation.x = 0.18

skewerRig.position.set(
  1.8,
  0.15,
  0
)

/* =========================================================
   LUZES
========================================================= */

const ambientLight =
  new THREE.AmbientLight(
    0xffd7bb,
    0.6
  )

scene.add(ambientLight)

const fireLight =
  new THREE.PointLight(
    0xff5a16,
    45,
    12
  )

fireLight.position.set(
  2,
  -2.5,
  3
)

scene.add(fireLight)

const rimLight =
  new THREE.DirectionalLight(
    0xffbd73,
    2.4
  )

rimLight.position.set(
  -3,
  4,
  4
)

scene.add(rimLight)

/* =========================================================
   PARTÍCULAS / BRASAS
========================================================= */

const particleCount = 110

const positions =
  new Float32Array(
    particleCount * 3
  )

for (
  let i = 0;
  i < particleCount;
  i++
) {
  positions[i * 3] =
    (Math.random() - 0.5) * 12

  positions[i * 3 + 1] =
    (Math.random() - 0.5) * 9

  positions[i * 3 + 2] =
    (Math.random() - 0.5) * 4
}

const particlesGeometry =
  new THREE.BufferGeometry()

particlesGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(
    positions,
    3
  )
)

const particlesMaterial =
  new THREE.PointsMaterial({
    color: 0xff6a1a,
    size: 0.035,
    transparent: true,
    opacity: 0.75,
  })

const particles =
  new THREE.Points(
    particlesGeometry,
    particlesMaterial
  )

scene.add(particles)

/* =========================================================
   MOVIMENTO CONTÍNUO

   Este movimento acontece mesmo quando
   o visitante não está rolando a página.
========================================================= */

const clock = new THREE.Clock()

function animate() {
  const elapsed =
    clock.getElapsedTime()

  skewer.rotation.y =
    Math.sin(
      elapsed * 0.45
    ) * 0.25

  skewer.position.y =
    Math.sin(
      elapsed * 0.8
    ) * 0.12

  particles.rotation.y =
    elapsed * 0.015

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
   GSAP + SCROLLTRIGGER

   Agora a rolagem controla o "rig" inteiro.
========================================================= */

const motion =
  gsap.matchMedia()

motion.add(
  '(min-width: 800px)',
  () => {

    const timeline =
      gsap.timeline({
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: '+=1300',
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      })

    timeline
      .to(
        skewerRig.position,
        {
          x: 0.5,
          y: 0.35,
          z: 1.8,
          duration: 1,
        },
        0
      )

      .to(
        skewerRig.rotation,
        {
          x: 0.65,
          y: Math.PI * 1.1,
          z: 0.42,
          duration: 1,
        },
        0
      )

      .to(
        skewerRig.scale,
        {
          x: 1.35,
          y: 1.35,
          z: 1.35,
          duration: 1,
        },
        0
      )

      .to(
        fireLight,
        {
          intensity: 80,
          duration: 1,
        },
        0
      )

      .to(
        '.hero-copy',
        {
          y: -70,
          opacity: 0.16,
          duration: 0.8,
        },
        0.15
      )

      .to(
        '.hero-object-label',
        {
          opacity: 0,
          duration: 0.35,
        },
        0.12
      )

      .to(
        '.scroll-indicator',
        {
          opacity: 0,
          duration: 0.25,
        },
        0.05
      )

      .to(
        '.hero-glow',
        {
          scale: 1.5,
          opacity: 1,
          duration: 1,
        },
        0
      )
  }
)

/* =========================================================
   MOBILE

   Movimento mais leve para preservar desempenho
   e facilitar a leitura.
========================================================= */

motion.add(
  '(max-width: 799px)',
  () => {

    gsap.to(
      skewerRig.rotation,
      {
        y: Math.PI * 0.65,

        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      }
    )

    gsap.to(
      skewerRig.position,
      {
        y: -1.4,

        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
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
    y: 80,
    opacity: 0,

    scrollTrigger: {
      trigger:
        '.concept-section',

      start:
        'top 78%',

      end:
        'top 45%',

      scrub: 1,
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

  if (width < 800) {
    skewerRig.position.x = 0.8
    skewerRig.position.y = -0.8

    skewerRig.scale.setScalar(
      0.72
    )
  } else {
    skewerRig.position.x = 1.8
    skewerRig.position.y = 0.15

    skewerRig.scale.setScalar(
      1
    )
  }
}

handleResize()

window.addEventListener(
  'resize',
  handleResize
)