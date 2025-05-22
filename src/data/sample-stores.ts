// Sample GeoJSON data for clothing stores in Bogor
// In a real application, this would be fetched from an API
const SAMPLE_STORES = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            properties: {
                id: 1,
                name: "Ramayana BTM",
                address: "Jl. Pajajaran No.10, Bogor",
                categories: ["men", "women", "children"],
                phone: "+62251123456",
                web: "https://www.google.com/maps/place/Ramayana+BTM/@-6.6052056,106.7871542,16z/data=!4m6!3m5!1s0x2e69c52ef93481c3:0xc7e146fe68e36a3d!8m2!3d-6.6051143!4d106.7954232!16s%2Fg%2F11j3vvj5kc?entry=ttu&g_ep=EgoyMDI1MDUxNS4xIKXMDSoASAFQAw%3D%3D",
                image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqxEBD1yg0HBB_YrNfFlUDgU0LCtJtJ7JxfgecR_l0kxUnnz6KE6yaWy43NO0L1l3ys4eiREuIXvY7wknrf_1MNdNBu7UL7lP5EAXmDMEJ0h3gX9Dep1Q55oz7tWhwB-Qm8gxd6=w408-h337-k-no",
            },
            geometry: {
                type: "Point",
                coordinates: [ 106.7951448, -6.6049852,],
            },
        },
        {
            type: "Feature",
            properties: {
                id: 2,
                name: "Matahari Department Store",
                address: "Botani Square Mall, Jl. Pajajaran, Bogor",
                categories: ["men", "women", "accessories"],
                phone: "+62251789012",
                web: "https://www.google.com/maps/place/Matahari+Department+Store+Lippo+Plaza+Ekalokasari+Bogor/@-6.6217986,106.8146254,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69c5fcc555556f:0x297ec88d10069796!8m2!3d-6.6217986!4d106.8172057!16s%2Fg%2F1pzs4yw07?entry=ttu&g_ep=EgoyMDI1MDUxNS4xIKXMDSoASAFQAw%3D%3D",
                image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrN1Wsl30RaS2xnzjqWycoenxkDadvVxCVlZX07FRIIKSz_3M6mtQkg6ob4nk3x0kz5CQAApo2AkT_BAaDauuINlhfGQ5mebBuiUeVahgsQPEpP59zWgHH5oyBZlj_XGsy3Zz86=w408-h276-k-no",
            },
            geometry: {
                type: "Point",
                coordinates: [106.8075, -6.6001],
            },
        },
        {
            type: "Feature",
            properties: {
                id: 3,
                name: "Uniqlo Bogor",
                address: "Bogor Trade Mall, Jl. Ir. H. Juanda",
                categories: ["men", "women", "unisex"],
                phone: "+62251345678",
                web: "https://www.google.com/maps/place/Uniqlo+Bogor",
                image: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=YOUR_PHOTO_REFERENCE&key=YOUR_API_KEY",
            },
            geometry: {
                type: "Point",
                coordinates: [106.795, -6.589],
            },
        },
        {
            type: "Feature",
            properties: {
                id: 4,
                name: "Zara Bogor",
                address: "Bogor Icon Mall, Jl. Raya Pajajaran",
                categories: ["women", "accessories"],
                phone: "+62251901234",
                web: "https://www.google.com/maps/place/Zara+Bogor",
                image: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=YOUR_PHOTO_REFERENCE&key=YOUR_API_KEY",
            },
            geometry: {
                type: "Point",
                coordinates: [106.81, -6.595],
            },
        },
        {
            type: "Feature",
            properties: {
                id: 5,
                name: "Sport Station",
                address: "Ekalokasari Plaza, Jl. Siliwangi",
                categories: ["men", "women", "shoes"],
                phone: "+62251567890",
                web: "https://www.google.com/maps/place/Sport+Station",
                image: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=YOUR_PHOTO_REFERENCE&key=YOUR_API_KEY",
            },
            geometry: {
                type: "Point",
                coordinates: [106.8, -6.605],
            },
        },
        {
            type: "Feature",
            properties: {
                id: 6,
                name: "Kids Fashion Center",
                address: "Jl. Raya Tajur No. 33, Bogor",
                categories: ["children"],
                phone: "+62251234567",
                web: "https://www.google.com/maps/place/Kids+Fashion+Center",
                image: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=YOUR_PHOTO_REFERENCE&key=YOUR_API_KEY",
            },
            geometry: {
                type: "Point",
                coordinates: [106.82, -6.61],
            },
        },
        {
            type: "Feature",
            properties: {
                id: 7,
                name: "Shoe Paradise",
                address: "Jl. Pahlawan No. 45, Bogor",
                categories: ["shoes", "accessories"],
                phone: "+62251678901",
                web: "https://www.google.com/maps/place/Shoe+Paradise",
                image: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=YOUR_PHOTO_REFERENCE&key=YOUR_API_KEY",
            },
            geometry: {
                type: "Point",
                coordinates: [106.79, -6.592],
            },
        },
        {
            type: "Feature",
            properties: {
                id: 8,
                name: "Fashion Outlet Bogor",
                address: "Jl. Sudirman No. 12, Bogor",
                categories: ["men", "women", "unisex"],
                phone: "+62251890123",
                web: "https://www.google.com/maps/place/Fashion+Outlet+Bogor",
                image: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=YOUR_PHOTO_REFERENCE&key=YOUR_API_KEY",
            },
            geometry: {
                type: "Point",
                coordinates: [106.805, -6.602],
            },
        },
    ],
};

export default SAMPLE_STORES;