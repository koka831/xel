<template>
  <div class="container">
    <div class="palette" v-show="isOpen">
      <div class="items">
        <ul>
          <li>
            Dirty
          </li>
          <li>Grass</li>
          <li>Cloud</li>
        </ul>
      </div>
    </div>
    <div ref="world" class="world">
    </div>
  </div>
</template>
<script>
import * as PointerLock from '~/middleware/PointerLockControls.js'
import * as OrbitControls from 'three-orbitcontrols'
import * as Model from '~/components/models/Grass.js'
import perlin from 'perlin-noise'

export default {
  name: 'World',
  data () {
    //const width = 1200
    //const height = 1200
    const width = window.innerWidth
    const height = window.innerHeight
    const scene = new THREE.Scene()
    // const backScene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    // renderer.autoClear = false
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 5000)
    // const backCamera = new THREE.PerspectiveCamera(45, width / height, 1, 10000)
    const light = new THREE.DirectionalLight(0xffffff)
    const grid = new THREE.GridHelper( 5000, 100 )
    const base = new THREE.Mesh( new THREE.PlaneBufferGeometry(5000, 5000).rotateX( -Math.PI / 2), new THREE.MeshBasicMaterial( { visible: false }))

    const raycaster = new THREE.Raycaster()
    const cursor = new THREE.Vector2() // for cursor position (x, y)

    let objects = new Array()

    renderer.setSize(width, height)
    renderer.setPixelRatio( window.devicePixelRatio )
    scene.background = new THREE.Color( 0xf0f0f0 )
    camera.position.set( 200, 200, 100 )
    //camera.lookAt( new THREE.Vector3() )
    light.position.set(0, 10, 10)

    return {
      width,
      height,
      base,
      scene,
      renderer,
      camera,
      raycaster,
      light,
      grid,
      controls: null,
      cursor,
      cubeType: Model.cube,
      objects,
      isOpen: false,
      isShiftDown: false,
      moveForward: false,
      moveBackward: false,
      moveLeft: false,
      moveRight: false,
      moveJump: false,
      prev: performance.now(),
      velocity: new THREE.Vector3,
      direction: new THREE.Vector3
    }
  },
  mounted () {
    console.log('mounted')
    this.$refs.world.appendChild(this.renderer.domElement)
    this.scene.add(this.camera)
    this.scene.add(this.light)
    this.scene.add(this.grid)
    this.scene.add(this.base)
    this.controls = new OrbitControls( this.camera )
    this.scene.add(this.controls)

    this.scene.fog = new THREE.Fog(0xcccccc, 50, 10000);
    //this.controls = new PointerLock.PointerLockControls( this.camera )
    //this.scene.add(this.controls.getObject())

    this.objects.push(this.base)

    document.addEventListener('keydown', this.onKeyDown, false)
    document.addEventListener('keyup', this.onKeyUp, false)
    document.addEventListener('mousemove', this.onMouseMove, false)
    document.addEventListener('mousedown', this.onMouseDown, false)
    document.addEventListener('resize', this.onWindowResize, false)

    // generate map
    this.createMap()
    this.animate()
  },
  created () {
  },
  methods: {
    animate () {
      requestAnimationFrame(this.animate)

      this.raycaster.ray.origin.copy(this.camera.position)
      this.raycaster.ray.origin.y -= 10

      const is = this.raycaster.intersectObjects( this.objects )
      const isOnObj = is.length > 0
      const now = performance.now()
      const d = (now - this.prev ) / 1000

      this.velocity.x -= this.velocity.x * 10.0 * d
      this.velocity.z -= this.velocity.z * 10.0 * d
      // this.velocity.y -= 9.8 * 100.0 * d
      this.velocity.y = 0
      this.direction.z = Number(this.moveForward) - Number(this.moveBackward)
      this.direction.x = Number(this.moveLeft) - Number(this.moveRight)
      this.direction.normalize()

      if (this.moveForward || this.moveBackward) this.velocity.z -= this.direction.z * 1000.0 * d
      if (this.moveLeft || this.moveRight) this.velocity.x -= this.direction.x * 1000.0 * d

      if (this.isOnObj) {
        this.velocity.y = Math.max(0, this.velocity.y)
      }

      this.camera.translateX(this.velocity.x * d)
      this.camera.translateZ(this.velocity.z * d)
      this.camera.translateY(this.velocity.y * d)

      this.prev = now
      this.renderer.render(this.scene, this.camera)
    },
    createMap () {
      const X = 50
      const Y = 50
      const pn = perlin.generatePerlinNoise(X, Y)
      for (let j = 0; j < X; j++) { for (let k = 0; k < Y; k++) {
        const y = Math.round(pn[j*Y+k]*5) * 100;
        console.log(y)
        const blk = Model.cube(100, y)
        blk.position.set(-X*100 + j*100 +550, y/2 + 10, -Y*100 + k*100 +550)
        this.scene.add(blk)
        this.objects.push(blk)
      }}
    },
    onKeyDown (e) {
      console.log('onkeydown')
      switch (e.keyCode) {
        case 16: this.isShiftDown = true; break;
        case 16: this.isShiftDown = false; break;
        case 87: this.moveForward = true; break;
        case 65: this.moveLeft = true; break;
        case 83: this.moveBackward = true; break;
        case 68: this.moveRight = true; break;
        case 69: this.isOpen = !this.isOpen; this.useDirty(); break;
        case 9: this.camera.position.set(500, 500, 500)
      }
    },
    useDirty () {
      this.cubeType = Model.dirtyGrass
    },
    onKeyUp (e) {
      console.log('onkeyup')
      switch (e.keyCode) {
        case 16: this.isShiftDown = false; break;
        case 87: this.moveForward = false; break;
        case 65: this.moveLeft = false; break;
        case 83: this.moveBackward = false; break;
        case 68: this.moveRight = false; break;
      }
    },
    onMouseDown (e) {
      console.log('onMouseDown')
      e.preventDefault()
      this.cursor.set((e.clientX / this.width) * 2 - 1, -(e.clientY / this.height) * 2 + 1)
      this.raycaster.setFromCamera( this.cursor, this.camera )
      const is = this.raycaster.intersectObjects( this.objects )
      if (is.length > 0) { 
          const i = is[0]
        if ( this.isShiftDown ) { // remove
          // TODO: remove blicks by long click
          if (i.object != this.base) {
            this.scene.remove(i.object)
            this.objects.splice(this.objects.indexOf(i.object), 1)
          }

        } else { // create
          const vox = this.cubeType()
          vox.position.copy(i.point).add(i.face.normal)
          vox.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25)
          this.scene.add(vox)
          this.objects.push(vox)
        }
      }
    },
    onMouseMove (e) {

    },
    onWindowResize () {
      console.log('resize')
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()

      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
  }
}
</script>

<style lang="scss" scoped>
.world {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.palette {
  position: absolute;
  z-index: 10000;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 500px;
  height: 300px;
  background: #999;
  border-top: 2px #ccc;
  border-left: 2px #ccc;
  border-right: 2px #555;
  border-bottom: 2px #555;

  .items {
    display: flex;
    justify-content: center;

    ul li {
      width: 50px;
      height: 50px;
      background: #555;
      margin: 20px;
      border: 2px #333;
      box-shadow: -2px;
    }
  }
}
</style>
