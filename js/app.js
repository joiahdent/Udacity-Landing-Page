/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const totSections = 4; // tot sections
const sections = []; // global structure for sections
let currentActiveSection; // contain object reference to current section
let currentActiveNavItem; // contain object reference to current navbar item
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * @description Add section object to global data structure
 * @param {number} pSectionNum - section number
 * @param {string} pSectionName  - section name
 * @param {string} pSectionDataNav - section data-nav attribute
 * @param {string} pSectionContentHeader - section div h2 content
 * @param {string} pSectionContentParagraph1 - section div first  paragraph content
 * @param {string} pSectionContentParagraph2 - section div second paragraph content
 */
function addSectionToDataStructure(pSectionNum, pSectionName, pSectionDataNav, pSectionContentHeader, pSectionContentParagraph1, pSectionContentParagraph2){
    const sectionObj = {
        sectionNum : pSectionNum,
        sectionName : pSectionName,
        sectionDataNav : pSectionDataNav,
        sectionContentHeader : pSectionContentHeader,
        sectionContentParagraph1 : pSectionContentParagraph1,
        sectionContentParagraph2 : pSectionContentParagraph2
    };
    sections.push(sectionObj);
}

/**
 * @description Init section struct adding sample content
 */
function initStruct() {
    for (let i = 0; i < totSections; i++) {
        addSectionToDataStructure( (i + 1), 
                                  'section', 
                                  'Section ' + (i + 1),
                                  'Section ' + (i + 1),
                                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.',
                                  'Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.');
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/**
 * @description Read from global struct and add sections to main tag in document body
 */    
function addSectionsToMain(){
    
    let sectionElement;

    sections.forEach((objSection, index) => {

        // section element
        sectionElement = document.createElement('section');
        sectionElement.setAttribute('id',objSection.sectionName + objSection.sectionNum);
        sectionElement.setAttribute('data-nav',objSection.sectionDataNav);
        
        // first element is active 
        if (index == 0){
            sectionElement.classList.add('your-active-class');
        }

        // setting div element 
        let divElement = document.createElement('div');
        divElement.classList.add('landing__container');
        
        // h2 child div
        let h2Element = document.createElement('h2');
        h2Element.innerText = objSection.sectionContentHeader;
        divElement.appendChild(h2Element);

        // p child div
        let pElement1 = document.createElement('p');
        pElement1.innerText = objSection.sectionContentParagraph1;
        divElement.appendChild(pElement1);
        let pElement2 = document.createElement('p');
        pElement2.innerText = objSection.sectionContentParagraph2;
        divElement.appendChild(pElement2);

        sectionElement.appendChild(divElement);

        document.querySelector('main').appendChild(sectionElement);
    });

}

/**
 * @description Read from global struct and add item to navigation bar
 */
function initNav(){
    let navBar;
    let liElement;
    sections.forEach( (element) => {
        navBar = document.getElementById("navbar__list");
        liElement = document.createElement('li');
        liElement.setAttribute('id','listItem' + element.sectionNum);
        liElement.setAttribute('data-section', element.sectionDataNav);
        liElement.classList.add('menu__link');
        liElement.innerHTML = `<a href="#${element.sectionName}${element.sectionNum}">${element.sectionDataNav}</a>`;
        navBar.appendChild(liElement);
    });
}

/**
 * @description Add class 'active' to section when near top of viewport
 */
function scrollCallBack(){
    
    let sectionRect;

    sections.forEach( (sectionElement) => {
        sectionRect = document.querySelector(`#${sectionElement.sectionName}${sectionElement.sectionNum}`).getBoundingClientRect();
        
        // console.log(`${sectionElement.sectionNum}, top: ${sectionRect.top}, bottom: ${sectionRect.bottom}, left: ${sectionRect.left}, right: ${sectionRect.right}, width: ${sectionRect.width}, height: ${sectionRect.height}`);

        if (!(sectionRect.top < 0) && (sectionRect.top <= 130)){
            // console.log(`#${sectionElement.sectionName}${sectionElement.sectionNum} VISIBLE`);

            // section 
            if (currentActiveSection){
                currentActiveSection.classList.remove('your-active-class');
            }
            currentActiveSection = document.querySelector(`#${sectionElement.sectionName}${sectionElement.sectionNum}`);
            currentActiveSection.classList.add('your-active-class');

            // nav bar item
            if (currentActiveNavItem){
                currentActiveNavItem.classList.remove('menu__active');    
            }
            currentActiveNavItem = document.querySelector(`#listItem${sectionElement.sectionNum}`);
            currentActiveNavItem.classList.add('menu__active');

        }

    });
}

 /**
  * @description Scroll to anchor ID using scrollTO event
  * @param {event} event 
  */
function scrollToSection(event) {

    event.preventDefault(); // Prevent the default link behavior

    const targetId = this.getAttribute('href'); // Get the target section ID
    const targetSection = document.querySelector(targetId); // Find the target section

    // Scroll smoothly to the target section
    targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

}

/**
 * @description called when DOMContentLoaded event is raised
 */
function domContentLoaded(){
    
    // init global struct with sample data
    initStruct();

    // Build menu 
    initNav();

    // Add sections to main element
    addSectionsToMain();

    // Set scroll to section on link click
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', scrollToSection);
    });

    // Set scroll event listener
    document.addEventListener('scroll', scrollCallBack);

    // Set sections as active
    if (sections.length > 0){
        currentActiveSection = document.querySelector(`#${sections[0].sectionName}${sections[0].sectionNum}`);
        currentActiveSection.classList.add('your-active-class');
    }

}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// do it after DOM content is loaded
document.addEventListener('DOMContentLoaded', domContentLoaded);


/**
 * End Events
 * 
*/
const button = document.querySelector('.btn');

const displayButton = () => {
  window.addEventListener('scroll', () => {
    console.log(window.scrollY);
  
    if (window.scrollY > 100) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  });
};

const scrollToTop = () => {
  button.addEventListener("click", () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    }); 
    console.log(event);
  });
};

displayButton();
scrollToTop();