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

  // Обработчик зависимости от время заезда
  var timeinSelect = document.querySelector('#timein');
  var timeoutSelect = document.querySelector('#timeout');

  var changeEventHandler = function (e) {
    var valueTwo = e.target.value;
    timeoutSelect.value = valueTwo;
    timeinSelect.value = valueTwo;
  };

  timeinSelect.addEventListener('change', changeEventHandler);
  timeoutSelect.addEventListener('change', changeEventHandler);
  // Обработчик зависимости от типа жилья
  var typeLodging = document.querySelector('#type');
  var priceInput = document.querySelector('#price');

  var changeInputHandler = function (e) {
    var valueLodging = e.target.value;
    switch (valueLodging) {
      case 'bungalo':
        priceInput.value = '0';
        break;
      case 'flat':
        priceInput.value = '1000';
        break;
      case 'house':
        priceInput.value = '5000';
        break;
      case 'palace':
        priceInput.value = '10000';
    }
  };

  typeLodging.addEventListener('change', changeInputHandler);
  // Обработчик зависимости кол-ва комнат
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var changeCapacityHandler = function (e) {
    var valueRoom = e.target.value;
    switch (valueRoom) {
      case '1':
        capacity.value = '1';
        break;
      case '2':
        capacity.value = '2';
        break;
      case '3':
        capacity.value = '3';
        break;
      case '100':
        capacity.value = '0';
    }
  };

  var changeRoomHandler = function (e) {
    var valueCapacity = e.target.value;
    switch (valueCapacity) {
      case '1':
        roomNumber.value = '1';
        break;
      case '2':
        roomNumber.value = '2';
        break;
      case '3':
        roomNumber.value = '3';
        break;
      case '0':
        roomNumber.value = '100';
    }
  };
  roomNumber.addEventListener('change', changeCapacityHandler);
  capacity.addEventListener('change', changeRoomHandler);
  // Валидация отправки формs

  var titleInput = document.querySelector('#title');
  var addressInput = document.querySelector('#address');


  titleInput.addEventListener('invalid', function () {
    if (!titleInput.validity.valid) {
      titleInput.style.border = "2px solid red";
    }
  });
  addressInput.addEventListener('invalid', function () {
    if (!addressInput.validity.valid) {
      addressInput.style.border = "2px solid red";
    }
  });
  priceInput.addEventListener('invalid', function () {
    if (!priceInput.validity.valid) {
      priceInput.style.border = "2px solid red";
    }
  });

  // После отправки формы все значения должны сбрасываться на те, что были по умолчанию
  var buutonSend = document.querySelector('.form__submit');
  var forms = document.querySelector('.notice__form');

  buutonSend.addEventListener('submit', function () {
    forms.reset();
  });

})();
