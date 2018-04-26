jQuery(document).ready(function($) {

    let map;
    let objectManager;

    ymaps.ready(function () {
        map = new ymaps.Map('YMapsID', {
            center: [56.326944, 44.0075],
            zoom: 10,
            type: 'yandex#map',
            controls: []
        });

        map.controls.add('zoomControl', {
            size: "large"
        });
        map.behaviors.disable('scrollZoom');

        objectManager = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            // ObjectManager принимает те же опции, что и кластеризатор.
            gridSize: 32,
            clusterDisableClickZoom: false,
            clusterOpenBalloonOnClick: false,
        });

        // Чтобы задать опции одиночным объектам и кластерам,
        // обратимся к дочерним коллекциям ObjectManager.
        objectManager.objects.options.set('preset', 'islands#greenDotIcon');
        // objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
        map.geoObjects.add(objectManager);

        $("#selecttown").change(function () {
            var town = $("#selecttown :selected").val();
            console.log(town);
            do_search(town);
        });

        $("div#shops").on("click","a", function(){
            myFunction($(this).data('object-id'))
        });

    });

    function do_search(town) {

        $('#shops').html('');
        console.log('getJSON');

        $.ajax({
            url:"searcheshop.php",
            type: 'POST',
            dataType: 'json',
            data: {
                town: town,
            },
            success:function(json){
                console.log(json);
                var src_res = '<p><strong>результаты поиска: </strong></p>';

                objectManager.removeAll();
                // myCollection.removeAll();

                src_res = src_res + '<p><strong>Найдено объектов: ' + json.length + '</strong></p>';

                for (i = 0; i < json[1].address.length; i++) {
                    var sch = i + 1;
                    // var placemark = new ymaps.Placemark([json[i].lon, json[i].lat], {
                    //     iconContent: sch,
                    //     balloonContentHeader: '<div style="color:#ff0303;font-weight:bold">' + json[i].address + '</div>',
                    //     balloonContentBody: '<div style="font-size:13px;"><div><strong>Адрес:</strong> ' + json[i].address + '<br>' + '<strong>Режим работы:</strong> ' + json[i].rrab + '<br></div></div>'
                    // }, {
                    //     // Опции
                    //     preset: 'twirl#nightStretchyIcon' // иконка растягивается под контент
                    // });
                    // myCollection.add(placemark);
                    // src_res = src_res + '<p>' + sch + '. ' + '<a href="#" onclick="myFunction(' + json[i].lat + ', ' + json[i].lon + ",'" + json[i].address + "')" + '\">' + json[i].address + '</a></p>';
                    src_res = src_res + '<p>' + sch + '. ' + '<a href="#" data-object-id="'+json[1].address[i].id+'" data-address="'+json[1].address[i].address+'">' + json[1].address[i].address + '</a></p>';


                }

                objectManager.add(json[0]);
                map.setBounds(objectManager.getBounds());

                $('#shops').html(src_res);
            }
        });
    }

    function myFunction(id) {
        map.setCenter(objectManager.objects.getById(id).geometry.coordinates, 16);
        objectManager.objects.balloon.open(id);
    }


});