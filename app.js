const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
       if(entry.isIntersecting) {
        entry.target.classList.add('show');
       } else {
        entry.target.classList.remove('show');
       }
    });
});

const slideInElements = document.querySelectorAll('.hidden');

slideInElements.forEach((el) => observer.observe(el));



const moveableText = document.querySelector('.moveable-text');
const letters = Array.from(moveableText.textContent);

moveableText.innerHTML = letters.map(letter => `<span class="moveable-letter">${letter}</span>`).join('');

const moveableLetters = document.querySelectorAll('.moveable-letter');

moveableLetters.forEach((letter, index) => {
    letter.style.color = `hsl(${(index * 5) % 360},100%,50%)`;
});


document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    moveableLetters.forEach((letter, index) => {
        const letterRect = letter.getBoundingClientRect();
        const letterX = letterRect.left + letterRect.width / 2;
        const letterY = letterRect.top + letterRect.height / 2;

        const deltaX = mouseX - letterX;
        const deltaY = mouseY - letterY;

        letter.style.color = `hsl(${(deltaX * 0.1) % 360},100%,50%)`;
    });
});

const targets = [
        document.getElementById('section1'),
        document.getElementById('section2'),
        document.getElementById('section3'),
        document.getElementById('section4')
    ];
const scrollSpeed = 0.04;

document.addEventListener('scroll', (e) => {
    moveableLetters.forEach((letter, index) => {
        const letterRect = letter.getBoundingClientRect();
        const letterY = letterRect.top + letterRect.height / 2;
        const windowY = Math.max((window.innerHeight / 2), letterY);
        const deltaY = Math.min((windowY - letterY) * 0.01, 8);
        letter.style.fontSize = `${Math.min(Math.max(8-deltaY, 4), 7)}vw`
        if(index == 0)
        console.log(letter.style.fontSize);
    });

    const scrollY = window.scrollY;

        // Calculate the position to scroll towards based on the closest target.
        const target = targets.reduce((closest, current) => {
            const currentY = current.getBoundingClientRect().top;
            return Math.abs(currentY) < Math.abs(closest) ? currentY : closest;
        }, Infinity);

        // Smoothly scroll towards the target position.
        window.scrollBy(0, target * scrollSpeed);
});

// Blend two colors in the HSL space
function blendColors(color1, color2, factor) {

    const factor2 = 1 - factor;

  // Calculate the average HSL values
  const newColor = [
    ((color1[0] * factor) + (color2[0] * factor2)), // Average hue
    ((color1[1] * factor) + (color2[1] * factor2)), // Average saturation
    ((color1[2] * factor) + (color2[2] * factor2)), // Average lightness
  ];

  // Convert the blended color color back to HEX
  return newColor;
}

const typeOverser = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
       if(entry.isIntersecting) {
        show(entry.target);
       } else {
        entry.target.textContent = "";
       }
    });
});

const typeIn = document.querySelectorAll('.type');

typeIn.forEach((el) => {
    typeOverser.observe(el);
    el.textGoal = el.textContent;
    el.textContent = "";
});

let isAnimating = false;

function show(el) {
    let i = 0;
    const textGoal = el.textGoal;

    function addUnderscore() {
        if (i < 3) {
            el.textContent = i % 2 == 0 ? "_" : " ";
            i++;
            setTimeout(addUnderscore, 400); // Adjust the delay time (in milliseconds) as needed
        } else {
            // Animation is complete, you can remove the underscore or perform another action here.
            i = 0;
            type();
        }
    }

    let charactersSineLastStop = 0;

    function type() {
        if (i < textGoal.length) {
            el.textContent = textGoal.substring(0, i) + "_";
            if(textGoal.substring(i-1,i) == " ") {
                charactersSineLastStop = 0;
                setTimeout(type, 120); // Adjust the delay time (in milliseconds) as needed
            } else if(textGoal.substring(i-1,i) == ":") {
                charactersSineLastStop = 0;
                setTimeout(type, 300); // Adjust the delay time (in milliseconds) as needed
             } else {
                charactersSineLastStop++;
                setTimeout(type, 100 - (charactersSineLastStop * 10)); // Adjust the delay time (in milliseconds) as needed
             }
            i++;
        } else {
            // Animation is complete, you can remove the underscore or perform another action here.
            el.textContent = textGoal;
            isAnimating = false;
        }
    }

    if(!isAnimating) {
        isAnimating = true;
        addUnderscore();
    }
}
