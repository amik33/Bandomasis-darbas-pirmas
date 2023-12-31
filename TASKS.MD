# JavaScript Bandomasis egzaminas

## Užduoties esmė:

Sukurti internetinę platformą grupiniam lėšų rinkimui. Realus idėjos įgyvendinimo pavyzdys
https://www.gofundme.com/

## Užduoties reikalavimai:

Naudojant Node.js, MySQL ir REACT sukurti svetainę, turinčią viešą ir administravimo sritis.

Vieša sritis turi būti padalinta į dvi dalis:

1. Naujos istorijos/idėjos kūrimo, kurioje vartotojai galėtų sukurti savo istoriją ar idėją,
įkelti nuotrauką ir nurodyti norimą surinkti sumą.

2. Istorijų/idėjų sąrašo, kurioje galėtų matyti visas istorijas/idėjas ir taip pat galėtų skirti
tam tikrą pinigų sumą pasirinktai istorijai ar idėjai.

## Vieša sritis

Pagrindiniame viešos srities puslapyje turi būti atvaizduotas sąrašas su istorijom ar idėjom.
Kiekvienas sąrašo punktas turi turėti šiuos elementus:
1. istorijos/idėjos tekstą;
2. nuotrauką;
3. norimą surinkti sumą;
4. jau surinktą sumą;
5. likusią iki tikslo sumą;
6. sąrašą su lėšų surinkimo istorija (lėšų aukotojo vardas ir suma);
7. kiekvienas punktas turi turėti du input laukelius- vienas lėšų aukotojo vardui, kitas
aukojamai sumai ir mygtuką aukoti.

Sąrašas turi būti pateiktas taip, kad viršuje būtų istorijos/idėjos, kurios dar nesurinko norimos
sumos, o apačioje tos, kurios sumą jau surinko. Tos istorijos/idėjos, kurios jau surinko norimą
sumą, turi būti atvaizduojamos skirtingai, informuojant, kad suma yra surinkta ir nebeturėti
laukelių lėšų rinkimui (surinkus pageidaujamą sumą, tolesnis lėšų rinkimas nutraukiamas).
Kitame viešosios srities puslapyje kiekvienas norintis turėtų turėt galimybę sukurti savo naują
istoriją ar idėją. Joje turi būti laukeliai informacijos įvedimui: istorijos/idėjos tekstas, nuotrauka
ir norima surinkti suma.

## Administravimo sritis

Administracinėje dalyje, svetainės administratorius turi turėti galimybę peržiūrėti visas
pateiktas istorijas/idėjas ir jas patvirtinti arba ištrinti. Tik administratoriaus patvirtintos
istorijos/idėjos turi būti atvaizduojamos viešoje dalyje.
Patekimas į administracinę dalį turi būti apsaugotas slaptažodžiu.