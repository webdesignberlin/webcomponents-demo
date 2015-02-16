(function(){
  var city = "Berlin";
  // App data
  var jsTrainer = {
    "Berlin" : [{
      "title": "Berlin title",
      "name": "berlin name",
      "image": "https://www.mcfitmodels.com/typo3temp/_processed_/csm_jenny_f_139_03_6534a26005.jpg",
      "trainerDetailLink": "trainerlink.html"
    },
      {
        "title": "Berlin title 2",
        "name": "berlin name 2",
        "image": "https://www.mcfitmodels.com/typo3temp/_processed_/csm_Anne_18_ae598b1c03.jpg",
        "trainerDetailLink": "trainerlink.html"
      },
      {
        "title": "Berlin title 3",
        "name": "berlin name 3",
        "image": "https://www.mcfitmodels.com/typo3temp/_processed_/csm_anne_m_95_08_703c0fc610.jpg",
        "trainerDetailLink": "trainerlink.html"
      }],
    "Hamburg" : [{
      "title": "Hamburg title 1",
      "name": "hamburg name 2",
      "image": "https://www.mcfitmodels.com/typo3temp/_processed_/csm_anne_m_95_08_703c0fc610.jpg",
      "trainerDetailLink": "trainerlink.html"
    }],
    "Frankfurt" : [{
      "title": "frankfurt 1",
      "name": "frankfurt name 1",
      "image": "https://www.mcfitmodels.com/typo3temp/_processed_/csm_andre_m_1933_08_c973d39c32.jpg",
      "trainerDetailLink": "trainerlink.html"
    }]
  };

  // Select templates & build Shadow DOM & Shadow Root
  var template = document.querySelector("#trainer"),
      templateContent = template.content,
      host = document.querySelector("#trainer-all"),
      root = host.createShadowRoot();

  //console('host: ' + host);
  /*
   * A cool trick: uncomment the 2 console.log statements below to
   * see what the 'host' and 'root' variables look like when
   * rendered!!!
   */

  // console.log(host);
  // console.log(root);
  var citySelect = document.querySelector("#city-select");
  for (var key in jsTrainer) {
    var cityValue = key;
    citySelect.innerHTML = citySelect.innerHTML + '<option name="'+cityValue+'">'+cityValue+'</option>>';
  }

  citySelect.onchange = function() {
    city = this.value;
    cleaShadowRoot();
    if (city !== "all") {
      renderTrainer(city);
    } else {
      renderTrainerAll();
    }
  };

  // Use a for...in loop to load "jsTrainer" data in  <template>
  function renderTrainerAll(){
    for (var city in jsTrainer) {
      renderTrainer(city);
    }
  }
  renderTrainerAll();

  function cleaShadowRoot(){
    root.innerHTML = '';
  }


  function renderTrainer(city){

    this.city = city;

    for (var key in jsTrainer[city]) {
      var title = jsTrainer[city][key].title,
          name = jsTrainer[city][key].name,
          image = jsTrainer[city][key].image,
          trainerDetailLink = jsTrainer[city][key].trainerDetailLink;

      // Add image data to src in <img> tag in <template>
      templateContent.querySelector("img").src = image;

      // Add title data to alt in <img> tag & "#trainer-title" in <template>
      templateContent.querySelector("img").alt
          = templateContent.querySelector("#trainer-title").innerHTML
          = title;

      // Add name data to "#trainer-title" in <template>
      templateContent.querySelector("#trainer-name").innerHTML = name;

      // Add trainerDetailLink data to href in "#trainer-btn" in <template>
      templateContent.querySelector("#trainer-btn").href = trainerDetailLink;

      /*
       * Copy JUST the <article> tag content & place it in the Shadow
       * Root
       */
      root.appendChild(document.importNode(templateContent.querySelector(".template"), true));
    }


    /*
     * Copy JUST the <style> tag content & place it in the Shadow Root.
     * This is done OUTSIDE the "for...in" loop so that the <style> tag
     * doesn't get duplicated every time it iterates.
     */
    root.appendChild(document.importNode(templateContent.querySelector("style"), true));

  };
  //renderTrainer();

})();