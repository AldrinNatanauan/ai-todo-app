import api from '../api.js';
import SidebarBtns from './SidebarBtns.jsx';

export default function Sidebar() {
    return (
        <>
            {/* <h2>Hello this is the sidebar</h2> */}
            <div className="flex flex-col">
                <button className="bg-[#07553B] m-0 flex justify-center items-center p-1 rounded-lg" id="createProjectBtn">
                    <div className="flex justify-center items-center mr-1">
                        <i className='bxr  bx-plus text-[1.5rem] p-1'></i>
                    </div>
                    <span className="text-[1.5rem] font-bold p-1 m-0">Create Project</span>
                </button>
            </div>

            <div className="mt-auto flex flex-col gap-2 border-t border-[hsl(0,0%,50%)] pt-2">
                <h3 className="font-bold text-[1.5rem] m-0 p-1">Project Name Here</h3>

                <SidebarBtns idName="addTask" textName="Add Task" icon="bxr bx-plus" />
                <SidebarBtns idName="searchTask" textName="Search" icon="bxr bx-search" />
            </div>
        </>
    );
}