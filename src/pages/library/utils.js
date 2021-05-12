export const  getCount = async () => { 
console.log('getting user count')
    try {
   
       const response = await fetch('http://192.168.11.177:3000/fetchcount',{
         method: "post",
         headers: { "Content-Type": "application/json" },
      
       }
     );
     const data =  await response.json();
     console.log(data);
     return data
   
   }catch(e) {
       console.log('update user count error',e)
   }
    }

    export const  deleteCopy = async (id) => { 
      console.log('deleting copies')
          try {
         
             const response = await fetch('http://192.168.11.177:3000/deletecopy',{
               method: "post",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({
                id: id,
        
              }),
             }
           );
           const data =  await response.json();
           console.log(data);
           return data
         
         }catch(e) {
             console.log('delete copy error',e)
         }
          }