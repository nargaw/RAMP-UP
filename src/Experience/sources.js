export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path:
        [
            'textures/environmentMap/px.jpg',
            'textures/environmentMap/nx.jpg',
            'textures/environmentMap/py.jpg',
            'textures/environmentMap/ny.jpg',
            'textures/environmentMap/pz.jpg',
            'textures/environmentMap/nz.jpg'
        ]
    },
    {
        name: 'carModel',
        type: 'dracoModel',
        path: 'models/Car/Audi1.gltf'
    },
    {
        name: 'buildingModel',
        type: 'gltfModel',
        path: 'models/City/buildings4.glb' 
    },
    {
        name: 'roadModel',
        type: 'gltfModel',
        path: 'models/Road/road.glb' 
    }
]