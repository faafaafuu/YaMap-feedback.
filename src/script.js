// function vkApi(method, options) {
//     if (!options.v) {
//         options.v = '5.68';
//     }

//     return new Promise((resolve, reject) => {
//         VK.api(method, options, data => {
//             if (data.error) {
//                 reject(new Error(data.error.error_msg));
//             } else {
//                 resolve(data.response);
//             }
//         });
//     });
// }

// function vkInit() {
//     return new Promise((resolve, reject) => {
//         VK.init({
//             apiId: 5267932
//         });

//         VK.Auth.login(data => {
//             if (data.session) {
//                 resolve();
//             } else {
//                 reject(new Error('Не удалось авторизоваться'));
//             }
//         }, 2);
//     });
// }

const cache = new Map();

function geocode(address) {
    if (cache.has(address)) {
        return Promise.resolve(cache.get(address));
    }

    return ymaps.geocode(address)
        .then(result => {
            const points = result.geoObjects.toArray();

            if (points.length) {
                const coors = points[0].geometry.getCoordinates();
                cache.set(address, coors);
                return coors;
            }
        });
}

var myMap;

ymaps.ready(init);

function init () {
    
    myMap = new ymaps.Map('map', {
        
        center: [59.9505, 30.3161], 
        zoom: 10
    }, {
        balloonMaxWidth: 400,
        searchControlProvider: 'yandex#search'
    });

   
    myMap.events.add('click', function (e) {
        if (!myMap.balloon.isOpen()) {
            var coords = e.get('coords');
            myMap.balloon.open(coords, {
                contentHeader:'some place!',
                contentBody:'<p class="" >comment</p>' +
                    '<p>adress: ' + [
                    coords[0].toPrecision(6),
                    coords[1].toPrecision(6)
                    ].join(', ') + '</p>',
                contentFooter:'<sup>date</sup>'
            });
        }
        else {
            myMap.balloon.close();
        }
    });

    
    myMap.events.add('contextmenu', function (e) {
        myMap.hint.open(e.get('coords'), 'Кто-то щелкнул правой кнопкой');
    });
    
    
    myMap.events.add('balloonopen', function (e) {
        myMap.hint.close();
    });
}

