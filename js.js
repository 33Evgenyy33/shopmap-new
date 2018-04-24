jQuery(document).ready(function($) {
    var map;

    var myCollection;

    var objectManager;

    ymaps.ready(function () {
        map = new ymaps.Map('YMapsID', {
            center: [56.326944, 44.0075],
            zoom: 10,
            type: 'yandex#map',
            behaviors: ['default', 'scrollZoom'],
        });

        objectManager = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            // clusterize: true,
            // ObjectManager принимает те же опции, что и кластеризатор.
            gridSize: 32,
            // clusterDisableClickZoom: true
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

                for (i = 0; i < json.address.length; i++) {
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
                    src_res = src_res + '<p>' + sch + '. ' + '<a href="#" data-lat="'+json.address[i].lat+'" data-lon="'+json.address[i].lon+'" data-address="'+json.address[i].address+'" data-object-id="'+json.address[i].id+'">' + json.address[i].address + '</a></p>';


                }

                objectManager.add(json);
                map.setBounds(objectManager.getBounds());

                $('#shops').html(src_res);
            }
        });
    }

    $("div#shops").on("click","a", function(){
        myFunction($(this).data('object-id'),$(this).data('lat'), $(this).data('lon'), $(this).data('address'))
    });

    function myFunction(id, lat, lon, address) {
        map.setCenter([lon, lat], 16);
        // console.log(objectManager.objects.get('13'));
        objectManager.objects.balloon.open(id);

        return false;
    }

});