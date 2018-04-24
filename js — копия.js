jQuery(document).ready(function($) {
    var map;

    var myCollection;

    ymaps.ready(function () {
        map = new ymaps.Map('YMapsID', {
            center: [56.326944, 44.0075],
            zoom: 10,
            type: 'yandex#map',
            behaviors: ['default', 'scrollZoom'],
        });

        myCollection = new ymaps.GeoObjectCollection();

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

                myCollection.removeAll();

                src_res = src_res + '<p><strong>Найдено объектов: ' + json.length + '</strong></p>';

                for (i = 0; i < json.length; i++) {
                    var sch = i + 1;
                    var placemark = new ymaps.Placemark([json[i].lon, json[i].lat], {
                        iconContent: sch,
                        balloonContentHeader: '<div style="color:#ff0303;font-weight:bold">' + json[i].address + '</div>',
                        balloonContentBody: '<div style="font-size:13px;"><div><strong>Адрес:</strong> ' + json[i].address + '<br>' + '<strong>Режим работы:</strong> ' + json[i].rrab + '<br></div></div>'
                    }, {
                        // Опции
                        preset: 'twirl#nightStretchyIcon' // иконка растягивается под контент
                    });
                    myCollection.add(placemark);
                    // src_res = src_res + '<p>' + sch + '. ' + '<a href="#" onclick="myFunction(' + json[i].lat + ', ' + json[i].lon + ",'" + json[i].address + "')" + '\">' + json[i].address + '</a></p>';
                    src_res = src_res + '<p>' + sch + '. ' + '<a href="#" data-lat="'+json[i].lat+'" data-lon="'+json[i].lon+'" data-address="'+json[i].address+'">' + json[i].address + '</a></p>';


                }

                map.geoObjects.add(myCollection);
                map.setBounds(myCollection.getBounds());


                $('#shops').html(src_res);
            }
        });
    }

    $("div#shops").on("click","a", function(){
        myFunction($(this).data('lat'), $(this).data('lon'), $(this).data('address'))
    });

    function myFunction(lat, lon, address) {
        map.setCenter([lon, lat], 16);

        myCollection.each(function (item) {
            if (item.properties.get('balloonContentHeader') == '<div style="color:#ff0303;font-weight:bold">' + address + '</div>') {
                item.balloon.open();
            }
        });
        return false;
    }

});