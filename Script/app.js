//File name: app.js
//Author's name: Amanda Cordeiro
//Website name: Amanda Puttomatti's Portfolio
//File description: JavaScript file

"use strict";

// IIFE - Immediately Ivoked Function Expression

(function()
{
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
            if(contactNumber.value.match(/^\d{10}$/))
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
            if(emailAdress.value.match(/^([^\.-_])([\w\.-]+)@([a-zA-Z0-9-]+).([a-z]){2,4}(\.[a-z]{2,4})?$/))
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
            
            
            window.location="index.html";
        });

        return true;
    }

    function setPageContent(id)
    {
        document.title = id;
        window.history.pushState("", id, "/"+id.toLowerCase());
        
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

    function homeContent()
    {
        console.log ("Home Content loading...")
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
    }

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
    }

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

    //Paragraphs in jumbotron
    function addParagraphsToJumbotron() 
    {
        
        //Paragraph About Me
        // Create XHR object
        let XHR = new XMLHttpRequest();
        
        // Configure the message
        XHR.open("GET", "./Data/paragraphs.json");
        
        // Execute the request
        XHR.send();
        
        // Register readystate event
        XHR.addEventListener("readystatechange", function(){
            if((XHR.readyState === 4) && (XHR.status === 200))
            {
                let paragraphDataFile = JSON.parse(XHR.responseText);
                let paragraphs = paragraphDataFile.paragraphs;

                console.log(paragraphs)
                let paragraphList = [];
                
                for (const record of paragraphs) 
                {
                    let phrase = new objects.Paragraphs();
                    phrase.setParagraphs(record);
                    paragraphList.push(phrase);
                }
            
                let personalMissonParagraph = document.createElement("p");
                personalMissonParagraph.innerHTML = `${paragraphList[0].paragraph}`;
                personalMissonParagraph.setAttribute("class", "lead")
                aboutMeJumbotron.appendChild(personalMissonParagraph);
                
            }
        });

        /*              
let firstParagraph = document.getElementById("firstParagraph");
                let firstProjectParagraph = document.createElement("p");
                firstProjectParagraph.innerHTML = `${paragraphList[0].paragraph}`;
                firstProjectParagraph.setAttribute("class", "lead");
                firstParagraph.appendChild(firstProjectParagraph); */
        /* let aboutMeJumbotron = document.getElementById("aboutMeJumbotron");
        if (aboutMeJumbotron) 
        {
        }

        //Paragraph of First Project
        let firstParagraph = document.getElementById("firstParagraph");
        if (firstParagraph) 
        {
            let firstProjectParagraph = document.createElement("p");
    
            firstProjectParagraph.textContent =
                `
                This is a logo that I developed for my mother's business. 
                It means "Seven Colors" and represents the rainbow colors
                `;
    
            firstProjectParagraph.setAttribute("class", "lead");
           
            firstParagraph.appendChild(firstProjectParagraph);

        }*/
/*
        //Paragraph of second Project
        let secondParagraph = document.getElementById("secondParagraph");
        if (secondParagraph) 
        {
            let secondProjectParagraph = document.createElement("p");
    
            secondProjectParagraph.textContent =
                `
                This other project was a logo that I developed for my old business.
                I used to develop and sell custom buttons with my husband back in or homecountry.
                `;
    
            secondProjectParagraph.setAttribute("class", "lead");
           
            secondParagraph.appendChild(secondProjectParagraph);
        }

        //Paragraph of third Project
        let thirdParagraph = document.getElementById("thirdParagraph");
        if (thirdParagraph) 
        {
            let thirdProjectParagraph = document.createElement("p");
    
            thirdProjectParagraph.textContent =
                `
                This last logo was for a friend's brewry. 
                It was draw directly on computer with a drawing tablet.
                `;
    
            thirdProjectParagraph.setAttribute("class", "lead");
           
            thirdParagraph.appendChild(thirdProjectParagraph);
        } */

    }

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

                highLightActiveLink();
            }
        });
    }

    function Start ()
    {
        console.log('%cApp has started...', "color:purple; font-size: 24px;");
       
        initializeSite();

        /* let paragraph = addParagraphsToJumbotron();
        if(paragraph) 
        {
            console.log("Successfully added paragraphs to jumbotron");
        }
        else
        {
            console.warn("Content not added to jumbotron - does not exist");
        } */

    }

    window.addEventListener("load", Start);

})();