(function($) {
  $.fn.tagsearch = function(options) {
    var settings = $.extend(
      {
        // These are the defaults.
        tagsId: "",
        backgroundColor: "white"
      },
      options
    );

    //element list for specfig tag
    let tagElementList = [];

    //user enter a input
    this.on("keyup", function(event) {
      if (event.keyCode === 13) {
        let isCreateTag = false;
        let self = this;
        for (let i = 0; i < tagElementList.length; i++) {
          let eachEl = tagElementList[i];
          if (eachEl.value === self.value) {
            break;
          } else {
            isCreateTag = true;
            console.log(tagElementList.length - 1 + "====" + i);
            if (i === tagElementList.length - 1) {
              addTag(self);
              break;
            }
          }
        }
        tagElementList.length === 0 ? addTag(self) : false;
      }
    });

    function addTag(self) {
      //set id
      let id = guid();
      let tagElement = createTag(self.value, id);
      $("#" + settings.tagsId).append(tagElement);
      tagElementList.push({ id: id, value: self.value });
      //register remove element event handler
      removeElement(id);
      //setting null after register
      self.value = "";
    }

    //create tags
    function createTag(value, id) {
      let ahref = document.createElement("a");
      ahref.setAttribute("class", "badge badge-success ml-1 text-light px-1");
      ahref.innerHTML = value;
      let spanElement = document.createElement("span");
      spanElement.setAttribute("class", "badge badge-light");
      let icon = document.createElement("i");
      icon.setAttribute("class", "fa fa-times-circle");
      icon.setAttribute("id", id);
      spanElement.appendChild(icon);
      ahref.appendChild(spanElement);
      return ahref;
    }

    function removeElement(id) {
      $("#" + id).on("click", function() {
        //remove from List
        tagElementList = tagElementList.filter(function(el) {
          return el.id !== id;
        });
        //remove from DOM
        this.parentElement.parentElement.remove();
      });
    }

    function guid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
  };
})(jQuery);

$("a").tagsearch();
