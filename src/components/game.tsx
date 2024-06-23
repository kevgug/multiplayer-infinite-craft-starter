import { useRef } from "react";
import { CSSTransition, SwitchTransition, TransitionGroup } from "react-transition-group";
import Chip from "./Chip";
import "../styles/app.css";

import { EmojiNoun } from "../cloudstate/noun";
import toast, { Toaster } from "react-hot-toast";

interface InitialState {
	roomId: string;
	nouns: EmojiNoun[];
}

export default function Game(props: InitialState) {
	return (
		<ChipList {...props} />
	)
}

function ChipList(props: InitialState) {
	const nouns = props.nouns;

	const hasStarted = nouns.length > 4
	const explainerRef = useRef(null);
	const roomInfoRef = useRef(null);
	const subheaderRef = hasStarted ? roomInfoRef : explainerRef;
	return (
		<div>
			<SwitchTransition>
				<CSSTransition
					key={hasStarted ? "room-info" : "explainer"}
					nodeRef={subheaderRef}
					addEndListener={(done: any) => {
						(subheaderRef.current as any).addEventListener("transitionend", done, false)
					}}
					classNames="fade"
				>
					<div
						ref={subheaderRef}
						className="flex flex-row items-center justify-center mt-2 mb-10">
						<p className="text-center text-gray-400">
							{hasStarted ? props.roomId : "Select any two nouns to craft a new one."}
						</p>
						{hasStarted &&
							<button className="text-gray-400 hover:text-gray-200 transition ml-2" onClick={() => {
								navigator.clipboard.writeText(props.roomId);
								toast.dismiss();
								toast.success("Room ID copied to clipboard!", {
									position: "bottom-right",
									duration: 2000,
								});
							}}>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
							</button>}
					</div>
				</CSSTransition>
			</SwitchTransition>
			<div className="chip-list mx-6 my-4">
				<TransitionGroup>
					{nouns.map((noun, idx) =>
						<CSSTransition key={idx} timeout={500} classNames="chip-container">
							<Chip
								text={`${noun.emoji} ${noun.text}`}
								isStarred={noun.discovered}
							/>
						</CSSTransition>
					)}
				</TransitionGroup>
			</div>
			<Toaster />
		</div>
	);
}
