import React from "react";

const ListItem = ({ idx, val,class_val }) =>(
    <div className={"card item " + class_val}>
        <p>{`${val}`}</p>
        <p className="index">{`${idx}`}</p>
    </div>
);

export default ListItem;