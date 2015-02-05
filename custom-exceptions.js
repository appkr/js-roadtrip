function changeInnerHtmlByIdOrExisting(id, update, existing) {
  var newElement = undefined;

  try {
    document.getElementById(id).innerHTML = update;
  } catch(error) {
    try {
      var elements = document.getElementByTagName("*");

      for(var i = 0, x = elements.length; i < x; i++) {
        if(elements[i].innerHTML === existing) {
          elements[i].innerHTML = update;
          id = elements[i].id;
          break;
        }

        if(i === x) {
          throw new Error("An existing element was not found.");
        }
      }
    } catch(error2) {
      alert(error2.message + "\nCreating new text node.");
      newElement = document.createTextNode(update);
    }
  } finally {
    if(newElement !== undefined) {
      console.log("Returning new text node...");
      return newElement;
    } else {
      console.log("Modified element '" + (id || existing) + "' with inner HTML '" + update +"'.");
    }
  }
}

/** test */
changeInnerHtmlByIdOrExisting("age", "Age: 35", "Age: 34");
changeInnerHtmlByIdOrExisting("wrongId", "Age: 36", "Age: 35");
changeInnerHtmlByIdOrExisting("notExistingElement", "Age: 37", "Age: 00");