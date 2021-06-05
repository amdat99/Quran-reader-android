export const  getCount = async () => { 
console.log('getting user count')
    try {
      const response = await fetch('https://quranlive-api.herokuapp.com/fetchcount',{
      //  const response = await fetch('http://192.168.11.177:3000/fetchcount',{
         method: "post",
         headers: { "Content-Type": "application/json" },
      
       }
     );
     const data =  await response.json();
     return data
   
   }catch(e) {
       console.log('update user count error',e)
   }
    }

    export const  fetchProfiles = async () => { 
      console.log('getting profile')
          try {
            const response = await fetch('https://quranlive-api.herokuapp.com/fetchprofiles',{
            //  const response = await fetch('http://192.168.11.177:3000/fetchcount',{
               method: "post",
               headers: { "Content-Type": "application/json" },
            
             }
           );
           const data =  await response.json();
     
           return data
         
         }catch(e) {
             console.log('fetch profile error',e)
         }
          }
          
          export const  updateStatus = async (status,userid) => { 
            
            console.log(status)
                try {
                  const response = await fetch('https://quranlive-api.herokuapp.com/updatestatus',{
                  //  const response = await fetch('http://192.168.11.177:3000/fetchcount',{
                     method: "put",
                     headers: { "Content-Type": "application/json" },
                     body: JSON.stringify({
                      status: status,
                      userid: userid
              
                    }),
                   }
                 );
                 const data =  await response.json();
                  
                 console.log(data)
               
               }catch(e) {
                   console.log('fetch profile error',e)
               }
                }
    export const  deleteCopy = async (id) => { 
      console.log('deleting copies')
          try {
                const response = await fetch('https://quranlive-api.herokuapp.com/deletecopy',{
            //  const response = await fetch('http://192.168.11.177:3000/deletecopy',{
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