<template>
  <div ref="world" class="world">
  </div>
</template>
<script>
import * as PointerLock from 'three-pointerlock'
import * as OrbitControls from 'three-orbitcontrols'
import * as Model from '~/components/models/Grass.js'

export default {
  name: 'World',
  data () {
    const width = 1200
    const height = 1200
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    const light = new THREE.DirectionalLight(0xffffff);
    const grid = new THREE.GridHelper( 5000, 100 )
    const base = new THREE.Mesh( new THREE.PlaneBufferGeometry(5000, 5000), new THREE.MeshBasicMaterial( { visible: false }))
    const raycaster = new THREE.Raycaster()
    const cube = Model.cube()
    const cursor = new THREE.Vector2() // for cursor position (x, y)

    let objects = new Array()

    renderer.setSize(1200, 1200)
    renderer.setPixelRatio( window.devicePixelRatio )
    scene.background = new THREE.Color( 0xf0f0f0 )
    camera.position.set( 500, 200, 1000 )
    camera.lookAt( new THREE.Vector3() )
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
      cube,
      cursor,
      objects,
      isShiftDown: false
    }
  },
  mounted () {
    console.log('mounted')
    this.$refs.world.appendChild(this.renderer.domElement)
    this.scene.add(this.camera)
    this.scene.add(this.light)
    this.scene.add(this.cube)
    this.scene.add(this.grid)
    this.scene.add(this.base)
    this.controls = new OrbitControls( this.camera )
    this.scene.add(this.controls)
    //this.controls = new PointerLock( this.camera )
    //this.scene.add(this.controls.getObject())

    this.objects.push(this.base)
    this.cube.position.set(20, 20, 20)

    document.addEventListener('keydown', this.onKeyDown, false)
    document.addEventListener('keyup', this.onKeyUp, false)
    document.addEventListener('mousemove', this.onMouseMove, false)
    document.addEventListener('mousedown', this.onMouseDown, false)

    this.animate()
  },
  created () {
  },
  methods: {
    animate () {
      requestAnimationFrame(this.animate)

      this.renderer.render(this.scene, this.camera)
    },
    onKeyDown (e) {
      console.log('onkeydown')
      switch (e.keyCode) {
        case 16: this.isShiftDown = true; break;
      }
    },
    onKeyUp (e) {
      console.log('onkeyup')
      switch (e.keyCode) {
        case 16: this.isShiftDown = false; break;
      }
    },
    onMouseDown (e) {
      e.preventDefault()
      this.cursor.set((e.clientX / this.width) * 2 - 1, -(e.clientY / this.height) * 2 + 1)
      this.raycaster.setFromCamera( this.cursor, this.camera )
      const is = this.raycaster.intersectObjects( this.objects )
      if (is.length > 0) { 
          const i = is[0]
        if ( this.isShiftDown) { // remove
          // TODO: remove blicks by long click
          if (i.object != this.base) {
            this.scene.remove(i.object)
            this.objects.splice(this.objects.indexOf(i.object), 1)
          }

        } else { // create
          const vox = Model.cube()
          vox.position.copy(i.point).add(i.face.normal)
          vox.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25)
          this.scene.add(vox)
          this.objects.push(vox)
        }
      }
    },
    onMouseMove (e) {

    }
  }
}
</script>

<style lang="scss" scoped>
.world {
  position: absolute;
  top: 0;
  left: 0;
  width: 400px;
  height: 500px;
}
</style>
