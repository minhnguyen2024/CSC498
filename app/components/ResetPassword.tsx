import { Html } from '@react-email/html';
export function ResetPassword() {
    return <Html>
        <form method="post">
          <div className="m-3">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                className="w-64 rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>
          <button className="border rounded bg-blue-500 hover:bg-blue-300 text-white">
            Submit
          </button>
        </form>
      </Html>
  }
  
//   export function ResetPassword() {
//     return `
//       <html>
//         <head>
//           <style>
//             /* Add any necessary CSS styling for your email here */
//           </style>
//         </head>
//         <body>
//           <div>
//             <form method="post">
//               <div class="m-3">
//                 <label for="password">Password</label>
//                 <div class="mt-1">
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     class="w-64 rounded border border-gray-500 px-2 py-1 text-lg"
//                   />
//                 </div>
//               </div>
//               <button class="border rounded bg-blue-500 hover:bg-blue-300 text-white">
//                 Submit
//               </button>
//             </form>
//           </div>
//         </body>
//       </html>
//     `;
//   }
  