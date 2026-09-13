import './style.css'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

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
              Espeto 3D<br>
              experiência interativa
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

renderer.toneMapping =
  THREE.ACESFilmicToneMapping

renderer.toneMappingExposure = 1.25

/* =========================================================
   RIG PRINCIPAL
========================================================= */

const skewerRig = new THREE.Group()
const skewer = new THREE.Group()

skewerRig.add(skewer)
scene.add(skewerRig)

/* =========================================================
   MATERIAIS
========================================================= */

const metalMaterial =
  new THREE.MeshStandardMaterial({
    color: 0xa79b91,
    metalness: 0.95,
    roughness: 0.2,
  })

const darkMetalMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x39302c,
    metalness: 0.82,
    roughness: 0.3,
  })

const meatMaterial =
  new THREE.MeshPhysicalMaterial({
    color: 0xa63e20,
    roughness: 0.46,
    metalness: 0.02,
    clearcoat: 0.18,
    clearcoatRoughness: 0.45,
  })

const meatDarkMaterial =
  new THREE.MeshPhysicalMaterial({
    color: 0x7c2918,
    roughness: 0.52,
    metalness: 0.02,
    clearcoat: 0.12,
  })

const toastedMaterial =
  new THREE.MeshPhysicalMaterial({
    color: 0xc75a25,
    roughness: 0.48,
    metalness: 0.01,
    clearcoat: 0.15,
  })

const onionMaterial =
  new THREE.MeshStandardMaterial({
    color: 0xe0a06e,
    roughness: 0.72,
  })

const grillMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x281510,
    roughness: 0.95,
  })

const woodMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x6b351d,
    roughness: 0.78,
  })

const woodDarkMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x3f2014,
    roughness: 0.82,
  })

/* =========================================================
   HASTE METÁLICA
========================================================= */

const rodGeometry =
  new THREE.CylinderGeometry(
    0.032,
    0.032,
    6.4,
    20
  )

const rod =
  new THREE.Mesh(
    rodGeometry,
    metalMaterial
  )

skewer.add(rod)

/* =========================================================
   PONTA DO ESPETO
========================================================= */

const tipGeometry =
  new THREE.ConeGeometry(
    0.075,
    0.55,
    18
  )

const tip =
  new THREE.Mesh(
    tipGeometry,
    metalMaterial
  )

tip.position.y = 3.45

skewer.add(tip)

/* =========================================================
   FUNÇÃO PARA CRIAR PEDAÇOS DE CARNE
========================================================= */

function createMeatPiece({
  y,
  material,
  rotationY,
  rotationZ,
  scaleX = 1,
  scaleY = 1,
  scaleZ = 1,
  grill = true,
}) {

  const group =
    new THREE.Group()

  const geometry =
    new RoundedBoxGeometry(
      0.95,
      0.62,
      0.78,
      5,
      0.16
    )

  const meat =
    new THREE.Mesh(
      geometry,
      material
    )

  meat.scale.set(
    scaleX,
    scaleY,
    scaleZ
  )

  group.add(meat)

  if (grill) {

    const markGeometry =
      new RoundedBoxGeometry(
        0.54,
        0.045,
        0.025,
        2,
        0.015
      )

    for (let i = -1; i <= 1; i++) {

      const mark =
        new THREE.Mesh(
          markGeometry,
          grillMaterial
        )

      mark.position.set(
        0,
        i * 0.16,
        0.405 * scaleZ
      )

      mark.rotation.z = -0.45

      group.add(mark)
    }
  }

  group.position.y = y

  group.rotation.y =
    rotationY

  group.rotation.z =
    rotationZ

  return group
}

/* =========================================================
   PEDAÇOS DO ESPETO
========================================================= */

const meatPieces = [

  createMeatPiece({
    y: 1.55,
    material: meatMaterial,
    rotationY: 0.15,
    rotationZ: -0.08,
    scaleX: 1.03,
    scaleY: 0.95,
  }),

  createMeatPiece({
    y: 0.78,
    material: toastedMaterial,
    rotationY: -0.3,
    rotationZ: 0.12,
    scaleX: 0.92,
    scaleY: 1.05,
    scaleZ: 0.96,
  }),

  createMeatPiece({
    y: 0,
    material: meatDarkMaterial,
    rotationY: 0.38,
    rotationZ: -0.12,
    scaleX: 1.05,
    scaleY: 0.9,
  }),

  createMeatPiece({
    y: -0.78,
    material: meatMaterial,
    rotationY: -0.15,
    rotationZ: 0.13,
    scaleX: 0.94,
    scaleY: 1.02,
  }),

  createMeatPiece({
    y: -1.55,
    material: toastedMaterial,
    rotationY: 0.3,
    rotationZ: -0.1,
    scaleX: 1.02,
    scaleY: 0.92,
  }),

]

meatPieces.forEach(
  piece => skewer.add(piece)
)

/* =========================================================
   CEBOLA ENTRE ALGUNS PEDAÇOS
========================================================= */

function createOnionSlice(y, rotation) {

  const geometry =
    new RoundedBoxGeometry(
      0.82,
      0.11,
      0.72,
      4,
      0.05
    )

  const onion =
    new THREE.Mesh(
      geometry,
      onionMaterial
    )

  onion.position.y = y
  onion.rotation.y = rotation

  return onion
}

skewer.add(
  createOnionSlice(
    1.16,
    0.2
  )
)

skewer.add(
  createOnionSlice(
    -0.39,
    -0.25
  )
)

skewer.add(
  createOnionSlice(
    -1.16,
    0.35
  )
)

/* =========================================================
   CABO DE MADEIRA
========================================================= */

const handleGeometry =
  new THREE.CylinderGeometry(
    0.18,
    0.23,
    1.55,
    32
  )

const handle =
  new THREE.Mesh(
    handleGeometry,
    woodMaterial
  )

handle.position.y = -3.25

skewer.add(handle)

/* =========================================================
   DETALHES DO CABO
========================================================= */

const handleBottomGeometry =
  new THREE.SphereGeometry(
    0.23,
    24,
    16
  )

const handleBottom =
  new THREE.Mesh(
    handleBottomGeometry,
    woodDarkMaterial
  )

handleBottom.scale.y = 0.75
handleBottom.position.y = -4.02

skewer.add(handleBottom)

/* =========================================================
   ANEL METÁLICO ENTRE CABO E HASTE
========================================================= */

const ferruleGeometry =
  new THREE.CylinderGeometry(
    0.19,
    0.19,
    0.22,
    28
  )

const ferrule =
  new THREE.Mesh(
    ferruleGeometry,
    darkMetalMaterial
  )

ferrule.position.y = -2.43

skewer.add(ferrule)

/* =========================================================
   POSIÇÃO E ROTAÇÃO INICIAIS
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
    0xffd8bf,
    0.72
  )

scene.add(ambientLight)

const fireLight =
  new THREE.PointLight(
    0xff5a16,
    58,
    13
  )

fireLight.position.set(
  2.2,
  -2.6,
  3.2
)

scene.add(fireLight)

const rimLight =
  new THREE.DirectionalLight(
    0xffbf78,
    3
  )

rimLight.position.set(
  -3,
  4,
  4
)

scene.add(rimLight)

const warmFillLight =
  new THREE.PointLight(
    0xffa85c,
    12,
    10
  )

warmFillLight.position.set(
  -3,
  1,
  1
)

scene.add(warmFillLight)

/* =========================================================
   PARTÍCULAS / BRASAS
========================================================= */

const particleCount = 140

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
    size: 0.04,
    transparent: true,
    opacity: 0.78,
  })

const particles =
  new THREE.Points(
    particlesGeometry,
    particlesMaterial
  )

scene.add(particles)

/* =========================================================
   MOVIMENTO CONTÍNUO
========================================================= */

const clock = new THREE.Clock()

function animate() {

  const elapsed =
    clock.getElapsedTime()

  skewer.rotation.y =
    Math.sin(
      elapsed * 0.42
    ) * 0.28

  skewer.position.y =
    Math.sin(
      elapsed * 0.75
    ) * 0.1

  particles.rotation.y =
    elapsed * 0.015

  particles.rotation.z =
    Math.sin(
      elapsed * 0.1
    ) * 0.04

  fireLight.intensity =
    58 +
    Math.sin(
      elapsed * 3.2
    ) * 4

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
          intensity: 92,
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