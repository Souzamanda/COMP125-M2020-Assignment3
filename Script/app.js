//File name: app.js
//Author's name: Amanda Cordeiro
//Website name: Amanda Puttomatti's Portfolio
//File description: JavaScript file

"use strict";

// IIFE - Immediately Ivoked Function Expression

(function()
{
    //Highlight the active link in the navbar
    function highLightActiveLink(id)
    {
       let navbarAnchors = document.querySelectorAll("li a");

        for (const anchor of navbarAnchors)
        {
            anchor.className = "nav-link";
        }
        for (const anchor of navbarAnchors)
        {
            let anchorString = anchor.getAttribute("id");

            if (id === anchorString)
            {
                anchor.className = "nav-link active";
            }
        }
    }

    //Form validation
    function validateForm()
    {
        let contactForm = document.getElementsByTagName("form")[0];

        contactForm.noValidate = true;
        let errorMessage = document.getElementById("errorMessage");
        
        //First Name validation
        let firstName = document.getElementById("firstName");
        firstName.addEventListener("blur", (event) =>
        {
            if(firstName.value.length < 2)
            {
                firstName.focus();
                errorMessage.hidden = false;
                errorMessage.textContent = "Please enter a valid first name. With at least 2 characters.";
            }
            else
            {
                errorMessage.hidden = true;
            }
        });

        //Last Name validation
        let lastName = document.getElementById("lastName");
        lastName.addEventListener("blur", (event) =>
        {
            if(lastName.value.length < 2)
            {
                lastName.focus();
                errorMessage.hidden = false;
                errorMessage.textContent = "Please enter a valid last name. With at least 2 characters.";
            }
            else
            {
                errorMessage.hidden = true;
            }
        });

        //Contact number validation
        let contactNumber = document.getElementById("contactNumber");
        contactNumber.addEventListener("blur", (event) =>
        {
            if(contactNumber.value.match(/^[(]{0,1}\d{3}[)]{0,1}[-\s\.]{0,1}\d{3}[-\s\.]{0,1}\d{4}$/))
            {
                errorMessage.hidden = true;
            }
            else
            {
                contactNumber.focus();
                errorMessage.hidden = false;
                errorMessage.textContent = "Please enter a valid contact number with 10 digits and no symbols";
            }
        });

        //Email validation
        let emailAdress = document.getElementById("emailAdress");
        emailAdress.addEventListener("blur", (event) =>
        {
            if(emailAdress.value.match(/^([^\.-_])([\w\.-]+)@([a-zA-Z0-9-]+).([a-z]){2,4}(\.[a-z]{2,4})$/))
            {
                errorMessage.hidden = true;
            }
            else
            {
                emailAdress.focus();
                errorMessage.hidden = false;
                errorMessage.textContent = "Please enter a valid email address";
            }
        });

        //Submit alert
        let submitButton = document.getElementById("submitButton");
        submitButton.addEventListener("click", (event) =>
        {
            event.preventDefault();
            
            
            setPageContent("Home");
        });

        return true;
    }

    //Insert content into pages
    function setPageContent(id)
    {
        document.title = id;
        window.history.pushState("", id, `/${id.toLowerCase()}`);
        
        highLightActiveLink(id);

        //Content switcher
        switch(id)
        {
            case "Home":
                homeContent();
                break;
            case "Projects":
                projectsContent()
                break;
            case "Contact":
                contactContent();
                break;
        }

        loadFooter();
    }

    //Insert the header and initialize the setPageContent function
    function initializeSite()
    {
        // Create XHR object
        let XHR = new XMLHttpRequest();

        // Configure the message
        XHR.open("GET", "./Views/partials/header.html");

        // Execute the request
        XHR.send();

        // Register readystate event
        XHR.addEventListener("readystatechange", function(){
            if((XHR.readyState === 4) && (XHR.status === 200))
            {
                let header = document.getElementsByTagName("header")[0];
                let headerData = XHR.responseText;
                header.innerHTML = headerData;

                setPageContent("Home");

                let navLinks = document.querySelectorAll("a");
                for (const link of navLinks) 
                {
                    link.addEventListener("click", (event) => {
                        event.preventDefault();

                        let id = link.getAttribute("id");
                        setPageContent(id);
                    });                   
                }

            }
        });
    }

    //Insert the footer
    function loadFooter()
    {
        // Create XHR object
        let XHR = new XMLHttpRequest();

        // Configure the message
        XHR.open("GET", "./Views/partials/footer.html");

        // Execute the request
        XHR.send();

        // Register readystate event
        XHR.addEventListener("readystatechange", function(){
            if((XHR.readyState === 4) && (XHR.status === 200))
            {
                let footer = document.getElementsByTagName("footer")[0];
                let footerData = XHR.responseText;
                footer.innerHTML = footerData;
            }
        });
    }

    //Insert all content for Home page
    function homeContent()
    {
        // Create XHR object
        let XHR = new XMLHttpRequest();

        // Configure the message
        XHR.open("GET", "./Views/content/home.html");

        // Execute the request
        XHR.send();

        // Register readystate event
        XHR.addEventListener("readystatechange", function(){
            if((XHR.readyState === 4) && (XHR.status === 200))
            {
                let main = document.getElementsByTagName("main")[0];
                let mainData = XHR.responseText;
                main.innerHTML = mainData;
            }
        });

        //Inserts the paragraph About Me
        // Create XHR object
        let XHRR = new XMLHttpRequest();
        
        // Configure the message
        XHRR.open("GET", "./Data/paragraphs.json");
        
        // Execute the request
        XHRR.send();
        
        // Register readystate event
        XHRR.addEventListener("readystatechange", function(){
            if((XHRR.readyState === 4) && (XHRR.status === 200))
            {
                let paragraphDataFile = JSON.parse(XHRR.responseText);
                let paragraphs = paragraphDataFile.paragraphs;

                console.log(paragraphs)
                let paragraphList = [];
                
                for (const record of paragraphs) 
                {
                    let phrase = new objects.Paragraphs();
                    phrase.setParagraphs(record);
                    paragraphList.push(phrase);
                }

                console.log(paragraphList);

                let aboutMeJumbotron = document.getElementById("aboutMeJumbotron");
                let personalMissonParagraph = document.createElement("p");
                personalMissonParagraph.innerHTML = `${paragraphList[0].paragraph}`;
                personalMissonParagraph.setAttribute("class", "lead")
                aboutMeJumbotron.appendChild(personalMissonParagraph);
                
            }
        });
    }

    //Insert all content for Projects page
    function projectsContent()
    {
        console.log ("Projects Content loading...")
        // Create XHR object
        let XHR = new XMLHttpRequest();

        // Configure the message
        XHR.open("GET", "./Views/content/projects.html");

        // Execute the request
        XHR.send();

        // Register readystate event
        XHR.addEventListener("readystatechange", function(){
            if((XHR.readyState === 4) && (XHR.status === 200))
            {
                let main = document.getElementsByTagName("main")[0];
                let mainData = XHR.responseText;
                main.innerHTML = mainData;
            }
        });

        //Insert all paragraphs for the projects page
        // Create XHR object
        let XHRR = new XMLHttpRequest();
        
        // Configure the message
        XHRR.open("GET", "./Data/paragraphs.json");
        
        // Execute the request
        XHRR.send();
        
        // Register readystate event
        XHRR.addEventListener("readystatechange", function(){
            if((XHRR.readyState === 4) && (XHRR.status === 200))
            {
                let paragraphDataFile = JSON.parse(XHRR.responseText);
                let paragraphs = paragraphDataFile.paragraphs;

                console.log(paragraphs)
                let paragraphList = [];
                
                for (const record of paragraphs) 
                {
                    let phrase = new objects.Paragraphs();
                    phrase.setParagraphs(record);
                    paragraphList.push(phrase);
                }

                console.log(paragraphList);

                //First project paragraph
                let firstParagraph = document.getElementById("firstParagraph");
                let firstProjectParagraph = document.createElement("p");
                firstProjectParagraph.innerHTML = `${paragraphList[1].paragraph}`;
                firstProjectParagraph.setAttribute("class", "lead")
                firstParagraph.appendChild(firstProjectParagraph);

                //Second project paragraph
                let secondParagraph = document.getElementById("secondParagraph");
                let secondProjectParagraph = document.createElement("p");
                secondProjectParagraph.innerHTML = `${paragraphList[2].paragraph}`;
                secondProjectParagraph.setAttribute("class", "lead")
                secondParagraph.appendChild(secondProjectParagraph);

                //Third project paragraph
                let thirdParagraph = document.getElementById("thirdParagraph");
                let thirdProjectParagraph = document.createElement("p");
                thirdProjectParagraph.innerHTML = `${paragraphList[2].paragraph}`;
                thirdProjectParagraph.setAttribute("class", "lead")
                thirdParagraph.appendChild(thirdProjectParagraph);
                
            }
        });
    }

    //Insert all content for Contact page
    function contactContent()
    {
        console.log ("Contact Content loading...")
        // Create XHR object
        let XHR = new XMLHttpRequest();

        // Configure the message
        XHR.open("GET", "./Views/content/contact.html");

        // Execute the request
        XHR.send();

        // Register readystate event
        XHR.addEventListener("readystatechange", function(){
            if((XHR.readyState === 4) && (XHR.status === 200))
            {
                let main = document.getElementsByTagName("main")[0];
                let mainData = XHR.responseText;
                main.innerHTML = mainData;
                validateForm();
            }
        });
    }


    function Start ()
    {
        console.log('%cAssignment 3', "color:purple; font-size: 24px;");
       
        initializeSite();

    }

    window.addEventListener("load", Start);

})();