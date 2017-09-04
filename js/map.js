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
  var dialogTitle = document.querySelector('.dialog__title');
  var generatedAds = [];
  var renderDialog = function (generatedAd) {
    var dialogPanelTemplate = lodgeTimplate.cloneNode(true);
    dialogPanelTemplate.querySelector('.lodge__title').textContent = generatedAd.offer.title;
    dialogPanelTemplate.querySelector('.lodge__address').textContent = generatedAd.offer.address;
    dialogPanelTemplate.querySelector('.lodge__price').innerHTML = generatedAd.offer.price + '&#x20bd;/ночь';
    dialogPanelTemplate.querySelector('.lodge__type').textContent = typeList[generatedAd.offer.type];
    dialogPanelTemplate.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + generatedAd.offer.guests + ' гостей в ' + generatedAd.offer.rooms + ' комнатах';
    dialogPanelTemplate.querySelector('.lodge__checkin-time').textContent = 'Заезд после  ' + generatedAd.offer.checkin + ', выезд до ' + generatedAd.offer.checkout;

    var featuresStr = '';
    generatedAd.offer.features.forEach(function (el) {
      featuresStr += '<span class="feature__image feature__image--' + el + '"></span>';
    });

    dialogPanelTemplate.querySelector('.lodge__features').innerHTML = featuresStr;
    dialogPanelTemplate.querySelector('.lodge__description').innerHTML = generatedAd.offer.description;
    dialogPanel.innerHTML = dialogPanelTemplate.querySelector('.dialog__panel').innerHTML;
    dialogTitle.querySelector('img').setAttribute('src', generatedAd.author.avatar);

  };

  var init = function () {
    generatedAds = generateAds();
    renderDialog(generatedAds[0]);
    mapContainer.innerHTML = renderAds(generatedAds);
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getRandomItem = function (arr) {
    return arr[getRandomNumber(0, arr.length)];
  };

  var getRandomCountItems = function (arr) {
    var arrShuffle = arr.slice(0);
    arrShuffle = arrShuffle.sort(function () {
      return 0.5 - Math.random();
    });
    var randomLength = getRandomNumber(1, arrShuffle.length);
    return arrShuffle.splice(0, randomLength);
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
          features: getRandomCountItems(featuresList),
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

  var renderAdsItem = function (adsItem, id) {
    var adsElement = '';
    adsElement += '<div data_id="' + id + '" class="pin" tabindex="0" style="left:' + adsItem.location.x + 'px; top:' + adsItem.location.y + 'px">';
    adsElement += '<img src="' + adsItem.author.avatar + '" class="rounded" width="40" height="40">';
    adsElement += '</div>';
    return adsElement;
  };

  var renderAds = function (adsItems) {
    var adsElements = '';
    adsItems.forEach(function (item, index) {
      adsElements += renderAdsItem(item, index);
    });
    return adsElements;
  };

  init();
  var KEYCODE_ENTER = 13;
  var KEYCODE_ESC = 27;

  var pinElements = document.querySelectorAll('.pin');
  var dialog = document.querySelector('.dialog');
  var dialogClose = document.querySelector('.dialog__close');

  // обработчик активной-неактивной метки на карте
  var pinClickHandler = function (e) {
    pinElements.forEach(function (el) {
      el.classList.remove('pin--active');
    });
    e.currentTarget.classList.add('pin--active');
    var id = e.currentTarget.getAttribute('data_id');
    var generatedAd = generatedAds[id];
    renderDialog(generatedAd);

    dialog.classList.remove('hidden');
  };

  // открыть диалог нажатием  кнопки enter
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEYCODE_ENTER) {
      dialog.classList.remove('hidden');
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEYCODE_ESC) {
      dialog.classList.add('hidden');
      pinElements.forEach(function (el) {
        el.classList.remove('pin--active');
      });
    }
  });
  // тут навешиваем обработчики на все метки
  for (i = 0; i < pinElements.length; i++) {
    pinElements[i].addEventListener('click', pinClickHandler);
  }
  // закрытие блока с объявлением
  var dialogClikHander = function () {
    dialog.classList.add('hidden');
    pinElements.forEach(function (el) {
      el.classList.remove('pin--active');
    });
  };
  dialogClose.addEventListener('click', dialogClikHander);
})();
