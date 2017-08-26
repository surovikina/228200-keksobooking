'use strict';


var avatarList = ['01', '02', '03', '04', '05', '06', '07', '08'];
var titleList = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var typeList = ['flat', 'house', 'bungalo'];
var checkinCheckoutList = ['12:00', '13:00', '14:00'];
var featuresList = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];


var getRandomAds = function(){

  //get avatar
  var avatarListKey = Math.floor(Math.random() * avatarList.length);
  var avatar = 'img/avatars/user' + avatarList[avatarListKey] + '. png';
  avatarList = avatarList.splice(avatarListKey, 1);
  //eof get avatar

  // get title
  var titleListKey = Math.floor(Math.random() * titleList.length);
  var title = titleList[titleListKey];
  titleList = titleList.splice(titleListKey, 1);
  // eof get avatar

  var locationX = Math.floor(Math.random() * (900 - 300)) + 300;
  var locationY = Math.floor(Math.random() * (500 - 100)) + 100;

  //get address
  var address = locationX + ', ' + locationY;
  //eof address

  //get price
  var price = Math.floor((Math.random() * (1000000 - 1000) + 1000));
  //eof price

  var type = typeList[Math.floor(Math.random() * typeList.length)];
  var rooms = Math.floor(Math.random() * (5-1))+1;
  var guests = Math.floor(Math.random() * (10-1)) + 1;
  var checkin = checkinCheckoutList[Math.floor(Math.random() * checkinCheckoutList.length)];
  var checkout = checkinCheckoutList[Math.floor(Math.random() * checkinCheckoutList.length)];

  var features = [];
  var maxLenghtFeatures = Math.floor(Math.random() * featuresList.length);
  var featuresListProccessed = featuresList;
  for(var k = 0; k < maxLenghtFeatures; k++){
    var featuresListProccessedKey = Math.floor(Math.random() * featuresListProccessed.length);
    features[k] = featuresListProccessed[featuresListProccessedKey];
    featuresListProccessed = featuresListProccessed.splice(featuresListProccessedKey,1);
  }

  var returnObj =
  {
    "author": {
      "avatar": avatar, //где xx это число от 1 до 8 с ведущим нулем. Например 01, 02 и т. д. Адреса изображений не повторяются
    },

    "offer": {
      "title": title,
      "address": address,
      "price": price,
      "type": type,
      "rooms": rooms,
      "guests": guests,
      "checkin": checkin,
      "checkout": checkout,
      "features": features,
      "description": '',
      "photos": []
    },

    "location": {
      "x": locationX,
      "y": locationY
    }
  }
  return returnObj;

}
var relatedAdsNearby = [];

for (var i = 0; i< 8 ; i++){
  relatedAdsNearby[i] = getRandomAds();
};
