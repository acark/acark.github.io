class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const current = this.wordIndex % this.words?.length;

    const fullText = this.words?.[current];

    if (this.isDeleting) {
      this.txt = fullText.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullText.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class="animated-txt">${this.txt}</span>`;

    //type speed
    let typeSpeed = 300;
    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    //pause effect at the end
    if (!this.isDeleting && this.txt === fullText) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      typeSpeed = 500;
      this.isDeleting = false;
      this.wordIndex++;
    }

    setTimeout(() => {
      this.type?.();
    }, typeSpeed);
  }
}

document.addEventListener("DOMContentLoaded", init);

function init() {
  const txtElement = document.querySelector(".hero-title");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");

  //init the type write
  new TypeWriter(txtElement, words, wait);
}
