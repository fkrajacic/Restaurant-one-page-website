function Hrana(naziv, idHrana, opis, cijena) {
    var counter = 0;
    this.IDHrana = idHrana;
    this.Naziv = naziv;
    this.Opis = opis;
    this.Cijena = cijena;
    this.toString = function () {
            return this.Naziv + " " + this.Cijena + " " + this.IDHrana;
        }
    }

    var podaci = [];
  
    function GetOsoba(ID) {
            for (var i = 0; i < podaci.length; i++) {
            if (ID == podaci[i].Naziv)
                return podaci[i];
                }
            }

$(document).ready(function() {

var modal_order = document.getElementById('order_div');
var span_order = document.getElementsByClassName('close_order')[0];

$('.navb_').click(function() {
    modal_order.style.display = "block";
    var loading = document.createElement("div");
    loading.className = 'loading';
    $('#order').append(loading);
    $.getJSON('http://www.fulek.com/VUA/SUPIT/GetCategoriesAndFoods', function(data) {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            var div = document.createElement("div");
            div.className = 'vrstajela';
            div.style.width = "100%";
            div.style.height = "60px";
            div.style.color = "white";
            div.innerHTML = data[i].Naziv;
            document.getElementById("ponudena_jela").appendChild(div);
            for (let j = 0; j < data[i].Ponuda.length; j++) {
                var div = document.createElement("div");
                div.className = 'jela';
                document.getElementById("ponudena_jela").appendChild(div);
                var naziv = document.createElement("div");
                naziv.className = 'nazivJela';
                naziv.innerHTML = data[i].Ponuda[j].Naziv;
                div.appendChild(naziv);
                var opis = document.createElement("div");
                opis.innerHTML = data[i].Ponuda[j].Opis;
                opis.className = 'opisJela';
                div.appendChild(opis);
                var hr = document.createElement("hr");
                hr.className = 'crtaJela';
                div.appendChild(hr);
                var h = new Hrana(data[i].Ponuda[j].Naziv, data[i].Ponuda[j].JeloId, data[i].Ponuda[j].Opis, data[i].Ponuda[j].Cijena);
                podaci.push(h);
            }
        }
        $('.loading').hide();
});
});

var broj = 0;

$(span_order).click(function() {
    broj = 0;      
    $('.nazivStupacaNarudba').remove();
    $('.prikazOdabranihJela').remove();
    $('.total').remove();
    $('.cijena').remove();
    modal_order.style.display = "none";
});

$(document).on('click', '.jela' ,function(){
    var txt = this.getElementsByClassName('nazivJela')[0].textContent;
    if(broj == 0)
    {
        broj++;
        var nazivStupca = document.createElement("div");
        nazivStupca.className = 'nazivStupacaNarudba';
        $('#odabrana_jela').append(nazivStupca);

        var Title = document.createElement("div");
        Title.innerHTML = 'Naziv jela';
        Title.className = 'title';
        nazivStupca.appendChild(Title);
        var Quantity = document.createElement("div");
        Quantity.innerHTML = 'Količina';
        Quantity.className = 'quantity';
        nazivStupca.appendChild(Quantity);
        var Price = document.createElement("div");
        Price.innerHTML = 'Cijena';
        Price.className = 'price';
        nazivStupca.appendChild(Price);
        var prikazJela = document.createElement("div");
        prikazJela.className = 'prikazOdabranihJela';
        $('#odabrana_jela').append(prikazJela);
        var total = document.createElement("div");
        total.innerHTML = 'Ukupna cijena narudžbe:';
        total.className = 'total';
        $('#odabrana_jela').append(total);
        var cijena = document.createElement("div");
        cijena.className = 'cijena';
        cijena.innerHTML = '0';
        $('#odabrana_jela').append(cijena);

    }
    var odabrano_jelo = document.createElement("div");
    odabrano_jelo.className = 'odabranoJelo';
    var h = GetOsoba(txt);
    $('.prikazOdabranihJela').append(odabrano_jelo);

    var Title = document.createElement("div");
    Title.innerHTML = h.Naziv;
    Title.className = 'title';
    odabrano_jelo.appendChild(Title);
    var Quantity = document.createElement("div");
    Quantity.innerHTML = '1';
    Quantity.className = 'quantity';
    odabrano_jelo.appendChild(Quantity);
    var Price = document.createElement("div");
    Price.innerHTML = h.Cijena + ' ' + 'kn';
    Price.className = 'price';
    odabrano_jelo.appendChild(Price);

    var crta = document.createElement("hr");
    crta.className = 'crtaOdabranoJelo';
    $(odabrano_jelo).append(crta);
    var iznos = parseInt($('.cijena').html());
    var iznosNovog = parseInt(h.Cijena);
    iznos += iznosNovog;
    $('.cijena').html(iznos + ' ' + 'kn');
    var count = $('.prikazOdabranihJela').children().length;
    for (let i = 0; i < count; i++) {
        var item = $('.prikazOdabranihJela').children().eq(i);
        var makni = item.children('hr');
        if (i == count - 1) {
            makni.hide();
        }
        else
        {
            makni.show();
        }
    }
}); 
});
