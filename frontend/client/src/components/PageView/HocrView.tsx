import Page from "../../types";
import "./HocrView.css";
import { Dispatch, useState} from "react";
import {setHoverId} from "../../reducer/actions";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { renderToString } from 'react-dom/server';

export interface Props {
	page: Page | null;
	width: int;
	height: int;
	hoverId: string;
	dispatch: Dispatch<AppReducerAction>;
}

function HocrView({ page, hoverId, dispatch }: Props) {
	const [value, setValue] = useState('');
	
	const valueAdded = (value) => {
		console.log(value);
		setValue(value);
	};


	if (page == null) {
		return <div></div>;
	}

	const RenderWord = (wordarray, hoverId) => {
		if (!wordarray) {
			return;
		}
		const handleHover = (thoverId) => {
			dispatch(setHoverId(thoverId));
		};

		const WordsEl = wordarray.map((wordChild) => (
			<span
				className={`ocr_word ${
					hoverId === wordChild.id ? "hoved" : ""
				}`}
				key={wordChild.id}
				onMouseEnter={() => {
					handleHover(wordChild.id);
					//setHoverId(e.target.attrs.id)
				}}
				onMouseLeave={() => {
					handleHover("");
					//setHoverId('');
					//e.target.strokeEnabled(false);

					//setPrevHoverId(e.target.attrs.id);
				}}
			>
				{wordChild.text}{" "}
			</span>
		));
		return WordsEl;
	};

	const linesEl = page.children.map((lineChild) => (
		<>
			<span className="ocr_line" key={lineChild.id}>
				{RenderWord(lineChild.children, hoverId)}
			</span>
			<br />
		</>
	));
	return (
		<div>
		<ReactQuill theme="snow" value={renderToString(linesEl)} onChange={valueAdded}/>
		{/*<p>{linesEl}</p>*/}
		</div>
	);
}

export default HocrView;
