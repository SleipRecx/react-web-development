/**
 * This file defines the filter options for the search.
 */
import React from 'react';
import Rater from 'react-rater'
import label_converter from '../data/label_converter';

/**
 * Converts a integer rating to a rating represented as stars.
 * @param num --> a rating as an int
 * @returns {XML}
 */
function rater(num){
    return (<Rater interactive={false} rating={num}/>);
}

/**
 * Holds all available filter options for the book search.
 * @type {{states: *[], user_ratings: *[]}}
 */
const filterOptions =
    {
        states: [
            {
                id: 1,
                title: <span className={"label label-" + label_converter("New")} >New</span>,
                value: "New"
            },
            {
                id: 2,
                title: <span className={"label label-" + label_converter("As New")} >As New</span>,
                value: "As New"
            },
            {
                id: 3,
                title: <span className={"label label-" + label_converter("Normal Use")} >Normal Use</span>,
                value: "Normal Use"
            },
            {
                id: 4,
                title: <span className={"label label-" + label_converter("Readable")} >Readable</span>,
                value: "Readable"
            }
        ],
        user_ratings: [
            {
                id: 1,
                title: rater(5),
                value: 5
            },
            {
                id: 2,
                title: rater(4),
                value: 4
            },
            {
                id: 3,
                title: rater(3),
                value: 3
            },
            {
                id: 4,
                title: rater(2),
                value: 2
            },
            {
                id: 5,
                title: rater(1),
                value: 1
            },
            {
                id: 6,
                title: rater(0),
                value: 0
            }
        ]
    }
    ;

export default filterOptions;
