/**
 * Defines the filter options for the search.
 *
 */
import React, {Component} from 'react';
import Rater from 'react-rater'

function rater(num){
    return (<Rater interactive={false} rating={num}/>);
}

const filterOptions =
    {
        states: [
            {
                id: 1,
                title: "New",
                value: "New"
            },
            {
                id: 2,
                title: "As New",
                value: "As New"
            },
            {
                id: 3,
                title: "Normal Use",
                value: "Normal Use"
            },
            {
                id: 4,
                title: "Readable",
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
            },
        ]
    }
    ;

export default filterOptions;
