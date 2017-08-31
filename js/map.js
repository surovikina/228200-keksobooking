'use strict';
(function () {
  var avatarList = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var titleList = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var typeList = {'flat': 'Квартира', 'house': 'Бунгало', 'bungalo': 'Дом'};
  var checkinCheckoutList = ['12:00', '13:00', '14:00'];
  var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var i;
  var mapContainer = document.querySelector('.tokyo__pin-map');
  var lodgeTimplate = document.querySelector('#lodge-template').content;
  var dialogPanel = document.querySelector('.dialog__panel');

  var renderDialog = function (generatedAd) {
    var dialogPanelTemplate = lodgeTimplate.cloneNode(true);
    dialogPanelTemplate.querySelector('.lodge__title').textContent = generatedAd.offer.title;
    dialogPanelTemplate.querySelector('.lodge__address').textContent = generatedAd.offer.address;
    dialogPanelTemplate.querySelector('.lodge__price').innerHTML = generatedAd.offer.price + '&#x20bd;/ночь';
    dialogPanelTemplate.querySelector('.lodge__type').textContent = typeList[generatedAd.offer.type];
    dialogPanelTemplate.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + generatedAd.offer.guests + ' гостей в ' + generatedAd.offer.rooms + ' комнатах';
    dialogPanelTemplate.querySelector('.lodge__checkin-time').textContent = 'Заезд после  ' + generatedAd.offer.checkin + ', выезд до ' + generatedAd.offer.checkout;
    dialogPanelTemplate.querySelector('.lodge__features').innerHTML = generatedAd.offer.features;
    dialogPanelTemplate.querySelector('.lodge__description').innerHTML = generatedAd.offer.description;
    dialogPanel.innerHTML = dialogPanelTemplate.querySelector('.dialog__panel').innerHTML;

  };

  var init = function () {
    var generatedAds = generateAds();
    renderDialog(generatedAds[0]);
    mapContainer.innerHTML = renderAds(generatedAds);
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getRandomItem = function (arr) {
    return arr[getRandomNumber(0, arr.length)];
  };

  var generateAds = function (max) {
    var ads = [];
    max = max || 8;
    for (i = 0; i < max; i++) {
      ads.push({
        author: {
          avatar: 'img/avatars/user' + getRandomItem(avatarList) + '.png'
        },
        offer: {
          title: getRandomItem(titleList),
          address: getRandomNumber(300, 900) + ' ' + getRandomNumber(100, 500),
          price: getRandomNumber(1000, 1000000),
          type: getRandomItem(Object.keys(typeList)),
          rooms: getRandomNumber(1, 5),
          guests: getRandomNumber(1, 10),
          checkin: getRandomItem(checkinCheckoutList),
          checkout: getRandomItem(checkinCheckoutList),
          features: getRandomItem(featuresList),
          description: '',
          photos: [],
        },
        location: {
          x: getRandomNumber(300, 900),
          y: getRandomNumber(100, 500),
        }
      });
    }
    return ads;
  };

  var renderAdsItem = function (adsItem) {
    var adsElement = '';
    adsElement += '<div class="pin" style="left:' + adsItem.location.x + 'px; top:' + adsItem.location.y + 'px">';
    adsElement += '<img src="' + adsItem.author.avatar + '" class="rounded" width="40" height="40">';
    adsElement += '</div>';
    return adsElement;
  };

  var renderAds = function (adsItems) {
    var adsElements = '';
    adsItems.forEach(function (item, i) {
      adsElements += renderAdsItem(adsItems[i]);
    });
    return adsElements;
  };

  init();

})();
