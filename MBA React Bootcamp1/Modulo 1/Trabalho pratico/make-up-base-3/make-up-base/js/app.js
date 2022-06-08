const baseUrl = "http://makeup-api.herokuapp.com/";
var filterbrandUrl;
var filtertypeUrl;
var filterall = "";
//EXEMPLO DO CÓDIGO PARA UM PRODUTO
function productItem(product) {
  const item = `<div
  class="product"
  data-name="${product.name}"
  data-brand="${product.brand}"
  data_type="${product.product_type}"
  tabindex="${product.id}"
  style="display: block">
  <figure class="product-figure">
    <img
      src="${product.image_link}"
      width="215"
      height="215"
      alt="${product.name}"
      onerror="javascript:this.src='img/unavailable.png'"
    />
  </figure>
  <section class="product-description">
    <h1 class="product-name">
      ${product.name}
    </h1>
    <div class="product-brands">
      <span class="product-brand background-brand">${product.brand}</span>
      <span class="product-brand background-price">R$ ${product.price}</span>
    </div>
  </section>
  ${loadDetails(product)}
</div>`;
  return item;
}

//EXEMPLO DO CÓDIGO PARA OS DETALHES DE UM PRODUTO
function loadDetails(product) {
  let pricenew = (parseFloat(product.price) * 5.5).toFixed(2);
  //console.log(pricenew);
  let details = `<section class="product-details"><div class="details-row">
        <div>Brand</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.brand}</div>
        </div>
      </div><div class="details-row">
        <div>Price</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${pricenew}</div>
        </div>
      </div><div class="details-row">
        <div>Rating</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.rating}</div>
        </div>
      </div><div class="details-row">
        <div>Category</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.category}</div>
        </div>
      </div><div class="details-row">
        <div>Product_type</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.product_type}</div>
        </div>
      </div></section>`;
  return details;
}

function renderTable(products) {
  let rows = products.map((product) => {
    return productItem(product);
  });

  return `<table>${rows.join("")}</table>`;
}

function solution1(filter, namefilter, order) {
  //console.log(`${baseUrl}api/v1/products.json${filter}`);
  let ProductsPromise = fetch(`${baseUrl}api/v1/products.json${filterall}`);
  ProductsPromise.then((r1) => {
    r1.json().then((products) => {
      //console.log(namefilter);
      var productOrder = products;
      if (namefilter) {
        productOrder = products.filter((item) => {
          console.log(item.name);
          let nome = item.name
            .replace(/(\r\n|\n|\r)/gm, "")
            .trim()
            .toUpperCase();
          //console.log(nome);
          if (nome.startsWith(namefilter.toUpperCase())) {
            return item;
          }
        });
      }
      function checkifnull(valor) {
        if (valor !== null) {
          return valor;
        } else {
          return "";
        }
      }
      function checkifnullnumber(valor) {
        if (valor !== null) {
          return valor;
        } else {
          return 0;
        }
      }
      productOrder = productOrder.map((product) => {
        product.brand = checkifnull(product.brand);
        product.product_type = checkifnull(product.product_type);
        product.category = checkifnull(product.category);
        product.rating = checkifnullnumber(product.rating);
        product.price = checkifnullnumber(product.price);
        return product;
      });

      productOrder = productOrder.sort((i1, i2) => {
        let item1 = i1.name.toUpperCase(); //.replace(" ", "");
        let item2 = i2.name.toUpperCase(); //.replace(" ", "");
        let item3 = parseFloat(i1.rating);
        let item4 = parseFloat(i2.rating);
        let item5 = parseFloat(i1.price);
        let item6 = parseFloat(i2.price);
        console.log(`order ${order}`);
        if (order == 4) {
          if (item1 < item2) {
            return -1;
          } else if (item1 > item2) {
            return 1;
          } else {
            return 0;
          }
        } else if (order == 5) {
          if (item1 > item2) {
            return -1;
          } else if (item1 < item2) {
            return 1;
          } else {
            return 0;
          }
        } else if (order == 1) {
          if (item3 > item4) {
            return -1;
          } else if (item3 < item4) {
            return 1;
          } else {
            return 0;
          }
        } else if (order == 2) {
          if (item5 < item6) {
            return -1;
          } else if (item5 > item6) {
            return 1;
          } else {
            return 0;
          }
        } else if (order == 3) {
          if (item5 > item6) {
            return -1;
          } else if (item5 < item6) {
            return 1;
          } else {
            return 0;
          }
        }
      });
      //let div = renderTable(products);
      let div = renderTable(productOrder);
      document.getElementById("catalog").innerHTML = div;
    });
  });
}

var select3 = document.getElementById("sort-type");

solution1("", "", select3.value);

var select1 = document.getElementById("filter-brand");

select1.addEventListener("change", function () {
  var selectvalue = select1.value;
  filterbrandUrl = selectvalue;
  //console.log(selectvalue);
  if (!selectvalue) {
    filterall = "";
  } else if (filtertypeUrl) {
    //solution1(`?brand=${selectvalue}&product_type=${filtertypeUrl}`);
    filterall = `?brand=${selectvalue}&product_type=${filtertypeUrl}`;
  } else {
    filterall = `?brand=${selectvalue}`;
    //solution1(`?brand=${selectvalue}`);
  }
  solution1("");
});

var select2 = document.getElementById("filter-type");

select2.addEventListener("change", function () {
  let selectvalue = select2.value;
  filtertypeUrl = selectvalue;
  //console.log(select2.value);
  if (!selectvalue) {
    filterall = "";
  } else if (filterbrandUrl) {
    //solution1(`?product_type=${selectvalue}&brand=${filterbrandUrl}`);
    filterall = `?product_type=${selectvalue}&brand=${filterbrandUrl}`;
  } else {
    //solution1(`?product_type=${selectvalue}`);
    filterall = `?product_type=${selectvalue}`;
  }
  solution1("");
});

var nameProduct = document.getElementById("filter-name");

nameProduct.addEventListener("input", withDelay(onQueryChange, 500));

function onQueryChange() {
  //console.log(nameProduct.value);
  if (!nameProduct.value) {
    solution1("");
  } else {
    solution1("", nameProduct.value);
  }
  //search(input.value);
}

function withDelay(fn, delay) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
  };
}

//async function search(query) {
//  if (query) {
//    const employees = await fetch(
//      `http://localhost:3000/employees?q=${encodeURIComponent(query)}`
//    ).then((r) => r.json());
//    ul.innerHTML = employees
//      .map((employee) => `<li>${employee.name}</li>`)
//      .join("");
//  } else {
//    ul.innerHTML = "";
//  }
//}

select3.addEventListener("change", function () {
  let selectvalue = select3.value;
  console.log(select3.value);
  solution1("", "", selectvalue);
  //  if (!selectvalue) {
  //    solution1("");
  //  } else {
  //    solution1(`?product_type=${selectvalue}`);
  //  }
});
