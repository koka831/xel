import * as THREE from 'three'
export function cube() {
  const textures = [
    new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("/grass.png")}),
    new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("/grass_dirt.png")}),
    new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("/grass_dirt.png")}),
    new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("/grass_dirt.png")}),
    new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("/grass_dirt.png")}),
    new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("/grass_dirt.png")}),
  ]

  const geometry = new THREE.BoxGeometry(50, 50, 50);
  const material = new THREE.MeshBasicMaterial({ color: 0x2f2f2f })

  return new THREE.Mesh(geometry, material)
}
