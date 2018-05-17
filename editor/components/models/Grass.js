export function cube(w, h) {
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
  const height = h | 50
  const width = w | 50
  const geometry = new THREE.BoxGeometry(width, height, width);
  const material = new THREE.MeshBasicMaterial({ color: 0xb8bb26, wireframe: true })

  return new THREE.Mesh(geometry, t_g)
}

export function dirtyGrass(w, h) {
  const textures = [
    new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("/grass.png")}),
    new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("/grass_dirt.png")}),
    new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("/grass_dirt.png")}),
    new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("/grass_dirt.png")}),
    new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("/grass_dirt.png")}),
    new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("/grass_dirt.png")}),
  ]
  const height = h | 50
  const width = w | 50
  const geo = new THREE.BoxGeometry(width, height, width)
  return new THREE.Mesh(geo, textures)
}


export function Cloud() {
  const geo = new THREE.BoxGeometry(50, 50, 50)
  const mat = new THREE.MeshBasicMaterial({ color: 0xdddddd })
  return new THREE.Mesh(geo, mat)
}
