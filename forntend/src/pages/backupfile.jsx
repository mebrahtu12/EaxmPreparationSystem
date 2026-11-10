// function addDepartment(event) {
//   event.preventDefault();

//   const name = departmentName.trim();
//   const program = programName.trim();

//   if (!name || !program) return;

//   const existing = departments.find(
//     (item) => item.name.toLowerCase() === name.toLowerCase(),
//   );

//   if (existing) {
//     if (
//       existing.programs.some(
//         (item) => item.toLowerCase() === program.toLowerCase(),
//       )
//     ) {
//       showNotice("That program already exists in this department.");
//       return;
//     }

//     setDepartments((current) =>
//       current.map((item) =>
//         item.id === existing.id
//           ? { ...item, programs: [...item.programs, program] }
//           : item,
//       ),
//     );
//   } else {
//     setDepartments((current) => [
//       ...current,
//       {
//         id: Date.now(),
//         name,
//         programs: [program],
//       },
//     ]);
//   }

//   setDepartmentName("");
//   setProgramName("");
//   showNotice("Department and program added.");
// }
