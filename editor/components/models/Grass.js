export function cube() {
  const textures = [
    new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("/grass.png")}),
    new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("/grass_dirt.png")}),
    new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("/grass_dirt.png")}),
    new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("/grass_dirt.png")}),
    new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("/grass_dirt.png")}),
    new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("/grass_dirt.png")}),
  ]

  const t_g = [
    new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("/grass.png")}),
    new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("/grass.png")}),
    new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("/grass.png")}),
    new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("/grass.png")}),
    new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("/grass.png")}),
    new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("/grass.png")})
  ]

  const geometry = new THREE.BoxGeometry(50, 50, 50);
  const material = new THREE.MeshBasicMaterial({ color: 0xb8bb26, wireframe: true })

  return new THREE.Mesh(geometry, t_g)
}
