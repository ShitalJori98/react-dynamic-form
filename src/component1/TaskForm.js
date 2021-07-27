import React from "react"
import TaskList from "./TaskList"
import { NotificationContainer, NotificationManager } from 'react-notifications';

class TaskForm extends React.Component {
    state = {
        taskList: [{ index: Math.random(), projectName: "", task: "", taskNotes: "", taskStatus: "" }],
        date: "",
        description: "",
    }
  
    handleChange = (e) => {
        if (["projectName", "task", "taskNotes", "taskStatus"].includes(e.target.name)) {
            let taskList = [...this.state.taskList]
            taskList[e.target.dataset.id][e.target.name] = e.target.value;
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
       }
    addNewRow = () => {
            this.setState((prevState) => ({
                taskList: [...prevState.taskList, { index: Math.random(), projectName: "", task: "", taskNotes: "", taskStatus: "" }],
            }));
        }


    deteteRow = (index) => {
        this.setState({
            taskList: this.state.taskList.filter((s, sindex) => index !== sindex),
        });
        // const taskList1 = [...this.state.taskList];
        // taskList1.splice(index, 1);
        // this.setState({ taskList: taskList1 });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.date==='')
        {
            NotificationManager.warning("Please Fill up the date Field");
            return false;
        }
        else{
        alert("Done Successfully ");
        }
        for(var i=0;i<this.state.taskList.length;i++)
        {
                if(this.state.taskList[i].projectName==='' || this.state.taskList[i].task==='')
                {
                    NotificationManager.warning("Please Fill up the Project name And Task Field");
                    return false;
                }
        }
       

    }
    clickOnDelete(record) {
        this.setState({
            taskList: this.state.taskList.filter(r => r !== record)
        });
    }
render() {
        let { taskList } = this.state//let { notes, date, description, taskList } = this.state
   return (
     <div className="content">
     <NotificationContainer/>
    <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
      <div className="row" style={{ marginTop: 20 }}>
       <div className="col-sm-1"></div>
         <div className="col-sm-10">
             <div className="card" >
               <div className="card-header text-center " style={{backgroundColor:'black', color:'white'}}><h3 >Add Your Daily Task</h3></div>
                     <div className="card-body">
                            <div className="row">
                               <div className="col-sm-4">
                                   <div className="form-group ">
                                            <label className="required"><b>Date</b></label>
                                             <input type="date"  name="date" id="date" className="form-control" placeholder="Enter Date" />
                                    </div>
                                </div>
                                        
                             </div>
                            <table className="table">
                                     <thead>
                                            <tr>
                                                <th className="required" >Project Name</th>
                                                <th className="required" >Task</th>
                                                <th>Notes</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <TaskList add={this.addNewRow} delete={this.clickOnDelete.bind(this)} taskList={taskList} />
                                        </tbody>
                                        <tfoot>
                                            <tr><td colSpan="4">
                                                <button onClick={this.addNewRow} type="button" className="btn btn-secondary text-center"> + New Row</button>
                                            </td></tr>
                                        </tfoot>
                                    </table>
                                </div>
                                <div className="card-footer text-center" style={{backgroundColor:'black'}} > <button type="submit" className="btn btn-primary text-center">Submit</button>
                                 <button type="reset" className="btn btn-primary text-center" style={{marginLeft:'30px'}} >Reset</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-1"></div>
                    </div>
                </form>
            </div>
        )
    }
}
export default TaskForm