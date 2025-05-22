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
                address: "Lippo Plaza Ekalokasari, Bogor",
                categories: ["men", "women", "accessories"],
                phone: "+62251789012",
                web: "https://www.google.com/maps/place/Matahari+Department+Store+Lippo+Plaza+Ekalokasari+Bogor/@-6.6217986,106.8146254,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69c5fcc555556f:0x297ec88d10069796!8m2!3d-6.6217986!4d106.8172057!16s%2Fg%2F1pzs4yw07?entry=ttu&g_ep=EgoyMDI1MDUxNS4xIKXMDSoASAFQAw%3D%3D",
                image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrN1Wsl30RaS2xnzjqWycoenxkDadvVxCVlZX07FRIIKSz_3M6mtQkg6ob4nk3x0kz5CQAApo2AkT_BAaDauuINlhfGQ5mebBuiUeVahgsQPEpP59zWgHH5oyBZlj_XGsy3Zz86=w408-h276-k-no",
            },
            geometry: {
                type: "Point",
                coordinates: [106.8169011, -6.6217692],
            },
        },
        {
            type: "Feature",
            properties: {
                id: 3,
                name: "Uniqlo Botani",
                address: "Jl. Botani Square No.6, RT.04/RW.05, Kp. Parung Jambu",
                categories: ["men", "women", "unisex", "casual"],
                phone: "-",
                web: "https://www.google.com/maps/place/UNIQLO+Botani+Square+Mall/@-6.6012422,106.8048756,18z/data=!4m10!1m2!2m1!1sUNIQLO!3m6!1s0x2e69c54eefe7235d:0xc329749dbdb6c699!8m2!3d-6.6012422!4d106.8070425!15sCgZVTklRTE8iA4gBAVoIIgZ1bmlxbG-SAQ5jbG90aGluZ19zdG9yZaoBYQoNL2cvMTFiYzZkamRiawoML2cvMXl3NzlnOTByCgkvbS8wOWpoOHcQASoKIgZ1bmlxbG8oADIdEAEiGUgRbWLY-ueSxvVB2M7mZqY56ES7KPSgFf4yChACIgZ1bmlxbG_gAQA!16s%2Fg%2F11x11xjwry?entry=ttu&g_ep=EgoyMDI1MDUxNS4xIKXMDSoASAFQAw%3D%3D",
                image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4noSm_jJu0kTYHX8SDDp2Mc-P94Y76YaYEW9ZLkkc3MXETC-EMzqlF_P9GhFL1ATGMmAo4iU_McUB5yT6fPX2R-KlhSPSMb13qnL-3-0HXAwnfnElmW9r19_u8-Sc8tzfrHpaand=w426-h240-k-no",
            },
            geometry: {
                type: "Point",
                coordinates: [106.8066941, -6.6017858],
            },
        },
        {
            type: "Feature",
            properties: {
                id: 4,
                name: "BRASCO FO",
                address: "Jl. Raya Pajajaran No.29, Babakan",
                categories: ["men", "accessories"],
                phone: "02518349968",
                web: "https://www.google.com/maps/place/BRASCO+FO/@-6.5970494,106.8037665,19z/data=!4m10!1m2!2m1!1sclothing+stores!3m6!1s0x2e69c5d02e05fc71:0xe3a85fcfe852301c!8m2!3d-6.597052!4d106.804611!15sCg9jbG90aGluZyBzdG9yZXNaESIPY2xvdGhpbmcgc3RvcmVzkgEOY2xvdGhpbmdfc3RvcmWqAVYKCC9tLzA5ajJkEAEqEyIPY2xvdGhpbmcgc3RvcmVzKAAyHhABIhqy2jVdzBk7GorglqxbIZEyDs4j1FrFLex0TjITEAIiD2Nsb3RoaW5nIHN0b3Jlc-ABAA!16s%2Fg%2F11f08drnd6?entry=ttu&g_ep=EgoyMDI1MDUxNS4xIKXMDSoASAFQAw%3D%3D",
                image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrTLiBrjGhQQgIwbjdzujEz1-niA9rq3pJbH9c81ovLRSdeyzsUoOjJxTKaN0hjlopGIEbHx__UsmZEotaz-rGlHv38k5ML9q_qZuK38hjWlL-pSzhZwyMpYJ8zAhpwadjTkDQ=w408-h306-k-no",
            },
            geometry: {
                type: "Point",
                coordinates: [106.8037665, -6.5970494],
            },
        },
        {
            type: "Feature",
            properties: {
                id: 5,
                name: "San-San sport",
                address: "Gg. Mekah No.2, RT.02/RW.01, Pabaton, Kecamatan Bogor Tengah, Kota Bogor, Jawa Barat 16121",
                categories: ["men", "women", "sportswear"],
                phone: "02518379330",
                web: "https://www.google.com/maps/place/San-San+sport/@-6.5928972,106.7851309,16z/data=!4m10!1m2!2m1!1sSport+Station!3m6!1s0x2e69c5dc177b8001:0xdf704c9733fc6152!8m2!3d-6.5928495!4d106.7925444!15sCg1TcG9ydCBTdGF0aW9ukgEUc3BvcnRpbmdfZ29vZHNfc3RvcmWqAVcKDS9nLzExcnloaGdrN2QQASoRIg1zcG9ydCBzdGF0aW9uKAAyHhABIhoSZ2J0lPBoX27vbwbu6NpNpagP2kP-20NfEzIREAIiDXNwb3J0IHN0YXRpb27gAQA!16s%2Fg%2F11h6s7nnvm?entry=ttu&g_ep=EgoyMDI1MDUxNS4xIKXMDSoASAFQAw%3D%3D",
                image: "https://lh3.googleusercontent.com/p/AF1QipMO5thnkFXGyKXypQKQMgnKorn3aFS2U685n9u0=w408-h544-k-no",
            },
            geometry: {
                type: "Point",
                coordinates: [106.7921438, -6.5929701],
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