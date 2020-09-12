function przelicz(kosztstaly,promocja)
{
    var koszt = kosztstaly;
    if (!promocja) {

        koszt += 100 * ($("#dokad option:selected").index());
        koszt += 10 * $('#dorosli').val();
    }
    else {

    if (parseInt($('#dorosli').val())>2)
        koszt += 10 * $('#dorosli').val();
    }
    koszt += 5 * $('#dzieci').val();
    if ($('input[name=wyrzywienie]:checked', '#formularz').attr('id')!=1)
        koszt+=Math.pow(4,$('input[name=wyrzywienie]:checked', '#formularz').attr('id'));
    $('#koszt').val(koszt + " PLN");
   

}

$(document).ready(
    function () {
        var promocja = false;
        var kosztstaly = 1000;
        var  Osoba = [];
        var index;
        if (sessionStorage.length !== 0) {
            kosztstaly = parseInt(sessionStorage.getItem("koszt"));
            promocja = true;
            $("#dokad").val(sessionStorage.getItem("cel"));
            $("#koszt").val(kosztstaly + " PLN");
        }
        if (localStorage.length !== 0)
        {
            Osoba = JSON.parse(localStorage.getItem("osoba"));
            index = Osoba.length;
            for (var i = 0; i < Osoba.length; i++) {
                $('#lista').append('<option value=' + Osoba[i].nazwisko + ' class=blok id='+i+'>' + Osoba[i].imie+" "+Osoba[i].nazwisko);
            }
            $('#zapisane').attr('disabled', false);
        }

        else {
            index = 0;
            $('#zapisane').attr('disabled', true);
        }
        if (promocja)
            $('#dokad').attr('disabled', true);
        $('#formularz').submit(function (event) {
            $('#wycena').modal('show');
            event.preventDefault();
        });

        $('#finish').click(function () {
            if ($('#dodaj').is(":checked")) {
                //var Osoba = JSON.parse(localStorage.getItem("osoba"));
                Osoba[index] = { imie: $('#imie').val(), nazwisko: $('#nazwisko').val(), email: $('#email').val() }
                localStorage.setItem("osoba", JSON.stringify(Osoba));

            }
            $('#wycena').modal('hide');
            $('#succeswindow').modal('show');
        });
        $('#regaccept').prop('checked', false);
        $('#dokad').change(function () {
            przelicz(kosztstaly,promocja);
        });

        $('#dorosli').change(function(){
            przelicz(kosztstaly,promocja)
        });
        $('#dzieci').change(function () {
            przelicz(kosztstaly,promocja)
        });
        $('input[name=wyrzywienie]').change(function () {
            przelicz(kosztstaly, promocja);
        });
        $('#wylot').change(function () {
          
          
        });

     

        $("#regaccept").click(function () {
            if (this.checked)
                $('#finish').attr('disabled', false);
            else
                $('#finish').attr('disabled', true);
        });

        $(window).unload(function () {
            sessionStorage.clear();
        });

            $('#zapisane').click(
                function () {     
                    $('#panel1').fadeIn()
                    $('#lista').css('display', 'block');
                });
            $("#lista").change(function () {
                
            });
            $('.blok').click(function () {
                var i = parseInt(this.id);
                $('#imie').val(Osoba[i].imie)
                $('#nazwisko').val(Osoba[i].nazwisko)
                $('#email').val(Osoba[i].email)
                $('#panel1').fadeOut('fast');

            });

    }
    );



