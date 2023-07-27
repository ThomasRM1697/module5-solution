(() => {
  let httpRequest;

  document
    .getElementById("menu-tile")
    .addEventListener("click", menuRequest);

  document
    .getElementById("menu-nav")
    .addEventListener("click", menuRequest);

  document
    .getElementById("specials-tile")
    .addEventListener("click", makeCategoriesRequest);

  var allCategories = document.getElementsByClassName("category-tile");
  for (let singleCategory of allCategories) {
    singleCategory.addEventListener("click", insideRequest);
  }

  function insideRequest(){
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert("Cannot create an XMLHttp instance");
    }

    httpRequest.onreadystatechange = loadMenuInside;
    httpRequest.open("GET", "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json",true);
    httpRequest.send();
  }

  function menuRequest() {
    httpRequest = new XMLHttpRequest();

    if(!httpRequest) {
      alert("Cannot create an XMLHttp instance");
    }
    httpRequest.onreadystatechange = loadMenu;
    httpRequest.open("GET","https://coursera-jhu-default-rtdb.firebaseio.com/categories.json", true);
    httpRequest.send();
    
  }
  
  
  function makeCategoriesRequest() {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert("Cannot create an XMLHttp instance");
    }

    httpRequest.onreadystatechange = loadCategories;
    httpRequest.open("GET", "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json",true);
    httpRequest.send();
  }

  function loadCategories() {
    if (httpRequest.readyState === XMLHttpRequest.DONE){
      if (httpRequest.status === 200){
        responseObject = JSON.parse(httpRequest.responseText);
        const categories = ["A","B","C","CM","CSR","CU","D","DK","DS","F","FR","FY","L","NF","NL","NS","PF","SO","SP","SR","SS","T","V","VG"];

        let c = getRandomCat(categories);
        var newContent = "";
        newContent +=
          '<h2 class="text-center">' +
          responseObject[c].category.name +
          " menu </h2>";
        newContent +=
          '<div class="text-center">' +
          responseObject[c].category.special_instructions +
          "</div>";
        newContent += '<div class="row mt-5 gy-5">';

        for (var i = 0; i < responseObject[c].menu_items.length; i++) {
          newContent += '<div class="menu-item-tile col-lg-6">';
          newContent += '<div class="row">';
          newContent += '<div class="col-md-5">';
          newContent += '<div class="menu-item-photo position-relative">';
          newContent +=
            '<div class="text-center position-absolute bottom-0 end-0">' +
            responseObject[c].menu_items[i].short_name +
            "</div>";
          newContent +=
            '<img src="Images/menu/' +
            c +
            "/" +
            responseObject[c].menu_items[i].short_name +
            '.jpg" class="w-100">';
          newContent += "</div>";
          newContent +=
            '<div class="menu-item-price mt-2">' +
            responseObject[c].menu_items[i].price_small +
            "<span>(pint)</span>" +
            responseObject[c].menu_items[i].price_large +
            "<span>(quart)</span></div>";
          newContent += "</div>";
          newContent += '<div class="menu-item-desciption col-md-7 pe-5">';
          newContent +=
            '<h3 class="menu-item-title">' +
            responseObject[c].menu_items[i].name +
            "</h3>";
          newContent +=
            '<p class="menu-item-details">' +
            responseObject[c].menu_items[i].description +
            "</p>";
          newContent += "</div>";
          newContent += "</div>";
          newContent += '<hr class="d-md-none">';
          newContent += "</div>";
        }
        newContent += "</div>";
        //Update the page with the new content
        document.getElementById("main-content").innerHTML = newContent;

        

      } else {
        alert("Thre was a problem with the request");
      }
      
    }
  }

  function getRandomCat(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function readId(){
    return this.id;
  }
  function loadMenu(){
    if (httpRequest.readyState === XMLHttpRequest.DONE){
      if (httpRequest.status === 200){
        //Process JSON data here
        responseObject = JSON.parse(httpRequest.responseText);

        //Build up string with new content:
        var newContent = "";
        newContent +=
          '<h2 class="text-center" id="menu-categories-tile">Menu categories</h2>';
        newContent +=
          '<div class="text-center"> Substituing white rice with brown rice or fried rice after 3:00pm will be $1.50 for a pint and $2.50 for a quart.</div>';
        newContent += '<section class="row mt-5">';

        for (var i = 0; i < responseObject.length; i++) {
          newContent += '<div class="col-sm-6 col-md-4 col-lg-3">';
          newContent +=
            '<div class="category-tile" id="' +
            responseObject[i].short_name +
            '">';
          newContent +=
            '<img width="200" height="200" src="/Images/menu/' +
            responseObject[i].short_name +
            "/" +
            responseObject[i].short_name +
            '.jpg" alt ="' +
            responseObject[i].name +
            '">';
          newContent += "<span>" + responseObject[i].name + "</span>";
          newContent += "</div>";
          newContent += "</div>";
        }
        newContent += "</section>";
        //Update the page with the new content
        document.getElementById("main-content").innerHTML = newContent;

      } else {
        alert("There was a problem with the request");
      }
    }
  }

  function loadMenuInside (){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        responseObject = JSON.parse(httpRequest.responseText);

        var allCategories = document.getElementsByClassName("category-tile");
        for (let singleCategory of allCategories) {
          catId = singleCategory.addEventListener("click", readId);
        }
        
        var newContent = "";
        newContent +=
          '<h2 class="text-center">' +
          responseObject[catId].category.name +
          " menu </h2>";
        newContent +=
          '<div class="text-center">' +
          responseObject[catId].category.special_instructions +
          "</div>";
        newContent += '<div class="row mt-5 gy-5">';

        for (var i = 0; i < responseObject[catId].menu_items.length; i++) {
          newContent += '<div class="menu-item-tile col-lg-6">';
          newContent += '<div class="row">';
          newContent += '<div class="col-md-5">';
          newContent += '<div class="menu-item-photo position-relative">';
          newContent +=
            '<div class="text-center position-absolute bottom-0 end-0">' +
            responseObject[catId].menu_items[i].short_name +
            "</div>";
          newContent +=
            '<img src="Images/menu/' +
            catId +
            "/" +
            responseObject[catId].menu_items[i].short_name +
            '.jpg" class="w-100">';
          newContent += "</div>";
          newContent +=
            '<div class="menu-item-price mt-2">' +
            responseObject[catId].menu_items[i].price_small +
            "<span>(pint)</span>" +
            responseObject[catId].menu_items[i].price_large +
            "<span>(quart)</span></div>";
          newContent += "</div>";
          newContent += '<div class="menu-item-desciption col-md-7 pe-5">';
          newContent +=
            '<h3 class="menu-item-title">' +
            responseObject[catId].menu_items[i].name +
            "</h3>";
          newContent +=
            '<p class="menu-item-details">' +
            responseObject[catId].menu_items[i].description +
            "</p>";
          newContent += "</div>";
          newContent += "</div>";
          newContent += '<hr class="d-md-none">';
          newContent += "</div>";
        }
        newContent += "</div>";
        //Update the page with the new content
        document.getElementById("main-content").innerHTML = newContent;
      
      } else {
        alert("There was a problem with the request.");
      }
    }

  }
  // function loadSpecials() {
  //   if (httpRequest.readyState === XMLHttpRequest.DONE) {
  //     if (httpRequest.status === 200) {
  //       //Process JSON data here
  //       responseObject = JSON.parse(httpRequest.responseText);

  //       const categories = ["A","B","C","CM","CSR","CU","D","DK","DS","F","FR","FY","L","NF","NL","NS","PF","SO","SP","SR","SS","T","V","VG"];

  //       let catId = getRandomCat(categories);

  //       var catId = "C";
  //       var newContent = "";
  //       newContent +=
  //         '<h2 class="text-center">' +
  //         responseObject[catId].category.name +
  //         " menu </h2>";
  //       newContent +=
  //         '<div class="text-center">' +
  //         responseObject[catId].category.special_instructions +
  //         "</div>";
  //       newContent += '<div class="row mt-5 gy-5">';

  //       for (var i = 0; i < responseObject[catId].menu_items.length; i++) {
  //         newContent += '<div class="menu-item-tile col-lg-6">';
  //         newContent += '<div class="row">';
  //         newContent += '<div class="col-md-5">';
  //         newContent += '<div class="menu-item-photo position-relative">';
  //         newContent +=
  //           '<div class="text-center position-absolute bottom-0 end-0">' +
  //           responseObject[catId].menu_items[i].short_name +
  //           "</div>";
  //         newContent +=
  //           '<img src="Images/menu/' +
  //           catId +
  //           "/" +
  //           responseObject[catId].menu_items[i].short_name +
  //           '.jpg" class="w-100">';
  //         newContent += "</div>";
  //         newContent +=
  //           '<div class="menu-item-price mt-2">' +
  //           responseObject[catId].menu_items[i].price_small +
  //           "<span>(pint)</span>" +
  //           responseObject[catId].menu_items[i].price_large +
  //           "<span>(quart)</span></div>";
  //         newContent += "</div>";
  //         newContent += '<div class="menu-item-desciption col-md-7 pe-5">';
  //         newContent +=
  //           '<h3 class="menu-item-title">' +
  //           responseObject[catId].menu_items[i].name +
  //           "</h3>";
  //         newContent +=
  //           '<p class="menu-item-details">' +
  //           responseObject[catId].menu_items[i].description +
  //           "</p>";
  //         newContent += "</div>";
  //         newContent += "</div>";
  //         newContent += '<hr class="d-md-none">';
  //         newContent += "</div>";
  //       }
  //       newContent += "</div>";
  //       //Update the page with the new content
  //       document.getElementById("main-content").innerHTML = newContent;
        
  //     } else {
  //       alert("There was a problem with the request");
  //     }
  //   }
  // }
  // function getRandomCat(arr) {
    //return arr[Math.floor(Math.random() * arr.length)];
  //}
})();
