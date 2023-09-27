import ChatNav from "./ChatNav";
import InputBox from "./InputBox";
const SingleChat = () => {
    return (
        <div className="flex  flex-col  flex-main-2 bg-slate-800
        border-l-[0.2px]  border-color-2 justify-between rounded-r-md">
            <ChatNav />

            <InputBox />
        </div>
    )
}

export default SingleChat