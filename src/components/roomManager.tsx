import { useState } from "react";
import { Toaster } from "sonner";

export default function RoomManager() {
	const [textInput, setTextInput] = useState("");

	const joinRoom = (roomId: string) => { };
	const createRoom = () => { };

	return (
		<div className="flex flex-col justify-center items-center">
			<div className="flex flex-row justify-center items-center mt-4 mb-8">
				<form onSubmit={(ev) => {
					ev.preventDefault();
					joinRoom(textInput);
				}}>
					<input
						type="text"
						className="flex mr-3 px-2 py-1 bg-gray-200 rounded-md"
						autoFocus
						value={textInput}
						placeholder="Room ID"
						onChange={(ev) => setTextInput(ev.target.value)}
					/>
				</form>
				<button
					className="px-3 py-1 bg-gray-700 text-white rounded-md"
					onClick={() => joinRoom(textInput)}
				>
					Join Room
				</button>
			</div>
			<p className="text-gray-300">Or</p>
			<div className="flex w-full justify-center mt-8">
				<button
					className="px-3 py-1 bg-green-700 text-white rounded-md"
					onClick={createRoom}
				>
					Create Room
				</button>
			</div>
			<Toaster richColors position="bottom-right" />
		</div>
	);
}
