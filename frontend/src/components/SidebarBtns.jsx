export default function sidebarBtns({idName, textName, icon}){
    return(
        <div className="flex flex-col">
            <button className="bg-transparent p-1 rounded-lg flex items-center" id={idName}>
                <div className="flex justify-center items-center mr-1">
                    <i className={`${icon} text-[1.5rem] p-1`}></i>
                </div>
                <span className="font-bold p-1 m-0">{textName}</span>
            </button>
        </div>
    );
}