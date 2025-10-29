import { useEffect, useState } from "react";

function App() {
     const [students, setStudents] = useState([]);
     const [studentName, setStudentName] = useState("");
     useEffect(() => {
          getStudent();
     }, []);

     //  get request
     async function getStudent() {
          const res = await fetch(`http://localhost:4530/students`);
          const data = await res.json();
          setStudents(data);
     }

     // post request
     async function postStudent(e) {
          e.preventDefault();
          if (!(studentName === "" || studentName === " ")) {
               const newStudent = {
                    name: studentName.trim(),
                    completeStudy: false,
               };
               fetch(`http://localhost:4530/students`, {
                    method: "POST",
                    body: JSON.stringify(newStudent),
                    headers: {
                         "content-type": "application/json",
                    },
               });
               await getStudent();
               setStudentName("");
          }
     }

     // delete request
     async function deleteStudent(sid) {
          await fetch(`http://localhost:4530/students/${sid}`, {
               method: "DELETE",
          });

          await getStudent();
     }

     //  all delete request
     async function deleteAllStudent() {
          students.map((s) => {
               fetch(`http://localhost:4530/students/${s.id}`, {
                    method: "DELETE",
               });
          });

          await getStudent();
     }

     //  put request
     async function updateStudent(studentObj) {
          const updateStudent = {
               ...studentObj,
               // name:
               completeStudy: !studentObj.completeStudy,
          };
          await fetch(`http://localhost:4530/students/${studentObj.id}`, {
               method: "PUT",
               body: JSON.stringify(updateStudent),
               headers: {
                    "content-type": "application/json",
               },
          });
          await getStudent();
     }

     //  filter request
     async function filterStudent(boolean) {
          const res = await fetch(
               `http://localhost:4530/students?completeStudy=${boolean}`
          );
          const data = await res.json();
          setStudents(data);
     }

     return (
          <>
               <section className="h-screen w-full justify-center flex flex-col items-center">
                    <div className="border p-5 w-4/12 text-center rounded-2xl shadow-2xl">
                         <h1 className="text-4xl font-semibold mb-4">
                              Add Tasks
                         </h1>
                         <hr className="border-b border-0" />
                         <form
                              onSubmit={postStudent}
                              className="my-4 flex gap-2"
                         >
                              <input
                                   type="text"
                                   placeholder="Add Task"
                                   value={studentName}
                                   autoFocus
                                   className="input input-primary w-10/12 text-xl"
                                   onChange={(e) =>
                                        setStudentName(e.target.value)
                                   }
                              />
                              <button
                                   type="submit"
                                   className="btn w-2/12 btn-soft btn-primary"
                              >
                                   Add
                              </button>
                         </form>
                         <hr className="border-b border-0" />
                         <div className="flex gap-2 my-2">
                              <button
                                   className="btn btn-dash btn-info btn-sm"
                                   onClick={getStudent}
                              >
                                   All
                              </button>
                              <button
                                   className="btn btn-dash btn-info btn-sm"
                                   onClick={() => filterStudent(true)}
                              >
                                   Complete
                              </button>
                              <button
                                   className="btn btn-dash btn-info btn-sm"
                                   onClick={() => filterStudent(false)}
                              >
                                   Pending
                              </button>
                         </div>
                         <div>
                              <ul className="h-80 overflow-auto">
                                   {students.map((student) => (
                                        <li
                                             className="flex mt-4 items-center border justify-between rounded-sm p-2"
                                             key={student.id}
                                        >
                                             <div className="flex items-center gap-2 ">
                                                  <input
                                                       type="checkbox"
                                                       checked={
                                                            student.completeStudy
                                                       }
                                                       className="checkbox checkbox-primary"
                                                       onChange={() =>
                                                            updateStudent(
                                                                 student
                                                            )
                                                       }
                                                  />
                                                  <span className="text-2xl font-semibold">
                                                       {student.name}{" "}
                                                  </span>
                                             </div>
                                             <button
                                                  onClick={() =>
                                                       deleteStudent(student.id)
                                                  }
                                                  className="btn btn-soft btn-secondary"
                                             >
                                                  Delete
                                             </button>
                                        </li>
                                   ))}
                              </ul>
                              <hr className="border-b border-0 my-4" />
                              <button
                                   className="btn btn-soft btn-error"
                                   onClick={deleteAllStudent}
                              >
                                   Delete All
                              </button>
                         </div>
                    </div>
               </section>
          </>
     );
}

export default App;
