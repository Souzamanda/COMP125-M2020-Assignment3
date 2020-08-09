//File name: paragraphs.js
//Author's name: Amanda Cordeiro
//Website name: Amanda Puttomatti's Portfolio
//File description: JavaScript file to read the paragraphs from JSON file

// IIFE module
"use strict";
let objects;
(function(objects)
{
    class Paragraphs 
    {
        setParagraphs(JSON_Data)
        {
            this.paragraph = JSON_Data.paragraph;
        }
    }
    objects.Paragraphs = Paragraphs;

}(objects || (objects = {})));