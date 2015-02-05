var list = document.getElementById("kotwList"),
    kotw = [
      "Jenna Rangespike",
      "Neric Farthing",
      "Darkin Stonefield"
    ],
    element,
    fragment = document.createDocumentFragment();

  for (var i = 0, x = kotw.length; i < x; i++) {
    element = document.createElement("li");
    element.appendChild(document.createTextNode(kotw[i]));
    fragment.appendChild(element);
  }

  list.appendChild(fragment);