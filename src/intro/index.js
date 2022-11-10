import React from "react";
import reactDom from "react-dom";
import "./index.css";


class Card extends React.Component{
	render() {
		return (
			<div className="card">
				<div className="like">&lt;3</div>
				{this.props.smile}
				<h6>{this.props.text}</h6>
			</div>
		)
	}
}

const emotions = [
	{smile:"=)", description:"ы."},
	{smile:"0_o", description:"Ooo.."},
	{smile:"^_^", description:"Ммм ня"},
	{smile:"=(", description:"Уф"},
]

reactDom.render(
	<div className="wrapper">
		{/* v1 */}
		{/* <div className="card">=)</div>	
		<div className="card">O_o</div>	
		<div className="card">^_^</div>	
		<div className="card">=(</div>	 */}

		{/* v2 */}
		{/* <Card smile="=)" text="ы."/>
		<Card smile="0_o" text="Ooo.."/>
		<Card smile="^_^" text="Ммм ня"/>
		<Card smile="=(" text="Уф"/> */}

		{/* v3 */}
		{emotions.map((el,i) =><Card smile={el.smile} text={el.description} key={i}/>)}
	</div>,
	document.querySelector("#root")
)