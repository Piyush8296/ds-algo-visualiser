import React, { Component } from 'react';
import { random_int_between_range } from "../../utils/random_int_between_range"; // able to generate random numbers specified between a certain range
import ListItem from "../list_item" // a card  getting displayed for each array item

const ELEMENT_COUNT = 15; //total length of array
const MIN_VAL = 6; // minimum value in an array
const MAX_VAL = 900; // max value in an array

export default class LinearSearch extends Component {

	constructor(props) {
        super(props);

        this.state = {
            list_of_numbers: [], //array in which item is to searched
            classes:[], // just for visualisations
            item_to_be_searched:0, // search item
            message:"", // messagee if item found or not
            item_found:false, // toggle message display
            element_pos:-1 // index at which that item was found
        };

        this.submit = this.submit.bind(this);
        this.perform_linear_search = this.perform_linear_search.bind(this);
        this.generate_or_reset_list = this.generate_or_reset_list.bind(this);
    }

    // creates random list of array and also resets the visual state using css
    generate_or_reset_list(){
    	const list = [];
    	const classes = [];

    	for (let i = 0; i < ELEMENT_COUNT; i++) {
            list.push(random_int_between_range(MIN_VAL, MAX_VAL));
            classes.push("none")
        }

        this.setState({ list_of_numbers:list,classes});
    }

    //responsible for user input, getting a search item from a user
    handleChange(event) {
	  	this.setState({item_to_be_searched: event.target.value});
	}

	// will be responsible for making a search after a click by user
	submit(){
		const classes = []
		for (let i = 0; i < ELEMENT_COUNT; i++) {
            classes.push("none")
        }

        this.setState({classes});

		this.setState({item_found:false,message:``})
		const search_data = this.perform_linear_search(this.state.list_of_numbers,this.state.item_to_be_searched)
		
		if(search_data == null){
			this.animate_search_visual(ELEMENT_COUNT,this.state.item_to_be_searched,false)
		}else{
			this.animate_search_visual(search_data["i"],this.state.item_to_be_searched,true)
		}
	}

	// helps in showing the search visually, by changing CSS classes for elements
	animate_search_visual(length,item,found){
		for (let i = 0; i < length+1; i++) {

			setTimeout(()=>{
				
				this.setState({item_found:true})

				if(i < length){
					this.state.classes[i] = "not_found"
				}

				if(i == length){
					if(found){
						this.state.classes[i] = "found"
						this.setState({message:`Value ${item} found at index ${i}`,element_pos:i})
					}else{
						this.state.classes[i] = "not_found"
						this.setState({item_found:true,message:`List does not contain any value ${item}`,element_pos:-1})
					}
				}
			},(i+1)*1000)
		}
	}

	// returns the specifc item and index if element is present, else null
	perform_linear_search(arr,item){
		for (var i = 0; i < arr.length; i++) {
		    if (arr[i] == item) {
		    	return {i,item};
		    }
		}

		return null;
	}

    componentDidMount() {
        this.generate_or_reset_list();
    }

	render() {
	    return(
	      <div>
	      	<div className="header">
	      		<p>Linear Search</p>
	      	</div>

	      	<div className="actions">
	      		<input type="number" onChange={this.handleChange.bind(this)} value={this.state.item_to_be_searched} />
	      		<button onClick={this.submit}>
			      Search
			    </button>

			    <button className="reset" onClick={this.generate_or_reset_list}>
			      Reset
			    </button>
	      	</div>

	      	<div className="container">
	      		<div className="card item">
	      			<p>Value</p>
	      			<p className="index">Index</p>
	      		</div>
                {this.state.list_of_numbers.map((value, idx) => (
                    <ListItem
                        key={idx}
                        idx={idx}
                        val={value}
                        class_val={this.state.classes[idx]}
                    />
                ))}
            </div>

            <div>
            	{this.state.item_found ? (
                    <p className="msg">
                        {this.state.message}
                    </p>
                ) : null}
            </div>
	      </div>
	    )
	}
}
