import api from '../api.js';

export default function Sidebar() {
    return (
        <>
            {/* <h2>Hello this is the sidebar</h2> */}
            <div className="createBtn">
                <button className="sidebarBtns" id="createProjectBtn">
                    <div className="iconHolder">
                        <i class='bxr  bx-plus'></i>
                    </div>
                    <span>Create Project</span>
                </button>
            </div>

            <div className="taskControlButtons">
                <h3>Project Name Here</h3>
                <button className="sidebarBtns" id="addTask">
                    <div className="iconHolder">
                        <i class='bxr  bx-plus'></i>
                    </div>
                    <span>Add Task</span>
                </button>
                <button className="sidebarBtns" id="addTask">
                    <div className="iconHolder">
                        <i class='bxr  bx-plus'></i>
                    </div>
                    <span>Add Task</span>
                </button>
            </div>
        </>
    );
}