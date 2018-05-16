<template>
  <div ref="world" class="world">
  </div>
</template>
<script>
import * as THREE from 'three'
import * as oc from 'three-orbit-controls'
export default {
  name: 'World',
  data () {
    // TODO: OrbitController
    // const OrbitControls = oc(THREE)
    const width = 500
    const height = 1000
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    const light = new THREE.DirectionalLight(0xffffff);
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00, opacity: 0.5, transparent: true });
    const grid = new THREE.GridHelper( 5000, 20 )
    const cube = new THREE.Mesh(geometry, material)

    /*
    const geom = new THREE.PlaneBufferGeometry( 1000, 1000)
    geom.rotateX( -Math.PI / 2 )
    const plane = new THREE.Mesh( geom, new THREE.MeshBasicMaterial( { visible: false }))
    */

    renderer.setSize(500, 1000)
    renderer.setPixelRatio( window.devicePixelRatio )
    scene.background = new THREE.Color( 0xf0f0f0 )
    camera.position.set( 500, 800, 1000 )
    camera.lookAt( new THREE.Vector3() )
    light.position.set(0, 0, 10)

    return {
      width: width,
      height: height,
      // OrbitControls,
      scene: scene,
      renderer: renderer,
      camera: camera,
      light: light,
      grid,
      control: null,
      cube: cube,
    }
  },
  mounted () {
    console.log('mounted')
    this.$refs.world.appendChild(this.renderer.domElement)
    this.animate()
  },
  created () {
    console.log('created')
    this.scene.add(this.camera)
    this.scene.add(this.light)
    this.scene.add(this.cube)
    this.scene.add(this.grid)
    this.scene.add(this.axis)
    // this.control = new OrbitControls(this.camera)
  },
  methods: {
    animate () {
      requestAnimationFrame(this.animate)
      this.cube.rotation.x += 0.05
      this.cube.rotation.y += 0.05

      this.renderer.render(this.scene, this.camera)
    }
  },
  updated () {
    const world = document.getElementById('world')
    world.appendChild(this.renderer.domElement)
    this.animate()
  }
}
</script>

<style lang="scss" scoped>
.world {
  width: 300px;
  height: 500px;
}
</style>
